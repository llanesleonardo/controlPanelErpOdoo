# Dark and light theme — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (future)

1. User toggles theme in header.
2. UI updates immediately.
3. Preference saved to profile when authenticated.
4. Next visit restores preference.

## Failure handling

If profile save fails, keep local preference and surface a non-blocking warning.
