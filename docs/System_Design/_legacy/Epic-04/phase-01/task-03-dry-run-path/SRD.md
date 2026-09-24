# Dry-run execution path — Software Requirements Document (SRD)

**Status:** planned (Epic-04 implementation)  
**Upstream:** [Dry-run execution path (Epic-01)](../../../Epic-01/phase-04/task-02-dry-run-execution-path/)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [reliability-rules](../../../../SRD/ControlPanelERP_SRD.md) · [request-lifecycle](../../../../ConOps/ControlPanelERP_ConOps.md)

## Purpose

Make `execution_mode=dry_run` a real runtime path: gateway selects an allowlisted skill, orchestrator simulates via Odoo ACL adapters (or simulate mode), and returns structured predicted effects without mutating Odoo business data.

## Scope

- Scaffold FastAPI `apps/orchestrator` with skill facade: validate contract → select skill → `simulate`
- MVP skills for known high-value intents: at least `inventory.stock.adjust` and `accounting.invoice.post` (read/predict only)
- Gateway: on task create or explicit “run dry-run”, call orchestrator; persist evidence on `Task.output` + optional file under `STORAGE_ROOT`
- Propagate `X-Correlation-Id` / `X-Actor-Id`
- Console: show dry-run evidence after create when mode is dry_run

## Out of Scope

- `commit` / live Odoo writes
- Full digital twin of Odoo
- Dynamic skill invention (allowlist only)
- Incident/runbook automation (later)

## Requirements

### SRD-E04-T03-01

**Mode required** — Write path requests shall carry `execution_mode`; dry-run shall not persist business changes in Odoo.

### SRD-E04-T03-02

**Evidence** — Dry-run responses shall include structured predicted effects, warnings, and adapter provenance (`live|simulate`).

### SRD-E04-T03-03

**Allowlist** — Only registered skills for known intent codes may run.

### SRD-E04-T03-04

**Lifecycle** — Dry-run occurs before approval/commit (commit deferred); task states update (`running` → `completed` / `failed`).

### SRD-E04-T03-05

**Traceability** — Correlation id shall flow gateway → orchestrator → logs/evidence files.
