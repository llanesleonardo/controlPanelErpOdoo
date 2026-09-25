# SAC-006 — Software Requirements (SRD)

Plain rules for the carbide-shop **business map** (ontology **hub**). Peer edges (SoA / data / logic) attach through bindings and allowlisted skills; **ERP** (Odoo) is **SoA peer #1**, not the hub and not the owner of every property. Local IDs use **SRD-ONT-***; they expand and align with parent [SRD-ONT](../../SRD/ControlPanelOntology_SRD.md), [SRD-UI-003](../../SRD/ControlPanelOntology_SRD.md), and [SRD-CONN-003](../../SRD/ControlPanelOntology_SRD.md).

## Scope

- Product-owned entity catalog (types, properties, links, actions) as the hub for edge interaction
- YAML package under `resources/packages/ontology/`
- Connector bindings for ACL use only (multi-peer under `bindings/<connector>/`)
- Read-only catalog APIs on the gateway
- `/ontology` tabs: Schema, Explorer, Vertex, Process map
- Action → skill → owning connector resolution (not hard-coded to ERP)

## Out of scope

- Full digital-twin / instance graph engine / CDC sync
- Customer-authored ontology SDK or browser YAML editing (v1)
- Replacing the home Map as the primary intent launcher
- Live mutations beyond the existing skill allowlist
- Returning vendor binding maps on public catalog responses

## Requirements

### SRD-ONT-001 — Product-owned entity catalog (hub)

The system SHALL expose a product-owned catalog of entity types with properties, links, and actions as the hub for edge interaction. Shops enable connectors and run skills; they do not invent new types in the browser.

*Parent:* **SRD-ONT-001**

### SRD-ONT-002 — Schema browse without YAML in the browser

The Schema tab SHALL let operators search and inspect types, properties, links, and actions without editing YAML in the browser (v1).

*Parent:* **SRD-ONT-002** · *UI:* **SRD-UI-003**

### SRD-ONT-003 — Vertex Search Around

Vertex SHALL let operators seed a type and **Search Around** (or equivalent expand) along declared links so neighborhoods grow without dumping the whole graph.

*Parent:* **SRD-ONT-003**

### SRD-ONT-004 — Curated Process map

Process map SHALL show the curated Estimate → … → Shipping (commercial / make / ship) spine — not every ontology link.

*Parent:* **SRD-ONT-004**

### SRD-ONT-005 — Package layout and Estimate seed

Entity types SHALL load from YAML under `resources/packages/ontology/entity-types/`. At minimum, type `Estimate` SHALL declare shop-facing properties, links (e.g. Contact / Quote), and actions bound to taxonomy skills (including `read` → `sales.estimate.read` via the ERP SoA peer when that binding owns the read).

### SRD-ONT-006 — Connector bindings stay ACL-side

Bindings under `resources/packages/ontology/bindings/<connector>/` SHALL map domain properties to vendor fields for adapter use only (Odoo and later peers). Public ontology catalog responses SHALL omit bindings and vendor model names.

*Aligns:* parent **SRD-SEC-005**; connector ACL in [SAC-005](../SAC-005/SRD.md)

### SRD-ONT-007 — Catalog APIs

The gateway SHALL provide:

- `GET /ontology` — list entity types (id, label, action summaries) without connector bindings  
- `GET /ontology/entity-types/:id` — properties, links, and actions for one type  

Responses SHALL use business vocabulary (`Estimate`), not vendor model names (e.g. not Odoo `sale.order`).

### SRD-ONT-008 — Explorer objects

`GET /ontology/objects` (Explorer) SHALL list objects for a selected entity type. For **Estimate**, when the live skill is available, objects SHALL come from `sales.estimate.read` through the ERP SoA connector with `source: live` (or a clear failure message). Other types MAY return labeled **demo** rows when no live read skill is allowlisted for their owning connector.

*Aligns:* parent **SRD-EST-002**

### SRD-ONT-009 — Actions bind to certified skills (any peer)

Ontology actions SHALL reference taxonomy skill codes from contracts and resolve to an owning connector via bindings — **not** hard-coded to a single SoA. Running an action SHALL go through the allowlisted skills path — never invent a new tool from natural language.

*Aligns:* parent **SRD-ONT-005**, **SRD-SEC-001**, **SRD-SEC-002**, **SRD-EDGE-001**

### SRD-ONT-010 — Ontology does not replace the Map

The Ontology browser SHALL be a nav-linked surface for vocabulary and visuals. Day-to-day intent picking remains Map / section pages ([SAC-002](../SAC-002/README.md)).

*Aligns:* parent **SRD-UI-001**, **SRD-UI-003**

### SRD-ONT-011 — Language pillars (v1)

Docs and product SHALL treat Ontology Language as **Data · Logic · Action · Security** framing, while deferring a full graph **Engine**, marketplace OSDK, and customer-authored Language.

### SRD-ONT-012 — Property / binding ownership visible

Operators SHALL be able to inspect which connector owns a property or binding (ERP SoA peer #1 or another peer) so ERP is not assumed to own every field. Aligns with parent **SRD-CONN-003** and [SAC-005 SRD-PEER-005](../SAC-005/SRD.md).

*Scenario:* [OPS-022](./Scenarios/OPS-022.md)

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-ONT-001, 002, 004, 005, 007, 010, 011 | [OPS-004](./Scenarios/OPS-004.md) | [TP-OPS-004](../../TestPlans/OPS-004/TP-OPS-004.md) |
| SRD-ONT-008 (+ parent SRD-EST-002) | [OPS-005](./Scenarios/OPS-005.md) | [TP-OPS-005](../../TestPlans/OPS-005/TP-OPS-005.md) |
| SRD-ONT-003, 005, 006 | [OPS-006](./Scenarios/OPS-006.md) | [TP-OPS-006](../../TestPlans/OPS-006/TP-OPS-006.md) |
| SRD-ONT-004 | [OPS-021](./Scenarios/OPS-021.md) | [TP-OPS-021](../../TestPlans/OPS-021/TP-OPS-021.md) |
| SRD-ONT-009 | [OPS-013](../SAC-004/Scenarios/OPS-013.md) | [TP-OPS-013](../../TestPlans/OPS-013/TP-OPS-013.md) |
| SRD-ONT-012 | [OPS-022](./Scenarios/OPS-022.md) | [TP-OPS-022](../../TestPlans/OPS-022/TP-OPS-022.md) |
| SRD-ONT-009 (actions visible) | OPS-004 / OPS-005 | same plans |
