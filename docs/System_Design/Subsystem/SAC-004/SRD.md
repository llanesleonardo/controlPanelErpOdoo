# SAC-004 — Software Requirements (SRD)

Plain skills-engine rules for the carbide-shop control panel. Skills run against **peer edges** (systems of action, data sources, logic sources) through first-party connectors. **ERP** (Odoo today) is **SoA peer #1** — not the only edge and not a second production store invented inside the orchestrator. Only **allowlisted** skills may talk to edges; free-form RPC from the console is never executed.

Parent: [SRD-SEC](../../SRD/ControlPanelOntology_SRD.md), [SRD-ONT-005](../../SRD/ControlPanelOntology_SRD.md), [SRD-EDGE-001](../../SRD/ControlPanelOntology_SRD.md), [SRD-EDGE-004](../../SRD/ControlPanelOntology_SRD.md).

## Scope

- FastAPI orchestrator that runs allowlisted dry-run and execute skills
- Dry-run vs commit semantics for write paths (commit gated; dry-run must not mutate peer business data)
- Evidence artifacts, correlation / actor / connector propagation
- Retries and circuit breaking toward connectors
- Internal-only exposure (gateway calls orchestrator; UI does not)
- Action → skill → `connector_id` resolution for any enabled SoA / logic peer

## Out of scope

- Public internet exposure of the orchestrator
- Dynamic skill invention from natural language
- Full digital twin of every edge row
- Second Nest-style API gateway in front of this service
- Customer-built connector plugins (first-party catalog only — see SAC-005)

## Requirements

### SRD-SKL-001 — Allowlisted execution only

The orchestrator SHALL execute only skills registered on an allowlist keyed by known intent codes. Unknown intents SHALL fail with a validation-style error and SHALL NOT call any edge connector.

### SRD-SKL-002 — Gateway is the only caller

Operators and browsers SHALL reach skills only through the NestJS gateway. The orchestrator SHALL be treated as an internal service (Compose/private network); it SHALL NOT be marketed or published as a public shop API.

### SRD-SKL-003 — Dry-run safety

For write intents that support preview, `dry_run` SHALL NOT persist business changes on the target peer edge. Dry-run responses SHALL include structured predicted effects, warnings, and adapter provenance (`live` or `simulate`).

### SRD-SKL-004 — Execute for certified reads / allowlisted skills

`POST /skills/execute` SHALL run only intents on the execute allowlist (MVP includes `sales.estimate.read` via the ERP SoA peer). Execute SHALL return structured rows/results (or a clear failure), not raw vendor RPC dumps to the UI.

### SRD-SKL-005 — Commit lock (writes)

Commit / live edge writes for high-risk intents SHALL remain gated (approval / later epic). Dry-run and read execute paths SHALL NOT silently become commit.

### SRD-SKL-006 — Traceability

Skill runs SHALL carry `correlation_id` and `actor_id` (body and/or `X-Correlation-Id` / `X-Actor-Id` headers) into logs and evidence files when written. When a connector is used, evidence / logs SHOULD record `connector_id`.

### SRD-SKL-007 — Evidence

Successful dry-run (and execute when applicable) SHALL attempt to persist evidence JSON under `STORAGE_ROOT/evidence/{correlation_id}/`. Failure to write evidence SHALL warn without inventing a successful edge mutation.

### SRD-SKL-008 — Edge mode (ERP peer defaults)

Connector calls for the ERP SoA peer SHALL honor `ERP_MODE` (preferred) or legacy `ODOO_MODE`: `simulate` (default) vs `live`. Simulate SHALL NOT require a reachable ERP for basic dry-run/read demos. Other peers MAY use the same live/simulate pattern with peer-specific env when product-owned connectors ship.

### SRD-SKL-009 — Retries and circuit toward connectors

Outbound connector calls SHALL use bounded retry with backoff and a circuit breaker so repeated connector failures open the circuit rather than hammering the peer.

### SRD-SKL-010 — Hexagonal boundary

Skill use-cases SHALL depend on domain ports (inventory, accounting, estimates, …), not vendor JSON-RPC types. Vendor auth, transport, modules, and field maps SHALL remain inside connector adapters (anti-corruption).

### SRD-SKL-011 — Health

The orchestrator SHALL expose `GET /health` including a storage writability check so operators can smoke-test the internal service.

### SRD-SKL-012 — Connector capability alignment (multi-peer)

Skills offered for run SHALL align with a capable first-party connector. Odoo SHALL be SoA peer #1 (`connector_id=odoo`); additional SoA / data / logic connectors SHALL use the same capability gate when enabled. The engine SHALL NOT invent a second production business store inside the orchestrator, and SHALL NOT hard-code every action to the ERP peer when bindings name another `connector_id`. Aligns with parent **SRD-ONT-005**, **SRD-CONN-004**, **SRD-EDGE-001**, **SRD-EDGE-004**.

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-SKL-001 … 012 (execute focus) | [OPS-008](./Scenarios/OPS-008.md) | [TP-OPS-008](../../TestPlans/OPS-008/TP-OPS-008.md) |
| SRD-SKL-012 (any SoA peer) | [OPS-013](./Scenarios/OPS-013.md) | [TP-OPS-013](../../TestPlans/OPS-013/TP-OPS-013.md) |
| SRD-SKL-012 (logic edge) | [OPS-016](./Scenarios/OPS-016.md) | [TP-OPS-016](../../TestPlans/OPS-016/TP-OPS-016.md) |
| SRD-SKL-003, 005 … 007 (dry-run / preview) | [OPS-002](../SAC-007/Scenarios/OPS-002.md) | [TP-OPS-002](../../TestPlans/OPS-002/TP-OPS-002.md) |
| Parent safety | Parent SRD-SEC-001 … 004 | OPS-002 / OPS-008 |
