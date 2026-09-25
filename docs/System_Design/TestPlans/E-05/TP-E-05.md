# TP-E-05 - Controlled release and distribution

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-E-05 |
| **Scenario** | [E-05](../../Subsystem/SAC-010/Scenarios/E-05.md) (**Open**) |
| **Subsystem** | SAC-010 |
| **Related SRD** | SRD-CI-*, release checklist |
| **Method** | Inspection |
| **Status** | **Open** |

## Purpose

Prove release does not claim OPS/E closed without evidence; lint/smokes on checklist.

## Setup

| Item | Value |
|------|--------|
| CI | .github/workflows lint |
| Checklist | SAC-010 SRD / release notes |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Lint on PR | Workflow present and required |
| TC-002 | Contracts/ontology smoke | On checklist even if CI job planned |
| TC-003 | No false closure | Release notes do not mark Open scenarios Closed without TR |
| TC-004 | Distribution | Documented artifact/tag path |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-E-05-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
