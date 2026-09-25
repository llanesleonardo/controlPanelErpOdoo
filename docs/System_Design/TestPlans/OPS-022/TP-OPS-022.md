# TP-OPS-022 - Inspect connector ownership of properties

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-022 |
| **Scenario** | [OPS-022](../../Subsystem/SAC-006/Scenarios/OPS-022.md) (**Open**) |
| **Subsystem** | SAC-006, SAC-005 |
| **Related SRD** | SRD-ONT-012, SRD-PEER-005, parent SRD-CONN-003 |
| **Method** | Inspection / Demo |
| **Status** | **Open** |

## Purpose

Prove operators can see which connector owns a property/binding so ERP is **not** assumed to own every field.

## Setup

| Item | Value |
|------|--------|
| Schema / inspector | Binding ownership visible when product surface exists |
| Bindings | `resources/packages/ontology/bindings/<connector>/` |
| Note | If UI inspector not shipped: Inspection of binding YAML + docs is acceptable; record partial |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | ERP-owned field | Shows `odoo` (or ERP peer) ownership |
| TC-002 | Non-ERP field (when present) | Shows other `connector_id` |
| TC-003 | Assumption check | Docs/UI do not claim ERP owns all properties |
| TC-004 | Public catalog | Still omits raw vendor maps |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-022-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
