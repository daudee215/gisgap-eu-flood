# Methodology — gisgap EU Flood Risk Viewer

A browser-side screening tool that connects the **EU Floods Directive (2007/60/EC)** statutory
flood scenarios to a quantified picture of infrastructure exposure, using openly licensed
EU-level data as its conceptual reference layers.

## 1. Policy framing

The Floods Directive requires Member States to map flood **hazard** and **risk** for three
probability classes (Annex I):

| Class | Return period | This tool |
|---|---|---|
| High probability | ≈ 30-year | water level 1.7 m |
| Medium probability | ≈ 100-year | water level 2.6 m |
| Low probability | ≈ 300-year | water level 3.6 m |

For each scenario the Directive requires flood **extent** and flow **velocity** to be mapped
(Art. 6), reviewed on a **6-year cycle**. The current cycle is the **3rd (2022–2027)**,
increasingly incorporating climate-change scenarios — represented here by the "climate add-on"
slider that raises the design level by up to 1.5 m.

## 2. Reference data (open, EU-level)

- **Copernicus DEM (GLO-30)** — the open European reference elevation surface for flood-extent work.
- **Copernicus Emergency Management Service (CEMS)** + **EFAS** — operational flood delineation and continental forecasting.
- **JRC Global Surface Water** (Pekel et al., 2016, *Nature*) — seeds permanent water bodies.
- **EU-Hydro / Copernicus Land Monitoring Service** — harmonised river/catchment network for connectivity.
- **OpenStreetMap** (ODbL) — buildings, roads, critical assets.

These are the datasets a production version would ingest. In this demo the AOI is **synthetic and
reproducible** (fixed seeds) so the tool runs fully offline — see `data/PROVENANCE.json`.

## 3. Inundation model

A **connectivity-aware planar** model ("bathtub + flood-fill"):

1. Build a planar flood surface at `level = design_water_level + climate_add_on`.
2. Seed flooding from permanent-water cells (sea corner + river channel) at or below `level`.
3. 4-neighbour flood-fill across all land cells whose elevation ≤ `level` **and** that are
   hydrologically connected to a seed. Disconnected low pockets stay dry — the key improvement
   over a naïve bathtub fill.
4. Depth = `level − elevation` per flooded cell.

This is a recognised **first-order screening** method. It deliberately ignores flow dynamics,
hydraulic roughness, defence breaching, infiltration and timing — for those, a hydrodynamic model
(LISFLOOD-FP, HEC-RAS, SFINCS) is required.

## 4. Exposure metrics

Computed per scenario over the synthetic infrastructure:

- **Flooded area** (km²) and **share of AOI** (%) — flooded dry-land cells × 0.0025 km².
- **Buildings exposed** — footprints whose cell is flooded.
- **Road length cut** (km) — sum of road segments whose midpoint cell is flooded.
- **Residents affected** — buildings × 2.3 occupants (flat proxy).
- **Critical assets hit** — of 5 labelled assets (hospital, substation, water treatment, school, pumping station).

## 5. Reproducibility & limits

Every random element is seeded (`mulberry32`), so the AOI, network and assets are identical on every
load. Return-period → water-level mappings are illustrative, not calibrated stage-frequency values.
For statutory maps use the **EEA Flood Risk Areas Viewer** and WISE-Freshwater.
