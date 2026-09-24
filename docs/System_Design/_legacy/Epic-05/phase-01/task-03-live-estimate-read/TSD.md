# Live estimate read — Technical Specification Document (TSD)

**Status:** implemented (Epic-05)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Live (and simulate) execute path for **`sales.estimate.read` only**, mapped to SCT `customer.estimate`.

## Patterns applied

- [Hexagonal Architecture](../../../../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md) — `EstimatePort`
- [Anti-Corruption Layer](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) + [Adapter](../../../../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md) — `OdooEstimateAdapter`
- [Facade](../../../../Software%20Patterns%20Docs/Structural%20Patterns/Facade.md) — `SkillExecutionFacade.execute`
- [API Gateway](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) — Nest `SkillsController`
- [Correlation Identifier](../../../../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md)
- [Circuit Breaker](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/02-circuit-breaker.md) / [Retry with Backoff](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/04-retry-with-backoff.md) — shared JSON-RPC helper
- [Observability](../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md) — evidence file

## Stack

| Piece | Choice |
|-------|--------|
| Orchestrator | `apps/orchestrator` FastAPI `POST /skills/execute` |
| Facade allowlist | `EXECUTE_ALLOWLIST["sales.estimate.read"]` |
| Port / DTO | `EstimateReadQuery`, `EstimateRecord`, `EstimateReadResult` |
| Adapter | `OdooEstimateAdapter` — model `customer.estimate`, method `search_read` |
| Fields | `id,name,part_description,partner_id,revision,total_unit_cost,pricing_method,active,created_at,modified_at,product_id_for_estimate_draft` |
| Gateway | `POST /skills/execute` → `OrchestratorClient.execute` |
| Web | `IntentLiveOutput` when intent === `sales.estimate.read` |
| Env | `ODOO_URL`, `ODOO_DB`, `ODOO_USERNAME`, `ODOO_API_KEY`/`PASSWORD`, `ODOO_MODE=live` |

## Odoo connection notes (verified)

| Setting | Working value (example) |
|---------|-------------------------|
| URL | `https://jerrygsct-sctodoo.odoo.com` |
| DB | `jerrygsct-sctodoo-main-17710527` (not `odoo`) |
| Auth | API key preferred; password also works |
| RPC | `common.version` + `common.authenticate` + `object.execute_kw` |

## Call path (locked for this skill)

`sales.estimate.read` → `POST /skills/execute` → `customer.estimate.search_read` → `POST /jsonrpc`

## Contains search (read only)

| Input | Behavior |
|-------|----------|
| `input.contains` (or `q` / `search`) | Odoo domain: `\| (name ilike) (part_description ilike)` |
| Empty | No text filter; active estimates only (default) |

UI: Estimates → Read estimate → **Estimate contains** field + Search / Clear.

## Commit lock

No writes. Quote creation and estimate mutations remain out of scope.
