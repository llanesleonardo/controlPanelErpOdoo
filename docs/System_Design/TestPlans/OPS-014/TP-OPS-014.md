# TP-OPS-014 - Enable / health-check a non-ERP SoA connector

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-014 |
| **Scenario** | [OPS-014](../../Subsystem/SAC-005/Scenarios/OPS-014.md) (**Open**) |
| **Subsystem** | SAC-005 |
| **Related SRD** | SRD-PEER-002, parent SRD-EDGE-002, SRD-CONN-002 |
| **Method** | Test / Demo / Inspection |
| **Status** | **Open** |

## Purpose

Prove a **non-ERP** system-of-action peer can be configured and health-checked using the same first-party catalog pattern as `odoo`.

## Setup

| Item | Value |
|------|--------|
| Catalog | Product-owned SoA connector stub or fixture (not customer-uploaded) |
| Control plane | Gateway (+ UI Integrations surface when present) |
| Note | If second SoA not shipped yet: Inspection of SPI/catalog design + stub config is acceptable; record **Blocked/partial** honestly |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Enable peer | Appears in catalog with `connector_id` ≠ `odoo` |
| TC-002 | Test connection | `ok` / `degraded` / `down`; secrets masked |
| TC-003 | Capability list | Declared skills visible; ERP peer still present as #1 |
| TC-004 | Customer adapter upload | Not offered / rejected |
| TC-005 | Compose | Peer remains outside Compose |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-014-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
