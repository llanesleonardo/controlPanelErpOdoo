# Dry-run execution path — Technical Specification Document (TSD)

**Status:** implemented (Epic-04)
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Epic-01 Phase 04 task-02 + lifecycle steps 4–5 (skill select + dry-run) with orchestrator runtime. Commit/verify remain stubbed.

## Patterns applied

- [Hexagonal Architecture](../../../../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md) — skill use-cases depend on `OdooInventoryPort` / `OdooAccountingPort`, not JSON-RPC
- [Facade](../../../../Software%20Patterns%20Docs/Structural%20Patterns/Facade.md) — `SkillExecutionFacade.run_dry_run(intent, payload)`
- [Adapter](../../../../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md) + [Anti-Corruption Layer](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) — map Odoo read models → predicted effects DTO
- [API Gateway](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) — Nest calls orchestrator; browser never talks to Odoo
- [Correlation Identifier](../../../../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md)
- [Circuit Breaker](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/02-circuit-breaker.md) / [Retry with Backoff](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/04-retry-with-backoff.md) — shared with connector client
- [Observability](../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md) — structured logs + evidence JSON

## Stack

| Piece | Choice |
|-------|--------|
| Orchestrator | FastAPI in `apps/orchestrator` |
| Contracts | `@control-panel-erp/contracts` YAML validation (PyYAML) or gateway validates then passes `intent_code` |
| Endpoint | `POST /skills/dry-run` `{ intent_code, input, correlation_id, actor_id }` |
| Gateway | After `POST /tasks` with `dry_run`, or `POST /tasks/:id/execute-dry-run` — **lock:** auto-run dry-run when creating task with `execution_mode=dry_run` |
| Task states | `pending` → `running` → `completed` (evidence) or `failed` |
| Evidence shape | `{ predicted_effects, warnings, mode: dry_run, odoo_mode: live or simulate, skill_id }` |
| Env | `ORCHESTRATOR_URL=http://localhost:8000` |

## Skill allowlist (MVP)

| intent_code | skill_id | Behavior |
|-------------|----------|----------|
| `inventory.stock.adjust` | `inventory.stock.adjust.simulate` | Read quants / compute delta prediction; no stock write |
| `accounting.invoice.post` | `accounting.invoice.post.simulate` | Read invoice state; predict post eligibility; no action_post |

Unknown intents → `validation_error` without calling Odoo.

## Commit lock

If `execution_mode=commit`, Epic-03 behavior remains (high-risk → `needs_approval`); **do not** call orchestrator commit in Epic-04.
