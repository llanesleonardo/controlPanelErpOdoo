# resources/

Runtime and shared library assets for the monorepo (kept out of `apps/` and `docs/`).

| Path | Role |
|------|------|
| [packages/](./packages/) | npm workspace packages (`contracts`, `ontology`) |
| [scripts/](./scripts/) | Operator helpers (e.g. control-plane backup) |
| `storage/local/` | Default `STORAGE_ROOT` (evidence, uploads) — gitignored |
| `logs/` | Default `LOG_DIR` — gitignored |

Defaults in [`.env.example`](../.env.example):

```text
STORAGE_ROOT=./resources/storage/local
LOG_DIR=./resources/logs
```

See [Monorepo_Layout](../docs/System_Design/TSD/Monorepo_Layout.md) and [SAC-009](../docs/System_Design/Subsystem/SAC-009/README.md).
