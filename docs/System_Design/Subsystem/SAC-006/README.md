# SAC-006 — Business map — ontology and visuals

The shop picture in plain words: **estimates**, **orders**, **inventory**, **make**, **inspect**, **ship** — browsable as Schema, Explorer, Vertex, and Process map. This is the product-owned **Ontology Language** (entity types, properties, links, actions ? certified skills). It sits above connectors; it does **not** replace the ERP or invent free-form tools.

v1 is **repo YAML** under [`resources/packages/ontology`](../../../../resources/packages/ontology/). Operators browse; builders edit files and reload the gateway. No customer ontology SDK and no full graph engine.

## What you get

| Piece | Job |
|-------|-----|
| Schema | Search and inspect types, properties, links, actions (read-only in the browser) |
| Explorer | List objects for a type — **live** Estimate rows from the ERP when connected; other types may show labeled demo rows |
| Vertex | Seed a type and **Search Around** along declared links (no spaghetti whole-graph dump) |
| Process map | Curated commercial ? make ? ship spine (not every link) |
| Catalog APIs | `GET /ontology`, `GET /ontology/entity-types/:id`, `GET /ontology/objects` — no vendor bindings in responses |
| Package | Entity YAML + Odoo bindings (ACL-only) + smoke tests |

ERP Map / section intents ([SAC-002](../SAC-002/README.md)) remain how you **run** skills day to day. Ontology is the shared vocabulary and map — not a replacement home screen.

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for the business map |
| [TSD.md](./TSD.md) | Package layout, gateway APIs, UI tabs |
| [TRACE.md](./TRACE.md) | Requirement ? scenario ? test |
| [Scenarios/OPS-004.md](./Scenarios/OPS-004.md) | Browse Schema (+ Process map) |
| [Scenarios/OPS-005.md](./Scenarios/OPS-005.md) | Search estimates in Explorer |
| [Scenarios/OPS-006.md](./Scenarios/OPS-006.md) | Expand related types in Vertex |

**Shop how-to:** [Business map](../../../User_Guide/Business_map/README.md)  
**Related:** [SAC-005](../SAC-005/README.md) Odoo connector · [SAC-003](../SAC-003/README.md) taxonomy/contracts · [parent TSD](../../TSD/ControlPanelERP_TSD.md)

## Legacy harvest

Rewritten from `_legacy/` (do not edit legacy packs):

- Epic-07 entire — Ontology Language docs, package Estimate + bindings, catalog API + UI
- Epic-05 / phase-01 / task-01 — ERP Map / section shell (nav context; ontology is a sibling surface, not a replacement)
