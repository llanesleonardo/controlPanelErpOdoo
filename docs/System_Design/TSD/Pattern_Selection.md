# Pattern selection — Control Panel (agent entry)

**Read this file first** when choosing how to structure ControlPanelOntology code. Do **not** dump the whole synced library into context. This is how we get **Foundry-class** outcomes (hub, edges, ACL, allowlists) via **best practices** — not by cloning a vendor product.

Primary diagram: [Component_Map](./Component_Map.md) · Ontology UI: [SAC-006](../Subsystem/SAC-006/README.md) · ConOps: [ControlPanelOntology_ConOps](../ConOps/ControlPanelOntology_ConOps.md) · Risks: [Risks](../Subsystem/Risks.md)

## How to browse

| Lens | Use |
|------|-----|
| **Impact** | [Impact tiers](#impact-tiers) — what this product commits to |
| **Risk** | [Risk → Pattern](#risk--pattern) — what breaks if we get it wrong |
| **Difficulty** | **Diff** column: D1 easy here → D2 wiring/policy → D3 cross-cutting / deferred |
| **Type (library)** | Open **one** file under [Software Patterns Docs](../../Software%20Patterns%20Docs/) category folders |
| **Recognition examples** | [`recognition_examples/`](../../Software%20Patterns%20Docs/recognition_examples/INDEX.md) — short risk → pattern → 3 examples (by category file) |
| **Composition problems** | [`composition_problems/`](../../Software%20Patterns%20Docs/composition_problems/INDEX.md) — multi-pattern systems; `concerns/` = lenses; `exercises/` = drills (**skip** for product implementation) |

### Agent load order

```text
1. This file (tiers / risk / Diff)
2. One linked pattern .md from a row below
3. Optional: one recognition-examples file OR one composition problem/concern
4. Never: whole library tree, whole composition_problems tree, or exercises/
```

Rule of thumb: **name the risk → smallest pattern → prefer D1/D2 → open that pattern file → add layers only when a new risk appears.**

### Diff scale (this monorepo)

| Tag | Meaning |
|-----|---------|
| **D1** | Clear recipe already in stubs / shipped path |
| **D2** | Real wiring + policy judgment |
| **D3** | Cross-cutting, deferred, or easy to get wrong |

---

## Impact tiers

Rows within each tier ordered **D1 → D3**.

### Tier 0 — Must use now

| Pattern | Diff | Where | Doc |
|---------|------|-------|-----|
| Client-Server | D1 | UI → gateway only | [01-client-server](../../Software%20Patterns%20Docs/Architectural%20Patterns/01-client-server.md) |
| BFF | D1 | NestJS for Next.js (+ agents) | [21-backend-for-frontend-bff](../../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md) |
| API Gateway | D1 | Sole app API entry | [01-api-gateway](../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) |
| Database per Service | D1 | Control-plane Postgres ≠ any edge DB | [32-database-per-service](../../Software%20Patterns%20Docs/Distributed_system_patterns/32-database-per-service.md) |
| Component-Based UI | D1 | Next.js App Router surfaces | [06-component-based-architecture](../../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md) |
| Facade | D2 | Orchestrator skill entry | [Facade](../../Software%20Patterns%20Docs/Structural%20Patterns/Facade.md) |
| Hexagonal | D2 | Orch core ↔ ports ↔ connectors | [05-hexagonal-architecture](../../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md) |
| ACL + Adapter | D2 | Vendor models stay in connector | [15-anti-corruption-layer](../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) · [Adapter](../../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md) |
| Allowlist + PEP | D2 | Gateway skill gate | [16-policy-enforcement-point](../../Software%20Patterns%20Docs/Security_patterns/16-policy-enforcement-point.md) |

### Tier 1 — Current slices

| Pattern | Diff | Where | Doc |
|---------|------|-------|-----|
| Rate Limiting | D1 | Gateway edge | [18-rate-limiting](../../Software%20Patterns%20Docs/Distributed_system_patterns/18-rate-limiting.md) |
| Correlation Id | D1 | `X-Correlation-Id` | [19-correlation-identifier](../../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md) |
| Domain Model | D2 | Ontology entity types | [14-domain-model](../../Software%20Patterns%20Docs/Data_domain_patterns/14-domain-model.md) |
| Semantic Routing | D2 | Action / NL → skill code | [12-semantic-routing](../../Software%20Patterns%20Docs/AI_Agentic_patterns/12-semantic-routing.md) |
| Human-in-the-Loop | D2 | Approvals before risky commit | [09-human-in-the-loop](../../Software%20Patterns%20Docs/AI_Agentic_patterns/09-human-in-the-loop.md) |
| Bounded Context | D2 | Control plane vs each edge / connector | [02-bounded-context](../../Software%20Patterns%20Docs/Org_System_Engineering_patterns/02-bounded-context.md) |
| Adapter catalog | D2 | First-party SoA/data/logic peers (ERP = peer #1) | [Adapter](../../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md) · SAC-005 |

### Tier 2 — Designed / partial

| Pattern | Diff | Where | Doc |
|---------|------|-------|-----|
| Secrets Vault | D1 | Env now → vault later | [12-secrets-vault](../../Software%20Patterns%20Docs/Security_patterns/12-secrets-vault.md) |
| Retry / Timeout / Fallback | D2 | Connector calls; `simulate` | [04-retry-with-backoff](../../Software%20Patterns%20Docs/Distributed_system_patterns/04-retry-with-backoff.md) · [03-timeout](../../Software%20Patterns%20Docs/Resilience_Pattern/03-timeout.md) · [07-fallback](../../Software%20Patterns%20Docs/Resilience_Pattern/07-fallback.md) |
| RBAC / JWT | D2 | Replace `X-Actor-Id` | [02-rbac](../../Software%20Patterns%20Docs/Security_patterns/02-rbac.md) · [08-jwt](../../Software%20Patterns%20Docs/Security_patterns/08-jwt.md) |
| Circuit Breaker | D3 | Standardize per connector | [02-circuit-breaker](../../Software%20Patterns%20Docs/Distributed_system_patterns/02-circuit-breaker.md) |
| Multi-Tenant Partitioning | D3 | `tenant_id` on CP data | [21-multi-tenant-partitioning](../../Software%20Patterns%20Docs/Data_domain_patterns/21-multi-tenant-partitioning.md) |

### Tier 3 — Later / out of scope

| Pattern | Diff | Why deferred |
|---------|------|----------------|
| Full Ontology Engine / CDC twin | D3 | [Gap 01](../Subsystem/Risks.md) |
| Customer Adapter plugins | D3 | First-party connectors only |
| Micro Frontends / Redux-by-default | D3 | Single Next.js app |
| Event Sourcing / full CQRS / Saga | D3 | Overkill until multi-edge (cross-peer) commits |
| Redis / Service Mesh | D3 | Add only if multi-replica need appears |

---

## Risk → Pattern

Shop / control-plane risks. Prefer **D1/D2** unless the risk requires **D3**.

| Risk (what goes wrong) | Pattern(s) | Diff | SAC | Analog (optional) |
|------------------------|------------|------|-----|-------------------|
| UI / SDK talks to vendor APIs directly | Client-Server + BFF + API Gateway | D1 | SAC-001 / SAC-002 | OPS-017, 019 |
| Control-plane shares an edge DB | Database per Service | D1 | SAC-009 | — |
| Secrets in git / images | Secrets Vault (env → vault) | D1 | SAC-009 | — |
| Free-form NL invents edge writes | Allowlist + Semantic Routing + PEP | D2 | SAC-001 / SAC-003 / SAC-004 | OPS-020 |
| Vendor models leak into UI | ACL + Adapter + Bounded Context | D2 | SAC-005 / SAC-006 | — |
| All actions hard-coded to ERP | Connector catalog + binding ownership | D2 | SAC-004 / SAC-005 / SAC-006 | OPS-013, 022 |
| Second SoA needs a special-case product | Same SPI + Integrations catalog | D2 | SAC-005 | OPS-014 |
| Data/logic edges bypass ontology | Action → skill → connector only | D2 | SAC-004 / SAC-005 | OPS-015, 016 |
| Risky write with no preview | Dry-run + Approval (Facade skill path) | D2 | SAC-007 | OPS-002, 003 |
| Automation bypasses allowlist | Same skill path as humans | D2 | SAC-007 / SAC-001 | OPS-018 |
| Ontology browser invents types | Product-owned Domain Model YAML | D2 | SAC-006 | — |
| Connector outage takes down panel | Circuit Breaker + Timeout + Fallback | D3 | SAC-004 / SAC-005 | Resilience examples |
| Tenant data bleed (later) | Multi-Tenant Partitioning + RBAC | D3 | SAC-001 | — |

Library risk-first philosophy (examples are **another product**): [risk-driven-patterns.md](../../Software%20Patterns%20Docs/risk-driven-patterns.md) — use for method, not as ControlPanelOntology requirements.

---

## Detail by area

Patterns from the library that **match this control plane**. Prefer these over inventing new structure.

## Core (must use)

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Client-Server](../../Software%20Patterns%20Docs/Architectural%20Patterns/01-client-server.md) | Next.js UI → NestJS gateway | Architectural |
| [Component-Based Architecture](../../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md) | Next.js App Router UI (`AppShell`, ERP grid, intent rail, ontology tabs) | Frontend |
| [API Gateway](../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) | NestJS `apps/gateway` — sole app entry | Distributed |
| [Backend-for-Frontend](../../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md) | NestJS shaped for Next.js (+ future agents); `/ontology/objects` | Architectural |
| [Hexagonal Architecture](../../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md) | Orchestrator core ↔ ports ↔ connectors | Architectural |
| [Anti-Corruption Layer](../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) | Domain language vs vendor models | Distributed |
| [Adapter](../../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md) | Per first-party connector | Structural |
| [Facade](../../Software%20Patterns%20Docs/Structural%20Patterns/Facade.md) | Skill execution entry on orchestrator | Structural |
| [Database per Service](../../Software%20Patterns%20Docs/Distributed_system_patterns/32-database-per-service.md) | Control-plane Postgres ≠ peer / binder-owned DBs | Distributed |
| [Bounded Context](../../Software%20Patterns%20Docs/Org_System_Engineering_patterns/02-bounded-context.md) | Control plane vs each peer edge / connector | Org / DDD |
| [Domain Model](../../Software%20Patterns%20Docs/Data_domain_patterns/14-domain-model.md) | Ontology entity types (`Estimate`, …) | Data |

## Ontology Language (`resources/packages/ontology`)

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Domain Model](../../Software%20Patterns%20Docs/Data_domain_patterns/14-domain-model.md) | Entity types, properties, links | Data |
| [Bounded Context](../../Software%20Patterns%20Docs/Org_System_Engineering_patterns/02-bounded-context.md) | Ontology vs connector peer models | Org / DDD |
| [Anti-Corruption Layer](../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) | Bindings stay connector-private | Distributed |
| [Semantic Routing](../../Software%20Patterns%20Docs/AI_Agentic_patterns/12-semantic-routing.md) | Action → skill code | AI |
| Allowlist | Live Explorer / execute only for certified skills (e.g. `sales.estimate.read`) | Security / Reliability |

See [SAC-006](../Subsystem/SAC-006/README.md), [Component_Map](./Component_Map.md), [Gaps 04–06](../Subsystem/Risks.md).

## Ontology UI (`/ontology`)

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Component-Based Architecture](../../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md) | `OntologyManager`, `OntologyObjectExplorer`, `OntologyVertex`, process flow map | Frontend |
| [BFF](../../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md) | Catalog + `GET /ontology/objects` (live Estimate or demo) | Architectural |
| [Observer](../../Software%20Patterns%20Docs/Frontend_patterns/08-observer.md) | Explorer/Vertex react to selection + Search Around | Frontend |
| [State Container](../../Software%20Patterns%20Docs/Frontend_patterns/09-state-container.md) | Tab view, local saved explorations / graph templates | Frontend |
| Progressive disclosure | Schema vs Explorer vs Vertex vs Process — start small, expand | Frontend UX |

