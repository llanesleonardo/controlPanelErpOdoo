# TP-OPS-005 - Search objects in Explorer

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-005 |
| **Scenario** | [OPS-005](../../Subsystem/SAC-006/Scenarios/OPS-005.md) (**Open**) |
| **Subsystem** | SAC-006, SAC-005 |
| **Related SRD** | SRD-ONT-008, parent SRD-EST-002 |
| **Method** | Test / Demo |
| **Status** | **Open** |

## Purpose

Prove Explorer lists objects; Estimate uses ERP SoA peer skill when live, else clear failure or labeled demo.

## Setup

| Item | Value |
|------|--------|
| Control plane | Gateway + orch + web |
| Edge | `ODOO_MODE=simulate` or live |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Explorer -> Estimate | Live rows or clear fail / labeled demo |
| TC-002 | Type without live skill | Labeled **demo** (not fake live) |
| TC-003 | Columns | Shop vocabulary only |
| TC-004 | Peer down (live) | Honest error class/message |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-005-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
