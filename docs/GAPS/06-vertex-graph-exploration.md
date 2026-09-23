# Gap 06 — Vertex-style graph exploration

**Status:** first slice shipped (type-level Search Around + local templates); instance graphs deferred

Palantir **Vertex**: start from a **seed** object, **Search Around** along links, style nodes/edges by type or property, and **save graph templates**. Layout is interactive (expand neighborhood, hide noise, layers). Cause/effect graphs are curated — not “render every YAML edge at once.”

## What we have

- React Flow **process view** of entity **types** with a fixed business spine (Estimate → Quote → Sales → …)
- **`/ontology` → Vertex tab** — seed a type, Search Around (outbound + inbound schema links), optional link filter, double-click expand
- Saved **graph templates** in browser localStorage (seed + visible node set)
- Curated process edges on Process map tab (avoids spaghetti)
- Detail panel for actions (not on the process canvas)

## What we don’t have

- Seed-from-**instance** + Search Around over live links ([Gap 01](./01-full-graph-engine.md) / [Gap 05](./05-object-explorer-instances.md))
- Style-by-property / style-by-state (needs instances or live metrics)
- Server-side / shareable templates; embed in Workshop ([Gap 08](./08-workshop-quiver-domain-uis.md))
- Cause/effect simulation overlays
- Layer styling packs beyond monochrome icons

## Why partial now / full later

Type-level Search Around teaches the Vertex interaction model without waiting for the Engine. Instance graphs and simulation remain multi-epic.

## Unblock later when

- Operators need ad-hoc instance traversal, or
- Gap 01 enables instance-backed Vertex graphs

## First slice (this gap)

- Vertex tab: seed → Search Around → local templates
- Process map remains the fixed workflow spine

## Related

- [Gap 04 — Ontology Manager](./04-ontology-manager-schema.md)
- [Gap 05 — Object Explorer](./05-object-explorer-instances.md)
- [Gap 01 — Full graph engine](./01-full-graph-engine.md)
