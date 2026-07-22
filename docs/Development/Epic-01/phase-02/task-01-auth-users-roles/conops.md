# Auth users and roles — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (future runtime)

1. User opens login page on the control panel.
2. Submits email/password; gateway validates against control-plane DB.
3. Session established; subsequent API calls carry credentials.
4. Admin opens Users admin, assigns roles.
5. Gateway rejects unauthorized routes with 401/403.

## Failure handling

Invalid credentials → 401. Disabled user → 403. Missing role for sensitive action → 403 and audit log entry (later epic).
