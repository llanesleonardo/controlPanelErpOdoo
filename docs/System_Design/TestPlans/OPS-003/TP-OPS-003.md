# TP-OPS-003 - Approve or reject a queued task

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-003 |
| **Scenario** | [OPS-003](../../Subsystem/SAC-007/Scenarios/OPS-003.md) (**Open**) |
| **Subsystem** | SAC-007 |
| **Related SRD** | SRD-TSK-001…003, parent SRD-OPS-001 |
| **Method** | Test / Demo |
| **Status** | **Open** |

## Purpose

Prove approve/reject of `needs_approval` tasks with actor audit; no silent peer commit.

## Setup

| Item | Value |
|------|--------|
| Control plane | Postgres + gateway (+ web); orch optional for approve alone |
| Actor | `X-Actor-Id` stub acceptable |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | List / filter | `needs_approval` visible |
| TC-002 | Task detail | Intent, state, payloads / evidence |
| TC-003 | Approve | Documented state; actor + time; no live peer commit unless product supports it |
| TC-004 | Reject | State -> rejected; peer untouched |
| TC-005 | Wrong state | Clear refuse when not `needs_approval` |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-003-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
