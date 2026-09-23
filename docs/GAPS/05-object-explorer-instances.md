# Gap 05 — Object Explorer (instances)

**Status:** first slice shipped (live Estimate + demo stubs); full Engine deferred

Palantir **Object Explorer**: search/filter **live objects** (e.g. Estimate `#123`), open **saved layouts** (property charts, linked charts, maps, lists). Arrangement is designed per object type or exploration — not a force-directed dump of every link.

Full instance twin still depends on [Gap 01 — Full graph engine](./01-full-graph-engine.md).

Inspiration: Foundry Object Explorer.

## What we have

- Type-level catalog and process map on `/ontology`
- **`/ontology` → Explorer tab** — pick entity type, search/filter, list + property layout
- BFF `GET /ontology/objects?entity_type=&q=&limit=` — live via `sales.estimate.read` when allowlisted; otherwise **demo** rows from schema properties
- Saved explorations in **browser localStorage** (name, type, query)
- Skills that read SoR rows (e.g. `sales.estimate.read`) via governed execution

## What we don’t have

- Cross-type searchable instance index / digital twin ([Gap 01](./01-full-graph-engine.md))
- Live reads for types beyond Estimate (execute allowlist)
- Instance-resolved linked objects (only schema link targets today)
- Server-persisted layouts, property charts, comparable object sets
- Bulk actions from an exploration list

## Why partial now / full later

Operators need an Explorer-shaped surface before the Engine exists. Live Estimate proves the BFF path; demos keep other types browsable without expanding the allowlist prematurely.

## Unblock later when

- Gap 01 provides instance identity + links, or
- Additional read skills are certified onto the execute allowlist

## First slice (this gap)

- Explorer tab + `GET /ontology/objects`
- Live Estimate / demo elsewhere
- Local saved explorations

## Related

- [Gap 01 — Full graph engine](./01-full-graph-engine.md)
- [Gap 06 — Vertex graph exploration](./06-vertex-graph-exploration.md)
- [governed-execution](../Development/governed-execution.md)
