# Rate limiting — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (future)

1. Client exceeds configured rate.
2. Gateway returns 429.
3. Operator retries after window; admin may raise limits via env (redeploy).

## Failure handling

Misconfigured zero/negative limits should fail safe to a documented default at startup (implementation detail later).
