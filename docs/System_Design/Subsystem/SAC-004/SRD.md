# SAC-004 — Software Requirements (SRD)

Plain skills-engine rules for the carbide-shop control panel. **ERP** = enterprise resource planning system (Odoo today). Only **allowlisted** skills may talk to the ERP through connectors; free-form RPC from the console is never executed.

## Scope

- FastAPI orchestrator that runs allowlisted dry-run and execute skills
- Dry-run vs commit semantics for write paths (commit gated; dry-run must not mutate ERP business data)
- Evidence artifacts, correlation / actor propagation
- Retries and circuit breaking toward connectors
- Internal-only exposure (gateway calls orchestrator; UI does not)

## Out of scope

- Public internet exposure of the orchestrator
- Dynamic skill invention from natural language
- Full digital twin of every ERP row
- Second Nest-style API gateway in front of this service
- Customer-built connector plugins (first-party catalog only — see SAC-005 / Epic-06 SPI)

## Requirements

### SRD-SKL-001 — Allowlisted execution only

The orchestrator SHALL execute only skills registered on an allowlist keyed by known intent codes. Unknown intents SHALL fail with a validation-style error and SHALL NOT call the ERP.

### SRD-SKL-002 — Gateway is the only caller

Operators and browsers SHALL reach skills only through the NestJS gateway. The orchestrator SHALL be treated as an internal service (Compose/private network); it SHALL NOT be marketed or published as a public shop API.

### SRD-SKL-003 — Dry-run safety

For write intents that support preview, `dry_run` SHALL NOT persist business changes in the ERP. Dry-run responses SHALL include structured predicted effects, warnings, and adapter provenance (`live` or `simulate`).

### SRD-SKL-004 — Execute for certified reads / allowlisted skills

`POST /skills/execute` SHALL run only intents on the execute allowlist (MVP includes `sales.estimate.read`). Execute SHALL return structured rows/results (or a clear failure), not raw vendor RPC dumps to the UI.

### SRD-SKL-005 — Commit lock (writes)

Commit / live ERP writes for high-risk intents SHALL remain gated (approval / later epic). Dry-run and read execute paths SHALL NOT silently become commit.

### SRD-SKL-006 — Traceability

Skill runs SHALL carry `correlation_id` and `actor_id` (body and/or `X-Correlation-Id` / `X-Actor-Id` headers) into logs and evidence files when written.

### SRD-SKL-007 — Evidence

Successful dry-run (and execute when applicable) SHALL attempt to persist evidence JSON under `STORAGE_ROOT/evidence/{correlation_id}/`. Failure to write evidence SHALL warn without inventing a successful ERP mutation.

### SRD-SKL-008 — ERP mode

Connector calls SHALL honor `ERP_MODE` (preferred) or legacy `ODOO_MODE`: `simulate` (default) vs `live`. Simulate SHALL NOT require a reachable ERP for basic dry-run/read demos.

### SRD-SKL-009 — Retries and circuit toward connectors

Outbound ERP calls SHALL use bounded retry with backoff and a circuit breaker so repeated connector failures open the circuit rather than hammering the ERP.

### SRD-SKL-010 — Hexagonal boundary

Skill use-cases SHALL depend on domain ports (inventory, accounting, estimates, …), not vendor JSON-RPC types. Vendor auth, transport, modules, and field maps SHALL remain inside connector adapters (anti-corruption).

### SRD-SKL-011 — Health

The orchestrator SHALL expose `GET /health` including a storage writability check so operators can smoke-test the internal service.

### SRD-SKL-012 — Connector capability alignment

Skills offered for run SHALL align with a capable first-party connector (Odoo = connector #1). The engine SHALL NOT invent a second production system of record inside the orchestrator.

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-SKL-001 … 012 (execute focus) | [OPS-008](./Scenarios/OPS-008.md) | [TP-OPS-008](../../TestPlans/OPS-008/TP-OPS-008.md) |
| SRD-SKL-003, 005 … 007 (dry-run / preview) | [OPS-002](../SAC-007/Scenarios/OPS-002.md) | [TP-OPS-002](../../TestPlans/OPS-002/TP-OPS-002.md) |
| Parent safety | Parent SRD-SEC-001 … 004 | OPS-002 / OPS-008 |
