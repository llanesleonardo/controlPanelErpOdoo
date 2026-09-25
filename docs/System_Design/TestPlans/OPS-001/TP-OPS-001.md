# TP-OPS-001 - Read estimates via SoA connector (ERP peer)

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-001 |
| **Scenario** | [OPS-001](../../Subsystem/SAC-005/Scenarios/OPS-001.md) (**Open**) |
| **Subsystem** | SAC-005 (execute path: SAC-004) |
| **Related SRD** | SRD-ODOO-001…009, parent SRD-CONN-001, SRD-EST-001 |
| **Method** | Test / Demo |
| **Status** | **Open** |

## Purpose

Prove estimate rows are read through the **ERP SoA peer** (`connector_id=odoo`) via allowlisted `sales.estimate.read`. ERP is peer #1, not the product brain.

## Setup

| Item | Value |
|------|--------|
| Control plane | Postgres + gateway + orchestrator + web |
| Edge | External Odoo **or** `ODOO_MODE=simulate` / `ERP_MODE=simulate` |
| Config | `ODOO_*` from `.env.example`; no browser-direct credentials |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Test connection | `ok` / `degraded` / `down`; no password echo |
| TC-002 | Read simulate | Labeled sample rows; shop-facing columns |
| TC-003 | Read live (if configured) | ERP rows; business vocabulary, not raw Odoo models |
| TC-004 | Contains filter | Filters part **or** description |
| TC-005 | Bad auth / DB | Clear failure - not silent empty live success |
| TC-006 | Network | UI -> gateway only; no browser -> Odoo |

## Scope (out)

- Closing OPS-005; free-form vendor RPC; hosting Odoo in Compose


## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-001-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
