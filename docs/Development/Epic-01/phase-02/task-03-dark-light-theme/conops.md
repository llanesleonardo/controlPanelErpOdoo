# Dark and light theme — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. User toggles theme.
2. Preference persists across sessions.
3. All shell pages respect theme.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