**Non-goals for ontology UI:** auto-layout of every YAML link; customer-authored schema editor; geospatial / Workshop builders ([Gaps 07–08](../Subsystem/Risks.md)).

## Next.js control panel (`apps/web`)

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Client-Server](../../Software%20Patterns%20Docs/Architectural%20Patterns/01-client-server.md) | Browser/Next.js client; never talks to Odoo/orchestrator directly | Architectural |
| [Component-Based Architecture](../../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md) | Section pages, ERP map tiles, intent rail, live output, ontology tabs | Frontend |
| [Observer](../../Software%20Patterns%20Docs/Frontend_patterns/08-observer.md) | UI reacts to gateway fetch / task status updates | Frontend |
| [State Container](../../Software%20Patterns%20Docs/Frontend_patterns/09-state-container.md) | Local UI state for rails, filters, live tables (keep light; no Redux required) | Frontend |
| [BFF](../../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md) | Next.js consumes NestJS as its backend-for-frontend | Architectural |
| Progressive disclosure | Main menu + intents rail only on `/sections/*` (Epic-05); ontology tabs (Epic-07) | Frontend UX |

**Non-goals for web:** Micro Frontends, Redux-by-default, embedding Odoo UI.

## Security & tenancy

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [RBAC](../../Software%20Patterns%20Docs/Security_patterns/02-rbac.md) | Roles → skills / approvals | Security |
| [JWT](../../Software%20Patterns%20Docs/Security_patterns/08-jwt.md) / session | NestJS auth (replace `X-Actor-Id`) | Security |
| [Policy Enforcement Point](../../Software%20Patterns%20Docs/Security_patterns/16-policy-enforcement-point.md) | Gateway allowlist + tenant checks | Security |
| [Secrets Vault](../../Software%20Patterns%20Docs/Security_patterns/12-secrets-vault.md) | Connector credentials (env → vault later) | Security |
| [Defense in Depth](../../Software%20Patterns%20Docs/Security_patterns/09-defense-in-depth.md) | Auth + allowlist + dry-run + approval | Security |
| [Multi-Tenant Partitioning](../../Software%20Patterns%20Docs/Data_domain_patterns/21-multi-tenant-partitioning.md) | `tenant_id` on CP data | Data |

