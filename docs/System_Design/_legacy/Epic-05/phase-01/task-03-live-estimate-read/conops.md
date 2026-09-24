# Live estimate read — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Operator flow

1. Set `.env`: correct `ODOO_DB`, `ODOO_MODE=live`, `ERP_MODE=live`, credentials/API key.
2. Recreate gateway + orchestrator so containers load env (`docker compose … --env-file .env --profile apps up -d`).
3. Optionally confirm connector on `/integrations/odoo`.
4. Open **Estimates** → **Read estimate**.
5. Output table loads live rows; use **Refresh** to re-fetch.
6. If Odoo is down, set `ODOO_MODE=simulate` for dummy rows.

## Guardrails

- Never commit `.env` secrets.
- Do not broaden `/skills/execute` allowlist without a new task.
- Domain APIs must keep saying `estimate`, not leak `customer.estimate` into taxonomy codes.
