import "./styles.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import {
  applyStaticI18n,
  detectLang,
  dictLabel,
  localizedName,
  persistLang,
  t,
  updateSeo,
} from "./i18n.js";

const CONF_RANK = { unverified: 0, low: 1, medium: 2, high: 3 };

const BRANCH_LAYER = {
  ground: "ground",
  vdv: "vdv",
  naval_infantry: "naval_infantry",
  navy_coastal: "naval_infantry",
  gru_spetsnaz: "gru",
  vks: "vks",
  rvsn: "rvsn",
  ew: "ew",
  uav: "uav",
  defense_industry: "industry",
  other: "ground",
};

let lang = detectLang();

function markerSize(echelon) {
  return {
    district: 18,
    army: 15,
    corps: 14,
    division: 12,
    brigade: 9,
    regiment: 8,
    base: 10,
    plant: 9,
    other: 8,
  }[echelon];
}

function markerShape(echelon) {
  return {
    district: "square",
    army: "circle",
    corps: "octagon",
    division: "diamond",
    brigade: "circle",
    regiment: "triangle",
    base: "square",
    plant: "square",
    other: "circle",
  }[echelon];
}

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(path);
  return res.json();
}

function iconFor(props, dict) {
  const color = dict.map_colors[props.branch] || "#888";
  const size = markerSize(props.echelon);
  const shape = markerShape(props.echelon);
  const opacity =
    dict.confidence[props.confidence]?.opacity ?? (props.confidence === "high" ? 1 : 0.7);
  const html = `<div class="garrison-mark ${shape}" style="width:${size}px;height:${size}px;background:${color};opacity:${opacity};color:${color}"></div>`;
  const hit = Math.max(size + 10, 18);
  return L.divIcon({
    className: "garrison-icon",
    html,
    iconSize: [hit, hit],
    iconAnchor: [hit / 2, hit / 2],
  });
}

