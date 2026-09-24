# Rate limiting — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Env (already in `.env.example`)

```
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

## Planned approach (later)

- NestJS throttler / custom middleware on gateway
- Key: `user:{id}` or `ip:{addr}`
- Optional admin metric of limit hits later

## Notes

Orchestrator may trust gateway-only limiting for browser traffic.
