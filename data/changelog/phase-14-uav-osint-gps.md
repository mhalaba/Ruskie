# Faza 14 — BSP, GPS centroidów, podkład satelitarny

- Warstwa `uav`: 924. Państwowe Centrum Lotnictwa Bezzałogowego (Kołomna, OFAC/OpenSanctions) oraz miasta zakładów (Jelabuga/Ałabuga, Dubna/Kronsztadt, Petersburg/STC, Iżewsk/ZALA, Jekaterynburg/UZGA).
- Karta jednostki: GPS WGS84 zaokrąglonego centroidu Nominatim + klasa precyzji (± ~1 km / ~100–1000 m) i adnotacja, że to nie pomiar z satelity.
- Panel „Dokładność OSINT” (pewność, GPS, satelita, BSP).
- Opcjonalny podkład Esri World Imagery, `maxZoom` 12 — tło, nie źródło pinów.
- Odmowa: miejsca startu Shahed/Geran, pasy, hangary, GPS hal SSE Ałabuga i adres uliczny 924. — `data/gaps.json`, `data/refusal-log.md`.