function matchesFilters(props, state) {
  const layer = BRANCH_LAYER[props.branch] || "ground";
  if (props.extra_layer === "sketch" || props.confidence === "unverified") {
    if (!state.layers.sketch) return false;
  } else if (props.extra_layer === "extraterritorial") {
    if (!state.layers.extraterritorial) return false;
  } else if (props.extra_layer === "crimea") {
    if (!state.layers.crimea) return false;
  } else if (!state.layers[layer]) {
    return false;
  }

  if (state.rfOnly) {
    if (props.extra_layer === "crimea" || props.extra_layer === "extraterritorial") return false;
    if (props.sovereignty_note !== "recognized" || props.country !== "RU") return false;
  }

  if (state.district && props.district !== state.district) return false;
  if (state.echelon && props.echelon !== state.echelon) return false;
  if (state.formation && props.formation_status !== state.formation) return false;
  if (CONF_RANK[props.confidence] < CONF_RANK[state.minConfidence]) return false;

  const q = state.query.trim().toLowerCase();
  if (q) {
    const blob = [
      props.name_pl,
      props.name_ru,
      props.name_en,
      props.name_de,
      props.short,
      props.garrison_settlement,
      props.garrison_region,
      props.unit_number_vch,
      props.id,
      ...(props.equipment_public || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!blob.includes(q)) return false;
  }
  return true;
}

function breadcrumb(props, byId) {
  const parts = [];
  let cur = props;
  const guard = new Set();
  while (cur && !guard.has(cur.id)) {
    parts.unshift(localizedName(cur, lang, cur.short || cur.id));
    guard.add(cur.id);
    cur = cur.parent_id ? byId.get(cur.parent_id)?.properties : null;
  }
  return parts.join(" → ");
}

function notesFor(props) {
  return props[`notes_${lang}`] || props.notes_en || props.notes_pl || "";
}

function sovereigntyLabel(note) {
  const key = `sov_${note}`;
  const label = t(lang, key);
  return label === key ? note : label;
}

const GPS_DP = { city: 2, garrison_town: 3, public_hq_building: 3 };
const GPS_BAND = {
  city: "~1 km",
  garrison_town: "~100–1000 m",
  public_hq_building: "~100 m",
};

function formatGps(lon, lat, precision) {
  const dp = GPS_DP[precision] ?? 2;
  const latN = Number(lat).toFixed(dp);
  const lonN = Number(lon).toFixed(dp);
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return {
    decimal: `${latN}, ${lonN}`,
    compass: `${Math.abs(lat).toFixed(dp)}° ${ns}, ${Math.abs(lon).toFixed(dp)}° ${ew}`,
    band: GPS_BAND[precision] ?? "~1 km",
  };
}

function renderCard(feat, dict, byId) {
  const props = feat.properties;
  const [lon, lat] = feat.geometry.coordinates;
  const gps = formatGps(lon, lat, props.coord_precision);
  const conf = dictLabel(dict.confidence[props.confidence], lang) || props.confidence;
  const sources = (props.sources || [])
    .map(
      (s) =>
        `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a> <span class="muted">(${s.publisher}, ${s.accessed})</span></li>`
    )
    .join("");
  const cmd = props.commander_public?.name
    ? `${props.commander_public.rank || ""} ${props.commander_public.name} <span class="muted">(${t(lang, "asOf")} ${props.commander_public.as_of})</span>`
    : t(lang, "noCommander");
  const alt = props.alt_garrison
    ? `<div class="notes">${t(lang, "altGarrison")}: ${props.alt_garrison.settlement}, ${props.alt_garrison.region}. ${props.alt_garrison.note || ""}</div>`
    : "";
  const equip = (props.equipment_public || []).filter(Boolean);
  const equipHtml = equip.length
    ? `<h3>${t(lang, "equipment")}</h3><p class="chips">${equip.map((e) => `<span class="chip">${e}</span>`).join("")}</p>`
    : "";
  const title = localizedName(props, lang, props.name_pl);
  const others = ["pl", "ru", "en", "de"]
    .map((code) => (code === "ru" ? props.name_ru : props[`name_${code}`]))
    .filter((n, i, arr) => n && n !== title && arr.indexOf(n) === i)
    .join(" · ");
  return `
    <h2>${title}</h2>
    <p class="ru">${others}</p>
    <div class="crumb">${breadcrumb(props, byId)}</div>
    <span class="badge ${props.confidence}">${t(lang, "confidence")}: ${conf}</span>
    <div class="meta">
      <div>${t(lang, "short")}</div><div>${props.short}</div>
      <div>${t(lang, "garrison")}</div><div>${props.garrison_settlement}, ${props.garrison_region} (${props.country})</div>
      <div>${t(lang, "gps")}</div><div><code class="gps">${gps.decimal}</code><div class="muted">${gps.compass}</div></div>
      <div>${t(lang, "precision")}</div><div>${dictLabel(dict.coord_precision[props.coord_precision], lang) || props.coord_precision} (± ${gps.band})</div>
      <div>${t(lang, "accuracy")}</div><div>${t(lang, "gpsHint")}</div>
      <div>${t(lang, "sovereignty")}</div><div>${sovereigntyLabel(props.sovereignty_note)}</div>
      <div>${t(lang, "formationRow")}</div><div>${dictLabel(dict.formation_status[props.formation_status], lang)}</div>
      <div>${t(lang, "deployment")}</div><div>${dictLabel(dict.deployment_status[props.deployment_status], lang)}</div>
      <div>${t(lang, "vch")}</div><div>${props.unit_number_vch || "—"}</div>
      <div>${t(lang, "commander")}</div><div>${cmd}</div>
      <div>${t(lang, "verified")}</div><div>${props.last_verified}</div>
      <div>${t(lang, "geocode")}</div><div>${props.geocode_source || "—"}</div>
    </div>
    ${notesFor(props) ? `<p class="notes">${notesFor(props)}</p>` : ""}
    ${alt}
    ${equipHtml}
    <h3>${t(lang, "sources")}</h3>
    <ul class="sources">${sources}</ul>
  `;
}

function renderGlossary(ewData) {
  const systems = ewData.systems || [];
  const items = systems
    .map((s) => {
      const name = localizedName(s, lang, s.name_en);
      const role = s[`role_${lang}`] || s.role_en || s.role_pl || "";
      const links = (s.sources || [])
        .map((src) => `<a href="${src.url}" target="_blank" rel="noopener noreferrer">${src.publisher}</a>`)
        .join(" · ");
      return `<li><strong>${name}</strong>${s.gra ? ` <span class="muted">(${s.gra})</span>` : ""}<div class="notes">${role}</div><div class="muted">${links}</div></li>`;
    })
    .join("");
  return `<h2>${t(lang, "glossary")}</h2><p class="notes">${t(lang, "glossaryLead")}</p><ul class="glossary-list">${items}</ul>`;
}

function buildTree(hierarchy, byId, onSelect) {
  const root = document.getElementById("tree");
  root.innerHTML = "";

  function nodeEl(id) {
    const n = hierarchy.nodes[id];
    if (!n) return document.createTextNode("");
    const label = localizedName(n, lang, n.short || id);
    const wrap = document.createElement("div");
    if (n.children.length) {
      const det = document.createElement("details");
      const sum = document.createElement("summary");
      const btn = document.createElement("button");
      btn.className = "linkish";
      btn.type = "button";
      btn.textContent = label;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(id);
      });
      sum.appendChild(btn);
      det.appendChild(sum);
      n.children.forEach((cid) => det.appendChild(nodeEl(cid)));
      wrap.appendChild(det);
    } else {
      const btn = document.createElement("button");
      btn.className = "linkish";
      btn.type = "button";
      btn.textContent = label;
      btn.addEventListener("click", () => onSelect(id));
      wrap.appendChild(btn);
    }
    return wrap;
  }

  hierarchy.roots.forEach((id) => root.appendChild(nodeEl(id)));
}

