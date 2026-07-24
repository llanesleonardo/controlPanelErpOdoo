# Estimate issues find & persist — Technical Specification Document (TSD)

**Status:** not started  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Find estimate issues via connector `odoo` and persist in control-plane DB.

## Patterns applied

- [Anti-Corruption Layer](../../../../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md)
- [Hexagonal Architecture](../../../../../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md)
- [Facade](../../../../../Software%20Patterns%20Docs/Structural%20Patterns/Facade.md)
- [API Gateway](../../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md)
- [Correlation Identifier](../../../../../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md)
- [Observability](../../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md)

## Stack

| Piece | Choice |
|-------|--------|
| Gateway | NestJS route(s) for find + list (list may land with task-03) |
| Orchestrator | Skill/facade path → EstimatePort diagnose/search |
| Adapter | Existing Odoo estimate adapter (`customer.estimate`) |
| DB | New `EstimateIssue` (or equivalent) table in control-plane Postgres |
| Connector | `odoo` only |

## Notes

- Prefer upsert-by-signature so repeated finds do not duplicate open issues blindly.  
- Reuse Epic-05 allowlist discipline; add a dedicated skill code when contracts are extended.
