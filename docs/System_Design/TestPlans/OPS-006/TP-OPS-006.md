# TP-OPS-006 - Expand related types in Vertex

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-006 |
| **Scenario** | [OPS-006](../../Subsystem/SAC-006/Scenarios/OPS-006.md) (**Open**) |
| **Subsystem** | SAC-006 |
| **Related SRD** | SRD-ONT-003, 005, 006, parent SRD-ONT-003 |
| **Method** | Demo |
| **Status** | **Open** |

## Purpose

Prove Vertex seed + Search Around along declared links without requiring full twin (GAP-01 deferred).

## Setup

| Item | Value |
|------|--------|
| Control plane | Gateway + web |
| Edge | Not required for type-level Search Around |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Seed a type | Seed visible |
| TC-002 | Search Around | Related types expand along declared links |
| TC-003 | Bound | No CDC / instance twin required |
| TC-004 | Labels | Business vocabulary |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-006-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
