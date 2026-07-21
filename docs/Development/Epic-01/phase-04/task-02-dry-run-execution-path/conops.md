# Dry-run execution path — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. Operator selects dry-run.
2. System returns simulated evidence.
3. Operator may then request commit with approval if required.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
