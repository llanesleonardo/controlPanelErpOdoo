# Live estimate read — Software Requirements Document (SRD)

**Status:** implemented (Epic-05)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)  
**Upstream module:** SCT Odoo `customer_estimate` (`customer.estimate`)

## Purpose

Deliver the **first live read skill**: `sales.estimate.read` fetches real estimate rows from Odoo Online via JSON-RPC `search_read` on `customer.estimate`, and shows them in the Estimates intent output table.

## Scope

- Domain port `EstimatePort.read_estimates`
- ACL adapter `OdooEstimateAdapter` → `customer.estimate.search_read`
- Orchestrator `POST /skills/execute` allowlist entry for `sales.estimate.read`
- Gateway `POST /skills/execute` proxy
- Web `IntentLiveOutput` on Estimates → Read estimate
- Env: `ODOO_MODE=live` / `ERP_MODE=live` with correct `ODOO_DB`

## Out of Scope

- Any other live intent
- Writes / quote creation (`action_create_customer_quote`)
- Changing the Odoo `customer_estimate` module

## Requirements

### SRD-E05-T03-01

**Allowlist** — Only `sales.estimate.read` may execute via `/skills/execute` in this epic.

### SRD-E05-T03-02

**ACL** — Domain DTOs shall not expose raw Odoo RPC types; adapter maps to `EstimateRecord`.

### SRD-E05-T03-03

**Live data** — With `ODOO_MODE=live` and valid credentials/DB, output rows shall come from Odoo (not dummy).

### SRD-E05-T03-04

**Simulate fallback** — With `ODOO_MODE=simulate`, return deterministic sample rows and a warning.

### SRD-E05-T03-06

**Contains search (read only)** — `sales.estimate.read` shall accept an optional `contains` string and filter estimates where part no **or** description contains that value (case-insensitive). Other intents shall not gain this UI in this epic.
