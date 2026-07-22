# Odoo integration — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Operator flow

1. Open `/integrations/odoo`.
2. Paste URL, DB, username, API key (or rely on `.env` defaults shown as “from env”).
3. Save → values land in control-plane Postgres (secret not re-displayed).
4. Test connection → status badge updates; failures show error class + short message.
5. If Odoo is unavailable locally, set `ODOO_MODE=simulate` and proceed to dry-run work.

## Security habits

- Rotate API keys in Odoo when leaked; never commit `.env`.
- Use Test only as needed — circuit breaker cools repeated failures.
