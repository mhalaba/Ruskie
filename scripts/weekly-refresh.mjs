#!/usr/bin/env node
/**
 * Weekly OSINT agent: re-check open-source URLs and flag garrison-text drift.
 * Never moves coordinates, never adds Ukraine-1991 pins, never writes frequencies.
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "../data/catalog/index.mjs";
import { SOURCES } from "../data/catalog/sources.mjs";
import { EW_SYSTEMS } from "../data/catalog/ew-systems.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = new Date().toISOString().slice(0, 10);
const UA =
  process.env.WEEKLY_USER_AGENT ||
  "ru-garrison-atlas-weekly/0.1 (https://github.com/mhalaba/Ruskie; educational gazetteer; no targeting)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function wikiFromUrl(url) {
  const m = String(url).match(/^https?:\/\/([a-z]+)\.wikipedia\.org\/wiki\/([^?#]+)/i);
  if (!m) return null;
  return { lang: m[1], title: decodeURIComponent(m[2].replace(/_/g, " ")) };
}

async function fetchRes(url, extra = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: "text/html,application/json;q=0.9,*/*;q=0.8" },
      ...extra,
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function checkUrl(url) {
  try {
    let res = await fetchRes(url, { method: "HEAD" });
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetchRes(url, { method: "GET" });
    }
    return { url, ok: res.ok, status: res.status };
  } catch (err) {
    return { url, ok: false, status: 0, error: err.name === "AbortError" ? "timeout" : err.message };
  }
}

async function wikiExtract(lang, title) {
  const api = new URL(`https://${lang}.wikipedia.org/w/api.php`);
  api.searchParams.set("action", "query");
  api.searchParams.set("prop", "extracts|revisions");
  api.searchParams.set("explaintext", "1");
  api.searchParams.set("exchars", "1200");
  api.searchParams.set("rvprop", "timestamp|ids");
  api.searchParams.set("format", "json");
  api.searchParams.set("redirects", "1");
  api.searchParams.set("titles", title);
  const res = await fetchRes(api.toString());
  if (!res.ok) throw new Error(`wiki ${res.status}`);
  const data = await res.json();
  const page = Object.values(data.query?.pages || {})[0];
  if (!page || page.missing != null) return { missing: true, title };
  return {
    title: page.title,
    extract: page.extract || "",
    revid: page.revisions?.[0]?.revid ?? null,
    timestamp: page.revisions?.[0]?.timestamp ?? null,
  };
}

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ё/g, "е");
}

const uniqueUrls = [...new Set(Object.values(SOURCES).map((s) => s.url))];
const urlStatus = [];
for (const url of uniqueUrls) {
  const row = await checkUrl(url);
  urlStatus.push(row);
  process.stderr.write(`url ${row.status} ${url}\n`);
  await sleep(400);
}

const wikiCache = new Map();
async function loadWiki(url) {
  const spec = wikiFromUrl(url);
  if (!spec) return null;
  const key = `${spec.lang}:${spec.title}`;
  if (wikiCache.has(key)) return wikiCache.get(key);
  try {
    const data = await wikiExtract(spec.lang, spec.title);
    wikiCache.set(key, data);
    await sleep(1100);
    return data;
  } catch (err) {
    const fail = { error: err.message };
    wikiCache.set(key, fail);
    await sleep(1100);
    return fail;
  }
}

const garrisonFlags = [];
for (const unit of CATALOG) {
  const wikiSources = (unit.sources || []).filter((s) => wikiFromUrl(s.url));
  if (!wikiSources.length) continue;
  let mentioned = false;
  let checked = 0;
  for (const src of wikiSources) {
    const page = await loadWiki(src.url);
    if (!page || page.error || page.missing) continue;
    checked += 1;
    const blob = norm(page.extract);
    const needles = [unit.garrison_settlement, unit.garrison_region, unit.short, unit.name_en]
      .filter(Boolean)
      .map(norm);
    if (needles.some((n) => n.length > 3 && blob.includes(n))) mentioned = true;
  }
  if (checked > 0 && !mentioned) {
    garrisonFlags.push({
      id: unit.id,
      garrison_settlement: unit.garrison_settlement,
      note: "Wikipedia extract did not contain garrison_settlement / region / English name — review, do not auto-move.",
    });
  }
}

