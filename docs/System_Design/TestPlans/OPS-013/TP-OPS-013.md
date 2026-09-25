# TP-OPS-013 - Act on ontology object targeting any SoA

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-013 |
| **Scenario** | [OPS-013](../../Subsystem/SAC-004/Scenarios/OPS-013.md) (**Open**) |
| **Subsystem** | SAC-004, SAC-005, SAC-006 |
| **Related SRD** | SRD-SKL-012, SRD-ONT-009, parent SRD-EDGE-001, SRD-ONT-005 |
| **Method** | Test / Demo |
| **Status** | **Open** |

## Purpose

Prove ontology action -> allowlisted skill -> **owning** `connector_id` (any enabled SoA peer - not hard-coded Odoo).

## Setup

| Item | Value |
|------|--------|
| Control plane | Gateway + orch + web |
| Ontology | Type + action declared; binding names owning connector |
| Edge | At least one SoA enabled for the skill (ERP or other) |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Happy path | Action resolves skill + connector_id; executes via that adapter |
| TC-002 | Evidence | Actor, correlation_id, connector_id, outcome recorded |
| TC-003 | Missing binding | Clear reject; no invented vendor call |
| TC-004 | Disabled connector | Clear reject / degrade |
| TC-005 | UI language | No raw vendor model names required of operator |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-013-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
