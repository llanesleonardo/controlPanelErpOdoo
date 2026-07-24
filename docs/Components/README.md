# Components

Product-surface documentation (state, contracts, UX). One `*Docs` folder per area.

| Area | Notes |
|------|--------|
| [ControlPanelDocs](./ControlPanelDocs/) | UI panels, theme, profile |
| [GatewayDocs](./GatewayDocs/) | NestJS API gateway |
| [OrchestratorDocs](./OrchestratorDocs/) | FastAPI orchestration |
| [ConnectorsDocs](./ConnectorsDocs/) | First-party connector catalog (product-owned SPI) |
| [OdooIntegrationDocs](./OdooIntegrationDocs/) | Connector `odoo` — first SoR adapter |
| [TaxonomyDocs](./TaxonomyDocs/) | Controlled vocabulary |
| [ContractsDocs](./ContractsDocs/) | Intent / Task / Skill / Audit schemas |

**Agents:** treat Components + Development + Software Patterns Docs as support docs, then verify against `apps/` when code exists.
