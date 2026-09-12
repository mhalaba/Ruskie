# Dziennik odmów (zakazy twarde)

Wszystkie poniższe żądania / tropy OSINT zostały **odmówione** i nie trafiły do bazy.

| Data | Trop / żądanie | Powód | Działanie |
|------|-----------------|--------|-----------|
| 2026-09-12 | Współrzędne koszar, bram, dróg technicznych, wewnętrznego rozplanowania poligonów | Precyzja poniżej centroidu miejscowości / publicznego sztabu | Pominięto; `coord_precision` = city / garrison_town |
| 2026-09-12 | Silosy RVSN, stanowiska startowe Iskander, dywizjony S-400, składy amunicji i paliw | Dane do namierzania | Nie mapowano; najwyżej miasto garnizonowe związku |
| 2026-09-12 | Linie frontu, zgrupowania i ruchy w Ukrainie (granice 1991) | Zakaz teatru ukraińskiego | Rekordy 3. i 51. armii bez geometrii — lista luk |
| 2026-09-12 | Live tracking, AIS/ADS-B jednostek, częstotliwości | Zakaz trackera pola walki | Nie zbierano |
| 2026-09-12 | PII szeregowych i oficerów poniżej dowódcy okręgu/armii/rodzaju sił | Zakaz danych osobowych | Dowódcy tylko szczebel okręg/armia, `as_of` + źródło |
| 2026-09-12 | Uśrednianie rozbieżnych współrzędnych garnizonu | Reguła OSINT: nie uśredniać | Wybrano lepiej potwierdzony punkt; wariant w `alt_garrison` |
| 2026-09-12 | Wikimapia jako jedyne źródło współrzędnych | Trop, nie źródło współrzędnych | Współrzędne z Nominatim/GeoNames/Wikidata P625 miejscowości |
| 2026-09-12 | Numery telefonów, media społecznościowe osób prywatnych, paszporty | PII | Nie zbierano |
| 2026-09-12 | Częstotliwości, maszty i stanowiska zagłuszaczy WRE (pola antenowe) | Dane do namierzania / tracker | Tylko miasto garnizonu jednostki i publiczna nazwa systemu |
| 2026-09-12 | Bramy, hale, linie produkcyjne zakładów zbrojeniowych | Precyzja poniżej centroidu miasta | Pin wyłącznie miasta siedziby |
| 2026-09-12 | Zakłady zbrojeniowe w Ukrainie 1991 poza Krymem | Zakaz teatru / terytorium UA 1991 | Nie pinowano |
| 2026-09-12 | Miejsca startu dronów (Shahed/Geran, pasy przygraniczne, płyty, hangary, katapulty) | Dane do namierzania; `geo_rules.uav` | Odmowa. Warstwa BSP: miasto garnizonu 924. (Kołomna) + centroidy miast zakładów |
| 2026-09-12 | GPS obiektów ze zdjęć satelitarnych (hale SSE Ałabuga, kampus Kronsztadt, koszary 924.) | Satelita nie jest źródłem współrzędnych pinów; max. zoom 12 | Podkład Esri World Imagery wyłącznie jako tło; piny z Nominatim miejscowości |
| 2026-09-12 | Geokod ulicy OFAC 924. GTsBA (5 Proezd Artilleristov, Kołomna) | Precyzja poniżej centroidu miasta | Pin Kołomny `city` 2 dp |
| 2026-09-12 | Adresy uliczne ZALA/CST (Iżewsk) z listingów sankcyjnych | Precyzja poniżej centroidu miasta | Pin Iżewska `city` 2 dp |
