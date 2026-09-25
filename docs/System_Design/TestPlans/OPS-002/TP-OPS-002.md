# TP-OPS-002 - Preview a risky write (dry-run)

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-002 |
| **Scenario** | [OPS-002](../../Subsystem/SAC-007/Scenarios/OPS-002.md) (**Open**) |
| **Subsystem** | SAC-007, SAC-004 |
| **Related SRD** | SRD-TSK-004…007, SRD-LOG-001…004, parent SRD-SEC-003, SRD-SEC-004, SRD-OPS-002 |
| **Method** | Test |
| **Status** | **Open** |

## Purpose

Prove dry-run previews peer-edge writes without mutating the target SoA (ERP peer #1 by default).

## Setup

| Item | Value |
|------|--------|
| Control plane | Postgres + gateway + orchestrator + web |
| Edge | Prefer `ERP_MODE=simulate` / `ODOO_MODE=simulate` |
| Paths | `STORAGE_ROOT=./resources/storage/local` | `LOG_DIR=./resources/logs` |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Dry-run allowlisted write | Task ok or clear fail; **peer data unchanged** |
| TC-002 | Task detail | Predicted effects / warnings / evidence |
| TC-003 | Logs by correlation_id | Matching structured lines |
| TC-004 | Evidence file | Under `STORAGE_ROOT/evidence/{correlation_id}/` when written |
| TC-005 | Unknown intent | Validation error; no invented peer call |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-002-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
