# Logging system — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. Request creates correlation_id.
2. Downstream services propagate it.
3. Operator searches logs by id.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
