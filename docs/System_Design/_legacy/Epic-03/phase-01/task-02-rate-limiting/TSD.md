# Rate limiting — Technical Specification Document (TSD)

**Status:** implemented (Epic-03)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Nest throttler with `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX`. Key `actor:{X-Actor-Id}` else `ip:{addr}`. HTTP **429** with clear body.

## Patterns applied

- [Rate Limiting](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/18-rate-limiting.md)
- [API Gateway](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md)

## Stack

- `ActorRateLimitGuard` extending Nest `ThrottlerGuard`
- Dev actor: `X-Actor-Id` (default `dev-operator`)
