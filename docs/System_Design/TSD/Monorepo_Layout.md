# Monorepo layout

Control plane + first-party connectors (Odoo adapters live under orchestrator today; future connectors follow the same boundary).

```text
ControlPanelERP/
  apps/
    web/              # Next.js — ERP Map, /console, /tasks, /logs, /ontology
    gateway/          # NestJS BFF — allowlist, ontology catalog/objects, tasks
    orchestrator/     # FastAPI skills + connector adapters
  resources/
    packages/
      contracts/      # taxonomy + action-contract YAML
      ontology/       # entity types + bindings/<connector>/
    scripts/          # backup-controlplane.sh, etc.
    storage/local/    # STORAGE_ROOT default (evidence) — gitignored
    logs/             # LOG_DIR default — gitignored
  docker/
    docker-compose.yml   # postgres by default; --profile apps → web/gateway/orch
    Dockerfile.gateway   # COPY from resources/packages/* into image packages/*
    Dockerfile.web
    Dockerfile.orchestrator
  docs/
    System_Design/    # V-Model (ConOps, SRD, TSD, SAC, Risks, TestPlans, _legacy)
      Subsystem/SAC-003/Authoring/   # ContractsDocs + TaxonomyDocs
      Subsystem/SAC-009/Guides/      # Compose runbook, secrets, storage
      TSD/Pattern_Selection.md       # agent pattern entry (impact / risk / Diff)
    User_Guide/       # Screens, Business_map, Connect_ERP
    Software Patterns Docs/
      <Category>/
      recognition_examples/
      composition_problems/
```

## Workspaces

Root `package.json` uses npm workspaces (`resources/packages/*`, `apps/web`, `apps/gateway`).

```bash
npm install
npm test -w @control-panel-erp/contracts
npm test -w @control-panel-erp/ontology
npm run contracts:sync
```

Local apps (with Compose Postgres up):

```bash
npm run dev:gateway
npm run dev:orchestrator
npm run dev:web          # http://localhost:3000/ontology
```

Docker apps profile:

```bash
docker compose -f docker/docker-compose.yml --profile apps up --build -d
```

## Related

- [Parent TSD](./ControlPanelERP_TSD.md)
- [Pattern_Selection](./Pattern_Selection.md)
- [SAC-006 Ontology](../Subsystem/SAC-006/README.md)
- [SAC-009 runtime / Compose](../Subsystem/SAC-009/README.md)
- Root [README](../../../README.md)
