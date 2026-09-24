# Dry-run execution path — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Operator flow

1. Ensure Odoo integration test is `ok` (or `ODOO_MODE=simulate`).
2. In `/console`, choose domain/intent, set **dry_run**, create task.
3. Gateway runs orchestrator simulate; task moves to `completed` with evidence.
4. Open `/tasks/:id` — review predicted effects and warnings; follow correlation id into `/logs` and `STORAGE_ROOT/evidence/…` if present.
5. For high-risk **commit**, still use approval queue (Epic-03); no Odoo mutation yet.

## Guardrails

- Never paste free-form SQL or RPC into the console expecting execution.
- If dry-run fails with `odoo_rejection` / `dependency_failure`, fix connector settings before retrying.
