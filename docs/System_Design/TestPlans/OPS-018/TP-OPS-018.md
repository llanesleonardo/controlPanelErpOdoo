# TP-OPS-018 - Automation fires skill on ontology action

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-018 |
| **Scenario** | [OPS-018](../../Subsystem/SAC-007/Scenarios/OPS-018.md) (**Open**) |
| **Subsystem** | SAC-007, SAC-004 |
| **Related SRD** | SRD-TSK-007, parent SRD-EDGE-005 |
| **Method** | Test / Demo |
| **Status** | **Open** |

## Purpose

Prove automations trigger the **same** allowlisted skill path as humans (with approval when required).

## Setup

| Item | Value |
|------|--------|
| Automation | Fixture trigger or documented hook into skills/tasks |
| Policy | Approval required when skill policy says so |
| Note | If automation runtime not shipped: Inspection of design + stub trigger; record partial honestly |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Trigger | Creates/runs allowlisted skill / task |
| TC-002 | Same path | Goes gateway -> orch -> connector (not side door) |
| TC-003 | Needs approval | Lands in queue; human can approve/reject |
| TC-004 | Unknown skill | Rejected like human path |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-018-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