const watchPath = join(ROOT, "data", "watchlist.json");
const snapPath = join(ROOT, "data", "source-snapshots.json");
const watchlist = JSON.parse(readFileSync(watchPath, "utf8"));
const prevSnap = existsSync(snapPath) ? JSON.parse(readFileSync(snapPath, "utf8")) : { pages: {} };
const nextSnap = { generated: TODAY, pages: { ...prevSnap.pages } };
const watchFlags = [];

for (const url of watchlist.wikipedia || []) {
  const spec = wikiFromUrl(url);
  if (!spec) continue;
  const page = await loadWiki(url);
  if (!page || page.error || page.missing) {
    watchFlags.push({ url, error: page?.error || "missing" });
    continue;
  }
  const hash = createHash("sha256")
    .update(String(page.revid || page.extract))
    .digest("hex")
    .slice(0, 16);
  const prev = prevSnap.pages[url];
  if (prev && prev.hash && prev.hash !== hash) {
    watchFlags.push({
      url,
      previous_revid: prev.revid ?? null,
      revid: page.revid,
      timestamp: page.timestamp,
      note: "Watchlist page revision changed — human review of order-of-battle text.",
    });
  }
  nextSnap.pages[url] = { hash, revid: page.revid, timestamp: page.timestamp, accessed: TODAY };
}

const httpErrors = urlStatus.filter((r) => !r.ok);
const report = {
  generated: new Date().toISOString(),
  policy: "data/refresh-policy.md",
  catalog_count: CATALOG.length,
  ew_systems: EW_SYSTEMS.length,
  urls_checked: urlStatus.length,
  http_errors: httpErrors,
  garrison_mention_missing: garrisonFlags,
  watchlist_changed: watchFlags,
  auto_changes: [],
  refused: [
    "No coordinate writes",
    "No Ukraine 1991 pins",
    "No frequencies / jammer sites / plant gates",
  ],
};

mkdirSync(join(ROOT, "data"), { recursive: true });
writeFileSync(join(ROOT, "data", "last-refresh.json"), JSON.stringify(report, null, 2) + "\n");
writeFileSync(snapPath, JSON.stringify(nextSnap, null, 2) + "\n");

const md = [
  `# Weekly OSINT refresh — ${TODAY}`,
  "",
  `Catalog records: **${CATALOG.length}**. URLs checked: **${urlStatus.length}**.`,
  "",
  "## HTTP errors",
  httpErrors.length
    ? httpErrors.map((r) => `- \`${r.status}\` ${r.url}${r.error ? " — " + r.error : ""}`).join("\n")
    : "_None._",
  "",
  "## Garrison string missing from Wikipedia extract",
  garrisonFlags.length
    ? garrisonFlags.map((g) => `- \`${g.id}\` (${g.garrison_settlement}) — ${g.note}`).join("\n")
    : "_None flagged._",
  "",
  "## Watchlist revision changes",
  watchFlags.length ? watchFlags.map((w) => `- ${w.url} — ${w.note || w.error}`).join("\n") : "_None._",
  "",
  "## Agent limits",
  "- Coordinates were not modified.",
  "- No new pins were added automatically.",
  "- Ukraine 1991 validator still runs in `npm run build`.",
  "",
].join("\n");

writeFileSync(join(ROOT, "data", "refresh-report.md"), md + "\n");

console.log(
  `weekly-refresh: urls=${urlStatus.length} http_errors=${httpErrors.length} garrison_flags=${garrisonFlags.length} watch=${watchFlags.length}`
);

if (httpErrors.length > 40) {
  console.error("Too many HTTP errors — network may be blocked. Report written; not failing the catalog.");
}
