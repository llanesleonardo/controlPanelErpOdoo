# Profile page — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [ControlPanelDocs](../../../../Components/ControlPanelDocs/README.md)

## Purpose

Define the authenticated Profile page for viewing and updating the current user’s own data.

## Scope

- Display name, email, role summary
- Password change (local auth)
- Link/entry point for theme preference
- Profile API under gateway

## Out of Scope

- Avatar uploads (optional later)
- Multi-workspace / multi-tenant profiles
- Implementation of Next.js page in Epic-01

## Requirements

### SRD-E01-phase-02-T02-01

**View self** — Authenticated user shall view their profile fields and assigned roles.

### SRD-E01-phase-02-T02-02

**Update self** — User shall update allowed fields (e.g. display name); email change may require admin policy (document at implement time).

### SRD-E01-phase-02-T02-03

**Password change** — User shall change password with current-password confirmation.

### SRD-E01-phase-02-T02-04

**Docs-only** — Epic-01 documents the feature; UI/API code is deferred.
