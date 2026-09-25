# TP-OPS-020 - AI suggests intent; human/skill executes

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-020 |
| **Scenario** | [OPS-020](../../Subsystem/SAC-003/Scenarios/OPS-020.md) (**Open**) |
| **Subsystem** | SAC-003, SAC-001 |
| **Related SRD** | SRD-TAX-009, parent SRD-EDGE-007, SRD-SEC-002 |
| **Method** | Test / Demo / Inspection |
| **Status** | **Open** |

## Purpose

Prove AI helpers may suggest **known** intent codes only; execution remains allowlisted skills (human or system).

## Setup

| Item | Value |
|------|--------|
| Taxonomy | Known intent list available |
| AI surface | Stub or real suggest UI - must not invent tools |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Suggest known code | Suggestion ∈ published known intents |
| TC-002 | Invented tool/payload | Rejected / not executable |
| TC-003 | Execute path | Only via allowlisted skill after human/system confirm |
| TC-004 | Unknown suggestion | Cannot run as new connector/skill |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-020-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
