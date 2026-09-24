# Epic-07 — Ontology Language (v1)

## Status

docs + package scaffold + catalog API (phase-01)

Adds a Palantir/Fabric-inspired **Ontology Language** above connectors: entity types, properties, links, and actions bound to taxonomy skills. No full graph engine.

**Depends on:** Epic-02 (contracts), Epic-05 (`sales.estimate.read`), Epic-06 docs (estimate issues as future Estimate action)

**Inspiration:** [Palantir Ontology](https://www.palantir.com/docs/foundry/architecture-center/ontology-system/) · [Fabric IQ Ontology](https://learn.microsoft.com/en-us/fabric/iq/ontology/overview)

## Goal

1. Document Ontology as Data · Logic · Action · Security (Language only in v1).  
2. Ship `packages/ontology` with **Estimate** + Odoo binding.  
3. Expose read-only NestJS catalog + thin Next.js `/ontology` browser.

## Locked defaults

- **Epic id:** `Epic-07`
- Ontology does **not** replace connectors, contracts, or governed skills
- Product-owned Language; no customer ontology SDK
- No instance graph / CDC / OSDK marketplace
- Auth: keep **dev-actor**
- Patterns first in each task TSD

## Patterns applied (epic-level)

| Concern | Pattern | Doc |
|---------|---------|-----|
| Business vocabulary | [Domain Model](../../../Software%20Patterns%20Docs/Data_domain_patterns/14-domain-model.md) | entity types |
| Control plane vs SoR | [Bounded Context](../../../Software%20Patterns%20Docs/Org_System_Engineering_patterns/02-bounded-context.md) | ontology vs Odoo |
| Vendor isolation | [Anti-Corruption Layer](../../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) | bindings |
| Intent/action route | [Semantic Routing](../../../Software%20Patterns%20Docs/AI_Agentic_patterns/12-semantic-routing.md) | NL/UI → action → skill |
| Edge catalog | [API Gateway](../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) + [BFF](../../../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md) | NestJS |
| UI | [Component-Based](../../../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md) | `/ontology` |

## Phase

| Phase | Focus |
|-------|--------|
| [phase-01](./phase-01/) | Language docs, package, catalog API + browser |

## Build order

1. Ontology Language docs + architecture wiring  
2. `packages/ontology` Estimate + Odoo binding + smoke  
3. Gateway `GET /ontology*` + Next.js ontology browser  

## Out of scope

- Full digital-twin / graph Engine  
- Customer-authored ontology  
- Replacing ERP Map  
- Live mutations beyond existing skill allowlist  

## Acceptance

- `docs/System_Design/Subsystem/SAC-006/README.md` + Epic-07 task packs exist  
- `packages/ontology` loads Estimate; smoke test passes  
- `GET /ontology` and `GET /ontology/entity-types/Estimate` work  
- `/ontology` page lists Estimate actions without vendor model names  
