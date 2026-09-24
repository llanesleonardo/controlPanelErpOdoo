# Vocabulary dictionary (reference)

Concise dictionary for OpenClaw taxonomy. Expand during Epic-01 tasks.

## Domains → primary entities

| Domain | Entities |
|--------|----------|
| sales | sales_order, quotation |
| inventory | stock_quant, stock_move, warehouse |
| purchasing | purchase_order |
| accounting | invoice, payment, journal_entry |
| customers / vendors | partner |
| products | product_template, product_product |
| jobs | task (control-plane job) |
| incidents | incident, runbook |
| logs | audit_event |

## Example operations

| Intent code | Risk (sketch) | Approval sketch |
|-------------|---------------|-----------------|
| `sales.order.create` | medium | operator; manager if total > threshold |
| `inventory.stock.adjust` | high | manager above qty threshold |
| `accounting.invoice.post` | high | manager / accounting role |
| `customers.partner.update` | medium | operator |
| `products.product_template.read` | low | none |

## Skills ↔ task families

| Skill | Allowed families |
|-------|------------------|
| `skill.sales_order_ops` | sales.* |
| `skill.inventory_adjustment_ops` | inventory.stock.* |
| `skill.invoice_exception_review` | accounting.invoice.* |
| `skill.customer_master_data_fix` | customers.partner.* |
| `skill.incident_triage` | incidents.* |
| `skill.reconciliation_assist` | accounting.payment.*, reconcile |
