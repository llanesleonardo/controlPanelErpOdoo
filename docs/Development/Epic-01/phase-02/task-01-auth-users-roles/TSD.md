# Auth users and roles — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Planned stack (later epic)

| Piece | Choice |
|-------|--------|
| Gateway | NestJS (`apps/gateway`) |
| UI | Next.js (`apps/web`) login + admin users page |
| DB | Control-plane Postgres |
| Auth mechanism | HTTP-only session cookie **or** JWT bearer — pick one at implementation; prefer session cookie for browser BFF |

## Planned entities (control-plane)

- `User` — id, email, password_hash, display_name, status, created_at
- `Role` — id, name (`admin` | `manager` | `operator` | `viewer`)
- `UserRole` — user_id, role_id
- Optional `Permission` / role-permission map for fine-grained gates later

## Planned API surface (later)

- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- `GET/POST/PATCH /users` (admin)
- `GET /roles`

## Env (already in `.env.example`)

`GATEWAY_JWT_SECRET` (if JWT), DB connection vars.

## Notes

No migrations or code in Epic-01.
