# Weekly OSINT refresh agent

GitHub Actions (`.github/workflows/weekly-osint-refresh.yml`) runs **every Monday 06:15 UTC** and on demand.

The job is the weekly agent: it re-checks open sources, records drift, and opens a pull request. It does **not** invent pins.

## What it does

1. HTTP-check every URL in `data/catalog/sources.mjs`.
2. For Wikipedia URLs, fetch a plain-text extract and look for each unit’s `garrison_settlement` string.
3. Hash watchlist pages (`data/watchlist.json`) and flag content changes.
4. Write `data/last-refresh.json` and `data/refresh-report.md`.
5. Run geocode **only for new `geocode_query` values**, then `npm run build` (includes the Ukraine-1991 validator).
6. Open a PR if files changed.

## What it must never do

- Move or invent coordinates.
- Average conflicting garrisons.
- Add points in Ukraine 1991 (except Crimea with `occupied_ukraine`).
- Record frequencies, jammer sites, silos, plant gates, UAV launch pads, or PII below army/district commander.
- Take pin coordinates from satellite imagery of buildings, hangars, runways, or SEZ campuses.
- Treat a 404 or infobox change as an automatic catalog edit.

## Human review

If the report lists `garrison_mention_missing`, `http_error`, or `watchlist_changed`, a maintainer updates `data/catalog/*.mjs` or `data/gaps.json` and re-runs `npm run geocode && npm run build`.
