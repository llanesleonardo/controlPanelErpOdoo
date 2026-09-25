# Compose strategy and runbook

One Compose definition for local and Linux. Control-plane only; **peer edges** (ERP/Odoo first SoA, plus future SoA/data/logic) stay external via connector URLs.

```mermaid
flowchart LR
  Web[web] --> Gw[gateway]
  Gw --> Orch[orchestrator]
  Gw --> PG[(postgres)]
  Orch --> PG
  Orch --> Edges[external_edge_URLs]
```

NestJS `gateway` is the **application** API entry; optional host TLS/WAF sits outside Compose ([parent TSD](../../../TSD/ControlPanelOntology_TSD.md), [SAC-001](../../SAC-001/README.md)).

## Checklist — run the system

Use this order so dependencies are up before callers.

### 1. Prerequisites

- [ ] Copy `.env.example` → `.env` (never commit `.env`)
- [ ] Set `DATABASE_URL` to host Postgres (default port **5433**)
- [ ] Set `NEXT_PUBLIC_GATEWAY_URL=http://localhost:3001`
- [ ] Set `ORCHESTRATOR_URL=http://localhost:8000` (local npm) or Compose service URL when using profile `apps`
- [ ] Decide ERP mode: `ERP_MODE=simulate` (no Odoo) or `live` with `ODOO_URL` / `ODOO_DB` / credentials
- [ ] Docker Engine available for Postgres (and optional app containers)

### 2. Postgres (required by gateway + orchestrator)

- [ ] `docker compose -f docker/docker-compose.yml up -d`
- [ ] Wait until Postgres is healthy (`docker compose … ps`)
- [ ] `npm run prisma:generate` and `npm run prisma:push` (schema for tasks + ERP connector)

### 3. Orchestrator → postgres + external ODOO_URL

- [ ] Activate `apps/orchestrator` venv and install `requirements.txt` (first time)
- [ ] Export `STORAGE_ROOT`, `ERP_MODE` / `ODOO_MODE`
- [ ] If `live`: set `ODOO_URL`, `ODOO_DB`, `ODOO_USERNAME`, and `ODOO_API_KEY` or `ODOO_PASSWORD`
- [ ] Start: `uvicorn app.main:app --reload --port 8000` from `apps/orchestrator`
- [ ] Check: `GET http://localhost:8000/health`

### 4. Gateway → orchestrator + postgres

- [ ] Export `DATABASE_URL`, `STORAGE_ROOT`, `ORCHESTRATOR_URL=http://localhost:8000`, `ERP_MODE`
- [ ] Start: `npm run start:prod -w @control-panel-ontology/gateway` or `npm run dev:gateway`
- [ ] Check: `GET http://localhost:3001/health`
- [ ] Optional: `POST http://localhost:3001/integrations/odoo/test` (ERP connector health)

### 5. Web → gateway

- [ ] Start: `npm run dev:web`
- [ ] Open `http://localhost:3000`
- [ ] Confirm UI can reach gateway (`/console`, `/integrations/odoo`, `/tasks`, `/logs`, `/ontology`)

### 6. Smoke path (end-to-end)

- [ ] Integrations page: save/test connector (or stay on `simulate`)
- [ ] Console: create a **dry_run** task for an allowlisted intent
- [ ] Task detail shows domain evidence; correlation id works in `/logs`
- [ ] Orchestrator wrote evidence under `STORAGE_ROOT/evidence/…` when applicable

### Optional — all apps in Compose

- [ ] `docker compose -f docker/docker-compose.yml --profile apps up -d --build`
- [ ] Same dependency order applies inside Compose; Odoo still external via `ODOO_URL`

## Patterns package auth

GitHub Packages token (`NODE_AUTH_TOKEN`) is used for `npm run docs:sync-patterns`, not for Compose runtime. See root [README](../../../../../README.md).

## Related

- [SAC-009 TSD](../TSD.md) · [Secrets](./Secrets_and_Env.md) · [Storage](./Storage_and_Backups.md) · [OPS-007](../Scenarios/OPS-007.md)
- Runtime: [`docker/`](../../../../../docker/)
