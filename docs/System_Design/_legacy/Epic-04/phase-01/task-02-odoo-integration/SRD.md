# Odoo integration — Software Requirements Document (SRD)

**Status:** planned (Epic-04 implementation)  
**Upstream:** [Odoo Integration page (Epic-01)](../../../Epic-01/phase-04/task-01-odoo-integration-page/)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [OdooIntegrationDocs](../../../../../User_Guide/Connect_ERP/README.md)

## Purpose

Deliver the admin Integration (Odoo) surface: configure connection metadata, test connectivity, and surface connector status — keeping Odoo external and credentials out of the Odoo DB except normal API auth.

## Scope

- Persist `OdooConnectorConfig` in control-plane Postgres (URL, DB, username, secret metadata)
- Env fallback: `ODOO_URL`, `ODOO_DB`, `ODOO_USERNAME`, `ODOO_PASSWORD`, `ODOO_API_KEY`, `ODOO_MODE`
- `GET/PUT /integrations/odoo`, `POST /integrations/odoo/test`
- Web route `/integrations/odoo` (Save, Test connection, status badge)
- Map Odoo faults to taxonomy error classes where applicable

## Out of Scope

- Embedding Odoo UI
- Multi-company advanced mapping
- Encryption-at-rest for secrets (document; env preferred for local)
- Live business writes

## Requirements

### SRD-E04-T02-01

**Settings** — Operators shall configure Odoo URL, database, and credentials in the control panel (dev-actor for MVP).

### SRD-E04-T02-02

**Test connection** — Operators shall run a test that returns ok / degraded / down plus error detail.

### SRD-E04-T02-03

**Separation** — Control-plane DB remains separate from Odoo; secrets are not logged in plaintext.

### SRD-E04-T02-04

**Mode** — System shall support `ODOO_MODE=live|simulate` for environments without a reachable Odoo.
