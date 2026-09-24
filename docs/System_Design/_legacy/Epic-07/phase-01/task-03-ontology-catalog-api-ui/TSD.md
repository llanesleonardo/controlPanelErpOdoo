# Ontology catalog API + UI — TSD

**Status:** implemented  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Patterns

- [API Gateway](../../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md)
- [BFF](../../../../../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md)
- [Component-Based Architecture](../../../../../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md)

## Stack

| Piece | Choice |
|-------|--------|
| Gateway | `OntologyModule` — controller + service loading `@control-panel-erp/ontology` |
| Web | `apps/web/app/ontology/page.tsx` |
| Nav | AppShell link to `/ontology` |
