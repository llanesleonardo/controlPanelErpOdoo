# SAC-001 — Software Requirements (SRD)

Plain front-door rules for the carbide-shop control panel. The **ontology** is the hub; **edges** (systems of action, data sources, logic sources) are peers reached through allowlisted skills. **ERP** = Odoo today — **SoA peer #1**, not the sole system of record for every property. **Skill** = a certified action code (e.g. `sales.estimate.read`) that may read or change an enabled edge. **Allowlist** = the short list of skills allowed to run live.

Parent safety SHALLs: [SRD-SEC-001…005](../../SRD/ControlPanelOntology_SRD.md). Parent edge SHALLs: [SRD-EDGE-006](../../SRD/ControlPanelOntology_SRD.md).

## Scope

- NestJS gateway as sole application API entry (BFF for the Next.js UI and future agents / SDKs)
- Actor stub today; planned control-plane users/roles later
- Skill allowlist and refusal of free-form tool invention
- Rate limiting and correlation identifiers
- Recording actor + correlation (+ connector id when applicable) on skill-bound and task-bound calls

## Out of scope

- Hosting or proxying any edge UI (including ERP)
- SSO / OIDC (later)
- Syncing control-plane users from Odoo or other peers
- Orchestrator adapter internals (SAC-004 / SAC-005)
- Full production mesh / multi-region distributed rate limits

## Requirements

### SRD-GW-001 — Sole application API entry

The NestJS gateway SHALL be the only application API the control panel UI (and external apps/SDKs using the control plane) call. The browser SHALL NOT call Odoo, other SoA/data/logic peers, the orchestrator, or connector URLs directly. Aligns with parent **SRD-EDGE-006**.

### SRD-GW-002 — BFF role

The gateway SHALL act as a **backend-for-frontend (BFF)**: shape responses for the control panel (ontology catalog/objects, intents, tasks, skills) and forward allowlisted skill work to the orchestrator. It SHALL NOT expose a second general-purpose vendor or edge API.

### SRD-GW-003 — Skill allowlist (live)

Edge-changing and live edge-reading work that runs through the gateway SHALL only proceed for skills on a product-owned allowlist (certified actions), including skills that target the ERP SoA peer or other enabled peers. Unknown or non-allowlisted skill codes SHALL be rejected or fall back to a documented non-live path (e.g. demo rows) — never silent invent of a new tool. Aligns with parent **SRD-SEC-001**.

### SRD-GW-004 — No free-form tool invention

The system SHALL NOT let free-form natural language invent new tools, models, connectors, or payloads at the gateway edge. Classification and skill selection SHALL use product taxonomy / contracts and allowlisted codes only. Aligns with parent **SRD-SEC-002**.

### SRD-GW-005 — Actor stub (v1)

Until real authentication ships, every request SHALL carry an actor identity via `X-Actor-Id`, defaulting to a documented stub (e.g. `dev-operator`). That actor id SHALL be available to logs, tasks, and skill calls.

### SRD-GW-006 — Real auth later (planned)

The product SHALL support control-plane users and roles stored in control-plane PostgreSQL (not an edge / ERP database), with password login/logout and role-protectable gateway routes (`admin`, `manager`, `operator`, `viewer` as the starting set). Epic planning for this lives in legacy auth packs; runtime login is a later delivery, not a v1 blocker for the stub.

### SRD-GW-007 — Rate limiting

The gateway SHALL enforce configurable rate limits (`RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`). Buckets SHALL prefer authenticated/stub actor id when present, else client IP. Exceeding the limit SHALL return HTTP **429** with a clear message.

### SRD-GW-008 — Correlation identifier

Each request SHALL have a correlation id: accept incoming `X-Correlation-Id` or generate one, echo it on the response, and propagate it to orchestrator / task / log paths. When a skill run targets a connector, outcome records SHOULD include `connector_id`. Aligns with parent **SRD-SEC-004**.

### SRD-GW-009 — Fail closed on abuse / unknown skills

Allowlist rejection and rate-limit trips SHALL fail closed (refuse or degrade to non-live), with messages operators can understand — not opaque 500s for policy denials.

### SRD-GW-010 — Health

The gateway SHALL expose a health endpoint suitable for local and Compose smoke checks (see SAC-009 / OPS-007).

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-GW-001 … 010 | [OPS-012](./Scenarios/OPS-012.md) | [TP-OPS-012](../../TestPlans/OPS-012/TP-OPS-012.md) |
| SRD-GW-001 (SDK / apps via gateway) | [OPS-019](./Scenarios/OPS-019.md) | [TP-OPS-019](../../TestPlans/OPS-019/TP-OPS-019.md) |
| SRD-GW-001, 002, 010 | [OPS-007](../SAC-009/Scenarios/OPS-007.md) (supporting) | [TP-OPS-007](../../TestPlans/OPS-007/TP-OPS-007.md) |
| SRD-GW-003, 004 (pack) | [E-01](../Scenarios/E-01.md) (supporting) | [TP-E-01](../../TestPlans/E-01/TP-E-01.md) |

Parent SEC crosswalk: SRD-GW-003→SEC-001 · SRD-GW-004→SEC-002 · SRD-GW-008→SEC-004 · SRD-GW-001→EDGE-006.
