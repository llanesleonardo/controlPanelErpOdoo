# Connector SPI & catalog — Concept of Operations

**Status:** not started  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Operator view

1. Operator opens Integrations and configures **Odoo** (credentials, test health).  
2. Skills in the ERP map only run if the Odoo connector is healthy (or simulate mode) and the skill is allowlisted.  
3. Operator never uploads a custom adapter or vendor payload schema.

## Platform view

1. We ship connector `odoo` first; later connectors follow the same SPI.  
2. Each new connector is a product release, not a customer project.  
3. Capability matrix gates which intents appear as executable for a tenant.
