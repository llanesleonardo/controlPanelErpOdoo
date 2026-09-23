# Gap 04 — Ontology Manager (schema)

**Status:** first slice shipped (read-only Schema catalog); full Manager deferred

Palantir **Ontology Manager**: a schema catalog/editor where **types, links, actions, and icons** are defined and inspected. It is a Language browser — **not** a process flowchart of the whole business and **not** a live instance twin.

Inspiration: [Palantir Ontology system](https://www.palantir.com/docs/foundry/architecture-center/ontology-system/) (Language) · Foundry Ontology Manager.

## What we have

- Product-owned YAML under `packages/ontology/entity-types/`
- Read-only catalog API: `GET /ontology`, `GET /ontology/entity-types/:id`
- **`/ontology` → Schema tab** — Ontology Manager catalog: search types, counts, icon + inspector (properties / links / actions)
- Process map as a separate tab (curated workflow view)
- Docs for how to edit YAML offline ([OntologyDocs](../Components/OntologyDocs/README.md))

## What we don’t have (full Manager)

- Icon registry as a first-class schema field (today: heuristic glyphs in the UI)
- In-browser create/edit/delete of entity types (blocked by [Gap 03](./03-customer-authored-ontology.md) — v1 stays product-owned)
- Diff / publish / certification workflow for Language changes
- Binding inspector (which connector fields map to which properties)

## Why partial now / full later

Operators need a clear **schema catalog** without dumping every YAML link on a canvas. A read-only Manager slice unblocks that. Authoring + publish gates wait until Language ownership and certification rules are productized.

## Unblock later when

- Product needs governed Language PR/publish from the control plane, or
- Connector bindings must be inspectable next to each property

## First slice (this gap)

- Schema tab on `/ontology`: searchable entity-type catalog + inspector (properties, links, actions)
- Process map remains a separate view (curated workflow), not the schema editor

## Related

- [Gap 03 — Customer-authored ontology](./03-customer-authored-ontology.md)
- [Gap 06 — Vertex graph exploration](./06-vertex-graph-exploration.md)
- [ontology.md](../Development/ontology.md)
