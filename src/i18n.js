export const LANGS = ["pl", "en", "de"];
export const SITE_URL = "https://ru.halaba.online/";
export const STORAGE_KEY = "atlas-lang";

export const SEO = {
  pl: {
    title: "Atlas garnizonów SZ FR — źródła otwarte | Ruskie",
    description:
      "Weryfikowalny atlas publicznie znanych garnizonów Sił Zbrojnych Federacji Rosyjskiej, zakładów zbrojeniowych i ośrodków BSP (centroid miasta) oraz nazwanych systemów WRE. To nie jest tracker pola walki.",
    keywords:
      "garnizony Rosja, Siły Zbrojne FR, OSINT, mapa Leaflet, WRE, BSP, Kołomna, Jelabuga, Krasucha, Murmańsk-BN, Uralwagonzawod, okręgi wojskowe",
  },
  en: {
    title: "Russian garrison gazetteer — open sources | Ruskie",
    description:
      "Verifiable atlas of publicly known Russian Armed Forces garrison towns, defense plants and UAV centres (city centroids) and named electronic-warfare systems. Not a battlefield tracker.",
    keywords:
      "Russian garrisons, open source intelligence, Leaflet map, electronic warfare, UAV, Kolomna, Yelabuga, Krasukha, Murmansk-BN, Uralvagonzavod, military districts",
  },
  de: {
    title: "Garnisonsatlas der Streitkräfte Russlands — offene Quellen | Ruskie",
    description:
      "Überprüfbarer Atlas öffentlich bekannter Garnisonsstädte der Streitkräfte der Russischen Föderation, Rüstungswerke und Drohnenzentren (Stadtcentroid) sowie benannter EloKa-Systeme. Kein Gefechtsfeld-Tracker.",
    keywords:
      "russische Garnisonen, OSINT, Leaflet-Karte, elektronische Kampfführung, Drohnen, Kolomna, Jelabuga, Krasucha, Murmansk-BN, Uralwagonsawod, Militärbezirke",
  },
};

