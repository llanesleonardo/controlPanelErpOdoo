# TP-OPS-007 - Bring up control-plane stack (Compose)

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-OPS-007 |
| **Scenario** | [OPS-007](../../Subsystem/SAC-009/Scenarios/OPS-007.md) (**Open**) |
| **Subsystem** | SAC-009 |
| **Related SRD** | SRD-DEP-001…009, parent SRD-OPS-003 |
| **Method** | Demo / Test |
| **Status** | **Open** |

## Purpose

Prove Compose brings up the **control plane** only; peer edges (ERP SoA #1 and others) stay external.

## Setup

| Item | Value |
|------|--------|
| Docker | Engine + `.env` from `.env.example` |
| Apps | Optional `--profile apps` or host npm |
| Edge | Prefer simulate; peers **not** in Compose |
| Runbook | [Compose_and_Runbook](../../Subsystem/SAC-009/Guides/Compose_and_Runbook.md) |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Compose Postgres | Healthy |
| TC-002 | Gateway health | `GET :3001/health` OK when up |
| TC-003 | Web | `http://localhost:3000` loads when up |
| TC-004 | Services list | **No** Odoo / peer containers |
| TC-005 | Orchestrator | Not a public internet endpoint |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-OPS-007-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
