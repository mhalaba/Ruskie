#!/usr/bin/env node
/**
 * Składa FeatureCollection + lustro JSON + drzewo hierarchii.
 * Współrzędne wyłącznie z cache Nominatim miejscowości (zaokrąglone).
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "../data/catalog/index.mjs";
import { SOURCES } from "../data/catalog/sources.mjs";
import { EW_SYSTEMS } from "../data/catalog/ew-systems.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_PATH = join(ROOT, "data", "geocode-cache.json");

function roundCoord(lon, lat, precision) {
  const dp = precision === "city" ? 2 : 3;
  const f = 10 ** dp;
  return [Math.round(lon * f) / f, Math.round(lat * f) / f];
}

function confidenceScore(c) {
  return { high: 90, medium: 65, low: 35, unverified: 10 }[c] ?? 0;
}

function extraLayer(unit) {
  if (unit.extra_layer) return unit.extra_layer;
  if (unit.confidence === "unverified") return "sketch";
  if (unit.sovereignty_note === "occupied_ukraine") return "crimea";
  if (unit.country && unit.country !== "RU" && unit.country !== "UA") return "extraterritorial";
  return "rf";
}

if (!existsSync(CACHE_PATH)) {
  console.error("Brak data/geocode-cache.json — uruchom: npm run geocode");
  process.exit(1);
}

const cache = JSON.parse(readFileSync(CACHE_PATH, "utf8"));
const missing = [];

const features = [];
for (const unit of CATALOG) {
  const hit = cache[unit.geocode_query];
  if (!hit || hit.lon == null) {
    missing.push(`${unit.id} ← ${unit.geocode_query}`);
    continue;
  }
  const coordinates = roundCoord(Number(hit.lon), Number(hit.lat), unit.coord_precision);
  const { geocode_query, extra_layer, source_keys, ...rest } = unit;
  const props = {
    ...rest,
    extra_layer: extraLayer(unit),
    geocode_source: hit.source ?? "nominatim",
    geocode_query,
    confidence_score: confidenceScore(unit.confidence),
  };
  if (unit.alt_garrison) props.alt_garrison = unit.alt_garrison;
  features.push({
    type: "Feature",
    geometry: { type: "Point", coordinates },
    properties: props,
  });
}

if (missing.length) {
  console.error("Brak geokodu:\n" + missing.join("\n"));
  process.exit(1);
}

const geojson = {
  type: "FeatureCollection",
  name: "ru_garrisons",
  metadata: {
    generated: new Date().toISOString().slice(0, 10),
    record_count: features.length,
    languages: ["pl", "en", "de"],
    disclaimer:
      "Open sources only. Not a battlefield tracker. No Ukrainian theater locations.",
  },
  features,
};

const ids = new Set(features.map((f) => f.properties.id));
const hierarchy = { roots: [], nodes: {} };
for (const f of features) {
  const p = f.properties;
  hierarchy.nodes[p.id] = {
    id: p.id,
    name_pl: p.name_pl,
    name_en: p.name_en,
    name_de: p.name_de,
    name_ru: p.name_ru,
    short: p.short,
    echelon: p.echelon,
    district: p.district,
    branch: p.branch,
    parent_id: p.parent_id,
    children: [],
    confidence: p.confidence,
    extra_layer: p.extra_layer,
  };
}
for (const f of features) {
  const p = f.properties;
  if (p.parent_id && ids.has(p.parent_id)) {
    hierarchy.nodes[p.parent_id].children.push(p.id);
  } else {
    hierarchy.roots.push(p.id);
  }
}

const outData = join(ROOT, "data");
const outPublic = join(ROOT, "public", "data");
mkdirSync(outData, { recursive: true });
mkdirSync(outPublic, { recursive: true });

writeFileSync(join(outData, "units.geojson"), JSON.stringify(geojson, null, 2) + "\n");
writeFileSync(join(outData, "units.json"), JSON.stringify(geojson.features.map((f) => ({
  ...f.properties,
  lon: f.geometry.coordinates[0],
  lat: f.geometry.coordinates[1],
})), null, 2) + "\n");
writeFileSync(join(outData, "hierarchy.json"), JSON.stringify(hierarchy, null, 2) + "\n");
writeFileSync(
  join(outData, "sources.json"),
  JSON.stringify({ accessed: new Date().toISOString().slice(0, 10), sources: Object.values(SOURCES) }, null, 2) + "\n"
);

const ewOut = EW_SYSTEMS.map((sys) => ({
  ...sys,
  sources: (sys.source_keys || []).map((k) => {
    const s = SOURCES[k];
    if (!s) throw new Error(`Unknown EW system source: ${k}`);
    return { ...s };
  }),
}));
writeFileSync(
  join(outData, "ew-systems.json"),
  JSON.stringify({ accessed: new Date().toISOString().slice(0, 10), systems: ewOut }, null, 2) + "\n"
);

copyFileSync(join(outData, "units.geojson"), join(outPublic, "units.geojson"));
copyFileSync(join(outData, "units.json"), join(outPublic, "units.json"));
copyFileSync(join(outData, "hierarchy.json"), join(outPublic, "hierarchy.json"));
copyFileSync(join(outData, "dictionaries.json"), join(outPublic, "dictionaries.json"));
copyFileSync(join(outData, "sources.json"), join(outPublic, "sources.json"));
copyFileSync(join(outData, "gaps.json"), join(outPublic, "gaps.json"));
copyFileSync(join(outData, "ew-systems.json"), join(outPublic, "ew-systems.json"));

const byConf = { high: 0, medium: 0, low: 0, unverified: 0 };
for (const f of features) byConf[f.properties.confidence] += 1;
console.log(`build-data: ${features.length} features`, byConf);
