# TP-OPS-015 - Bind a data-source edge into ontology

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-015 |
| **Scenario** | [OPS-015](../../Subsystem/SAC-005/Scenarios/OPS-015.md) (**Open**) |
| **Subsystem** | SAC-005, SAC-006 |
| **Related SRD** | SRD-PEER-003, parent SRD-EDGE-003, SRD-SEC-005 |
| **Method** | Test / Inspection |
| **Status** | **Open** |

## Purpose

Prove a product-owned **data-source** connector binds into ontology properties without leaking raw source payloads on public catalog APIs.

## Setup

| Item | Value |
|------|--------|
| Ontology | Property bound under `bindings/<data-connector>/` |
| APIs | Public `GET /ontology` omits bindings |
| Note | Stub/fixture OK if full data peer not shipped; document gap honestly |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Binding present | ACL-side mapping exists for a property |
| TC-002 | Public catalog | No raw source payload / vendor field dump |
| TC-003 | Explorer / Schema | Business vocabulary only |
| TC-004 | Customer upload | Not allowed |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-015-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
