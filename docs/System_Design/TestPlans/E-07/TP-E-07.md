# TP-E-07 - Operational feedback and controlled baseline update

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-E-07 |
| **Scenario** | [E-07](../../Subsystem/Scenarios/E-07.md) (**Open**) |
| **Subsystem** | Cross-cutting |
| **Related SRD** | Baseline change control |
| **Method** | Inspection |
| **Status** | **Open** |

## Purpose

Prove shop/ops feedback updates ConOps/SRD/SAC baselines deliberately (not silent doc drift).

## Setup

| Item | Value |
|------|--------|
| Inputs | Feedback note -> proposed doc PR path |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Feedback captured | Issue or note references OPS/E or SAC |
| TC-002 | Baseline change | ConOps/SRD/SAC updated together when behavior changes |
| TC-003 | Scenarios | Stay Open until re-verified if behavior claim changes |
| TC-004 | Risks | New deferrals land in Risks.md not ad-hoc folders |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-E-07-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
