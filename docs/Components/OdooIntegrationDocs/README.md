# OdooIntegrationDocs

Odoo 18 remains the **system of record** for sales, inventory, accounting, and master data. Automation lives **outside** Odoo.

## Principles

- No free-form prompt-driven writes into Odoo
- Domain adapters only (JSON-RPC / XML-RPC or REST as chosen per adapter)
- Control-plane DB ≠ Odoo DB
- Integration page in the control panel configures URL, DB, credentials/API key, and health

## Adapter domains (MVP-oriented)

Customers, products, sales orders, inventory adjustments, purchase orders, invoice status/review.

## Related

- [ControlPanelDocs](../ControlPanelDocs/README.md) (Integration page)
- [reliability-rules](../../Development/reliability-rules.md)
- [Deployment/Docker](../../Deployment/Docker/README.md) (Odoo external to Compose)
