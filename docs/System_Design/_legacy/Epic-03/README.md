# Epic-03 — Ops surfaces

## Status

done (Epic-03 phase-01 ops surfaces)

Implements [Epic-01 Phase 03](../Epic-01/phase-03/) ops surfaces: structured logging, rate limiting, request console, and task queue on NestJS gateway + Next.js web.

**Upstream docs:** Epic-01 Phase 03 (docs-complete)  
**Foundation:** Epic-02 contracts package + Postgres Compose

## Phase

| Phase | Focus |
|-------|--------|
| [phase-01](./phase-01/) | Ops surfaces implementation |

## Patterns applied

- [API Gateway](../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md)
- [Rate Limiting](../../../Software%20Patterns%20Docs/Distributed_system_patterns/18-rate-limiting.md)
- [Correlation Identifier](../../../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md)
- [Observability](../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md)

## Auth note

Full RBAC is deferred. Temporary **dev-actor** via `X-Actor-Id` (default `dev-operator`).

## Out of scope

- Nest/FastAPI Odoo adapters, real login/RBAC, orchestrator skill execution
