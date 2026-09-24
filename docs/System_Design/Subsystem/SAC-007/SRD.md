# SAC-007 — Software Requirements (SRD)

Plain ops rules for the carbide-shop control panel: **queue the work, preview before you cut metal (ERP data), leave a trail someone can follow**.

**ERP** = enterprise resource planning system (Odoo today). Parent safety SHALLs: [ControlPanelERP_SRD](../../SRD/ControlPanelERP_SRD.md) (`SRD-SEC-*`, `SRD-OPS-*`).

## Scope

- Task queue list/detail and approve/reject
- Dry-run preview for write skills (evidence on the task and optional file)
- Correlation id across gateway → orchestrator → logs → evidence
- Structured logs under `LOG_DIR` and a Logs UI search path

## Out of scope

- Live ERP `commit` writes (still gated / deferred beyond dry-run)
- Full SIEM, infinite log retention, or offsite log shipping
- Hosting the ERP filestore; backups of Odoo itself ([SAC-009](../SAC-009/Guides/Storage_and_Backups.md))
- Real SSO/RBAC (dev actor stub is enough for v1 verification)

## Requirements

### Tasks & approvals

#### SRD-TSK-001 — Queue list

Operators SHALL list tasks filtered by state (at least `pending`, `running`, `completed`, `failed`, `needs_approval`, `rejected`) and inspect recent work by time.

#### SRD-TSK-002 — Task detail

Operators SHALL open a task and see `correlation_id`, `intent_code`, skill, execution mode, status, input/output (or evidence), and errors when present.

#### SRD-TSK-003 — Approve / reject

Authorized actors SHALL approve or reject tasks in `needs_approval`. Approve/reject SHALL update state and record who acted and when (audit on the task record).

#### SRD-TSK-004 — Dry-run before commit

Write-path requests SHALL carry `execution_mode`. When mode is `dry_run`, the system SHALL NOT persist business changes in the ERP. Dry-run SHALL return structured predicted effects and warnings (and adapter provenance `live|simulate` when applicable).

#### SRD-TSK-005 — Evidence persistence

Dry-run outcomes SHALL be stored on the task record. When a file is written, it SHALL land under `STORAGE_ROOT` (default `./resources/storage/local`), typically `STORAGE_ROOT/evidence/{correlation_id}/…`. Path helpers SHALL reject traversal outside `STORAGE_ROOT`.

#### SRD-TSK-006 — Correlation on the path

Every skill / dry-run path SHALL carry a `correlation_id` (accept or mint at the gateway edge) through gateway → orchestrator → logs and evidence so an operator can follow one id end-to-end.

#### SRD-TSK-007 — Allowlisted skills only

Only registered skills for known intent codes MAY run. Unknown intents SHALL fail validation without inventing ERP calls.

### Structured logs

#### SRD-LOG-001 — Structured emission

Gateway and orchestrator SHALL emit structured logs (JSON lines or equivalent) with at least: timestamp, level, service, message, `correlation_id`, and `actor_id` when known.

#### SRD-LOG-002 — Configurable sink

Log level and directory SHALL be configurable via `LOG_LEVEL` and `LOG_DIR`. Default `LOG_DIR` SHALL be `./resources/logs` (under repo `resources/`, gitignored).

#### SRD-LOG-003 — Log explorer

Operators SHALL search logs by `correlation_id` from the control panel (Logs UI backed by gateway `GET /logs`).

#### SRD-LOG-004 — Propagation

Outbound calls between gateway and orchestrator SHALL propagate `correlation_id` (and actor id when present) on headers such as `X-Correlation-Id` / `X-Actor-Id`.

## Trace

| ID | Scenario | Test plan |
|----|----------|-----------|
| SRD-TSK-004 … 007, SRD-LOG-001 … 004 (path) | [OPS-002](./Scenarios/OPS-002.md) | [TP-OPS-002](../../TestPlans/OPS-002/TP-OPS-002.md) |
| SRD-TSK-001 … 003 | [OPS-003](./Scenarios/OPS-003.md) | [TP-OPS-003](../../TestPlans/OPS-003/TP-OPS-003.md) |

Parent crosswalk: `SRD-SEC-003` ↔ OPS-002 · `SRD-OPS-001` ↔ OPS-003 · `SRD-OPS-002` ↔ Logs (OPS-002 follow-through).
