# Secrets and environment

## Pattern

- **`.env.example`** — committed placeholders and variable names  
- **`.env`** — local/production secrets; **never committed** (see `.gitignore`)  
- Compose and apps read from environment / `env_file`

## Categories

| Category | Examples |
|----------|----------|
| Control-plane DB | `CONTROLPLANE_DB_*`, `DATABASE_URL` |
| Gateway | `GATEWAY_PORT`, `GATEWAY_JWT_SECRET`, rate limits |
| Orchestrator | `ORCHESTRATOR_PORT`, `ORCHESTRATOR_URL` |
| Web | `WEB_PORT`, `NEXT_PUBLIC_GATEWAY_URL` |
| Odoo connector | `ODOO_URL`, `ODOO_DB`, credentials / API key |
| Storage / logs | `STORAGE_ROOT` (default `./resources/storage/local`), `LOG_DIR` (default `./resources/logs`) |
| GitHub Packages | `NODE_AUTH_TOKEN` (docs sync only) |

## Rules

- No secrets in docs, YAML contracts, or Dockerfiles  
- Rotate JWT and DB passwords before any shared environment  
- Prefer Odoo API keys over long-lived passwords when available  

Parent: [SAC-009](../README.md) · [SRD-DEP-006](../SRD.md)