## Resilience & traffic

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Retry with Backoff](../../Software%20Patterns%20Docs/Distributed_system_patterns/04-retry-with-backoff.md) | Orchestrator → vendor APIs | Distributed |
| [Circuit Breaker](../../Software%20Patterns%20Docs/Distributed_system_patterns/02-circuit-breaker.md) | Per connector instance | Distributed |
| [Timeout](../../Software%20Patterns%20Docs/Resilience_Pattern/03-timeout.md) | Outbound connector calls | Resilience |
| [Idempotency](../../Software%20Patterns%20Docs/Distributed_system_patterns/20-idempotency.md) | Skill / write executions | Distributed |
| [Rate Limiting](../../Software%20Patterns%20Docs/Distributed_system_patterns/18-rate-limiting.md) | NestJS edge (Epic-03) | Distributed |
| [Bulkhead](../../Software%20Patterns%20Docs/Distributed_system_patterns/05-bulkhead.md) | Isolate connectors / pools | Distributed |
| [Fail Fast](../../Software%20Patterns%20Docs/Resilience_Pattern/05-fail-fast.md) | Contract + allowlist rejection | Resilience |
| [Fallback](../../Software%20Patterns%20Docs/Resilience_Pattern/07-fallback.md) | `simulate` mode when peer edge down; Explorer demo stubs when skill not allowlisted | Resilience |
| [Graceful Degradation](../../Software%20Patterns%20Docs/Resilience_Pattern/06-graceful-degradation.md) | Read-only / simulate when connector open | Resilience |