export const I18N = {
  pl: {
    title: "Atlas garnizonów SZ FR",
    tagline: "Źródła otwarte · szczebel brygada / dywizja · bez teatru UA",
    search: "Szukaj",
    searchPh: "Nazwa, numer, miejscowość, w/cz, system WRE, BSP…",
    layers: "Warstwy",
    layer_ground: "Wojska Lądowe",
    layer_vdv: "WDW (VDV)",
    layer_naval: "Piechota morska / nadbrzeżne",
    layer_gru: "Spetsnaz GRU",
    layer_vks: "WKS",
    layer_rvsn: "WRPS",
    layer_ew: "Walka radioelektroniczna (WRE)",
    layer_uav: "Bezzałogowce (garnizon / zakład)",
    layer_industry: "Zakłady zbrojeniowe (miasto)",
    layer_extra: "Zagranica",
    layer_crimea: "Krym (okupowany)",
    layer_sketch: "Szkic / unverified",
    basemap_sat: "Podkład satelitarny (tło, zoom max. 12)",
    osintTitle: "Dokładność OSINT",
    osintLead:
      "Każdy pin ma klasę pewności i klasę precyzji. Współrzędne GPS to zaokrąglony centroid miejscowości z Nominatim, nie pomiar obiektu ze zdjęcia.",
    osintConf:
      "Pewność: wysoka (≥3 źródła lub instytucja), średnia (2), niska (1), szkic (trop, warstwa wyłączona).",
    osintGps:
      "GPS: city ≈ 1 km (2 miejsca dziesiętne); osiedle garnizonowe ≈ 100–1000 m (3 miejsca). Nie uśredniamy rozbieżnych garnizonów.",
    osintSat:
      "Zdjęcie satelitarne jest wyłącznie tłem mapy (max. powiększenie 12). Nie jest źródłem współrzędnych pinów.",
    osintUav:
      "BSP: miasto garnizonu ośrodka / zakładu. Miejsca startu, pasy i hangary nie są mapowane.",
    filters: "Filtry",
    district: "Okręg",
    echelon: "Szczebel",
    formation: "Status formowania",
    all: "Wszystkie",
    minConf: "Minimalna pewność",
    conf_medium: "Średnia i wyższa (domyślnie)",
    conf_high: "Tylko wysoka",
    conf_low: "Niska i wyższa",
    conf_unverified: "Pokaż także szkic",
    rfOnly: "Tylko garnizony RF",
    rfHint: "(ukrywa Krym, Abchazję, Osetię, Syrię i inne bazy zagraniczne)",
    export: "Eksport widoku (GeoJSON)",
    themeLight: "Tryb jasny",
    themeDark: "Tryb ciemny",
    hierarchy: "Hierarchia",
    glossary: "Systemy WRE (nazwy publiczne)",
    glossaryBtn: "Słownik WRE",
    glossaryLead:
      "Wyłącznie nazwy podawane w źródłach otwartych. Brak częstotliwości, stanowisk zagłuszaczy i śledzenia wozów.",
    mapAria: "Mapa garnizonów",
    panelAria: "Panel filtrów i hierarchii",
    close: "Zamknij",
    sidebar: "Panel",
    visible: "Widoczne: {n} z {total}",
    footer:
      "Źródła otwarte, stan na {date}. To nie jest tracker pola walki. Brak danych o teatrze ukraińskim. © OSM · Leaflet",
    loadError: "Błąd wczytywania danych: {msg}",
    short: "Skrót",
    garrison: "Garnizon",
    precision: "Precyzja",
    sovereignty: "Suwerenność",
    formationRow: "Formowanie",
    deployment: "Dyslokacja",
    vch: "w/cz",
    commander: "Dowódca",
    verified: "Weryfikacja",
    geocode: "Geokod",
    gps: "GPS (WGS84)",
    gpsHint: "Zaokrąglony centroid Nominatim. Nie pomiar płyty/hangaru ze zdjęcia satelitarnego.",
    accuracy: "Dokładność",
    sources: "Źródła",
    equipment: "Sprzęt / systemy (publiczne nazwy)",
    confidence: "Pewność",
    noCommander: "— (poniżej progu publikacji lub brak w źródłach instytucjonalnych)",
    asOf: "stan na",
    altGarrison: "Alt. garnizon (nie uśredniany)",
    lang: "Język",
    skip: "Przejdź do mapy",
    sov_recognized: "uznane granice FR",
    sov_occupied_ukraine: "okupowane terytorium Ukrainy (Krym)",
    sov_host_state_consent_disputed: "zgoda państwa przyjmującego sporna",
  },
  en: {
    title: "RF garrison gazetteer",
    tagline: "Open sources · brigade / division echelon · no UA theater",
    search: "Search",
    searchPh: "Name, number, town, unit number, EW system, UAV…",
    layers: "Layers",
    layer_ground: "Ground Forces",
    layer_vdv: "Airborne (VDV)",
    layer_naval: "Naval infantry / coastal",
    layer_gru: "GRU Spetsnaz",
    layer_vks: "Aerospace Forces",
    layer_rvsn: "Strategic Rocket Forces",
    layer_ew: "Electronic warfare",
    layer_uav: "Unmanned aviation (garrison / plant)",
    layer_industry: "Defense plants (city)",
    layer_extra: "Abroad",
    layer_crimea: "Crimea (occupied)",
    layer_sketch: "Sketch / unverified",
    basemap_sat: "Satellite backdrop (visual only, max zoom 12)",
    osintTitle: "OSINT accuracy",
    osintLead:
      "Every pin has a confidence class and a precision class. GPS is a rounded Nominatim settlement centroid, not an object measured from imagery.",
    osintConf:
      "Confidence: high (≥3 sources or an institution), medium (2), low (1), sketch (lead; layer off).",
    osintGps:
      "GPS: city ≈ 1 km (2 decimal places); garrison town ≈ 100–1000 m (3 places). Conflicting garrisons are never averaged.",
    osintSat:
      "Satellite imagery is a map backdrop only (max zoom 12). It is not a source of pin coordinates.",
    osintUav:
      "UAVs: home-garrison / plant town only. Launch pads, runways and hangars are not mapped.",
    filters: "Filters",
    district: "District",
    echelon: "Echelon",
    formation: "Formation status",
    all: "All",
    minConf: "Minimum confidence",
    conf_medium: "Medium and above (default)",
    conf_high: "High only",
    conf_low: "Low and above",
    conf_unverified: "Include sketch",
    rfOnly: "RF garrisons only",
    rfHint: "(hides Crimea, Abkhazia, South Ossetia, Syria and other foreign bases)",
    export: "Export view (GeoJSON)",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    hierarchy: "Hierarchy",
    glossary: "EW systems (public names)",
    glossaryBtn: "EW glossary",
    glossaryLead:
      "Names reported in open sources only. No frequencies, jammer sites, or vehicle tracking.",
    mapAria: "Garrison map",
    panelAria: "Filters and hierarchy",
    close: "Close",
    sidebar: "Panel",
    visible: "Visible: {n} of {total}",
    footer:
      "Open sources, as of {date}. Not a battlefield tracker. No Ukrainian theater data. © OSM · Leaflet",
    loadError: "Failed to load data: {msg}",
    short: "Short name",
    garrison: "Garrison",
    precision: "Precision",
    sovereignty: "Sovereignty",
    formationRow: "Formation",
    deployment: "Deployment",
    vch: "Unit no.",
    commander: "Commander",
    verified: "Last verified",
    geocode: "Geocode",
    gps: "GPS (WGS84)",
    gpsHint: "Rounded Nominatim centroid. Not a pad/hangar measurement from satellite imagery.",
    accuracy: "Accuracy",
    sources: "Sources",
    equipment: "Equipment / systems (public names)",
    confidence: "Confidence",
    noCommander: "— (below publication threshold or absent from institutional sources)",
    asOf: "as of",
    altGarrison: "Alt. garrison (not averaged)",
    lang: "Language",
    skip: "Skip to map",
    sov_recognized: "internationally recognized RF territory",
    sov_occupied_ukraine: "occupied Ukrainian territory (Crimea)",
    sov_host_state_consent_disputed: "host-state consent disputed",
  },
  de: {
    title: "Garnisonsatlas der RF-Streitkräfte",
    tagline: "Offene Quellen · Brigade / Division · kein UA-Theater",
    search: "Suche",
    searchPh: "Name, Nummer, Ort, Truppenteil, EloKa-System, Drohne…",
    layers: "Ebenen",
    layer_ground: "Landstreitkräfte",
    layer_vdv: "Luftlandetruppen (VDV)",
    layer_naval: "Marineinfanterie / Küste",
    layer_gru: "GRU-Spetsnaz",
    layer_vks: "Luft-Kosmos-Streitkräfte",
    layer_rvsn: "Strategische Raketentruppen",
    layer_ew: "Elektronische Kampfführung",
    layer_uav: "Unbemannte Luftfahrt (Garnison / Werk)",
    layer_industry: "Rüstungswerke (Stadt)",
    layer_extra: "Ausland",
    layer_crimea: "Krim (besetzt)",
    layer_sketch: "Skizze / unbestätigt",
    basemap_sat: "Satellitenhintergrund (nur Bild, Zoom max. 12)",
    osintTitle: "OSINT-Genauigkeit",
    osintLead:
      "Jeder Pin hat eine Sicherheits- und eine Präzisionsklasse. GPS ist ein gerundeter Nominatim-Siedlungscentroid, keine Objektmessung aus Bildern.",
    osintConf:
      "Sicherheit: hoch (≥3 Quellen oder Institution), mittel (2), niedrig (1), Skizze (Hinweis; Ebene aus).",
    osintGps:
      "GPS: Stadt ≈ 1 km (2 Dezimalstellen); Garnisonsiedlung ≈ 100–1000 m (3 Stellen). Abweichende Garnisonen werden nicht gemittelt.",
    osintSat:
      "Satellitenbilder sind nur Kartenhintergrund (Zoom höchstens 12). Sie sind keine Quelle für Pin-Koordinaten.",
    osintUav:
      "Drohnen: nur Stammgarnison / Werksstadt. Startplätze, Pisten und Hangars werden nicht kartiert.",
    filters: "Filter",
    district: "Militärbezirk",
    echelon: "Ebene",
    formation: "Formationsstatus",
    all: "Alle",
    minConf: "Mindestsicherheit",
    conf_medium: "Mittel und höher (Standard)",
    conf_high: "Nur hoch",
    conf_low: "Niedrig und höher",
    conf_unverified: "Skizze einbeziehen",
    rfOnly: "Nur RF-Garnisonen",
    rfHint: "(blendet Krim, Abchasien, Südossetien, Syrien und andere Auslandsstützpunkte aus)",
    export: "Ansicht exportieren (GeoJSON)",
    themeLight: "Heller Modus",
    themeDark: "Dunkler Modus",
    hierarchy: "Hierarchie",
    glossary: "EloKa-Systeme (öffentliche Namen)",
    glossaryBtn: "EloKa-Glossar",
    glossaryLead:
      "Nur in offenen Quellen genannte Namen. Keine Frequenzen, Störsenderstandorte oder Fahrzeugverfolgung.",
    mapAria: "Garnisonskarte",
    panelAria: "Filter und Hierarchie",
    close: "Schließen",
    sidebar: "Leiste",
    visible: "Sichtbar: {n} von {total}",
    footer:
      "Offene Quellen, Stand {date}. Kein Gefechtsfeld-Tracker. Keine Daten zum ukrainischen Theater. © OSM · Leaflet",
    loadError: "Daten konnten nicht geladen werden: {msg}",
    short: "Kurzname",
    garrison: "Garnison",
    precision: "Genauigkeit",
    sovereignty: "Souveränität",
    formationRow: "Formation",
    deployment: "Dislozierung",
    vch: "Truppenteil",
    commander: "Kommandeur",
    verified: "Geprüft",
    geocode: "Geokodierung",
    gps: "GPS (WGS84)",
    gpsHint: "Gerundeter Nominatim-Centroid. Keine Platten-/Hangarmessung aus Satellitenbildern.",
    accuracy: "Genauigkeit",
    sources: "Quellen",
    equipment: "Gerät / Systeme (öffentliche Namen)",
    confidence: "Sicherheit",
    noCommander: "— (unter der Veröffentlichungsschwelle oder nicht in institutionellen Quellen)",
    asOf: "Stand",
    altGarrison: "Alt. Garnison (nicht gemittelt)",
    lang: "Sprache",
    skip: "Zur Karte springen",
    sov_recognized: "international anerkanntes RF-Gebiet",
    sov_occupied_ukraine: "besetztes ukrainisches Gebiet (Krim)",
    sov_host_state_consent_disputed: "Zustimmung des Aufnahmestaats strittig",
  },
};

