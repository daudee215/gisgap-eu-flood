# gisgap EU Flood Risk Viewer

Interactive, browser-side flood-inundation viewer that connects the **EU Floods Directive
(2007/60/EC)** statutory flood scenarios to a quantified picture of who and what gets wet.

**Live demo:** https://daudee215.github.io/gisgap-eu-flood/

![status](https://img.shields.io/badge/status-live%20demo-176b4d)
![data](https://img.shields.io/badge/data-EU%20open%20%2F%20Copernicus%20%2F%20OSM-1d8a62)
![license](https://img.shields.io/badge/license-MIT-blue)

## What it does

- Switch between the Directive's three statutory probability classes — **high (≈30-yr)**,
  **medium (≈100-yr)** and **low (≈300-yr)** return periods.
- Adjust the design water level and a **climate add-on** (sea-level rise / surge) to stress-test
  the current **3rd planning cycle (2022–2027)**.
- Read off live exposure: flooded area, share of AOI, buildings, road length cut, residents and
  critical assets (hospital, substation, water treatment, school, pumping station).
- See exactly what each scenario obliges under the Directive, with links to the official EEA
  Flood Risk Areas Viewer.

## Data & method

The tool is framed around real, openly licensed EU-level sources — **Copernicus DEM (GLO-30)**,
**Copernicus EMS / EFAS**, **JRC Global Surface Water**, **EU-Hydro** and **OpenStreetMap**. The
demo AOI itself is **synthetic and reproducible** (fixed seeds) so it runs fully offline. The
inundation engine is a **connectivity-aware planar ("bathtub + flood-fill") screening model** — not
a hydrodynamic simulation. See [`docs/pipeline.md`](docs/pipeline.md) and
[`data/PROVENANCE.json`](data/PROVENANCE.json) for the full, honest breakdown.

> Screening companion only. For statutory flood hazard and risk maps, use Member-State reporting via
> the [EEA Flood Risk Areas Viewer](https://discomap.eea.europa.eu/floodsviewer/) and WISE-Freshwater.

## Develop

```bash
npm install
npm run audit:install      # one-time: Playwright Chromium
npm run audit:layout       # build + 8-rule layout/UI-UX gate at 360/920/1180/1440 px
```

`index.html` is fully self-contained (no build step for the app itself); `npm run build` just
assembles `dist/` for the audit gate and deploy workflow. CI runs the layout audit on every push.

## Licence

MIT © 2026 Daud Tasleem. Directive text © European Union; Copernicus, JRC and OSM data under their
respective open licences.