function fillSelect(el, entries) {
  const current = el.value;
  el.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = t(lang, "all");
  el.appendChild(empty);
  for (const [value, label] of entries) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    el.appendChild(opt);
  }
  if ([...el.options].some((o) => o.value === current)) el.value = current;
}

function downloadGeoJSON(features) {
  const blob = new Blob(
    [JSON.stringify({ type: "FeatureCollection", features }, null, 2)],
    { type: "application/geo+json" }
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "garrisons-filtered.geojson";
  a.click();
  URL.revokeObjectURL(a.href);
}

const state = {
  layers: {
    ground: true,
    vdv: true,
    naval_infantry: true,
    gru: true,
    vks: true,
    rvsn: true,
    ew: true,
    uav: true,
    industry: true,
    extraterritorial: false,
    crimea: false,
    sketch: false,
  },
  district: "",
  echelon: "",
  formation: "",
  minConfidence: "medium",
  rfOnly: false,
  query: "",
};

async function main() {
  applyStaticI18n(lang);
  updateSeo(lang);
  persistLang(lang);

  const [geojson, dict, hierarchy, ewData] = await Promise.all([
    loadJson("./data/units.geojson"),
    loadJson("./data/dictionaries.json"),
    loadJson("./data/hierarchy.json"),
    loadJson("./data/ew-systems.json"),
  ]);

  const byId = new Map(geojson.features.map((f) => [f.properties.id, f]));

  function refillFilters() {
    const distSel = document.getElementById("filter-district");
    const echSel = document.getElementById("filter-echelon");
    const formSel = document.getElementById("filter-formation");
    fillSelect(
      distSel,
      Object.values(dict.districts).map((d) => [d.id, localizedName(d, lang, d.id)])
    );
    fillSelect(
      echSel,
      Object.values(dict.echelons).map((d) => [d.id, localizedName(d, lang, d.id)])
    );
    fillSelect(
      formSel,
      Object.entries(dict.formation_status).map(([id, row]) => [id, dictLabel(row, lang)])
    );
  }
  refillFilters();

  const map = L.map("map", {
    zoomControl: true,
    attributionControl: true,
  }).setView([56.5, 40], 4);

  const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    minZoom: 3,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });
  const satLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 12,
      minZoom: 3,
      attribution:
        'Tiles &copy; Esri — satellite backdrop only, not a pin coordinate source',
    }
  );
  osmLayer.addTo(map);

  const cluster = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 48,
    spiderfyOnMaxZoom: true,
  });
  map.addLayer(cluster);

  const markersById = new Map();
  let lastCardId = null;

  function openCard(id) {
    const feat = byId.get(id);
    if (!feat) return;
    lastCardId = id;
    document.getElementById("glossary").classList.add("hidden");
    const card = document.getElementById("card");
    document.getElementById("card-body").innerHTML = renderCard(feat, dict, byId);
    card.classList.remove("hidden");
    const m = markersById.get(id);
    if (m) {
      cluster.zoomToShowLayer(m, () => {
        map.panTo(m.getLatLng());
      });
    }
  }

  function openGlossary() {
    lastCardId = null;
    document.getElementById("card").classList.add("hidden");
    document.getElementById("glossary-body").innerHTML = renderGlossary(ewData);
    document.getElementById("glossary").classList.remove("hidden");
  }

  let initial = true;

  function rebuild() {
    cluster.clearLayers();
    markersById.clear();
    const filtered = geojson.features.filter((f) => matchesFilters(f.properties, state));
    for (const f of filtered) {
      const [lon, lat] = f.geometry.coordinates;
      const m = L.marker([lat, lon], { icon: iconFor(f.properties, dict), keyboard: true });
      m.bindTooltip(localizedName(f.properties, lang, f.properties.short));
      m.on("click", () => openCard(f.properties.id));
      cluster.addLayer(m);
      markersById.set(f.properties.id, m);
    }
    const generated = geojson.metadata?.generated || "2026-09-12";
    document.getElementById("footer-text").textContent = t(lang, "footer", { date: generated });
    const countEl = document.getElementById("result-count");
    if (countEl) {
      countEl.textContent = t(lang, "visible", { n: filtered.length, total: geojson.features.length });
    }
    window.__filtered = filtered;
    if (!initial && state.query.trim() && filtered.length > 0) {
      const bounds = cluster.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { maxZoom: 8, padding: [48, 48] });
      }
    }
    initial = false;
  }

  function applyLang(next) {
    lang = next;
    persistLang(lang);
    applyStaticI18n(lang);
    updateSeo(lang);
    refillFilters();
    buildTree(hierarchy, byId, openCard);
    const themeBtn = document.getElementById("btn-theme");
    const light = document.documentElement.getAttribute("data-theme") === "light";
    themeBtn.textContent = light ? t(lang, "themeDark") : t(lang, "themeLight");
    if (!document.getElementById("card").classList.contains("hidden") && lastCardId) {
      openCard(lastCardId);
    }
    if (!document.getElementById("glossary").classList.contains("hidden")) {
      openGlossary();
    }
    rebuild();
  }

  document.querySelectorAll("[data-layer]").forEach((el) => {
    el.addEventListener("change", () => {
      state.layers[el.dataset.layer] = el.checked;
      if (el.dataset.layer === "sketch" && el.checked) {
        document.getElementById("filter-confidence").value = "unverified";
        state.minConfidence = "unverified";
      }
      rebuild();
    });
  });
  const satToggle = document.getElementById("basemap-satellite");
  if (satToggle) {
    satToggle.addEventListener("change", () => {
      if (satToggle.checked) {
        map.removeLayer(osmLayer);
        satLayer.addTo(map);
      } else {
        map.removeLayer(satLayer);
        osmLayer.addTo(map);
      }
    });
  }
  document.getElementById("filter-district").addEventListener("change", (e) => {
    state.district = e.target.value;
    rebuild();
  });
  document.getElementById("filter-echelon").addEventListener("change", (e) => {
    state.echelon = e.target.value;
    rebuild();
  });
  document.getElementById("filter-formation").addEventListener("change", (e) => {
    state.formation = e.target.value;
    rebuild();
  });
  document.getElementById("filter-confidence").addEventListener("change", (e) => {
    state.minConfidence = e.target.value;
    rebuild();
  });
  document.getElementById("filter-rf-only").addEventListener("change", (e) => {
    state.rfOnly = e.target.checked;
    rebuild();
  });
  document.getElementById("search").addEventListener("input", (e) => {
    state.query = e.target.value;
    rebuild();
  });
  document.getElementById("btn-export").addEventListener("click", () => {
    downloadGeoJSON(window.__filtered || []);
  });
  document.getElementById("card-close").addEventListener("click", () => {
    document.getElementById("card").classList.add("hidden");
    lastCardId = null;
  });
  document.getElementById("glossary-close").addEventListener("click", () => {
    document.getElementById("glossary").classList.add("hidden");
  });
  document.getElementById("btn-glossary").addEventListener("click", openGlossary);
  document.getElementById("btn-theme").addEventListener("click", (e) => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "dark") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
    e.target.textContent = next === "light" ? t(lang, "themeDark") : t(lang, "themeLight");
  });
  document.getElementById("btn-sidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });
  document.querySelectorAll("[data-lang]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      applyLang(el.dataset.lang);
    });
  });

  buildTree(hierarchy, byId, openCard);
  rebuild();
}

main().catch((err) => {
  document.body.innerHTML = `<p style="padding:24px">${t(lang, "loadError", { msg: err.message })}</p>`;
});
