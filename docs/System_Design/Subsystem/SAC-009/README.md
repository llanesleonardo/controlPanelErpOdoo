# SAC-009 — Docker, Compose, and how we run the stack

How the control panel starts on a **shop laptop** or a **Linux box** later: one Docker Compose project for the control-plane database and apps. Your **ERP (Odoo)** stays outside this stack — we connect to it; we do not host it here.

## What you get

| Piece | Job |
|-------|-----|
| Postgres | Control-plane database (tasks, logs, connector settings) — **not** the ERP database |
| Gateway | NestJS front door (API the UI calls) |
| Orchestrator | Skills engine (internal — not public) |
| Web | Control panel screens |

Default Compose starts **Postgres only**. Add the apps with `--profile apps`, or run apps with npm on the host while Postgres is in Docker.

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for deploy |
| [TSD.md](./TSD.md) | How Compose, images, and networks are designed |
| [TRACE.md](./TRACE.md) | Requirement → scenario → test |
| [Scenarios/OPS-007.md](./Scenarios/OPS-007.md) | Bring the stack up and smoke-check it |
| [Guides/Compose_and_Runbook.md](./Guides/Compose_and_Runbook.md) | Full checklist (local + Linux) |
| [Guides/Secrets_and_Env.md](./Guides/Secrets_and_Env.md) | Env vars and secret rules |
| [Guides/Storage_and_Backups.md](./Guides/Storage_and_Backups.md) | File storage and backup sketch |

Runtime files live in repo [`docker/`](../../../../docker/). Layout notes: [Monorepo_Layout](../../TSD/Monorepo_Layout.md).

**Legacy:** Epic-01 docker / Epic-02 postgres / Epic-04 storage under [`_legacy/`](../../_legacy/).
