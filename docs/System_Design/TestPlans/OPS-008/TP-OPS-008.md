# TP-OPS-008 - Run allowlisted skill through skills engine

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-008 |
| **Scenario** | [OPS-008](../../Subsystem/SAC-004/Scenarios/OPS-008.md) (**Open**) |
| **Subsystem** | SAC-004 |
| **Related SRD** | SRD-SKL-001…012, parent SRD-SEC-001, SRD-CONN-004 |
| **Method** | Test |
| **Status** | **Open** |

## Purpose

Prove orchestrator executes only allowlisted skills against capable connectors (ERP SoA peer #1 for MVP read).

## Setup

| Item | Value |
|------|--------|
| Services | Orchestrator (:8000) + gateway + web as needed |
| Edge | Prefer `ERP_MODE=simulate` |
| Storage | `STORAGE_ROOT` writable |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | `GET /health` | ok or degraded with storage check |
| TC-002 | Execute `sales.estimate.read` | Structured rows or clear failure |
| TC-003 | Unknown intent | 400 / validation; no peer call |
| TC-004 | Evidence | Under `STORAGE_ROOT/evidence/` when written |
| TC-005 | Browser network | No direct orch / Odoo calls |
| TC-006 | Capability gate | Skill not executable without capable connector or simulate path |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-008-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
