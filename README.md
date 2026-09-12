# Atlas garnizonów Sił Zbrojnych Federacji Rosyjskiej

Weryfikowalna baza **publicznie znanych garnizonów** (miasto / osiedle wojskowe / publiczny sztab), **zakładów zbrojeniowych** (centroid miasta), **ośrodków i zakładów BSP** (centroid miasta) i **nazwanych systemów WRE** oraz statyczna aplikacja mapy. Pracuje wyłącznie na źródłach otwartych.

**To nie jest tracker pola walki. Brak danych o teatrze ukraińskim.**

Języki UI: [polski](https://mhalaba.github.io/Ruskie/) · [English](https://mhalaba.github.io/Ruskie/?lang=en) · [Deutsch](https://mhalaba.github.io/Ruskie/?lang=de). Dokumentacja: [README.en.md](README.en.md), [README.de.md](README.de.md).

## GitHub Pages

Adres po włączeniu hostingu: [https://mhalaba.github.io/Ruskie/](https://mhalaba.github.io/Ruskie/)

Gotowa strona jest na gałęzi `gh-pages`. Włączenie (jednorazowo, w ustawieniach repozytorium **Ruskie**):

1. **Settings → Pages**
2. **Build and deployment → Source:** Deploy from a branch
3. **Branch:** `gh-pages`, folder `/` (root) → **Save**

Po merżu do `main` ten sam katalog `dist/` wdraża też workflow `.github/workflows/deploy-pages.yml` (wtedy w Pages można przełączyć Source na **GitHub Actions**). `vite.config.js` ma `base: './'`, więc zasoby ładują się z `/Ruskie/`.

## Zakres

- Garnizony i sztaby na terytorium FR w granicach międzynarodowo uznanych.
- Krym: pole `sovereignty_note: occupied_ukraine`, warstwa wyłączona domyślnie.
- Bazy zagraniczne (Armenia, Abchazja, Osetia Południowa, Syria, Białoruś, Tadżykistan, Kirgistan, Naddniestrze): warstwa `extraterritorial`.
- Szczebel: okręg → armia/korpus → dywizja/brygada/pułk niezależny. Bataliony WRE tylko gdy mają własny, publiczny garnizon miasta.
- Wojska WRE: garnizon miejscowości jednostki + publiczne nazwy systemów (Krasucha, Murmańsk-BN, Leer-3 itd.). **Bez częstotliwości i stanowisk zagłuszaczy.**
- Bezzałogowce: 924. centrum (Kołomna) i miasta zakładów (Jelabuga, Dubna, Petersburg, Iżewsk, Jekaterynburg). **Bez miejsc startu, pasów i hangarów.**
- Zakłady zbrojeniowe: centroid miasta siedziby / zakładu. **Bez bram, hal i linii produkcyjnych.** Zakłady w Ukrainie 1991 poza Krymem nie są pinowane.

## Czego tu nie ma (zakazy twarde)

Zob. `DISCLAIMER.md` i `data/refusal-log.md`. W skrócie: brak współrzędnych dokładniejszych niż centroid miejscowości, brak PII poniżej dowódcy okręgu/armii, brak silosów, stanowisk startowych (w tym BSP), brak GPS obiektów ze zdjęć satelitarnych, brak mapowania Ukrainy 1991 (poza Krymem jako okupowanym).

## Instalacja

Wymagania: Node.js 20+.

```bash
npm install
npm run geocode    # tylko gdy zmieniono miejscowości — Nominatim, 1 req/s
npm run refresh    # tygodniowy agent: zdrowie URL-i i dryf garnizonu (bez przesuwania pinów)
npm run build      # składa GeoJSON, waliduje, buduje front
npm run dev        # Vite, http://localhost:5173
```

`npm run validate` sprawdza m.in. unikalność `id`, istnienie `parent_id`, niepuste `sources` (gdy pewność ≠ unverified), zaokrąglenie współrzędnych oraz **odrzuca punkty w wielokącie Ukrainy 1991** z wyjątkiem Krymu z `occupied_ukraine`.

Dane statyczne dla hostingu (GitHub Pages): `public/data/*.geojson`. `vite.config.js` ma `base: './'`.

## Model danych

- `data/units.geojson` — FeatureCollection (źródło prawdy po zbudowaniu)
- `data/units.json` — lustro rekordów
- `data/hierarchy.json` — drzewo `parent_id` → `children[]`
- `data/dictionaries.json` — okręgi, rodzaje sił, kolory
- `data/catalog/*.mjs` — katalog roboczy (nazwy, garnizony, źródła)
- `data/gaps.json` — jednostki wspomniane bez legalnego pinu
- `data/ukraine-1991.geojson` — wielokąt walidatora
- `data/schema.json` — enumeracje pól
- `data/ew-systems.json` — słownik publicznych nazw systemów WRE
- `data/refresh-policy.md` — reguły agenta tygodniowego

Każdy rekord ma `sources[]` z URL, wydawcą i datą dostępu.

## Metodologia OSINT

1. **Źródła (kolejność wiarygodności):** ukazy/MoD RF → IISS/CRS/ISW (struktura/garnizon, nie odcinek frontu) → Wikipedia/Wikidata z przypisami → milkavkaz/warfare.be/tochnyi jako trop → satelita jawny wyłącznie do potwierdzenia, że w miejscowości jest obiekt wojskowy (bez pomiaru współrzędnych obiektu i bez śledzenia sprzętu).
2. **Reguła trzech źródeł / instytucja:** `high` = ≥3 niezależne albo 1 instytucjonalne, albo Wikipedia z cytowaniami + 1 potwierdzenie, zgodne co do garnizonu i podporządkowania. `medium` = 2 źródła. `low` = 1 źródło OSINT. `unverified` = trop; warstwa „szkic” wyłączona domyślnie.
3. **Współrzędne:** Nominatim (OSM) centroid miejscowości z `geocode_query`. Zaokrąglenie: 2 dp (`city`, ~1 km), 3 dp (`garrison_town` / `public_hq_building`, ~100 m). Karta jednostki pokazuje ten GPS WGS84. Wikimapia i zdjęcie satelitarne **nie** są źródłem współrzędnych pinów. Podkład Esri World Imagery: zoom max. 12, tylko tło.
4. **Rozbieżność garnizonu:** nie uśredniamy. Wybór lepiej potwierdzonego punktu; wariant w `alt_garrison` i `notes_pl`.
5. **Ukraina:** jeśli jednostka działa poza garnizonem, rekord zachowuje garnizon macierzysty i `deployment_status` (`partially_away` / `deployed_away`) **bez lokalizacji teatru**. Armie z HQ w Doniecku/Ługańsku — lista luk, bez geometrii.
6. **BSP:** wyłącznie miasto garnizonu ośrodka lub zakładu. Miejsca startu Shahed/Geran, pasy i hangary — `data/gaps.json` / `data/refusal-log.md`.

## Jak dodać jednostkę

1. Dopisz obiekt przez `u({...})` w odpowiednim pliku `data/catalog/units-*.mjs`.
2. Dodaj źródła do `data/catalog/sources.mjs` (zakaz „powszechnie wiadomo”).
3. Ustaw `geocode_query` na miasto/osiedle, nie na koszary.
4. `npm run geocode && npm run build`.
5. Jeśli Nominatim nie znajdzie miejscowości — **nie zgaduj pinu**. Wpisz lukę do `data/gaps.json`.

## Agent tygodniowy

Workflow `.github/workflows/weekly-osint-refresh.yml` w poniedziałek 06:15 UTC (oraz ręcznie) uruchamia `scripts/weekly-refresh.mjs`:

- sprawdza HTTP wszystkich URL ze `sources.mjs`;
- dla Wikipedii szuka w extractcie nazwy garnizonu — **nie przesuwa współrzędnych**;
- haszuje strony z `data/watchlist.json` i zgłasza zmianę rewizji;
- zapisuje `data/last-refresh.json` i `data/refresh-report.md`;
- geokoduje tylko nowe miejscowości, waliduje (w tym Ukraina 1991) i otwiera PR do recenzji.

Agent **nie dodaje pinów samodzielnie**. Szczegóły: `data/refresh-policy.md`.

## Aplikacja

Vite + vanilla JS, Leaflet, OSM (opcjonalnie Esri World Imagery jako tło, zoom max. 12), MarkerCluster. Bez backendu, logowania i telemetrii. UI: **PL / EN / DE** (`?lang=en` / `?lang=de`, zapamiętywane w `localStorage`). Filtry: rodzaj sił (w tym WRE, BSP i zakłady), okręg, szczebel, status, pewność, „tylko garnizony RF”, wyszukiwarka (także `name_de` i nazwy systemów), drzewo hierarchii, karta ze źródłami i GPS centroidu, słownik WRE, eksport GeoJSON, tryb ciemny.

Kolor markera = rodzaj sił. Kształt = szczebel (`plant` = kwadrat). Przezroczystość = pewność. Brak ikon celowniczych i narzędzi pomiaru do celów.

SEO: `canonical`, `hreflang`, Open Graph, JSON-LD (`Dataset` + `WebApplication`), `sitemap.xml`, `robots.txt`.

## Licencja

Kod: MIT (`LICENSE`). Dane: zestawienie ze źródeł otwartych; teksty Wikipedii — CC BY-SA. Nie jest to produkt MoD RF.

## Fazy budowy

Zob. `data/changelog/`. Kolejność: szkielet → LOW, MOW, POW, COW, WOW → WDW → piechota morska → GRU → WKS → WRPS → zagranica → WRE / zakłady / PL-EN-DE → BSP / GPS / podkład satelitarny.
