# TP-OPS-016 - Invoke a logic-source edge as ontology action

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-016 |
| **Scenario** | [OPS-016](../../Subsystem/SAC-004/Scenarios/OPS-016.md) (**Open**) |
| **Subsystem** | SAC-004, SAC-005 |
| **Related SRD** | SRD-SKL-012, SRD-PEER-004, parent SRD-EDGE-004 |
| **Method** | Test |
| **Status** | **Open** |

## Purpose

Prove logic-source execution is only ontology action -> allowlisted skill -> logic connector (never free-form code from chat).

## Setup

| Item | Value |
|------|--------|
| Skill | Allowlisted logic skill registered |
| Connector | Logic peer in first-party catalog (stub OK) |
| Actor | Authorized; correlation id propagated |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Action -> skill -> logic connector | Runs or dry-runs with evidence |
| TC-002 | Free-form / unknown | Rejected; no invented logic call |
| TC-003 | Allowlist miss | Fail closed |
| TC-004 | Evidence | connector_id = logic peer recorded |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-016-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
