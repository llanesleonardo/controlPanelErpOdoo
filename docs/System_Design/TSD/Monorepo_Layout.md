# Monorepo layout

Control plane + **ontology hub** + first-party **connector catalog** (Odoo = SoA peer #1 under orchestrator; more peers share the same boundary).

```text
ControlPanelOntology/
  apps/
    web/              # Next.js — Map, /console, /tasks, /logs, /ontology
    gateway/          # NestJS BFF — allowlist, ontology catalog/objects, tasks
    orchestrator/     # FastAPI skills + connector catalog adapters
  resources/
    packages/
      contracts/      # taxonomy + action-contract YAML
      ontology/       # hub: entity types + bindings/<peer>/
    scripts/          # backup-controlplane.sh, etc.
    storage/local/    # STORAGE_ROOT default (evidence) — gitignored
    logs/             # LOG_DIR default — gitignored
  docker/
    docker-compose.yml   # control plane only; edges via env URLs
    Dockerfile.gateway   # COPY from resources/packages/* into image packages/*
    Dockerfile.web
    Dockerfile.orchestrator
  docs/
    System_Design/    # V-Model (ConOps hub, SRD, TSD, SAC, Risks, TestPlans)
      Subsystem/SAC-003/Authoring/   # ContractsDocs + TaxonomyDocs
      Subsystem/SAC-009/Guides/      # Compose runbook, secrets, storage
      TSD/Pattern_Selection.md       # agent pattern entry (impact / risk / Diff)
      TSD/Component_Map.md           # ontology hub + peer edges
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
npm test -w @control-panel-ontology/contracts
npm test -w @control-panel-ontology/ontology
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

- [Parent TSD](./ControlPanelOntology_TSD.md)
- [Pattern_Selection](./Pattern_Selection.md)
- [Component_Map](./Component_Map.md)
- [SAC-006 Ontology](../Subsystem/SAC-006/README.md)
- [SAC-009 runtime / Compose](../Subsystem/SAC-009/README.md)
- Root [README](../../../README.md)
