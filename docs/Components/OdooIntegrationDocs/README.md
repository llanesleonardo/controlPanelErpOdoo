# OdooIntegrationDocs

**First-party connector `odoo`** (connector #1). Odoo remains a **system of record** for the domains this connector covers. The control plane is not “an Odoo product”; Odoo is one curated connector in the [ConnectorsDocs](../ConnectorsDocs/README.md) catalog.

Automation, approvals, evidence, and agent entrypoints live **outside** Odoo.

## Principles

- No free-form prompt-driven writes into Odoo  
- Domain adapters only (JSON-RPC / XML-RPC or REST as chosen per adapter)  
- Control-plane DB ≠ Odoo DB  
- Integration page configures URL, DB, credentials/API key, and health for this connector  
- Vendor models (e.g. `customer.estimate`) stay behind the ACL — UI/API use taxonomy intents  

## Adapter domains (MVP-oriented)

Customers, products, sales orders / estimates, inventory adjustments, purchase orders, invoice status/review — only as allowlisted skills ship.

## Related

- [ConnectorsDocs](../ConnectorsDocs/README.md)  
- [Development/connectors](../../Development/connectors.md)  
- [ControlPanelDocs](../ControlPanelDocs/README.md) (Integration page)  
- [reliability-rules](../../Development/reliability-rules.md)  
- [Deployment/Docker](../../Deployment/Docker/README.md) (Odoo external to Compose)  
