# OrchestratorDocs

FastAPI OpenClaw orchestration (`apps/orchestrator`).

## Responsibilities

- Map human intent → taxonomy code
- Select allowlisted skill
- Enforce dry-run / approval / execute / verify lifecycle
- Invoke only registered Odoo domain adapters with typed contracts
- Write task outcomes, incidents, and evidence to control-plane DB

## Skill families (examples)

- `skill.sales_order_ops`
- `skill.inventory_adjustment_ops`
- `skill.invoice_exception_review`
- `skill.customer_master_data_fix`
- `skill.incident_triage`
- `skill.reconciliation_assist`

## Related

- [request-lifecycle](../../Development/request-lifecycle.md)
- [TaxonomyDocs](../TaxonomyDocs/README.md)
- App stub: [apps/orchestrator](../../../apps/orchestrator/README.md)
