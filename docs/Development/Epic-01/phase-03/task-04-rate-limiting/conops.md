# Rate limiting — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. Client exceeds limit.
2. Gateway returns 429.
3. Operator/admin reviews if abuse suspected.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
