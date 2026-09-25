# SAC-006 - Business map - ontology hub and visuals

The shop picture in plain words: **estimates**, **orders**, **inventory**, **make**, **inspect**, **ship** (plus drawings / QC) — browsable as Schema, Explorer, Vertex, and Process map. This is the product-owned **Ontology Language** (entity types, properties, links, actions → certified skills). It is the **hub**; it does **not** replace peer edges or invent free-form tools. **ERP is SoA peer #1**, not the owner of every property.

v1 is **repo YAML** under [`resources/packages/ontology`](../../../../resources/packages/ontology/) (`entity-types/`, `bindings/`, `catalog/connectors.yaml`). Operators browse; builders edit files and reload the gateway. **Robust enough** without a twin: see [Capability_Model](../../TSD/Capability_Model.md). No customer ontology SDK (GAP-03). Replicating for another company means new types/bindings — same hub surfaces.

## What you get

| Piece | Job |
|-------|-----|
| Schema | Search and inspect types, properties, links, actions (read-only in the browser) |
| Explorer | List objects for a type — **live** Estimate rows via the ERP SoA peer when connected; other types may show labeled demo rows |
| Vertex | Seed a type and **Search Around** along declared links (no spaghetti whole-graph dump) |
| Process map | Curated commercial → make → ship spine (not every link) |
| Catalog APIs | `GET /ontology`, `GET /ontology/entity-types/:id`, `GET /ontology/objects` — no vendor bindings in responses |
| Ownership | Inspect which connector owns a property/binding (OPS-022) |
| Package | Entity YAML + bindings per connector (ACL-only) + smoke tests |

Map / section intents ([SAC-002](../SAC-002/README.md)) remain how you **run** skills day to day. Ontology is the shared vocabulary and hub — not a replacement home screen.

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for the business map |
| [TSD.md](./TSD.md) | Package layout, gateway APIs, UI tabs |
| [TRACE.md](./TRACE.md) | Requirement to scenario to test |
| [Scenarios/OPS-004.md](./Scenarios/OPS-004.md) | Browse Schema |
| [Scenarios/OPS-005.md](./Scenarios/OPS-005.md) | Search objects in Explorer |
| [Scenarios/OPS-006.md](./Scenarios/OPS-006.md) | Expand related types in Vertex |
| [Scenarios/OPS-021.md](./Scenarios/OPS-021.md) | Walk Estimate→…→Ship Process spine |
| [Scenarios/OPS-022.md](./Scenarios/OPS-022.md) | Inspect connector ownership of properties |

**Shop how-to:** [Business map](../../../User_Guide/Business_map/README.md)  
**Related:** [SAC-005](../SAC-005/README.md) connectors · [SAC-003](../SAC-003/README.md) taxonomy/contracts · [Component_Map](../../TSD/Component_Map.md) · [parent TSD](../../TSD/ControlPanelOntology_TSD.md)
