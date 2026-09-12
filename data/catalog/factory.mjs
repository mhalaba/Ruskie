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

/** Deterministic German label from the English unit name (catalog fallback). */
export function nameDeFromEn(en) {
  if (!en) return "";
  let s = en;
  const pairs = [
    ["Leningrad Military District", "Leningrader Militärbezirk"],
    ["Moscow Military District", "Moskauer Militärbezirk"],
    ["Southern Military District", "Südlicher Militärbezirk"],
    ["Central Military District", "Zentraler Militärbezirk"],
    ["Eastern Military District", "Östlicher Militärbezirk"],
    ["Russian Aerospace Forces", "Russische Luft-Kosmos-Streitkräfte"],
    ["Russian Airborne Forces", "Russische Luftlandetruppen"],
    ["Strategic Rocket Forces", "Strategische Raketentruppen"],
    ["GRU Spetsnaz (brigades)", "GRU-Spetsnaz (Brigaden)"],
    ["Russian naval facility in Tartus", "Russische Marineeinrichtung in Tartus"],
    ["Russian aviation presence at Baranovichi", "Russische Luftpräsenz in Baranawitschy"],
    ["Operational Group of Russian Forces", "Operative Gruppe der Streitkräfte Russlands"],
    ["Guards Combined Arms Army", "Gardes-Armee (kombinierte Waffen)"],
    ["Combined Arms Army", "Kombinierte-Waffen-Armee"],
    ["Guards Tank Army", "Gardes-Panzerarmee"],
    ["Guards Rocket Army", "Gardes-Raketenarmee"],
    ["Rocket Army", "Raketenarmee"],
    ["Air and Air Defence Forces Army", "Luft- und Luftverteidigungsarmee"],
    ["Guards Tamanskaya Motor Rifle Division", "Gardes-Mot.-Schützen-Division Tamanskaja"],
    ["Guards Kantemirovskaya Tank Division", "Gardes-Panzerdivision Kantemirowskaja"],
    ["Guards Mountain Air Assault Division", "Gardes-Gebirgs-Luftsturmdivision"],
    ["Guards Air Assault Division", "Gardes-Luftsturmdivision"],
    ["Guards Airborne Division", "Gardes-Luftlandedivision"],
    ["Separate Guards Motor Rifle Brigade", "selbstständige Gardes-Mot.-Schützen-Brigade"],
    ["Guards Motor Rifle Brigade", "Gardes-Mot.-Schützen-Brigade"],
    ["Separate Motor Rifle Brigade", "selbstständige Mot.-Schützen-Brigade"],
    ["Separate Mountain Motor Rifle Brigade", "selbstständige Gebirgs-Mot.-Schützen-Brigade"],
    ["Mountain Motor Rifle Brigade", "Gebirgs-Mot.-Schützen-Brigade"],
    ["Arctic Motor Rifle Brigade", "arktische Mot.-Schützen-Brigade"],
    ["Guards Motor Rifle Division", "Gardes-Mot.-Schützen-Division"],
    ["Motor Rifle Division", "Mot.-Schützen-Division"],
    ["Guards Motor Rifle Regiment", "Gardes-Mot.-Schützen-Regiment"],
    ["Separate Motor Rifle Regiment", "selbstständiges Mot.-Schützen-Regiment"],
    ["Motor Rifle Regiment", "Mot.-Schützen-Regiment"],
    ["Motor Rifle Brigade", "Mot.-Schützen-Brigade"],
    ["Guards Tank Division", "Gardes-Panzerdivision"],
    ["Tank Division", "Panzerdivision"],
    ["Separate Guards Tank Brigade", "selbstständige Gardes-Panzerbrigade"],
    ["Tank Brigade", "Panzerbrigade"],
    ["Separate Tank Regiment", "selbstständiges Panzerregiment"],
    ["Tank Regiment", "Panzerregiment"],
    ["Guards Air Assault Brigade", "Gardes-Luftsturmbrigade"],
    ["Air Assault Brigade", "Luftsturmbrigade"],
    ["Guards Naval Infantry Brigade", "Gardes-Marineinfanterie-Brigade"],
    ["Naval Infantry Brigade", "Marineinfanterie-Brigade"],
    ["Naval Infantry Regiment", "Marineinfanterie-Regiment"],
    ["Coastal Missile Brigade", "Küstenraketenbrigade"],
    ["Coastal Rocket Brigade", "Küstenraketenbrigade"],
    ["Machine Gun Artillery Division", "MG-Artillerie-Division"],
    ["Guards Artillery Brigade", "Gardes-Artilleriebrigade"],
    ["Heavy Artillery Brigade", "schwere Artilleriebrigade"],
    ["Artillery Brigade", "Artilleriebrigade"],
    ["Guards Missile Brigade", "Gardes-Raketenbrigade"],
    ["Missile Brigade", "Raketenbrigade"],
    ["Guards Rocket Brigade", "Gardes-Raketenbrigade"],
    ["Rocket Brigade", "Raketenbrigade"],
    ["Guards Anti-Aircraft Rocket Brigade", "Gardes-Flugabwehrraketenbrigade"],
    ["Anti-Aircraft Missile Brigade", "Flugabwehrraketenbrigade"],
    ["Anti-Aircraft Rocket Brigade", "Flugabwehrraketenbrigade"],
    ["Guards Communications Brigade", "Gardes-Nachrichtenbrigade"],
    ["Communications Brigade", "Nachrichtenbrigade"],
    ["Command Brigade", "Führungsbrigade"],
    ["Signals Brigade", "Nachrichtenbrigade"],
    ["Logistics Brigade", "Logistikbrigade"],
    ["Guards Spetsnaz Brigade", "Gardes-Spetsnaz-Brigade"],
    ["Spetsnaz Brigade (VDV)", "Spetsnaz-Brigade (VDV)"],
    ["Spetsnaz Brigade", "Spetsnaz-Brigade"],
    ["Guards Rocket Division", "Gardes-Raketendivision"],
    ["Rocket Division", "Raketendivision"],
    ["Army Corps", "Armeekorps"],
    ["Guards Military Base", "Gardes-Militärstützpunkt"],
    ["Military Base", "Militärstützpunkt"],
    ["air base", "Luftwaffenstützpunkt"],
    ["Air Base", "Luftwaffenstützpunkt"],
    ["Electronic Warfare Brigade", "Elektronische-Kampfführung-Brigade"],
    ["Electronic Warfare Troops", "Truppen der elektronischen Kampfführung"],
    ["Electronic Warfare Centre", "Zentrum für elektronische Kampfführung"],
    ["Electronic Warfare Battalion", "Bataillon der elektronischen Kampfführung"],
    ["Electronic Warfare", "elektronische Kampfführung"],
  ];
  for (const [from, to] of pairs) s = s.split(from).join(to);
  return s;
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
  const name_en = partial.name_en ?? "";

  return {
    id: partial.id,
    name_pl: partial.name_pl,
    name_ru: partial.name_ru ?? "",
    name_en,
    name_de: partial.name_de ?? nameDeFromEn(name_en),
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
    notes_en: partial.notes_en ?? "",
    notes_de: partial.notes_de ?? "",
    sources,
    geocode_query: partial.geocode_query,
    alt_garrison: partial.alt_garrison ?? null,
    extra_layer: partial.extra_layer ?? null,
  };
}

export { ACCESS };
