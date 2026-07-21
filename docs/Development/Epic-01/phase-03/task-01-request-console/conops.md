# Request console — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. Operator enters intent and selects mode.
2. System returns taxonomy mapping.
3. Operator confirms; task created.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
