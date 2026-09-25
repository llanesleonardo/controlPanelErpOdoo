# TP-OPS-021 - Walk Estimate->…->Ship Process spine

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-021 |
| **Scenario** | [OPS-021](../../Subsystem/SAC-006/Scenarios/OPS-021.md) (**Open**) |
| **Subsystem** | SAC-006 |
| **Related SRD** | SRD-ONT-004, parent SRD-ONT-004 |
| **Method** | Inspection / Demo |
| **Status** | **Open** |

## Purpose

Prove Process map shows the curated commercial/make/ship spine - not every ontology link.

## Setup

| Item | Value |
|------|--------|
| UI | `/ontology` -> Process map |
| Data | Curated spine from product ontology (not auto-layout of all links) |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Spine visible | Estimate -> … -> Shipping (or documented equivalent) |
| TC-002 | Not every link | Does not dump full link soup |
| TC-003 | Labels | Shop-facing stage names |
| TC-004 | Nav | Process is curated view; Map still launches intents |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-021-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
