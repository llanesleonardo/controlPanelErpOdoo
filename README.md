# ControlPanelOntology

**Ontology + AI** for **full manufacturing operations** — a **Foundry-shaped** governed hub (end-to-end shop map: make, QC, inventory, ship, documents, …; Schema / Explorer / Vertex / Process; **multi-peer** connectors for SoA, data, and logic; allowlisted skills). Reference deployment: **carbide-tool** shop. Same *class* of pattern as Palantir Foundry (ontology center, systems at the edge); **not** an estimate-only tool, ERP addon, clone, or enterprise-scale stack. **Odoo** is the **first live SoA peer** on that reference shop. **AI** and operators share one path: ontology action → skill → owning connector → evidence; risky writes stay dry-run / approval gated.

Messaging: [Ontology + AI](docs/System_Design/Guides/Messaging_Ontology_and_AI.md) · [RISK-01](docs/System_Design/Subsystem/Risks.md#risk-01--what-to-do-crowded-ai--erp).

## Stack

| Layer | Choice |
|-------|--------|
| Control panel UI | Next.js (`apps/web`) |
| API gateway (BFF) | NestJS (`apps/gateway`) |
| Orchestrator / skills | FastAPI (`apps/orchestrator`) |
| Control-plane DB | PostgreSQL (separate from ERP) |
| Runtime | Docker Compose (local + Linux later) |

## Repository layout

```text
ControlPanelOntology/
├── README.md
├── package.json                 # npm workspaces: resources/packages/*, apps/web, apps/gateway
├── .env.example
├── apps/
│   ├── web/                     # Next.js — ERP Map, /console, /tasks, /logs, /ontology
│   ├── gateway/                 # NestJS BFF — auth stub, allowlist, ontology, tasks
│   └── orchestrator/            # FastAPI — dry-run / execute skills; Odoo adapters
├── resources/
│   ├── packages/
│   │   ├── contracts/           # Taxonomy + action-contract YAML (sync from SAC-003 Authoring)
│   │   └── ontology/            # Business map — entity types + connector bindings
│   ├── scripts/                 # backup-controlplane.sh, etc.
│   ├── storage/local/           # STORAGE_ROOT default (evidence) — gitignored
│   └── logs/                    # LOG_DIR default — gitignored
├── docker/
│   ├── docker-compose.yml       # Postgres by default; --profile apps → web/gateway/orch
│   ├── Dockerfile.web
│   ├── Dockerfile.gateway       # COPY resources/packages/* into image
│   └── Dockerfile.orchestrator
├── .github/                     # CI (lint, etc.)
└── docs/                        # See “Docs” below
```

Detail: [Monorepo_Layout](docs/System_Design/TSD/Monorepo_Layout.md) · Compose: [SAC-009](docs/System_Design/Subsystem/SAC-009/README.md)

## Docs

| Path | Role |
|------|------|
| **[docs/System_Design](docs/System_Design/)** | V-Model pack — **builders start here** |
| **[docs/User_Guide](docs/User_Guide/)** | How the shop uses the panel |
| **[docs/Software Patterns Docs](docs/Software%20Patterns%20Docs/)** | Synced pattern library (by type) |
| [docs/README.md](docs/README.md) | Docs index |

### `docs/System_Design/` (V-Model)

```text
System_Design/
├── README.md
├── DOCUMENT_TREE.md
├── ConOps/                 # How the shop should use the panel
├── SRD/                    # Numbered SHALLs
├── TSD/                    # Parent TSD, Pattern_Selection, Component_Map, Monorepo_Layout
├── Subsystem/
│   ├── SAC-001 … SAC-010/  # README, SRD, TSD, TRACE, Scenarios/
│   ├── SAC-003/Authoring/  # ContractsDocs + TaxonomyDocs (canonical YAML)
│   ├── SAC-009/Guides/     # Compose runbook, secrets, storage
│   ├── Risks.md            # Gaps (04–06 satisfied slices; others deferred)
│   └── SCENARIOS.md
├── TestPlans/              # OPS-001…012, E-01 + Reports/
├── Templates/
```

Agents choosing architecture: start at [TSD/Pattern_Selection.md](docs/System_Design/TSD/Pattern_Selection.md) (impact / risk / Diff), then one pattern file — not the whole patterns tree.

### `docs/User_Guide/`

```text
User_Guide/
├── README.md               # Roles + jobs
├── Screens/                # Map, console, tasks, logs
├── Business_map/           # Schema / Explorer / Vertex / Process
└── Connect_ERP/            # Odoo connector for the shop
```

### `docs/Software Patterns Docs/` (synced)

Category folders (Architectural, Security, …) plus:

- `recognition_examples/` — short risk → pattern → examples  
- `composition_problems/` — multi-pattern systems (`concerns/`, `exercises/`)  

Sync: `npm run docs:sync-patterns` (may restore upstream names until the package matches).

## Quick start

```bash
npm install
npm run test:contracts
docker compose -f docker/docker-compose.yml up -d   # Postgres on host port 5433

cp .env.example .env   # DATABASE_URL → localhost:5433
npm run prisma:generate
npm run prisma:push
npm run dev:gateway    # :3001
npm run dev:web        # :3000 — /console, /tasks, /logs, /ontology
```

Orchestrator (simulate ERP by default):

```bash
cd apps/orchestrator && .venv\Scripts\activate
set STORAGE_ROOT=..\..\resources\storage\local
set ERP_MODE=simulate
uvicorn app.main:app --reload --port 8000
```

Full stack: `docker compose -f docker/docker-compose.yml --profile apps up --build`.

## Patterns sync

Requires a GitHub token with `read:packages` and `.npmrc` for `@llanesleonardo`.

```bash
npm install
npm run docs:sync-patterns
```

## Lint

```bash
npm run lint
```

Authored markdown under `User_Guide` / `System_Design` (not the synced Patterns tree). CI: [`.github/workflows/lint.yml`](.github/workflows/lint.yml) — set secret `NODE_AUTH_TOKEN` for `npm ci`.

## Implementation approach

Working process is the [System_Design](docs/System_Design/) V-Model (SAC + OPS scenarios). Component map: [TSD/Component_Map.md](docs/System_Design/TSD/Component_Map.md).
