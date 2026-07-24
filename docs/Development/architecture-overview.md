# Architecture overview

Standalone **control plane** for governed intents and skills across external systems. External systems stay systems of record; automation, approvals, evidence, and agent orchestration stay in the control plane.

**Odoo is connector #1**, not the product. Additional connectors ship **one by one**, owned and standardized by the product team — customers configure credentials and enable skills; they do not build adapters or define payloads.

## Layers

| Layer | Implementation |
|-------|----------------|
| **Control panel UI** | **Next.js** — `apps/web` ([Client-Server](../Software%20Patterns%20Docs/Architectural%20Patterns/01-client-server.md), [Component-Based](../Software%20Patterns%20Docs/Frontend_patterns/06-component-based-architecture.md); talks only to NestJS) |
| **API gateway (BFF)** | NestJS — `apps/gateway` — **sole application entry**; auth, tenancy, rate limit, contracts; BFF for Next.js |
| Orchestration | FastAPI — `apps/orchestrator` — **internal**; retries/circuits toward connectors |
| Domain ports + first-party connectors | Called only from orchestrator (ACL / Adapter) |
| Observability / knowledge | Structured logs, incidents, runbooks in control-plane DB |
| Runtime | Docker Compose: `web`, `gateway`, `orchestrator`, `postgres` |

## Edge decision

**NestJS is enough** as the API Gateway pattern for the control plane. Do **not** place a second application gateway between clients and NestJS. An optional infra proxy (TLS/WAF/load balancer) may sit in front in production; it is not a duplicate business gateway.

Clients → (optional TLS/WAF) → **NestJS** → Orchestrator → Connectors → SoRs.

Details: [platform-concerns.md](./platform-concerns.md).

## System context

```mermaid
flowchart LR
  UI[Next.js_ControlPanel]
  Agent[OpenClaw_optional]
  GW[NestJS_API_Gateway]
  ORCH[FastAPI_Orchestrator]
  Ports[Domain_ports]
  Odoo[Odoo_connector]
  Future[Future_connectors]
  CPDB[(Postgres_CP_tenant_scoped)]
  Ext[(External_SoRs)]

  UI --> GW
  Agent -.-> GW
  GW --> ORCH
  GW --> CPDB
  ORCH --> Ports
  ORCH --> CPDB
  Ports --> Odoo
  Ports --> Future
  Odoo --> Ext
  Future --> Ext
```

## Cross-cutting (designed)

| Concern | Doc | Status |
|---------|-----|--------|
| Auth / RBAC | [platform-concerns](./platform-concerns.md#auth) | Designed (Epic-01 P02); runtime still dev-actor |
| Multi-tenant | [platform-concerns](./platform-concerns.md#multi-tenant) | Designed; not implemented |
| Logging | [platform-concerns](./platform-concerns.md#logging-system) | Epic-03 baseline; extend tenant/connector fields |
| Retry / circuit | [platform-concerns](./platform-concerns.md#try--retry-and-circuit-breaker) | Partial on Odoo client; standardize per connector |
| Docker | [docker-compose-strategy](../Deployment/Docker/docker-compose-strategy.md) | Local/Linux Compose; harden for prod |
| Connectors | [connectors](./connectors.md) | Odoo shipping; catalog first-party |

## Product boundary

| Stable (product-owned) | Per connector (product-owned, shipped one-by-one) |
|------------------------|--------------------------------------------------|
| Taxonomy intents / skill codes | Auth scheme, API transport, vendor payloads |
| Domain ports + contracts | Module/model maps, field maps, pagination |
| Allowlist, dry-run, evidence, approvals | Health probe, schema sync, simulate fixtures |
| Capability matrix (which skills a connector supports) | Connector config UI + secrets |
| Auth, tenant isolation, logging envelope | Vendor-specific retry/circuit tuning |

Customers never implement the connector SPI. New systems appear only when **we** ship a first-party connector.

**Agents / NL:** OpenClaw is an optional gateway client. Natural language may classify to an intent; it must not free-form call SoRs. See [governed-execution](./governed-execution.md).

## Data

- **Control-plane PostgreSQL:** users, roles, **tenants**, tasks, audits, incidents, runbooks, policies, **connector config metadata**, capability bindings — tenant-scoped.
- **External SoR DBs / APIs:** master and transactional data — never the control-plane store. Odoo DB is one SoR among others.

## Hosting

Docker Compose locally and on Linux later. See [Deployment/Docker](../Deployment/Docker/README.md). External SoRs (including Odoo) stay outside the control-plane Compose stack unless explicitly decided otherwise. Publish **web + gateway** (and TLS proxy if used); keep orchestrator private.

## Related

- [governed-execution](./governed-execution.md) — NL routes; skills execute
- [pattern-map](./pattern-map.md) — Software Patterns Docs ↔ this design
- [platform-concerns](./platform-concerns.md) — auth, tenancy, logging, retry, Docker, edge
- [connectors](./connectors.md) — first-party connector catalog and SPI
- [request-lifecycle](./request-lifecycle.md)
- [reliability-rules](./reliability-rules.md)
- [Components](../Components/README.md)
