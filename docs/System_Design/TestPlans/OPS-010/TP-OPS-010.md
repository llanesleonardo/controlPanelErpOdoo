# TP-OPS-010 - Classify / resolve known intent vs taxonomy

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-010 |
| **Scenario** | [OPS-010](../../Subsystem/SAC-003/Scenarios/OPS-010.md) (**Open**) |
| **Subsystem** | SAC-003 |
| **Related SRD** | SRD-TAX-001…009, SRD-CTR-001…007, parent SRD-TAX-P-001 |
| **Method** | Test |
| **Status** | **Open** |

## Purpose

Prove known intent codes and contracts resolve from product taxonomy (vocabulary for skills across peer edges).

## Setup

| Item | Value |
|------|--------|
| Repo | npm workspaces; `resources/packages/contracts` |
| Preferred | `npm test -w @control-panel-ontology/contracts` |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | `isKnownIntentCode('sales.order.create')` | true |
| TC-002 | `isKnownIntentCode('inventory.stock.adjust')` | true |
| TC-003 | `isKnownIntentCode('accounting.invoice.post')` | true |
| TC-004 | `isKnownIntentCode('not.a.real.code')` | false |
| TC-005 | `loadContract('inventory.stock.adjust')` | parses object |
| TC-006 | sync-schemas | copies Authoring YAML into package |
| TC-007 | Package smoke | contracts workspace tests pass |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-010-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
