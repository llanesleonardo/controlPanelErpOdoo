# Structured logging — Technical Specification Document (TSD)

**Status:** implemented (Epic-03)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

JSON structured logs to `LOG_DIR` (+ in-memory ring). Middleware accepts or mints `X-Correlation-Id`. `GET /logs?correlation_id=` and web `/logs`.

## Patterns applied

- [Observability](../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md)
- [Correlation Identifier](../../../../Software%20Patterns%20Docs/Messaging_Integration_patterns/19-correlation-identifier.md)

## Stack

- Gateway: NestJS (`apps/gateway`) — `LogStoreService`, `StructuredLogger`, `CorrelationMiddleware`
- Web: Next.js `/logs`
- Fields: timestamp, level, service, message, correlation_id, actor_id
- Dev actor: `X-Actor-Id` (default `dev-operator`)
