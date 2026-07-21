# ControlPanelDocs

External control panel UI (`apps/web`). Organized around **operations**, not Odoo menus.

## Planned panels

| Panel | Purpose |
|-------|---------|
| Request console | Enter intent, domain, dry-run vs commit |
| Task queue | Pending / running / completed / failed / needs approval |
| CRUD workspace | Guided forms (customers, products, SO, inventory adj, PO, invoice review) |
| Log explorer | Request, payload, skill, downstream response, trace ID |
| Incident center | Issue, root cause, remediation, recurrence |
| Knowledge base | Approved runbooks, vocabulary, contracts |
| Admin | Skills registry, policies, permissions, thresholds, connectors |
| Profile | User profile |
| Integration (Odoo) | Connector status and settings |
| Theme | Dark / light |

## Auth surfaces

Login, users, roles (RBAC). Gateway owns identity; UI consumes sessions/tokens.

## Related

- [architecture-overview](../../Development/architecture-overview.md)
- App stub: [apps/web](../../../apps/web/README.md)
