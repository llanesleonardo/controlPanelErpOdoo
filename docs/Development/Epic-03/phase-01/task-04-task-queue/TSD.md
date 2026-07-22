# Task queue — Technical Specification Document (TSD)

**Status:** implemented (Epic-03)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

- `GET /tasks`, `GET /tasks/:id`, `POST /tasks/:id/approve|reject`
- States: pending, running, completed, failed, needs_approval, rejected
- Web `/tasks`, `/tasks/[id]`
- Approve → `completed` with `evidence: { dry_run_only: true }` (no orchestrator)

## Patterns applied

- [API Gateway](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md)
- Frontend list/detail patterns under Frontend_patterns

## Stack

- Prisma `Task` on control-plane Postgres
- Dev actor as approver via `X-Actor-Id`
