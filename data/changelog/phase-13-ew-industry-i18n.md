# Faza 13 — WRE, zakłady, i18n, agent tygodniowy, SEO

- Warstwa `ew`: brygady/ośrodki WRE w miastach garnizonowych + słownik publicznych nazw systemów (`data/ew-systems.json`). Bez częstotliwości i stanowisk.
- Warstwa `defense_industry`: znane zakłady (centroid miasta). Kercz: `occupied_ukraine`.
- `name_de` na rekordach (jawny lub z translatora EN→DE w `factory.mjs`).
- UI PL/EN/DE, hreflang, sitemap, robots, JSON-LD, Open Graph.
- Agent: `scripts/weekly-refresh.mjs` + `.github/workflows/weekly-osint-refresh.yml` (poniedziałek UTC). Nie przesuwa pinów.
