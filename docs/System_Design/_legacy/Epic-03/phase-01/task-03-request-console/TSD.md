# Request console — Technical Specification Document (TSD)

**Status:** implemented (Epic-03)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

- `POST /intents/classify` — deterministic mapping via `@control-panel-erp/contracts`
- `POST /tasks` — create `pending` or `needs_approval` (commit + high-risk intents)
- Web `/console`

## Patterns applied

- [API Gateway](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md)
- Frontend form patterns under Frontend_patterns

## Stack

- Gateway NestJS + contracts taxonomy
- High-risk commit: `inventory.stock.adjust`, `accounting.invoice.post`
- Dev actor: `X-Actor-Id` (default `dev-operator`)
