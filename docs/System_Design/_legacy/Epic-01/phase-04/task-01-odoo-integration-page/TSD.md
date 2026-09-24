# Odoo Integration page — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Planned UI

- Route: `/integrations/odoo`
- Fields: url, db, username, api_key/password (write-only display), last_checked_at, status
- Actions: Save, Test connection

## Planned API

- `GET/PUT /integrations/odoo`
- `POST /integrations/odoo/test`

## Planned storage

- `OdooConnectorConfig` in control-plane Postgres (encrypted secret fields later)
- Env fallback for local: `ODOO_URL`, `ODOO_DB`, `ODOO_USERNAME`, `ODOO_PASSWORD`, `ODOO_API_KEY`

## Notes

Orchestrator adapters read config at runtime in a later epic.
