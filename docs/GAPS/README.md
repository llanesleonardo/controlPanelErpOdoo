# Gaps (deferred by design)

Intentional product/architecture gaps — **not bugs**. Track what we have today vs what a Palantir/Fabric-scale ontology + full product wedge would add later.

## Engine & ownership

| Gap | Summary | Status |
|-----|---------|--------|
| [01 — Full graph engine](./01-full-graph-engine.md) | Live instance twin, sync/CDC, path queries | Deferred |
| [02 — Epic-06 estimate-issues execution](./02-epic-06-estimate-issues-execution.md) | Find/persist/dismiss running code + UI | Docs only; not implemented |
| [03 — Customer-authored ontology](./03-customer-authored-ontology.md) | Self-serve / marketplace ontology SDK | Deferred (v1 product-owned) |

## Visual exploration (Palantir-inspired)

Layout is mostly **exploration + curated views**, not one global algorithm that auto-arranges types into Estimate→Quote→SO. Position often has no semantic meaning unless the view is geospatial or a curated process diagram.

| Gap | Summary | Status |
|-----|---------|--------|
| [04 — Ontology Manager (schema)](./04-ontology-manager-schema.md) | Types / links / actions / icons catalog (not a process flowchart) | First slice shipped (read-only) |
| [05 — Object Explorer (instances)](./05-object-explorer-instances.md) | Search/filter objects; saved layouts & charts | First slice shipped (Estimate live + demos) |
| [06 — Vertex graph exploration](./06-vertex-graph-exploration.md) | Seed + Search Around; saved graph templates | First slice shipped (type-level) |
| [07 — Geospatial maps](./07-geospatial-maps.md) | Objects on geography vs process order | Deferred |
| [08 — Workshop / Quiver domain UIs](./08-workshop-quiver-domain-uis.md) | Author-composed apps & chart analyses | Deferred |

### Visual “logic” (reference)

| Layer | Logic |
|-------|--------|
| Model | Nouns + links + actions (data · logic · action · security) |
| Default visual | Start small → expand links (search-around); don’t render the full graph |
| Readable visual | Humans save templates/layouts for a workflow |
| Meaning of position | Often none (force/manual) unless geospatial or curated process |

Isometric icons are **visual language** (object-type identity), not evidence of an automatic business-sequence layout engine.

## Related

- [Development/ontology](../Development/ontology.md)
- [Epic-06](../Development/Epic-06/README.md)
- [Epic-07](../Development/Epic-07/README.md)
- [governed-execution](../Development/governed-execution.md)
