# Business map — Schema, Explorer, Vertex

The **business map** (ontology) is how the shop’s work is named: estimates, inventory, manufacturing, people, quality, shipping — linked together and tied to **certified skills** only.

Open **Ontology** in the app (`/ontology`).

## Tabs

| Tab | What it is for |
|-----|----------------|
| **Schema** | Browse types, properties, links, and actions (read-only in v1) |
| **Explorer** | Search objects — live estimates from the ERP when connected; other types may show demo data |
| **Vertex** | Start from a type and **Search Around** along related types |
| **Process map** | Curated commercial / shop spine (estimate → order → make → ship) |

## Changing the map (builders)

v1 is **product-owned**: edit YAML under `resources/packages/ontology/`, bindings under `bindings/<connector>/`, register skills in contracts, reload the gateway. The Schema tab does **not** invent new types in the browser.

## Practice

- [OPS-004](../../System_Design/Subsystem/SAC-006/Scenarios/OPS-004.md) browse Schema  
- [OPS-005](../../System_Design/Subsystem/SAC-006/Scenarios/OPS-005.md) Explorer  
- [OPS-006](../../System_Design/Subsystem/SAC-006/Scenarios/OPS-006.md) Vertex  

Gaps / residuals: [Risks](../../System_Design/Subsystem/Risks.md). Design: [SAC-006](../../System_Design/Subsystem/SAC-006/README.md).
