# Monorepo and docs shape — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. Contributors clone repo.
2. Read Development index and Epic-01.
3. Implement one task folder at a time.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
