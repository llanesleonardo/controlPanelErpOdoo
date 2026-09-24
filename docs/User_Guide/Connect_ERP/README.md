# Connect your ERP (Odoo)

Your **ERP** (enterprise resource planning system) remains the system of record. The control panel talks to it through a **first-party connector** we ship — today that is **Odoo** (`odoo`). We do not ask the shop to write plugins.

## What you do in the UI

1. Open **Integrations → Odoo**.  
2. Enter URL, database name, and credentials / API key.  
3. **Test** health. Prefer **simulate** mode when learning the panel without touching live ERP data.  
4. When live, allowlisted reads (for example job estimates) can pull real rows into Sales / Explorer.

## What stays true

- No free-form “just write whatever into Odoo” from a chat prompt  
- Control-plane database ≠ ERP database  
- Odoo is **not** started by our Docker Compose — it stays external ([SAC-009](../../System_Design/Subsystem/SAC-009/README.md))  
- Later connectors (other ERPs or systems) will appear the same way: product-shipped, one by one  

## Practice

- [OPS-001](../../System_Design/Subsystem/SAC-005/Scenarios/OPS-001.md) — read live estimates  

## For builders

Engineering: [SAC-005](../../System_Design/Subsystem/SAC-005/README.md) · Bring-up: [Compose runbook](../../System_Design/Subsystem/SAC-009/Guides/Compose_and_Runbook.md)
