# Monorepo layout

```
ControlPanelERP/
  apps/
    web/              # Next.js control panel (stub)
    gateway/          # NestJS API gateway (stub)
    orchestrator/     # FastAPI OpenClaw orchestration (stub)
  packages/
    contracts/        # @control-panel-erp/contracts (taxonomy + YAML)
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
