# Monorepo layout

Control plane + first-party connectors (Odoo adapters live under orchestrator today; future connectors follow the same boundary).

```
ControlPanelERP/
  apps/
    web/              # Next.js control panel
    gateway/          # NestJS API gateway
    orchestrator/     # FastAPI orchestration + connector adapters
  packages/
    contracts/        # @control-panel-erp/contracts (taxonomy + YAML)
    odoo_schema/      # Odoo connector schema catalog (connector-specific)
  docker/
    docker-compose.yml
    Dockerfile.*
  docs/
    Components/
    Deployment/
    Development/
    Software Patterns Docs/
```

## Workspaces

Root `package.json` uses npm workspaces (`packages/*`).

```bash
npm install
npm test -w @control-panel-erp/contracts
npm run contracts:sync
```

Application frameworks under `apps/*` are added in later epics.
