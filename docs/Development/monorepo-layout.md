# Monorepo layout

```
ControlPanelERP/
  apps/
    web/              # Next.js control panel
    gateway/          # NestJS API gateway
    orchestrator/     # FastAPI OpenClaw orchestration
  packages/
    contracts/        # shared contracts (stub; YAML refs in docs for now)
  docker/
    docker-compose.yml
    Dockerfile.*
  docs/
    Components/
    Deployment/
    Development/
    Software Patterns Docs/
```

Scaffold pass creates folders and README stubs only. Application frameworks are added when implementing Epic tasks.
