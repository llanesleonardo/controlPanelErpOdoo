# Pattern map — Control Panel design

Patterns from [Software Patterns Docs](../Software%20Patterns%20Docs/) that **match this control plane**. Prefer these over inventing new structure. Primary diagram: [Epic-06 system-design](./Epic-06/system-design.md).

## Core (must use)

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Client-Server](../Software%20Patterns%20Docs/Architectural%20Patterns/01-client-server.md) | Next.js UI → NestJS gateway | Architectural |
| [Component-Based Architecture](../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md) | Next.js App Router UI (`AppShell`, ERP grid, intent rail) | Frontend |
| [API Gateway](../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) | NestJS `apps/gateway` — sole app entry | Distributed |
| [Backend-for-Frontend](../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md) | NestJS shaped for Next.js (+ future agents) | Architectural |
| [Hexagonal Architecture](../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md) | Orchestrator core ↔ ports ↔ connectors | Architectural |
| [Anti-Corruption Layer](../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) | Domain language vs vendor models | Distributed |
| [Adapter](../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md) | Per first-party connector | Structural |
| [Facade](../Software%20Patterns%20Docs/Structural%20Patterns/Facade.md) | Skill execution entry on orchestrator | Structural |
| [Database per Service](../Software%20Patterns%20Docs/Distributed_system_patterns/32-database-per-service.md) | Control-plane Postgres ≠ SoR DBs | Distributed |
| [Bounded Context](../Software%20Patterns%20Docs/Org_System_Engineering_patterns/02-bounded-context.md) | Control plane vs each SoR / connector | Org / DDD |

## Next.js control panel (`apps/web`)

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Client-Server](../Software%20Patterns%20Docs/Architectural%20Patterns/01-client-server.md) | Browser/Next.js client; never talks to Odoo/orchestrator directly | Architectural |
| [Component-Based Architecture](../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md) | Section pages, ERP map tiles, intent rail, live output | Frontend |
| [Observer](../Software%20Patterns%20Docs/Frontend_patterns/08-observer.md) | UI reacts to gateway fetch / task status updates | Frontend |
| [State Container](../Software%20Patterns%20Docs/Frontend_patterns/09-state-container.md) | Local UI state for rails, filters, live tables (keep light; no Redux required) | Frontend |
| [BFF](../Software%20Patterns%20Docs/Architectural%20Patterns/21-backend-for-frontend-bff.md) | Next.js consumes NestJS as its backend-for-frontend | Architectural |
| Progressive disclosure | Main menu + intents rail only on `/sections/*` (Epic-05) | Frontend UX |

**Non-goals for web:** Micro Frontends, Redux-by-default, embedding Odoo UI.

## Security & tenancy

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [RBAC](../Software%20Patterns%20Docs/Security_patterns/02-rbac.md) | Roles → skills / approvals | Security |
| [JWT](../Software%20Patterns%20Docs/Security_patterns/08-jwt.md) / session | NestJS auth (replace `X-Actor-Id`) | Security |
| [Policy Enforcement Point](../Software%20Patterns%20Docs/Security_patterns/16-policy-enforcement-point.md) | Gateway allowlist + tenant checks | Security |
| [Secrets Vault](../Software%20Patterns%20Docs/Security_patterns/12-secrets-vault.md) | Connector credentials (env → vault later) | Security |
| [Defense in Depth](../Software%20Patterns%20Docs/Security_patterns/09-defense-in-depth.md) | Auth + allowlist + dry-run + approval | Security |
| [Multi-Tenant Partitioning](../Software%20Patterns%20Docs/Data_domain_patterns/21-multi-tenant-partitioning.md) | `tenant_id` on CP data | Data |

## Resilience & traffic

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Retry with Backoff](../Software%20Patterns%20Docs/Distributed_system_patterns/04-retry-with-backoff.md) | Orchestrator → vendor APIs | Distributed |
| [Circuit Breaker](../Software%20Patterns%20Docs/Distributed_system_patterns/02-circuit-breaker.md) | Per connector instance | Distributed |
| [Timeout](../Software%20Patterns%20Docs/Resilience_Pattern/03-timeout.md) | Outbound connector calls | Resilience |
| [Idempotency](../Software%20Patterns%20Docs/Distributed_system_patterns/20-idempotency.md) | Skill / write executions | Distributed |
| [Rate Limiting](../Software%20Patterns%20Docs/Distributed_system_patterns/18-rate-limiting.md) | NestJS edge (Epic-03) | Distributed |
| [Bulkhead](../Software%20Patterns%20Docs/Distributed_system_patterns/05-bulkhead.md) | Isolate connectors / pools | Distributed |
| [Fail Fast](../Software%20Patterns%20Docs/Resilience_Pattern/05-fail-fast.md) | Contract + allowlist rejection | Resilience |
| [Fallback](../Software%20Patterns%20Docs/Resilience_Pattern/07-fallback.md) | `simulate` mode when SoR down | Resilience |
| [Graceful Degradation](../Software%20Patterns%20Docs/Resilience_Pattern/06-graceful-degradation.md) | Read-only / simulate when connector open | Resilience |

