# Odoo integration — Technical Specification Document (TSD)

**Status:** implemented (Epic-04)
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Epic-01 Phase 04 task-01 as NestJS APIs + Next.js page + Prisma model; thin JSON-RPC client used for health (shared with orchestrator or duplicated behind ACL in Epic-04 MVP).

## Patterns applied

- [Anti-Corruption Layer](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) — Odoo RPC shapes never leak into UI DTOs
- [Adapter](../../../../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md) — `OdooJsonRpcAdapter` implements internal `OdooHealthPort`
- [Health Checks](../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/09-health-checks.md) — status `ok|degraded|down`
- [Circuit Breaker](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/02-circuit-breaker.md) — skip hammering Odoo after consecutive test failures (short window)
- [Retry with Backoff](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/04-retry-with-backoff.md) — 1–2 retries on transport timeout only
- [API Gateway](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) — BFF owns config CRUD; does not expose raw RPC to the browser
- [Secure handling note](../../../../Software%20Patterns%20Docs/Security_patterns/07-api-token-gateway.md) — treat API key as gateway-held secret; never echo back full secret on GET

## Stack

| Piece | Choice |
|-------|--------|
| Model | `OdooConnectorConfig` (singleton row or keyed `default`) |
| Fields | url, db_name, username, secret_ciphertext_or_ref, last_checked_at, status, last_error |
| GET response | mask secret (`••••` / `configured: true`) |
| Test | `common.version` + `authenticate` via JSON-RPC when `ODOO_MODE=live`; synthetic ok when `simulate` |
| Web | `/integrations/odoo` |
| Actor | `X-Actor-Id` (default `dev-operator`) |

## Status mapping

| Condition | status |
|-----------|--------|
| Simulate mode always | `ok` (note: simulated) |
| version + auth succeed | `ok` |
| version ok, auth fail | `degraded` |
| unreachable / circuit open | `down` |

## Error classes

Prefer taxonomy `dependency_failure`, `validation_error`, `odoo_rejection` in test response body.
