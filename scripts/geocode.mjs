#!/usr/bin/env node
/**
 * Geokodowanie centroidu miejscowości (Nominatim / OSM).
 * Zaokrąglenie: city=2 dp, garrison_town|public_hq_building=3 dp.
 * Nie geokodujemy koszar ani pasów startowych.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "../data/catalog/index.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_PATH = join(ROOT, "data", "geocode-cache.json");
const UA = "ru-garrison-atlas/0.1 (open-source garrison gazetteer; educational; no targeting)";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function roundCoord(lon, lat, precision) {
  const dp = precision === "city" ? 2 : 3;
  const f = 10 ** dp;
  return {
    lon: Math.round(lon * f) / f,
    lat: Math.round(lat * f) / f,
  };
}

function loadCache() {
  if (!existsSync(CACHE_PATH)) return {};
  return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
}

function saveCache(cache) {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
}

async function nominatim(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Nominatim ${res.status} for ${query}`);
  const data = await res.json();
  if (!data.length) return null;
  return {
    lon: Number(data[0].lon),
    lat: Number(data[0].lat),
    display_name: data[0].display_name,
    osm_type: data[0].osm_type,
    osm_id: data[0].osm_id,
  };
}

/** Alternative settlement strings when the English query is missing from Nominatim. */
const FALLBACK = {
  "Rassvet, Aksaysky District, Rostov Oblast, Russia": [
    "Рассвет, Аксайский район, Ростовская область",
    "Rassvet, Rostov Oblast, Russia",
  ],
  "Shtykovo, Primorsky Krai, Russia": ["Штыково, Приморский край"],
  "Yantarny, Kaliningrad Oblast, Russia": ["Янтарный, Калининградская область"],
  "Zhukov, Kaluga Oblast, Russia": ["Жуков, Калужская область"],
  "Kerch, Crimea": ["Kerch", "Керчь"],
  "Bolshoy Kamen, Primorsky Krai, Russia": ["Большой Камень, Приморский край"],
  "Arsenyev, Primorsky Krai, Russia": ["Арсеньев, Приморский край"],
  "Zelenodolsk, Tatarstan, Russia": ["Зеленодольск, Татарстан"],
  "Ostrov, Pskov Oblast, Russia": ["Остров, Псковская область"],
  "Yelabuga, Tatarstan, Russia": ["Елабуга, Татарстан", "Yelabuga, Russia"],
  "Dubna, Moscow Oblast, Russia": ["Дубна, Московская область", "Dubna, Russia"],
};

async function nominatimWithFallback(query) {
  const hit = await nominatim(query);
  if (hit) return hit;
  for (const alt of FALLBACK[query] || []) {
    await sleep(1100);
    process.stderr.write(`geocode fallback: ${alt}\n`);
    const again = await nominatim(alt);
    if (again) return again;
  }
  return null;
}

const cache = loadCache();
const unique = [...new Set(CATALOG.map((u) => u.geocode_query))];
let fetched = 0;
const missing = [];

for (const q of unique) {
  if (cache[q]?.lon != null) continue;
  process.stderr.write(`geocode: ${q}\n`);
  try {
    const hit = await nominatimWithFallback(q);
    await sleep(1100);
    if (!hit) {
      missing.push(q);
      cache[q] = { error: "not_found", accessed: "2026-09-12" };
    } else {
      cache[q] = { ...hit, source: "nominatim", accessed: "2026-09-12" };
    }
    fetched += 1;
    if (fetched % 5 === 0) saveCache(cache);
  } catch (err) {
    missing.push(`${q} (${err.message})`);
    await sleep(2000);
  }
}

saveCache(cache);

const resolved = {};
for (const unit of CATALOG) {
  const raw = cache[unit.geocode_query];
  if (!raw || raw.lon == null) {
    resolved[unit.id] = { error: "unresolved", query: unit.geocode_query };
    continue;
  }
  const { lon, lat } = roundCoord(raw.lon, raw.lat, unit.coord_precision);
  resolved[unit.id] = {
    lon,
    lat,
    geocode_source: "nominatim",
    geocode_query: unit.geocode_query,
    display_name: raw.display_name,
  };
}

writeFileSync(
  join(ROOT, "data", "geocode-resolved.json"),
  JSON.stringify(resolved, null, 2) + "\n"
);

if (missing.length) {
  process.stderr.write(`UNRESOLVED (${missing.length}):\n${missing.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stderr.write(`OK geocoded ${unique.length} queries (${fetched} new)\n`);
}
