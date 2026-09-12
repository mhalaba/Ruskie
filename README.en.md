# Russian Armed Forces garrison gazetteer

Verifiable **open-source** atlas of publicly known garrison towns, **defense-plant cities** (city centroid only), **UAV centres/plants** (city centroid only) and **named electronic-warfare systems**. Static Leaflet map. Not a battlefield tracker. No Ukrainian theater coordinates.

UI: [Polish](https://ru.halaba.online/) · [English](https://ru.halaba.online/?lang=en) · [German](https://ru.halaba.online/?lang=de).

Hard bans: settlement centroid only; no silos, launch pads (including UAV), plant gates, jammer sites, frequencies, satellite-derived object GPS, or PII below district/army commander. Optional Esri imagery is a backdrop (`maxZoom` 12), not a coordinate source. Crimea is `occupied_ukraine` and off by default. Weekly GitHub Action re-checks sources and opens a review PR — it never auto-moves pins. See `DISCLAIMER.md` and `data/refresh-policy.md`.
