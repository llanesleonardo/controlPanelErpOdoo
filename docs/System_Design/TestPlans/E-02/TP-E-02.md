# TP-E-02 - Subsystem Digital Thread alignment review

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-E-02 |
| **Scenario** | [E-02](../../Subsystem/Scenarios/E-02.md) (**Open**) |
| **Subsystem** | Cross-cutting |
| **Related SRD** | Allocation of OPS/E to SAC TRACE |
| **Method** | Inspection |
| **Status** | **Open** |

## Purpose

Prove each OPS/E has a primary SAC home and connector catalog is not collapsed to Odoo-only ownership.

## Setup

| Item | Value |
|------|--------|
| Inputs | Subsystem README, SAC TRACE, SCENARIOS, Component_Map |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | OPS-001…022 owners | Each has primary SAC or documented home |
| TC-002 | E-01…08 owners | Cross-cutting or SAC-009/010 as indexed |
| TC-003 | Multi-SoA | SAC-005 owns peers; SAC-004 skills; SAC-006 hub |
| TC-004 | Orphans | No SHALL without owner; no ownerless scenario |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-E-02-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