## Observability & delivery

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Observability](../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md) | Evidence, audits, metrics | DevOps |
| [Centralized Logging](../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/07-centralized-logging.md) | Structured logs → console `/logs` | DevOps |
| [Distributed Tracing](../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/08-distributed-tracing.md) | Trace across gateway → orch | DevOps |
| [Correlation Identifier](../../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md) | `X-Correlation-Id` | Messaging |
| [Health Checks](../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/09-health-checks.md) | Gateway, orch, connector test | DevOps |
| [Infrastructure as Code](../../Software%20Patterns%20Docs/Cloud_infra_patterns/08-infrastructure-as-code.md) | Docker Compose definitions | Cloud |
| [Stateless Services](../../Software%20Patterns%20Docs/Cloud_infra_patterns/01-stateless-services.md) | Gateway / orch (state in Postgres) | Cloud |

## Integration & agents

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Request-Reply](../../Software%20Patterns%20Docs/Messaging_Integration_patterns/04-request-reply.md) | Sync `skills/execute` | Messaging |
| [Queue-Based Load Leveling](../../Software%20Patterns%20Docs/Scalability_patterns/09-queue-based-load-leveling.md) | Task queue (Epic-03) | Scalability |
| [Human-in-the-Loop](../../Software%20Patterns%20Docs/AI_Agentic_patterns/09-human-in-the-loop.md) | Approvals before commit writes | AI |
| [Tool Calling](../../Software%20Patterns%20Docs/AI_Agentic_patterns/03-tool-calling.md) | OpenClaw → same intents/skills via gateway | AI |
| [Semantic Routing](../../Software%20Patterns%20Docs/AI_Agentic_patterns/12-semantic-routing.md) | Optional NL → taxonomy intent (not free peer calls) | AI |
| [Strangler Fig](../../Software%20Patterns%20Docs/Distributed_system_patterns/13-strangler-fig.md) | Grow skills around peer edges without replacing them | Distributed |

