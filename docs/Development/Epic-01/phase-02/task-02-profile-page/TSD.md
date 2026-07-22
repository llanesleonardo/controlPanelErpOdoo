# Profile page — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Planned UI

- Route: `/profile` (Next.js App Router)
- Form: display_name, read-only email (or gated), roles list, password change section
- Nav entry in shell chrome

## Planned API

- `GET /auth/me` or `GET /profile`
- `PATCH /profile`
- `POST /profile/password`

## Data

Uses `User` entity from auth task; no separate profile table required for MVP.

## Notes

Depends on auth task in a later implementation epic.
