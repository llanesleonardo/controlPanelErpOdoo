# Gap 08 — Workshop / Quiver–style domain UIs

**Status:** deferred by design

Palantir **Workshop** (composed operational apps) and **Quiver** (chart-centric analysis): author-chosen composition of widgets, charts, and actions on top of the Ontology — not a global auto-layout of types.

## What we have

- Section pages + intent rail (e.g. Sales) wired to certified skills
- Console / tasks / logs for ops visibility
- Ontology schema + process map (Language browser)

## What we don’t have

- No-code app builder composing ontology widgets
- Quiver-like multi-dimensional chart explorations over object sets
- Publishable analysis notebooks bound to ontology objects
- Embeddable graph templates from Vertex into Workshop modules ([Gap 06](./06-vertex-graph-exploration.md))

## Why deferred

v1 ships **product-built** section UIs + governed skills. A customer-facing builder and analysis studio is a separate product surface after Language + Engine + Explorer mature.

## Unblock later when

- Multiple wedges need the same composable widget kit, or
- Customers must author operational apps without engineering

## Related

- [Gap 05 — Object Explorer](./05-object-explorer-instances.md)
- [Gap 06 — Vertex graph exploration](./06-vertex-graph-exploration.md)
- [governed-execution](../Development/governed-execution.md)
