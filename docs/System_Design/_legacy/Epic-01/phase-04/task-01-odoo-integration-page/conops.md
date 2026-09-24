# Odoo Integration page — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (future)

1. Admin opens Integration (Odoo).
2. Enters URL/DB/credentials; saves.
3. Runs Test; status updates to ok or error with message.
4. Operators use console only when connector is healthy.

## Failure handling

Auth failures map to `odoo_rejection` or `dependency_failure`; never log raw passwords.
