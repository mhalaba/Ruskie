import { SOURCES } from "./sources.mjs";

const ACCESS = "2026-09-12";

export function srcList(ids) {
  return ids.map((key) => {
    const s = SOURCES[key];
    if (!s) throw new Error(`Unknown source key: ${key}`);
    return { ...s };
  });
}

export function commander(name, rank, asOf, sourceKeys) {
  return {
    name,
    rank,
    as_of: asOf,
    source_ids: sourceKeys.map((k) => SOURCES[k].id),
  };
}

/**
 * Rekord katalogowy (bez geometrii). Współrzędne uzupełnia geokoder miejscowości.
 */
export function u(partial) {
  const source_ids = partial.source_keys;
  if (!source_ids?.length) {
    throw new Error(`Unit ${partial.id} has no source_keys`);
  }
  const sources = srcList(source_ids);
  const confidence = partial.confidence;
  if (!confidence) throw new Error(`Unit ${partial.id} missing confidence`);

  return {
    id: partial.id,
    name_pl: partial.name_pl,
    name_ru: partial.name_ru ?? "",
    name_en: partial.name_en ?? "",
    short: partial.short,
    branch: partial.branch,
    service_component: partial.service_component,
    district: partial.district,
    parent_id: partial.parent_id ?? null,
    echelon: partial.echelon,
    unit_number_vch: partial.unit_number_vch ?? null,
    garrison_settlement: partial.garrison_settlement,
    garrison_region: partial.garrison_region,
    country: partial.country ?? "RU",
    sovereignty_note: partial.sovereignty_note ?? "recognized",
    coord_precision: partial.coord_precision ?? "city",
    deployment_status: partial.deployment_status ?? "garrison",
    formation_status: partial.formation_status ?? "active",
    equipment_public: partial.equipment_public ?? [],
    commander_public: partial.commander_public ?? {
      name: null,
      rank: null,
      as_of: null,
      source_ids: [],
    },
    confidence,
    last_verified: partial.last_verified ?? ACCESS,
    notes_pl: partial.notes_pl ?? "",
    sources,
    geocode_query: partial.geocode_query,
    alt_garrison: partial.alt_garrison ?? null,
    extra_layer: partial.extra_layer ?? null,
  };
}