**Policy:** see [ConOps](../ConOps/ControlPanelOntology_ConOps.md) — LLM proposes/routes; certified skills execute. ERP is one SoA peer.

## Data on the control plane

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Repository](../../Software%20Patterns%20Docs/Data_domain_patterns/01-repository.md) | Tasks, estimate issues, audits | Data |
| [Soft Delete](../../Software%20Patterns%20Docs/Data_domain_patterns/22-soft-delete.md) | Dismiss / retire issues & runbooks | Data |
| [Specification](../../Software%20Patterns%20Docs/Data_domain_patterns/07-specification.md) | Issue detection rules (estimate issues) | Data |
| [Domain Model](../../Software%20Patterns%20Docs/Data_domain_patterns/14-domain-model.md) | Taxonomy intents, issues, skills | Data |

## Explicitly not primary (yet)

| Pattern | Why deferred |
|---------|----------------|
| Full Microservices + Service Mesh | Three containers; NestJS gateway is enough |
| Distributed Cache / Redis | No shared-package cache; add only for multi-replica rate limits |
| Event Sourcing / full CQRS | Overkill for current skill + issues store |
| Saga across peer edges | Only when multi-step cross-system commits exist |
| Customer-built Adapter plugins | First-party connectors only |
| Micro Frontends / Redux-by-default | Single Next.js app; light local state is enough |
| Full Ontology Engine / CDC twin | Language + Explorer BFF first ([Gap 01](../Subsystem/Risks.md)) |

## Related

- [Parent TSD](./ControlPanelOntology_TSD.md)
- [SAC-006 Ontology hub](../Subsystem/SAC-006/README.md)
- [SAC-005 Connector catalog](../Subsystem/SAC-005/README.md)
- [SAC-009 Compose](../Subsystem/SAC-009/README.md)
- [Component_Map](./Component_Map.md)
- [SCENARIOS](../Subsystem/SCENARIOS.md)
