# ADR-001 — Architecture of the EU Flood Risk Viewer

Status: accepted · 2026-06-23

## Context

A new gisgap browser demo had to (a) be impressive and online, (b) be built on **open EU-level
data**, and (c) surface relevant **EU policy**. It also had to pass the standing 8-rule layout/UI-UX
gate and ship onto `daudee215.github.io` like the other gisgap tools.

## Decisions

1. **Single self-contained `index.html`, canvas-rendered.** Matches the live precedent
   (`aerial-lidar-spatial-eval`) and the canonical design tokens. No map-tile dependency, no API
   keys, works offline. Renders terrain + inundation + vector overlays on `<canvas>`.

2. **Policy is the spine, not decoration.** The three scenario buttons *are* the Floods Directive
   probability classes (30 / 100 / 300-yr). A dedicated panel states the legal basis (2007/60/EC),
   the per-scenario duty (extent + velocity), the 6-year cycle and the current 3rd cycle (2022–2027).

3. **Connectivity-aware planar inundation**, not a naïve bathtub fill. A 4-neighbour flood-fill from
   permanent-water seeds keeps disconnected low pockets dry — a meaningful realism gain for a
   client-side model, while staying honest that it is first-order screening (documented in
   `PROVENANCE.json`).

4. **Synthetic but reproducible AOI** (fixed `mulberry32` seeds). Lets the demo run anywhere while
   the README/provenance name the real datasets a production build would ingest. Avoids implying a
   real flood map exists where it does not.

5. **Static-site build + reused audit gate.** `tools/audit-layout.mjs` is the unmodified gisgap gate;
   `tools/build-static.mjs` assembles `dist/`. Deploy syncs into the showcase repo subfolder (per the
   Pages-enablement constraint) — no `pages.yml` on this repo.

## Consequences

- Fully offline, dependency-free runtime; trivial to host and cite.
- Not a hydrodynamic model — clearly scoped as screening, with a link to the official EEA viewer.
- URL-hash state makes every scenario shareable, supporting the "copy shareable link" affordance.
