# Zastrzeżenia

## Czym jest ten zbiór

Atlas garnizonów Sił Zbrojnych Federacji Rosyjskiej na podstawie **wyłącznie źródeł otwartych**.
Rekordy opisują **publicznie podawane miejsca stałej dyslokacji** (miasto / osiedle wojskowe /
publiczny adres sztabu), podporządkowanie i status formowania.
Warstwa zakładów zbrojeniowych to **miasta siedzib** znanych przedsiębiorstw. Warstwa WRE to **garnizony jednostek** oraz **publiczne nazwy** systemów. Warstwa BSP to **miasto garnizonu ośrodka / zakładu** (nie miejsca startu).

## Czym ten zbiór nie jest

- To **nie** jest tracker pola walki ani mapa teatru ukraińskiego.
- To **nie** jest produkt wywiadowczy do namierzania celów.
- Brak współrzędnych dokładniejszych niż centroid miejscowości garnizonowej lub publiczny adres sztabu.
- Brak składów amunicji, paliw, silosów, stanowisk startowych (w tym BSP), koszar wewnętrznych, bram i dróg technicznych.
- Brak danych osobowych żołnierzy i oficerów poniżej szczebla dowódcy okręgu/armii/rodzaju sił podanego w źródłach instytucjonalnych.
- Brak częstotliwości, sieci, haseł, numerów paszportów i kont prywatnych.
- Brak stanowisk zagłuszaczy, masztów WRE, bram i hal zakładów oraz linii produkcyjnych.
- Zdjęcia satelitarne nie są źródłem współrzędnych pinów (podkład mapy, zoom max. 12).

## Ukraina

Jednostki, pozycje, zgrupowania i ruchy na terytorium Ukrainy w granicach 1991 **nie są mapowane**.
Jeśli jednostka jest użyta poza garnizonem macierzystym, rekord zachowuje garnizon w FR (lub, dla Krymu, oznaczenie `occupied_ukraine`) oraz `deployment_status`.
Armie sformowane z korpusów na okupowanym Donbasie (np. 3. i 51. armia) **nie otrzymują pinu** w Ukrainie — trafiają na listę luk.

Krym jest oznaczony `sovereignty_note: "occupied_ukraine"` i warstwa jest **wyłączona domyślnie**.

## Precyzja geograficzna

Domyślnie `coord_precision` to `city` lub `garrison_town`. Zaokrąglenie współrzędnych: 2 miejsca dziesiętne dla miast (~1 km), maksymalnie 3 dla osiedli garnizonowych (~100 m). Karta pokazuje ten GPS WGS84. Nie uśredniamy rozbieżnych lokalizacji.

## Pewność

Rekord bez źródła nie trafia na mapę jako pewny. Warstwa „szkic” (`confidence: unverified`) jest wyłączona domyślnie.

## Odpowiedzialność

Autorzy nie ponoszą odpowiedzialności za użycie danych niezgodnie z przeznaczeniem (encyklopedyczny atlas garnizonów). Stan na datę w stopce aplikacji i polu `last_verified`.
