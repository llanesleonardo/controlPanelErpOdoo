# Task queue — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. Operator opens Task queue.
2. Filters by state.
3. Approves or inspects failures.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
