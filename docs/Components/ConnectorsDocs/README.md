# ConnectorsDocs

Product-owned **first-party connector catalog**. The control plane is multi-system; each external SoR is reached only through a connector we ship.

## Principles

- **We** standardize the connector SPI and skill/port contracts — not the customer  
- Ship connectors **one by one**; do not open a customer plugin SDK in v1  
- Vendor auth, payloads, modules, and schema stay inside the connector (ACL)  
- UI shows intents/skills + which enabled connectors support them  
- Odoo is connector `odoo` (see [OdooIntegrationDocs](../OdooIntegrationDocs/README.md))

## Catalog (current)

| connector_id | Status | Notes |
|--------------|--------|-------|
| `odoo` | shipping | JSON-RPC; estimate read live; schema sync via `packages/odoo_schema` |

Future rows are added only when we implement and certify a connector.

## Related

- [Development/connectors](../../Development/connectors.md)  
- [ContractsDocs](../ContractsDocs/README.md)  
- [OrchestratorDocs](../OrchestratorDocs/README.md)  
- [reliability-rules](../../Development/reliability-rules.md)  
