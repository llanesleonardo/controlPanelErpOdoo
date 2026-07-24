# Epic-06 — Connector model + estimate issues

## Status

docs-in-progress (phase-01 task packs drafted; **implementation not started**)

Locks the **multi-connector product model** (Odoo = first-party connector #1) and delivers the first outcome wedge on that connector: **estimate issues** (find → persist → list/dismiss).

**Depends on:** Epic-02 (contracts), Epic-03 (gateway/web), Epic-04 (Odoo connector + dry-run), Epic-05 (ERP map + `sales.estimate.read`)

## Goal

1. Document and align the system on a **product-owned connector catalog** — customers configure connectors; we ship them one by one with different auth/payloads/modules behind a shared SPI.  
2. Implement **estimate issues** on the Odoo connector without leaking `customer.estimate` into UI contracts.

## Locked defaults

- **Epic id:** `Epic-06`
- **Product framing:** control plane is multi-system; **Odoo is not the product** — it is connector `odoo`
- **Connector ownership:** first-party only; no customer-built adapters in this epic
- **Ship order:** deepen Odoo; do **not** implement a second production connector here (optional mock registry entry allowed only to prove SPI)
- **Domain language:** taxonomy intents; vendor models only inside adapters
- **Estimate issues:** read/diagnose path + control-plane persistence; live mutations still gated
- **Auth:** keep **dev-actor** (`X-Actor-Id`) for Epic-06 implementation; full auth/RBAC + multi-tenant are specified in [platform-concerns.md](../platform-concerns.md) and must land before multi-customer prod
- **Edge:** NestJS is the API gateway — no second app gateway
- **Patterns first:** cite patterns in each task TSD

## Patterns applied (epic-level)

| Concern | Pattern | Doc |
|---------|---------|-----|
| Operator UI | [Client-Server](../../Software%20Patterns%20Docs/Architectural%20Patterns/01-client-server.md) + [Component-Based](../../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md) | Next.js `apps/web` |
| Isolate vendor models | [Anti-Corruption Layer](../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) | ports ↔ connectors |
| Pluggable SoRs | [Adapter](../../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md) | per-connector adapters |
| Skill core vs infra | [Hexagonal Architecture](../../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md) | facade → ports |
| Edge BFF | [API Gateway](../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) + [BFF](../../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md) | NestJS |
| AuthZ | [RBAC](../../Software%20Patterns%20Docs/Security_patterns/02-rbac.md) + [PEP](../../Software%20Patterns%20Docs/Security_patterns/16-policy-enforcement-point.md) | gateway |
| Tenancy | [Multi-Tenant Partitioning](../../Software%20Patterns%20Docs/Data_domain_patterns/21-multi-tenant-partitioning.md) | Postgres CP |
| Connector readiness | [Health Checks](../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/09-health-checks.md) | per connector |
| Vendor faults | [Retry with Backoff](../../Software%20Patterns%20Docs/Distributed_system_patterns/04-retry-with-backoff.md) + [Circuit Breaker](../../Software%20Patterns%20Docs/Distributed_system_patterns/02-circuit-breaker.md) | orchestrator |
| Approvals | [Human-in-the-Loop](../../Software%20Patterns%20Docs/AI_Agentic_patterns/09-human-in-the-loop.md) | commit path |
| Trace | [Correlation Identifier](../../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md) | gateway → orch |
| Evidence | [Observability](../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md) | issues + evidence |

See also [connectors.md](../connectors.md), [system-design.md](./system-design.md), and [pattern-map.md](../pattern-map.md).

## Phase

| Phase | Focus |
|-------|--------|
| [phase-01](./phase-01/) | Connector SPI docs/registry + estimate issues path |

## Build order

1. **Connector SPI & catalog framing** — product docs, capability matrix concept, Odoo as `connector_id=odoo`  
2. **Find & persist estimate issues** — orchestrator diagnose/read → gateway → Postgres  
3. **Issues UI list/dismiss** — operator surface on Estimates section  

## Out of scope

- Second production connector (SAP, Shopify, …)  
- Customer-built connector SDK  
- Live estimate create/update/cancel  
- Full SSO/RBAC  
- OpenClaw required for estimate issues (optional client only)  

## Acceptance

- Architecture + Components docs describe multi-connector, first-party catalog.  
- Epic-06 task packs exist with pattern citations.  
- Estimate issues: find → store → list/dismiss on control-plane DB.  
- Vendor model names stay in adapters; UI uses taxonomy / issue DTOs.  
- No secrets committed.
