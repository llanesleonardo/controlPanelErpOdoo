# TP-E-04 - Controlled build, promotion, deployment, rollback

| Field | Value |
|-------|--------|
| **Test plan ID** | TP-E-04 |
| **Scenario** | [E-04](../../Subsystem/SAC-009/Scenarios/E-04.md) (**Open**) |
| **Subsystem** | SAC-009 |
| **Related SRD** | SRD-DEP-* (deploy path) |
| **Method** | Demo / Inspection |
| **Status** | **Open** |

## Purpose

Prove control-plane deploy/promote/rollback is documented and peers stay external.

## Setup

| Item | Value |
|------|--------|
| Compose | docker/docker-compose.yml + runbook |
| Images | gateway includes ontology/contracts from resources/packages |

## Checks

| TC | Check | Expect |
|----|-------|--------|
| TC-001 | Bring-up checklist | Documented and workable (see OPS-007) |
| TC-002 | Rollback note | Documented revert (compose previous / prior images) |
| TC-003 | Peers external | No Odoo-in-Compose promotion |
| TC-004 | Secrets | Not committed; `.env.example` placeholders only |



## Pass / fail

Scenario Success met; failure paths honest. **Do not** close SRVM without a TR under `Reports/`.

## Reports

Create or update `Reports/TR-E-04-01.md` when executed.

## Revision

| Date | Ver | Change |
|------|-----|--------|
| 2026-09-25 | 0.2 | Align to ontology hub + multi-SoA (ERP = SoA peer #1); SAC SRD sync |
