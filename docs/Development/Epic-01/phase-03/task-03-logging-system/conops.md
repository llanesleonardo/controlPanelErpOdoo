# Logging system — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (future)

1. Copy correlation_id from a task detail.
2. Open Log explorer; search by id.
3. Inspect gateway and orchestrator lines for the request.

## Failure handling

Missing correlation_id → generate one at gateway edge and return it on the response.
