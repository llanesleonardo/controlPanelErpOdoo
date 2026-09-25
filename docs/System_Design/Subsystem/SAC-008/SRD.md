# SAC-008 — Software Requirements (SRD)

Plain rules for the estimate-issues wedge on the **ERP SoA peer**: **find the mess, write it down here, dismiss when it is handled — do not freestyle the peer**.

Parent estimate read: [ControlPanelOntology_SRD](../../SRD/ControlPanelOntology_SRD.md) `SRD-EST-*`. Risk: [GAP-02](../Risks.md) (runtime deferred).

## Scope

- Find estimate issues through gateway → orchestrator → Odoo estimate adapter (SoA peer #1)
- Persist issues in control-plane Postgres
- List and dismiss in the Estimates section UI
- Simulate vs live connector modes
- Correlation / evidence on the find run (same trail habits as SAC-007)

## Out of scope

- Auto-fix or mutate estimates on the ERP peer
- Bulk ML classification
- Non-Odoo issue sources (later peers — not this wedge)
- Replacing the live estimate read skill (`sales.estimate.read` — SAC-005)

## Requirements

### SRD-ISS-001 — Find issues

An authenticated operator (dev-actor stub acceptable in lab) SHALL be able to trigger **find estimate issues** through the gateway. The path SHALL use an allowlisted skill / facade — not free-form peer-edge calls.

### SRD-ISS-002 — Persist

Found issues SHALL be stored in control-plane Postgres with stable identifiers and a status (e.g. `open`). Repeated finds SHOULD upsert by signature so open issues are not blindly duplicated.

### SRD-ISS-003 — Anti-corruption on the contract

Persistence and UI/API DTOs SHALL NOT require raw Odoo model names. Product / taxonomy language SHALL be used on the wire the UI sees.

### SRD-ISS-004 — Simulate and live

`simulate` SHALL return deterministic dummy issues without calling Odoo. `live` SHALL use the Odoo SoA connector diagnose/search path. Mode SHALL be visible on the run (task output, logs, or find status).

### SRD-ISS-005 — List

Operators SHALL see open (and optionally dismissed) estimate issues from control-plane storage in the Estimates section.

### SRD-ISS-006 — Dismiss

Operators SHALL dismiss an issue as a **control-plane status update only**. Dismiss SHALL NOT call Odoo or change ERP estimate rows on the peer.

### SRD-ISS-007 — Find from UI

The Estimates UI SHALL expose a control to run find-issues (wires to SRD-ISS-001).

### SRD-ISS-008 — Traceability

Find runs SHALL carry `correlation_id` (and actor when known) so operators can follow Logs / optional evidence the same way as other skills ([SAC-007](../SAC-007/)).

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-ISS-001 … 008 | [OPS-011](./Scenarios/OPS-011.md) | [TP-OPS-011](../../TestPlans/OPS-011/TP-OPS-011.md) |
