# TP-OPS-017 - Analytics / workflow reads ontology objects

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-017 |
| **Scenario** | [OPS-017](../../Subsystem/SAC-002/Scenarios/OPS-017.md) (**Open**) |
| **Subsystem** | SAC-002, SAC-001 |
| **Related SRD** | SRD-SCR-011, parent SRD-UI-004, SRD-EDGE-006 |
| **Method** | Demo / Test |
| **Status** | **Open** |

## Purpose

Prove analytics/workflow UIs consume ontology/skill APIs via the **gateway** - not browser-direct vendor APIs.

## Setup

| Item | Value |
|------|--------|
| UI | Analytics or workflow surface (or stub page calling gateway) |
| Network | DevTools / proxy to prove no direct peer calls |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Read objects / catalog | Data via gateway ontology/skill routes |
| TC-002 | Browser network | No direct Odoo / peer RPC |
| TC-003 | Credentials | Not embedded in the client |
| TC-004 | Failure | Honest gateway error when peer/skill fails |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-017-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
