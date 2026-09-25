# TP-OPS-009 - Pick intent from Map / section -> console

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-009 |
| **Scenario** | [OPS-009](../../Subsystem/SAC-002/Scenarios/OPS-009.md) (**Open**) |
| **Subsystem** | SAC-002 |
| **Related SRD** | SRD-SCR-001…005, 011, parent SRD-UI-001, SRD-UI-002 |
| **Method** | Demo |
| **Status** | **Open** |

## Purpose

Prove Map (launcher) -> section -> intent -> console. Map is not a claim that ERP owns every property.

## Setup

| Item | Value |
|------|--------|
| Services | Web + gateway |
| Actor | Dev stub OK |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | `/` module tile | -> `/sections/<slug>` |
| TC-002 | Intents rail | Section-scoped; search filters |
| TC-003 | Intent detail | Profile / call path; no peer credentials |
| TC-004 | Console link | `/console?intent_code=…` (+ domain) |
| TC-005 | Classify optional | Gateway taxonomy `intent_code` |
| TC-006 | Theme smoke | Light/dark survives refresh |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-009-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
