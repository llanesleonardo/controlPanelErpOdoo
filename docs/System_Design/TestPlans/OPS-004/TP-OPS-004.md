# TP-OPS-004 - Browse Schema (business map)

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-004 |
| **Scenario** | [OPS-004](../../Subsystem/SAC-006/Scenarios/OPS-004.md) (**Open**) |
| **Subsystem** | SAC-006, SAC-002 shell |
| **Related SRD** | SRD-ONT-001, 002, 004, 005, 007, 010, 011, parent SRD-ONT-002, SRD-UI-003 |
| **Method** | Demo / Inspection |
| **Status** | **Open** |

## Purpose

Prove Schema search/inspect of product-owned types without browser YAML editing; ontology is the **hub**.

## Setup

| Item | Value |
|------|--------|
| Control plane | Gateway + web; ontology package loaded |
| Edge | Not required for Schema browse |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Open `/ontology` -> Schema | Types with business labels |
| TC-002 | Open type (Estimate) | Properties, links, actions visible |
| TC-003 | Public catalog | No vendor bindings / Odoo model names in UI payload |
| TC-004 | Authoring | No browser YAML edit (v1) |
| TC-005 | Role vs Map | Schema = hub surface; Map = intent launcher |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-004-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
