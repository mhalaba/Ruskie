# Atlas garnizonów Sił Zbrojnych Federacji Rosyjskiej

Weryfikowalna baza **publicznie znanych garnizonów** (miasto / osiedle wojskowe / publiczny sztab) oraz statyczna aplikacja mapy. Pracuje wyłącznie na źródłach otwartych.

**To nie jest tracker pola walki. Brak danych o teatrze ukraińskim.**

## Zakres

- Garnizony i sztaby na terytorium FR w granicach międzynarodowo uznanych.
- Krym: pole `sovereignty_note: occupied_ukraine`, warstwa wyłączona domyślnie.
- Bazy zagraniczne (Armenia, Abchazja, Osetia Południowa, Syria, Białoruś, Tadżykistan, Kirgistan, Naddniestrze): warstwa `extraterritorial`.
- Szczebel: okręg → armia/korpus → dywizja/brygada/pułk niezależny. Bataliony tylko gdy mają własny, publiczny garnizon (w v1 pominięte, jeśli niepewne).

## Czego tu nie ma (zakazy twarde)

Zob. `DISCLAIMER.md` i `data/refusal-log.md`. W skrócie: brak współrzędnych dokładniejszych niż centroid miejscowości, brak PII poniżej dowódcy okręgu/armii, brak silosów i stanowisk startowych, brak mapowania Ukrainy 1991 (poza Krymem jako okupowanym).

## Instalacja

Wymagania: Node.js 20+.

```bash
npm install
npm run geocode    # tylko gdy zmieniono miejscowości — Nominatim, 1 req/s
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

Każdy rekord ma `sources[]` z URL, wydawcą i datą dostępu.

## Metodologia OSINT

1. **Źródła (kolejność wiarygodności):** ukazy/MoD RF → IISS/CRS/ISW (struktura/garnizon, nie odcinek frontu) → Wikipedia/Wikidata z przypisami → milkavkaz/warfare.be/tochnyi jako trop → satelita jawny wyłącznie do potwierdzenia, że w miejscowości jest obiekt wojskowy (bez śledzenia sprzętu).
2. **Reguła trzech źródeł / instytucja:** `high` = ≥3 niezależne albo 1 instytucjonalne, albo Wikipedia z cytowaniami + 1 potwierdzenie, zgodne co do garnizonu i podporządkowania. `medium` = 2 źródła. `low` = 1 źródło OSINT. `unverified` = trop; warstwa „szkic” wyłączona domyślnie.
3. **Współrzędne:** Nominatim (OSM) centroid miejscowości z `geocode_query`. Zaokrąglenie: 2 dp (`city`, ~1 km), 3 dp (`garrison_town` / `public_hq_building`, ~100 m). Wikimapia nie jest jedynym źródłem współrzędnych.
4. **Rozbieżność garnizonu:** nie uśredniamy. Wybór lepiej potwierdzonego punktu; wariant w `alt_garrison` i `notes_pl`.
5. **Ukraina:** jeśli jednostka działa poza garnizonem, rekord zachowuje garnizon macierzysty i `deployment_status` (`partially_away` / `deployed_away`) **bez lokalizacji teatru**. Armie z HQ w Doniecku/Ługańsku — lista luk, bez geometrii.

## Jak dodać jednostkę

1. Dopisz obiekt przez `u({...})` w odpowiednim pliku `data/catalog/units-*.mjs`.
2. Dodaj źródła do `data/catalog/sources.mjs` (zakaz „powszechnie wiadomo”).
3. Ustaw `geocode_query` na miasto/osiedle, nie na koszary.
4. `npm run geocode && npm run build`.
5. Jeśli Nominatim nie znajdzie miejscowości — **nie zgaduj pinu**. Wpisz lukę do `data/gaps.json`.

## Aplikacja

Vite + vanilla JS, Leaflet, OSM, MarkerCluster. Bez backendu, logowania i telemetrii. UI po polsku. Filtry: rodzaj sił, okręg, szczebel, status, pewność, „tylko garnizony RF”, wyszukiwarka, drzewo hierarchii, karta jednostki ze źródłami, eksport przefiltrowanego GeoJSON, tryb ciemny.

Kolor markera = rodzaj sił. Kształt = szczebel. Przezroczystość = pewność. Brak ikon celowniczych i narzędzi pomiaru do celów.

## Licencja

Kod: MIT (`LICENSE`). Dane: zestawienie ze źródeł otwartych; teksty Wikipedii — CC BY-SA. Nie jest to produkt MoD RF.

## Fazy budowy

Zob. `data/changelog/`. Kolejność: szkielet → LOW, MOW, POW, COW, WOW → WDW → piechota morska → GRU → WKS → WRPS → zagranica → deduplikacja.
