import { u } from "./factory.mjs";

const UAV_NOTES = {
  pl:
    "Pin: centroid miasta garnizonu / siedziby (Nominatim). Nie mapowano pasów, hangarów, katapult, stanowisk startowych Shahed/Geran ani GPS z satelity obiektów.",
  en:
    "Pin: city centroid of the home garrison / plant town (Nominatim). Runways, hangars, catapults, Shahed/Geran launch pads and satellite-measured object GPS were not mapped.",
  de:
    "Pin: Stadtcentroid der Stammgarnison / Werksstadt (Nominatim). Pisten, Hangars, Katapulte, Shahed/Geran-Startplätze und satellitengemessene Objekt-GPS wurden nicht kartiert.",
};

function uavPlant(p) {
  const { notes_pl = "", notes_en = "", notes_de = "", ...rest } = p;
  return u({
    branch: "uav",
    service_component: "OPK",
    echelon: "plant",
    coord_precision: "city",
    deployment_status: "garrison",
    formation_status: "active",
    parent_id: "ru-uav",
    ...rest,
    notes_pl: (notes_pl ? notes_pl + " " : "") + UAV_NOTES.pl,
    notes_en: (notes_en ? notes_en + " " : "") + UAV_NOTES.en,
    notes_de: (notes_de ? notes_de + " " : "") + UAV_NOTES.de,
  });
}

