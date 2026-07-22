# Auth users and roles — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [ControlPanelDocs](../../../../Components/ControlPanelDocs/README.md) · [GatewayDocs](../../../../Components/GatewayDocs/README.md)

## Purpose

Define how login and RBAC (users, roles) will work in the control plane, stored in control-plane PostgreSQL (not Odoo).

## Scope

- Login / logout
- User CRUD for admins
- Roles with permission checks on gateway routes
- Seed / first-admin bootstrap concept (documented)
- Session or JWT approach (documented choice for later epic)

## Out of Scope

- SSO / OIDC
- Odoo user sync
- Implementing NestJS auth modules or Next.js login UI in Epic-01

## Requirements

### SRD-E01-phase-02-T01-01

**Identity store** — Users and roles shall live in the control-plane database, separate from Odoo.

### SRD-E01-phase-02-T01-02

**Authentication** — The system shall support password login and logout for control-plane users (implementation later).

### SRD-E01-phase-02-T01-03

**Authorization** — Gateway routes shall be protectable by role (e.g. `admin`, `manager`, `operator`, `viewer`).

### SRD-E01-phase-02-T01-04

**Admin user management** — Admins shall create, disable, and assign roles to users.

### SRD-E01-phase-02-T01-05

**Audit actor** — Authenticated actions shall record `actor_id` (and `correlation_id` when applicable).

### SRD-E01-phase-02-T01-06

**Docs-only** — Epic-01 delivers planning docs only; runtime auth is a later epic.
