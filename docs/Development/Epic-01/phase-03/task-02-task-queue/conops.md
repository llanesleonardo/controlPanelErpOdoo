# Task queue — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (future)

1. Open Task queue; filter by state.
2. Open a `needs_approval` task; review dry-run evidence.
3. Approve or reject.
4. Monitor running/failed for incidents.

## Failure handling

Failed tasks retain error class and message; link to incident creation (later).