export const UAV = [
  u({
    id: "ru-uav",
    name_pl: "Lotnictwo bezzałogowe (ośrodki i zakłady publicznie znane)",
    name_ru: "Беспилотная авиация (известные центры и предприятия)",
    name_en: "Unmanned aviation (publicly known centres and plants)",
    name_de: "Unbemannte Luftfahrt (öffentlich bekannte Zentren und Werke)",
    short: "BSP",
    branch: "uav",
    service_component: "UAV",
    district: "central_subordination",
    parent_id: null,
    echelon: "district",
    garrison_settlement: "Moscow",
    garrison_region: "Moscow",
    coord_precision: "city",
    confidence: "medium",
    notes_pl:
      "Warstwa encyklopedyczna: macierzyste miasto ośrodka szkoleniowego MoD oraz miast zakładów wymienionych w Wikipedii / OFAC. " +
      "To nie jest mapa miejsc startu. Pin: centroid Moskwy (nie budynek SG). " +
      UAV_NOTES.pl,
    notes_en:
      "Encyclopedic layer: MoD training-centre home town and publicly named plant towns (Wikipedia / OFAC). " +
      "Not a launch-site map. Pin: Moscow city centroid, not a General Staff building. " +
      UAV_NOTES.en,
    notes_de:
      "Enzyklopädische Ebene: Stammstadt des MoD-Ausbildungszentrums und öffentlich genannte Werksstädte (Wikipedia / OFAC). " +
      "Keine Startplatzkarte. Pin: Stadtcentroid Moskau, kein Generalstabsgebäude. " +
      UAV_NOTES.de,
    source_keys: ["ofac_924uav", "opensanctions_924uav", "wiki_orlan10"],
    geocode_query: "Moscow, Russia",
  }),
  u({
    id: "ru-uav-924",
    name_pl: "924. Państwowe Centrum Lotnictwa Bezzałogowego",
    name_ru: "924-й государственный центр беспилотной авиации",
    name_en: "924th State Center for Unmanned Aviation",
    name_de: "924. Staatliches Zentrum für unbemannte Luftfahrt",
    short: "924 GTsBA",
    branch: "uav",
    service_component: "UAV",
    district: "MMD",
    parent_id: "ru-uav",
    echelon: "base",
    unit_number_vch: "20924",
    garrison_settlement: "Kolomna",
    garrison_region: "Moscow Oblast",
    coord_precision: "city",
    confidence: "high",
    notes_pl:
      "Ośrodek szkolenia operatorów BSP MoD RF (OFAC SDN, OpenSanctions). Listing podaje adres ulicy w Kołomnie — " +
      "atlas geokoduje wyłącznie centroid miasta, nie ten adres i nie poligon. " +
      UAV_NOTES.pl,
    notes_en:
      "MoD UAV-operator training centre (OFAC SDN, OpenSanctions). The listing includes a street address in Kolomna — " +
      "this atlas geocodes the city centroid only, not that address and not a range. " +
      UAV_NOTES.en,
    notes_de:
      "MoD-Ausbildungszentrum für Drohnenbediener (OFAC SDN, OpenSanctions). Die Listung nennt eine Straßenadresse in Kolomna — " +
      "dieser Atlas geokodiert nur den Stadtcentroid, nicht die Adresse und keinen Übungsplatz. " +
      UAV_NOTES.de,
    source_keys: ["ofac_924uav", "opensanctions_924uav"],
    geocode_query: "Kolomna, Moscow Oblast, Russia",
  }),
  uavPlant({
    id: "ru-uav-alabuga",
    name_pl: "Fabryka BSP (Jelabuga / SSE Ałabuga)",
    name_ru: "Завод БПЛА (Елабуга / ОЭЗ Алабуга)",
    name_en: "UAV plant (Yelabuga / Alabuga SEZ)",
    name_de: "Drohnenwerk (Jelabuga / SWZ Alabuga)",
    short: "Ałabuga BSP",
    district: "CMD",
    garrison_settlement: "Yelabuga",
    garrison_region: "Tatarstan",
    equipment_public: ["Geran-2"],
    confidence: "high",
    notes_pl:
      "Wikipedia: montaż BSP w SSE Ałabuga przy Jelabudze. Opracowania satelitarne lokalizują kampus poza centrum miasta — " +
      "pin to centroid Jelabugi, nie hale SSE i nie pomiar z satelity.",
    notes_en:
      "Wikipedia: UAV assembly in the Alabuga SEZ at Yelabuga. Satellite commentary places the campus outside the city centre — " +
      "the pin is the Yelabuga city centroid, not SEZ halls and not a satellite measurement.",
    notes_de:
      "Wikipedia: Drohnenmontage in der SWZ Alabuga bei Jelabuga. Satellitenkommentare lokalisieren den Campus außerhalb des Stadtzentrums — " +
      "der Pin ist der Stadtcentroid Jelabuga, keine SWZ-Hallen und keine Satellitenmessung.",
    source_keys: ["wiki_yelabuga_uav", "wiki_alabuga"],
    geocode_query: "Yelabuga, Tatarstan, Russia",
  }),
  uavPlant({
    id: "ru-uav-kronstadt",
    name_pl: "Grupa Kronsztadt (zakład Dubna)",
    name_ru: "Группа Кронштадт (завод Дубна)",
    name_en: "Kronshtadt Group (Dubna plant town)",
    name_de: "Kronshtadt-Gruppe (Werksstadt Dubna)",
    short: "Kronsztadt",
    district: "MMD",
    garrison_settlement: "Dubna",
    garrison_region: "Moscow Oblast",
    equipment_public: ["Orion"],
    confidence: "high",
    notes_pl: "Wikipedia: produkcja w Dubnie. Pin miasta, nie kampus zakładu.",
    notes_en: "Wikipedia: production in Dubna. City pin, not the factory campus.",
    notes_de: "Wikipedia: Fertigung in Dubna. Stadt-Pin, kein Werkscampus.",
    source_keys: ["wiki_kronstadt", "wiki_orion"],
    geocode_query: "Dubna, Moscow Oblast, Russia",
  }),
  uavPlant({
    id: "ru-uav-stc",
    name_pl: "STC (Orlan-10) — miasto siedziby",
    name_ru: "СТЦ (Орлан-10)",
    name_en: "STC (Orlan-10) — head-office city",
    name_de: "STC (Orlan-10) — Sitzstadt",
    short: "STC",
    district: "LMD",
    garrison_settlement: "Saint Petersburg",
    garrison_region: "Saint Petersburg",
    equipment_public: ["Orlan-10"],
    confidence: "high",
    notes_pl: "Wikipedia: producent Orlan-10, siedziba w Petersburgu. Pin centroidu miasta.",
    notes_en: "Wikipedia: Orlan-10 maker, head office in Saint Petersburg. City-centroid pin.",
    notes_de: "Wikipedia: Hersteller der Orlan-10, Sitz Sankt Petersburg. Stadtcentroid-Pin.",
    source_keys: ["wiki_orlan10"],
    geocode_query: "Saint Petersburg, Russia",
  }),
  uavPlant({
    id: "ru-uav-zala",
    name_pl: "ZALA Aero (miasto siedziby)",
    name_ru: "ZALA Aero",
    name_en: "ZALA Aero Group (head-office city)",
    name_de: "ZALA Aero Group (Sitzstadt)",
    short: "ZALA",
    district: "CMD",
    garrison_settlement: "Izhevsk",
    garrison_region: "Udmurt Republic",
    equipment_public: ["Lancet", "Kub-BLA"],
    confidence: "high",
    notes_pl:
      "Wikipedia: siedziba w Iżewsku (grupa Kałasznikow). Listingi sankcyjne podają adresy ulic — atlas używa wyłącznie centroidu Iżewska.",
    notes_en:
      "Wikipedia: head office in Izhevsk (Kalashnikov group). Sanctions listings include street addresses — this atlas uses the Izhevsk city centroid only.",
    notes_de:
      "Wikipedia: Sitz in Ischewsk (Kalaschnikow-Gruppe). Sanktionslisten nennen Straßenadressen — dieser Atlas verwendet nur den Stadtcentroid Ischewsk.",
    source_keys: ["wiki_zala", "wiki_lancet"],
    geocode_query: "Izhevsk, Russia",
  }),
  uavPlant({
    id: "ru-uav-uzga",
    name_pl: "UZGA (miasto siedziby)",
    name_ru: "УЗГА",
    name_en: "Ural Works of Civil Aviation (plant town)",
    name_de: "Uraler Werke der Zivilluftfahrt (Werksstadt)",
    short: "UZGA",
    district: "CMD",
    garrison_settlement: "Yekaterinburg",
    garrison_region: "Sverdlovsk Oblast",
    equipment_public: ["Forpost", "Altius"],
    confidence: "high",
    notes_pl: "Wikipedia: siedziba w Jekaterynburgu; publiczne nazwy Forpost / Altius. Pin miasta, nie pasy zakładowe.",
    notes_en: "Wikipedia: head office in Yekaterinburg; public names Forpost / Altius. City pin, not plant runways.",
    notes_de: "Wikipedia: Sitz Jekaterinburg; öffentliche Namen Forpost / Altius. Stadt-Pin, keine Werkspisten.",
    source_keys: ["wiki_uzga"],
    geocode_query: "Yekaterinburg, Russia",
  }),
];
