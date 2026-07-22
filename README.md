# ControlPanelERP

External **OpenClaw → Odoo 18** control panel. This repo is a **scaffold + reference docs** pass — not a full application build.

## Stack (planned)

| Layer | Choice |
|-------|--------|
| Control panel UI | Next.js (`apps/web`) |
| API gateway | NestJS (`apps/gateway`) |
| OpenClaw orchestration | FastAPI (`apps/orchestrator`) |
| Control-plane DB | PostgreSQL (separate from Odoo) |
| Runtime | Docker Compose (local + Linux later) |

## Docs

Start here: [docs/Development/README.md](docs/Development/README.md)

| Folder | Role |
|--------|------|
| [docs/Components](docs/Components/) | Product-surface references |
| [docs/Deployment](docs/Deployment/) | Docker / hosting |
| [docs/Development](docs/Development/) | Architecture, Epic → Phase → Task packs |
| [docs/Software Patterns Docs](docs/Software%20Patterns%20Docs/) | Synced from `@llanesleonardo/software-patterns-docs` |

## Monorepo layout

```
apps/web            Next.js control panel (Epic-03 ops UI)
apps/gateway        NestJS API gateway (Epic-03 ops API)
apps/orchestrator   FastAPI OpenClaw orchestration (stub)
packages/contracts  @control-panel-erp/contracts (taxonomy + YAML)
docker/             Compose (Postgres by default; apps via --profile apps)
docs/               Four-root documentation tree
```

## Foundation (Epic-02)

```bash
npm install
npm run test:contracts
docker compose -f docker/docker-compose.yml up -d   # Postgres on host port 5433
```

## Ops surfaces (Epic-03)

```bash
cp .env.example .env   # set DATABASE_URL to localhost:5433
npm run prisma:generate
npm run prisma:push
npm run dev:gateway    # :3001
npm run dev:web        # :3000 — /console, /tasks, /logs
```

## Integrations (Epic-04)

Docs: [docs/Development/Epic-04](docs/Development/Epic-04/).

```bash
# Terminal A — orchestrator (simulate ERP by default)
cd apps/orchestrator && .venv\Scripts\activate   # after: python -m venv .venv && pip install -r requirements.txt
set STORAGE_ROOT=..\..\storage\local
set ERP_MODE=simulate
uvicorn app.main:app --reload --port 8000

# Terminal B/C — gateway + web (see Epic-03)
npm run dev:gateway
npm run dev:web
```

Routes: `/integrations/odoo`, dry-run tasks via `/console`. **No live ERP commits** in Epic-04.

## Patterns sync

Requires a GitHub token with `read:packages` and `.npmrc` configured for `@llanesleonardo`.

```bash
# Set NODE_AUTH_TOKEN to a GitHub PAT with read:packages
npm install
npm run docs:sync-patterns
```

See [docs/Software Patterns Docs/README.md](docs/Software%20Patterns%20Docs/README.md).

## Lint

```bash
npm run lint
```

Authored markdown under Components / Deployment / Development (not the synced Software Patterns Docs tree). CI: [`.github/workflows/lint.yml`](.github/workflows/lint.yml) — set repo secret `NODE_AUTH_TOKEN` for `npm ci`.

## Implementation approach

Features are delivered one **task** at a time under `docs/Development/Epic-NN/phase-NN/task-NN-<slug>/` using `SRD.md`, `TSD.md`, `diagram.md`, and `conops.md`. Do not build the whole app in one pass.
