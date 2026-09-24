# Odoo Integration page — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [OdooIntegrationDocs](../../../../../User_Guide/Connect_ERP/README.md)

## Purpose

Define the admin Integration (Odoo) page for configuring and health-checking the Odoo 18 connector.

## Scope

- Store Odoo URL, DB name, username / API key metadata in control-plane DB (secrets encrypted at rest later)
- Test connection action
- Show connector status (ok / degraded / down)
- Env-based defaults documented (`.env.example` `ODOO_*`)

## Out of Scope

- Embedding Odoo UI
- Multi-company advanced mapping UI
- Implementing the page or live connector in Epic-01

## Requirements

### SRD-E01-phase-04-T01-01

**Settings** — Admins shall configure Odoo connection settings in the control panel (later).

### SRD-E01-phase-04-T01-02

**Test connection** — Admins shall run a health/test action that reports success or error class.

### SRD-E01-phase-04-T01-03

**Separation** — Odoo remains external SoR; credentials never written into Odoo DB from this panel’s purpose beyond normal API auth.

### SRD-E01-phase-04-T01-04

**Docs-only** — Epic-01 documents the Integration page; code deferred.
