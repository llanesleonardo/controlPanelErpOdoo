# Monorepo layout

Control plane + first-party connectors (Odoo adapters live under orchestrator today; future connectors follow the same boundary).

```
ControlPanelERP/
  apps/
    web/              # Next.js control panel
                      #   /ontology — Schema | Explorer | Vertex | Process map
    gateway/          # NestJS API gateway
                      #   OntologyModule — catalog + GET /ontology/objects BFF
    orchestrator/     # FastAPI orchestration + connector adapters
  packages/
    contracts/        # @control-panel-erp/contracts (taxonomy + YAML)
    ontology/         # @control-panel-erp/ontology (entity types + bindings)
                      #   entity-types/*.yaml, bindings/<connector>/*.yaml
    odoo_schema/      # Odoo connector schema catalog (connector-specific)
  docker/
    docker-compose.yml   # postgres by default; profile apps → web/gateway/orch
    Dockerfile.gateway   # must include packages/ontology (+ contracts)
    Dockerfile.web
    Dockerfile.orchestrator
  docs/
    Components/
    Deployment/
    Development/
    GAPS/             # deferred Engine + visual exploration gaps
    Software Patterns Docs/
```

## Workspaces

Root `package.json` uses npm workspaces (`packages/*`).

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
cd docker && docker compose --profile apps up --build -d
```

## Related

- [architecture-overview](./architecture-overview.md)
- [ontology](./ontology.md)
- [Deployment/Docker](../Deployment/Docker/README.md)
