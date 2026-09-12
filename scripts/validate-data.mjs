#!/usr/bin/env node
/**
 * Walidator bazy garnizonowej.
 * FAIL: punkt w Ukrainie 1991 poza Krymem oznaczonym occupied_ukraine.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function pointInRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersect =
      yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function inUkraine1991(lon, lat, ukraine) {
  const geom = ukraine.features[0].geometry;
  const rings = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  for (const polygon of rings) {
    const [outer, ...holes] = polygon;
    if (pointInRing(lon, lat, outer) && !holes.some((h) => pointInRing(lon, lat, h))) {
      return true;
    }
  }
  return false;
}

/** Przybliżony bbox Krymu (półwysep); Perekop ~46.16N. */
function inCrimea(lon, lat) {
  return lat >= 44.38 && lat <= 46.22 && lon >= 32.48 && lon <= 36.75;
}

const ENUMS = JSON.parse(readFileSync(join(ROOT, "data", "schema.json"), "utf8")).enums;
const geoPath = join(ROOT, "data", "units.geojson");
if (!existsSync(geoPath)) {
  console.error("Brak data/units.geojson — najpierw: node scripts/build-data.mjs");
  process.exit(1);
}

const fc = JSON.parse(readFileSync(geoPath, "utf8"));
const ukraine = JSON.parse(readFileSync(join(ROOT, "data", "ukraine-1991.geojson"), "utf8"));

if (fc.type !== "FeatureCollection") fail("Root nie jest FeatureCollection");
const ids = new Set();
const parentIds = new Set();

for (const [i, feat] of (fc.features || []).entries()) {
  const loc = `feature[${i}]`;
  if (feat.type !== "Feature") fail(`${loc}: type != Feature`);
  if (!feat.geometry || feat.geometry.type !== "Point") fail(`${loc}: geometria musi być Point`);
  const coords = feat.geometry?.coordinates;
  if (!Array.isArray(coords) || coords.length !== 2) {
    fail(`${loc}: coordinates [lon, lat]`);
    continue;
  }
  const [lon, lat] = coords;
  if (typeof lon !== "number" || typeof lat !== "number") fail(`${loc}: nie-liczbowe współrzędne`);
  if (lon < 19 || lon > 180 || lat < 32 || lat > 82) {
    fail(`${loc}: bbox poza rozsądnym zakresem atlasu (${lon}, ${lat})`);
  }

  const p = feat.properties || {};
  const id = p.id;
  if (!id) fail(`${loc}: brak id`);
  if (ids.has(id)) fail(`duplikat id: ${id}`);
  ids.add(id);
  if (p.parent_id) parentIds.add(p.parent_id);

  for (const [field, allowed] of Object.entries(ENUMS)) {
    if (p[field] == null) fail(`${id}: brak ${field}`);
    else if (!allowed.includes(p[field])) fail(`${id}: zła wartość ${field}=${p[field]}`);
  }

  if (!p.garrison_settlement) fail(`${id}: brak garrison_settlement`);
  if (!Array.isArray(p.sources) || p.sources.length === 0) {
    if (p.confidence !== "unverified") fail(`${id}: sources puste przy confidence=${p.confidence}`);
  }
  if (p.confidence !== "unverified" && (!p.sources || p.sources.length === 0)) {
    fail(`${id}: wymagane źródła`);
  }

  const lonStr = String(lon);
  const latStr = String(lat);
  const lonDp = (lonStr.split(".")[1] || "").length;
  const latDp = (latStr.split(".")[1] || "").length;
  const maxDp = p.coord_precision === "city" ? 2 : 3;
  if (lonDp > maxDp || latDp > maxDp) {
    fail(`${id}: zbyt dokładne współrzędne (${lon}, ${lat}) dla ${p.coord_precision} (max ${maxDp} dp)`);
  }

  const insideUa = inUkraine1991(lon, lat, ukraine);
  const crimea = inCrimea(lon, lat);
  if (insideUa && !(crimea && p.sovereignty_note === "occupied_ukraine")) {
    fail(
      `${id}: punkt (${lon}, ${lat}) w Ukrainie 1991 bez wyjątku Krymu/occupied_ukraine (settlement=${p.garrison_settlement})`
    );
  }
  if (crimea && p.sovereignty_note !== "occupied_ukraine") {
    fail(`${id}: punkt na Krymie wymaga sovereignty_note=occupied_ukraine`);
  }
  if (p.sovereignty_note === "occupied_ukraine" && !crimea) {
    warn(`${id}: occupied_ukraine poza bbox Krymu — sprawdź ręcznie`);
  }
}

for (const pid of parentIds) {
  if (!ids.has(pid)) fail(`parent_id nie istnieje: ${pid}`);
}

const dict = JSON.parse(readFileSync(join(ROOT, "data", "dictionaries.json"), "utf8"));
if (!dict.districts || !dict.branches) fail("dictionaries.json niekompletne");

if (warnings.length) {
  console.warn("Ostrzeżenia:\n" + warnings.map((w) => "  - " + w).join("\n"));
}
if (errors.length) {
  console.error(`WALIDACJA FAIL (${errors.length}):\n` + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}

console.log(`WALIDACJA OK — ${fc.features.length} rekordów, unikalne id, brak pinów w Ukrainie 1991 (poza Krymem).`);
