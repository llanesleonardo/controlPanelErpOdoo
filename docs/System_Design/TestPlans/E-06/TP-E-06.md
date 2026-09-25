# TP-E-06 - Verification failure, blocked release, recovery

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-E-06 |
| **Scenario** | [E-06](../../Subsystem/SAC-010/Scenarios/E-06.md) (**Open**) |
| **Subsystem** | SAC-010 |
| **Related SRD** | Release gate / recovery |
| **Method** | Inspection / Analysis |
| **Status** | **Open** |

## Purpose

Prove a failed required verification blocks release and recovery is documented.

## Setup

| Item | Value |
|------|--------|
| Inputs | Failed TR example or tabletop walkthrough |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Fail required TP | Release marked blocked |
| TC-002 | SRVM stays Open | No silent close |
| TC-003 | Recovery | Fix -> re-run -> new TR path documented |
| TC-004 | Comm | Failure visible to approver |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-E-06-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