export function detectLang() {
  const params = new URLSearchParams(location.search);
  const q = (params.get("lang") || "").toLowerCase();
  if (LANGS.includes(q)) return q;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  return "pl";
}

export function t(lang, key, vars = {}) {
  const table = I18N[lang] || I18N.pl;
  let s = table[key] ?? I18N.pl[key] ?? key;
  for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

export function localizedName(obj, lang, fallback = "") {
  if (!obj) return fallback;
  return obj[`name_${lang}`] || obj.name_en || obj.name_pl || obj.name_ru || fallback;
}

export function dictLabel(entry, lang) {
  if (entry == null) return "";
  if (typeof entry === "string") return entry;
  return localizedName(entry, lang, "");
}

export function applyStaticI18n(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(lang, el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(lang, el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(lang, el.dataset.i18nAria));
  });
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const on = el.dataset.lang === lang;
    el.setAttribute("aria-current", on ? "page" : "false");
    el.classList.toggle("is-active", on);
  });
}

export function updateSeo(lang) {
  const seo = SEO[lang] || SEO.pl;
  const url = lang === "pl" ? SITE_URL : `${SITE_URL}?lang=${lang}`;
  document.title = seo.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", seo.description);
  const keys = document.querySelector('meta[name="keywords"]');
  if (keys) keys.setAttribute("content", seo.keywords);
  const canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.setAttribute("href", url);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", seo.title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", seo.description);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", url);
  const ogLoc = document.querySelector('meta[property="og:locale"]');
  const locales = { pl: "pl_PL", en: "en_US", de: "de_DE" };
  if (ogLoc) ogLoc.setAttribute("content", locales[lang] || "pl_PL");
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute("content", seo.title);
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute("content", seo.description);
  const ld = document.getElementById("jsonld");
  if (ld) {
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Dataset",
          name: seo.title,
          description: seo.description,
          url: SITE_URL,
          inLanguage: LANGS,
          isAccessibleForFree: true,
          license: "https://opensource.org/licenses/MIT",
          keywords: seo.keywords,
          spatialCoverage: "Russian Federation",
          creator: { "@type": "Organization", name: "Ruskie open gazetteer" },
        },
        {
          "@type": "WebApplication",
          name: seo.title,
          url,
          applicationCategory: "ReferenceApplication",
          operatingSystem: "Any",
          inLanguage: lang,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      ],
    };
    ld.textContent = JSON.stringify(data);
  }
}

export function persistLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  const url = new URL(location.href);
  if (lang === "pl") url.searchParams.delete("lang");
  else url.searchParams.set("lang", lang);
  history.replaceState({}, "", url);
}