## Observability & delivery

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Observability](../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md) | Evidence, audits, metrics | DevOps |
| [Centralized Logging](../Software%20Patterns%20Docs/DevOps_Delivery_patterns/07-centralized-logging.md) | Structured logs → console `/logs` | DevOps |
| [Distributed Tracing](../Software%20Patterns%20Docs/DevOps_Delivery_patterns/08-distributed-tracing.md) | Trace across gateway → orch | DevOps |
| [Correlation Identifier](../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md) | `X-Correlation-Id` | Messaging |
| [Health Checks](../Software%20Patterns%20Docs/DevOps_Delivery_patterns/09-health-checks.md) | Gateway, orch, connector test | DevOps |
| [Infrastructure as Code](../Software%20Patterns%20Docs/Cloud_infra_patterns/08-infrastructure-as-code.md) | Docker Compose definitions | Cloud |
| [Stateless Services](../Software%20Patterns%20Docs/Cloud_infra_patterns/01-stateless-services.md) | Gateway / orch (state in Postgres) | Cloud |

## Integration & agents

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Request-Reply](../Software%20Patterns%20Docs/Messaging_Integration_patterns/04-request-reply.md) | Sync `skills/execute` | Messaging |
| [Queue-Based Load Leveling](../Software%20Patterns%20Docs/Scalability_patterns/09-queue-based-load-leveling.md) | Task queue (Epic-03) | Scalability |
| [Human-in-the-Loop](../Software%20Patterns%20Docs/AI_Agentic_patterns/09-human-in-the-loop.md) | Approvals before commit writes | AI |
| [Tool Calling](../Software%20Patterns%20Docs/AI_Agentic_patterns/03-tool-calling.md) | OpenClaw → same intents/skills via gateway | AI |
| [Semantic Routing](../Software%20Patterns%20Docs/AI_Agentic_patterns/12-semantic-routing.md) | Optional NL → taxonomy intent (not free SoR calls) | AI |
| [Strangler Fig](../Software%20Patterns%20Docs/Distributed_system_patterns/13-strangler-fig.md) | Grow skills around SoR without replacing it | Distributed |

**Policy:** see [governed-execution.md](./governed-execution.md) — LLM proposes/routes; certified skills execute.

## Data on the control plane

| Pattern | Where it shows up | Doc |
|---------|-------------------|-----|
| [Repository](../Software%20Patterns%20Docs/Data_domain_patterns/01-repository.md) | Tasks, estimate issues, audits | Data |
| [Soft Delete](../Software%20Patterns%20Docs/Data_domain_patterns/22-soft-delete.md) | Dismiss / retire issues & runbooks | Data |
| [Specification](../Software%20Patterns%20Docs/Data_domain_patterns/07-specification.md) | Issue detection rules (estimate issues) | Data |
| [Domain Model](../Software%20Patterns%20Docs/Data_domain_patterns/14-domain-model.md) | Taxonomy intents, issues, skills | Data |

## Explicitly not primary (yet)

| Pattern | Why deferred |
|---------|----------------|
| Full Microservices + Service Mesh | Three containers; NestJS gateway is enough |
| Distributed Cache / Redis | No shared-package cache; add only for multi-replica rate limits |
| Event Sourcing / full CQRS | Overkill for current skill + issues store |
| Saga across SoRs | Only when multi-step cross-system commits exist |
| Customer-built Adapter plugins | First-party connectors only |
| Micro Frontends / Redux-by-default | Single Next.js app; light local state is enough |

## Related

- [architecture-overview](./architecture-overview.md)
- [platform-concerns](./platform-concerns.md)
- [connectors](./connectors.md)
- [Epic-06 system-design](./Epic-06/system-design.md)
