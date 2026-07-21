# Auth users and roles — Software Requirements Document (SRD)

**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose
Provide login and RBAC (users, roles) stored in control-plane DB.

## Scope
- Login/logout
- User CRUD for admins
- Roles with permission checks on gateway routes

## Out of Scope
- SSO/OIDC (later)
- Odoo user sync

## Requirements

### SRD-E01-phase-02-T01-01
**Core capability** — The system shall deliver the feature described in Purpose within the stated Scope.

| Trace | Link |
|-------|------|
| TSD | [TSD](./TSD.md#implements) |
| Diagram | [diagram](./diagram.md#implements) |
| ConOps | [conops](./conops.md#implements) |

### SRD-E01-phase-02-T01-02
**Observability** — Actions related to this feature shall carry `correlation_id` and `actor_id` where applicable.

### SRD-E01-phase-02-T01-03
**Scaffold constraint** — Implementation proceeds only after this pack is accepted; this docs pass does not ship production code for the feature.
