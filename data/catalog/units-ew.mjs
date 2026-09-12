import { u } from "./factory.mjs";

const EW_NOTES = {
  no_freq_pl:
    "Tylko publiczna nazwa systemu i miasto garnizonu. Brak częstotliwości, stanowisk zagłuszaczy i śledzenia wozów.",
  no_freq_en:
    "Public system name and garrison town only. No frequencies, jammer sites, or vehicle tracking.",
  no_freq_de:
    "Nur öffentlicher Systemname und Garnisonsstadt. Keine Frequenzen, Störsenderstandorte oder Fahrzeugverfolgung.",
};

export const EW = [
  u({
    id: "ru-ew",
    name_pl: "Wojska walki radioelektronicznej (dowództwo)",
    name_ru: "Войска радиоэлектронной борьбы",
    name_en: "Electronic Warfare Troops of the Russian Federation",
    name_de: "Truppen der elektronischen Kampfführung der Russischen Föderation",
    short: "WRE",
    branch: "ew",
    service_component: "EW",
    district: "central_subordination",
    parent_id: null,
    echelon: "district",
    garrison_settlement: "Moscow",
    garrison_region: "Moscow",
    coord_precision: "city",
    confidence: "medium",
    notes_pl:
      "Dyrekcja szefa wojsk WRE przy SG. Pin: centroid Moskwy, nie budynek. " + EW_NOTES.no_freq_pl,
    notes_en:
      "Directorate of the Chief of EW Troops at the General Staff. Pin: Moscow city centroid, not a building. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "Direktion des Chefs der EloKa-Truppen beim Generalstab. Pin: Stadtcentroid Moskau, kein Gebäude. " +
      EW_NOTES.no_freq_de,
    source_keys: ["wiki_ew_troops", "wiki_ew_troops_ru", "jamestown_ew_2019"],
    geocode_query: "Moscow, Russia",
  }),
  u({
    id: "ru-ew-15bde",
    name_pl: "15. Samodzielna Brygada WRE (Naczelne Dowództwo)",
    name_ru: "15-я отдельная бригада радиоэлектронной борьбы",
    name_en: "15th Independent Electronic Warfare Brigade",
    name_de: "15. selbstständige Elektronische-Kampfführung-Brigade",
    short: "15 BWre",
    branch: "ew",
    service_component: "EW",
    district: "MMD",
    parent_id: "ru-ew",
    echelon: "brigade",
    unit_number_vch: "71615",
    garrison_settlement: "Tambov",
    garrison_region: "Tambov Oblast",
    coord_precision: "city",
    equipment_public: ["Murmansk-BN", "Leer-3"],
    confidence: "high",
    notes_pl:
      "Sformowana 2009 w Nowomoskowsku (obw. tulski), następnie Tambow / osiedle Stroitel. Publiczne wzmianki o Murmansk-BN i Leer-3. Pin: centroid Tambowa, nie koszary. " +
      EW_NOTES.no_freq_pl,
    notes_en:
      "Formed 2009 in Novomoskovsk (Tula Oblast), later Tambov / settlement Stroitel. Public mentions of Murmansk-BN and Leer-3. Pin: Tambov city centroid, not barracks. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "2009 in Nowomoskowsk (Oblast Tula) aufgestellt, später Tambow / Siedlung Stroitel. Öffentliche Nennungen von Murmansk-BN und Leer-3. Pin: Stadtcentroid Tambow. " +
      EW_NOTES.no_freq_de,
    source_keys: ["jamestown_ew_2019", "russiandefpolicy_15ew", "voinskayachast_71615", "wiki_ew_troops"],
    geocode_query: "Tambov, Russia",
  }),
  u({
    id: "ru-ew-16bde",
    name_pl: "16. Samodzielna Brygada WRE",
    name_ru: "16-я отдельная бригада радиоэлектронной борьбы",
    name_en: "16th Independent Electronic Warfare Brigade",
    name_de: "16. selbstständige Elektronische-Kampfführung-Brigade",
    short: "16 BWre",
    branch: "ew",
    service_component: "EW",
    district: "MMD",
    parent_id: "ru-ew",
    echelon: "brigade",
    garrison_settlement: "Kursk",
    garrison_region: "Kursk Oblast",
    coord_precision: "city",
    equipment_public: ["Murmansk-BN?"],
    confidence: "medium",
    notes_pl:
      "Kursk po reformie 2024 w Moskiewskim OW. GlobalSecurity i opracowania otwarte podają Kursk; numery w/cz w starszych zestawieniach bywają sprzeczne z 15. BWre — nie użyto sprzecznego numeru. " +
      EW_NOTES.no_freq_pl,
    notes_en:
      "Kursk is in the Moscow MD after the 2024 reform. GlobalSecurity and open assessments list Kursk; older unit-number tables conflict with the 15th EW brigade, so no v/ch number is stored. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "Kursk liegt nach der Reform 2024 im Moskauer Militärbezirk. GlobalSecurity und offene Bewertungen nennen Kursk; widersprüchliche Truppenteile-Nummern wurden nicht übernommen. " +
      EW_NOTES.no_freq_de,
    source_keys: ["globalsec_garrisons", "armada_ew_2022", "planesandstuff_murmansk"],
    geocode_query: "Kursk, Russia",
  }),
  u({
    id: "ru-ew-17bde",
    name_pl: "17. Samodzielna Gwardyjska Brygada WRE",
    name_ru: "17-я отдельная гвардейская бригада радиоэлектронной борьбы",
    name_en: "17th Separate Guards Electronic Warfare Brigade",
    name_de: "17. selbstständige Gardes-Elektronische-Kampfführung-Brigade",
    short: "17 BWre",
    branch: "ew",
    service_component: "EW",
    district: "EMD",
    parent_id: "ru-ew",
    echelon: "brigade",
    garrison_settlement: "Khabarovsk",
    garrison_region: "Khabarovsk Krai",
    coord_precision: "city",
    equipment_public: ["Krasukha-S4", "Murmansk-BN", "Moskva-1?", "Leer-3"],
    confidence: "high",
    notes_pl:
      "Lista Wschodniego OW (Wikipedia) i artykuły o brygadzie: Chabarowsk / wcześniej Matwiejewka. Pin: centroid Chabarowska. " +
      EW_NOTES.no_freq_pl,
    notes_en:
      "Eastern MD Wikipedia list and brigade articles: Khabarovsk / previously Matveevka. Pin: Khabarovsk city centroid. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "Wikipedia-Liste des Östlichen Militärbezirks: Chabarowsk / zuvor Matwejewka. Pin: Stadtcentroid Chabarowsk. " +
      EW_NOTES.no_freq_de,
    alt_garrison: {
      settlement: "Matveevka",
      region: "Khabarovsk Krai",
      note: "Starsza dyslokacja do ok. 2012 (źródła o historii brygady).",
    },
    source_keys: ["wiki_emd", "ruwiki_17ew", "armada_ew_2022"],
    geocode_query: "Khabarovsk, Russia",
  }),
  u({
    id: "ru-ew-18bde",
    name_pl: "18. Samodzielna Brygada WRE",
    name_ru: "18-я отдельная бригада радиоэлектронной борьбы",
    name_en: "18th Independent Electronic Warfare Brigade",
    name_de: "18. selbstständige Elektronische-Kampfführung-Brigade",
    short: "18 BWre",
    branch: "ew",
    service_component: "EW",
    district: "CMD",
    parent_id: "ru-ew",
    echelon: "brigade",
    garrison_settlement: "Yekaterinburg",
    garrison_region: "Sverdlovsk Oblast",
    coord_precision: "city",
    equipment_public: ["Murmansk-BN?"],
    confidence: "medium",
    notes_pl:
      "Centralny OW. Armada i komentarz satelitarny (miasto, nie pole antenowe). Nie mapowano masztów. " +
      EW_NOTES.no_freq_pl,
    notes_en:
      "Central MD. Armada and open satellite commentary (city only, not antenna fields). Masts were not mapped. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "Zentraler Militärbezirk. Armada und offene Satellitenkommentare (nur Stadt, keine Antennenfelder). " +
      EW_NOTES.no_freq_de,
    source_keys: ["armada_ew_2022", "planesandstuff_murmansk", "wiki_cmd"],
    geocode_query: "Yekaterinburg, Russia",
  }),
  u({
    id: "ru-ew-19bde",
    name_pl: "19. Samodzielna Brygada WRE",
    name_ru: "19-я отдельная бригада радиоэлектронной борьбы",
    name_en: "19th Independent Electronic Warfare Brigade",
    name_de: "19. selbstständige Elektronische-Kampfführung-Brigade",
    short: "19 BWre",
    branch: "ew",
    service_component: "EW",
    district: "SMD",
    parent_id: "ru-ew",
    echelon: "brigade",
    unit_number_vch: "62829",
    garrison_settlement: "Rassvet",
    garrison_region: "Rostov Oblast",
    coord_precision: "garrison_town",
    equipment_public: ["Murmansk-BN?"],
    confidence: "high",
    notes_pl:
      "Wikipedia RU: osiedle Rasswiet, obw. rostowski (w/cz 62829). Jamestown: Rassvet, Południowy OW, sformowanie do XII 2015. GlobalSecurity podaje Rostów — alt., nie uśredniane. " +
      EW_NOTES.no_freq_pl,
    notes_en:
      "Russian Wikipedia: settlement Rassvet, Rostov Oblast (v/ch 62829). Jamestown: Rassvet, Southern MD, formed by Dec 2015. GlobalSecurity lists Rostov-on-Don as an alternative, not averaged. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "Russische Wikipedia: Siedlung Rasswet, Oblast Rostow (v/ch 62829). Jamestown: Rasswet, Südlicher Militärbezirk. GlobalSecurity nennt Rostow am Don als Alternative, nicht gemittelt. " +
      EW_NOTES.no_freq_de,
    alt_garrison: {
      settlement: "Rostov-on-Don",
      region: "Rostov Oblast",
      note: "GlobalSecurity (starsze zestawienie); Wikipedia i Jamestown: Rasswiet.",
    },
    source_keys: ["wiki_19ew_ru", "jamestown_ew_2019", "armada_ew_2022"],
    geocode_query: "Rassvet, Aksaysky District, Rostov Oblast, Russia",
  }),
  u({
    id: "ru-ew-49bn",
    name_pl: "49. Batalion WRE",
    name_ru: "49-й отдельный батальон радиоэлектронной борьбы",
    name_en: "49th Electronic Warfare Battalion",
    name_de: "49. Bataillon der elektronischen Kampfführung",
    short: "49 bat. WRE",
    branch: "ew",
    service_component: "EW",
    district: "LMD",
    parent_id: "ru-ew",
    echelon: "other",
    unit_number_vch: "54916",
    garrison_settlement: "Ostrov",
    garrison_region: "Pskov Oblast",
    coord_precision: "city",
    confidence: "medium",
    notes_pl:
      "Jamestown i Armada: batalion (nie brygada) w Ostrowie, obw. pskowski. Szczebel batalionu mapowany tylko dlatego, że garnizon miasta jest publiczny. " +
      EW_NOTES.no_freq_pl,
    notes_en:
      "Jamestown and Armada: a battalion (not a brigade) in Ostrov, Pskov Oblast. Battalion echelon is mapped only because the town garrison is public. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "Jamestown und Armada: Bataillon (keine Brigade) in Ostrow, Oblast Pskow. Nur gemappt, weil die Stadtgarnison öffentlich ist. " +
      EW_NOTES.no_freq_de,
    source_keys: ["jamestown_ew_2019", "armada_ew_2022"],
    geocode_query: "Ostrov, Pskov Oblast, Russia",
  }),
  u({
    id: "ru-ew-142bn",
    name_pl: "142. Batalion WRE",
    name_ru: "142-й отдельный батальон радиоэлектронной борьбы",
    name_en: "142nd Electronic Warfare Battalion",
    name_de: "142. Bataillon der elektronischen Kampfführung",
    short: "142 bat. WRE",
    branch: "ew",
    service_component: "EW",
    district: "LMD",
    parent_id: "ru-ew",
    echelon: "other",
    unit_number_vch: "03047",
    garrison_settlement: "Kaliningrad",
    garrison_region: "Kaliningrad Oblast",
    coord_precision: "city",
    confidence: "low",
    notes_pl:
      "Jedno opracowanie Jamestown (w/cz 03047, Kaliningrad). Pewność niska. Pin: centroid miasta. " +
      EW_NOTES.no_freq_pl,
    notes_en:
      "Single Jamestown mention (v/ch 03047, Kaliningrad). Low confidence. Pin: city centroid. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "Einzelne Jamestown-Nennung (v/ch 03047, Kaliningrad). Niedrige Sicherheit. Pin: Stadtcentroid. " +
      EW_NOTES.no_freq_de,
    source_keys: ["jamestown_ew_2019"],
    geocode_query: "Kaliningrad, Russia",
  }),
  u({
    id: "ru-ew-186ctr",
    name_pl: "186. Samodzielny Ośrodek WRE Floty Północnej",
    name_ru: "186-й отдельный центр радиоэлектронной борьбы",
    name_en: "186th Independent Electronic Warfare Centre (Northern Fleet)",
    name_de: "186. selbstständiges EloKa-Zentrum (Nordflotte)",
    short: "186 OC WRE",
    branch: "ew",
    service_component: "EW",
    district: "fleet_northern",
    parent_id: "ru-ew",
    echelon: "base",
    garrison_settlement: "Severomorsk",
    garrison_region: "Murmansk Oblast",
    coord_precision: "city",
    equipment_public: ["Murmansk-BN?"],
    confidence: "medium",
    notes_pl: "Ośrodek floty, centroid Siewieromorska. " + EW_NOTES.no_freq_pl,
    notes_en: "Fleet EW centre, Severomorsk city centroid. " + EW_NOTES.no_freq_en,
    notes_de: "Flotten-EloKa-Zentrum, Stadtcentroid Seweromorsk. " + EW_NOTES.no_freq_de,
    source_keys: ["planesandstuff_murmansk", "wiki_ew_troops"],
    geocode_query: "Severomorsk, Russia",
  }),
  u({
    id: "ru-ew-471ctr",
    name_pl: "471. Samodzielny Ośrodek WRE Floty Pacyfiku",
    name_ru: "471-й отдельный центр радиоэлектронной борьбы",
    name_en: "471st Independent Electronic Warfare Centre (Pacific Fleet)",
    name_de: "471. selbstständiges EloKa-Zentrum (Pazifikflotte)",
    short: "471 OC WRE",
    branch: "ew",
    service_component: "EW",
    district: "fleet_pacific",
    parent_id: "ru-ew",
    echelon: "base",
    garrison_settlement: "Petropavlovsk-Kamchatsky",
    garrison_region: "Kamchatka Krai",
    coord_precision: "city",
    equipment_public: ["Murmansk-BN?"],
    confidence: "low",
    notes_pl: "Komentarz otwarty (miasto). " + EW_NOTES.no_freq_pl,
    notes_en: "Open commentary (city only). " + EW_NOTES.no_freq_en,
    notes_de: "Offener Kommentar (nur Stadt). " + EW_NOTES.no_freq_de,
    source_keys: ["planesandstuff_murmansk"],
    geocode_query: "Petropavlovsk-Kamchatsky, Russia",
  }),
  u({
    id: "ru-ew-474ctr",
    name_pl: "474. Samodzielny Ośrodek WRE Floty Pacyfiku",
    name_ru: "474-й отдельный центр радиоэлектронной борьбы",
    name_en: "474th Independent Electronic Warfare Centre (Pacific Fleet)",
    name_de: "474. selbstständiges EloKa-Zentrum (Pazifikflotte)",
    short: "474 OC WRE",
    branch: "ew",
    service_component: "EW",
    district: "fleet_pacific",
    parent_id: "ru-ew",
    echelon: "base",
    garrison_settlement: "Shtykovo",
    garrison_region: "Primorsky Krai",
    coord_precision: "garrison_town",
    equipment_public: ["Murmansk-BN?"],
    confidence: "low",
    notes_pl: "Szytkowo koło Władywostoku — centroid miejscowości. " + EW_NOTES.no_freq_pl,
    notes_en: "Shtykovo near Vladivostok — settlement centroid. " + EW_NOTES.no_freq_en,
    notes_de: "Schtykowo bei Wladiwostok — Siedlungscentroid. " + EW_NOTES.no_freq_de,
    source_keys: ["planesandstuff_murmansk"],
    geocode_query: "Shtykovo, Primorsky Krai, Russia",
  }),
  u({
    id: "ru-ew-475ctr",
    name_pl: "475. Samodzielny Ośrodek WRE Floty Czarnomorskiej",
    name_ru: "475-й отдельный центр радиоэлектронной борьбы",
    name_en: "475th Independent Electronic Warfare Centre (Black Sea Fleet)",
    name_de: "475. selbstständiges EloKa-Zentrum (Schwarzmeerflotte)",
    short: "475 OC WRE",
    branch: "ew",
    service_component: "EW",
    district: "fleet_black_sea",
    parent_id: "ru-ew",
    echelon: "base",
    garrison_settlement: "Sevastopol",
    garrison_region: "Crimea (occupied)",
    country: "UA",
    sovereignty_note: "occupied_ukraine",
    extra_layer: "crimea",
    coord_precision: "city",
    equipment_public: ["Murmansk-BN?"],
    confidence: "medium",
    notes_pl:
      "Krym okupowany — warstwa wyłączona domyślnie. Jamestown wspomina ośrodek WRE Floty Czarnomorskiej na Krymie. " +
      EW_NOTES.no_freq_pl,
    notes_en:
      "Occupied Crimea — layer off by default. Jamestown mentions a Black Sea Fleet EW centre in Crimea. " +
      EW_NOTES.no_freq_en,
    notes_de:
      "Besetzte Krim — Ebene standardmäßig aus. Jamestown erwähnt ein EloKa-Zentrum der Schwarzmeerflotte auf der Krim. " +
      EW_NOTES.no_freq_de,
    source_keys: ["jamestown_ew_2019", "planesandstuff_murmansk", "armada_ew_2022"],
    geocode_query: "Sevastopol",
  }),
  u({
    id: "ru-ew-841ctr",
    name_pl: "841. Samodzielny Ośrodek WRE Floty Bałtyckiej",
    name_ru: "841-й отдельный центр радиоэлектронной борьбы",
    name_en: "841st Independent Electronic Warfare Centre (Baltic Fleet)",
    name_de: "841. selbstständiges EloKa-Zentrum (Baltische Flotte)",
    short: "841 OC WRE",
    branch: "ew",
    service_component: "EW",
    district: "fleet_baltic",
    parent_id: "ru-ew",
    echelon: "base",
    garrison_settlement: "Yantarny",
    garrison_region: "Kaliningrad Oblast",
    coord_precision: "city",
    equipment_public: ["Murmansk-BN?"],
    confidence: "low",
    notes_pl: "Jantarnyj, obw. kaliningradzki. " + EW_NOTES.no_freq_pl,
    notes_en: "Yantarny, Kaliningrad Oblast. " + EW_NOTES.no_freq_en,
    notes_de: "Jantarny, Oblast Kaliningrad. " + EW_NOTES.no_freq_de,
    source_keys: ["planesandstuff_murmansk"],
    geocode_query: "Yantarny, Kaliningrad Oblast, Russia",
  }),
];
