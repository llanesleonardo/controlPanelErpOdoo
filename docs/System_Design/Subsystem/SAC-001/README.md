# SAC-001 - Front door - gateway, access, allowlist

The **gateway** is the only door the browser (and later helpers) knock on. Shop people never talk to Odoo or the skills engine directly from the UI. Everything goes through NestJS first: who is calling (stub today), how fast they call, and which **skills** (certified actions) are allowed to touch the ERP.

**ERP** = enterprise resource planning system - Odoo today, the system of record for jobs, inventory, and shipping. The gateway does **not** host Odoo; it only forwards allowlisted work toward the orchestrator and connector.

## What you get

| Piece | Job |
|-------|-----|
| NestJS BFF | Single application API the control panel calls (**BFF** = backend-for-frontend: shaped for our UI, not a second public ERP API) |
| Actor stub | `X-Actor-Id` header (default `dev-operator`) until real login lands |
| Allowlist | Live ERP-touching work only for skills on the certified list (e.g. `sales.estimate.read`) |
| Rate limit | Per-actor (or per-IP) throttle; HTTP **429** when exceeded |
| Correlation | `X-Correlation-Id` on every request so logs/tasks can be tied together |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true at the front door |
| [TSD.md](./TSD.md) | NestJS design: middleware, allowlist, rate limit, auth stub |
| [TRACE.md](./TRACE.md) | Requirement to scenario to test |
| [Scenarios/OPS-012.md](./Scenarios/OPS-012.md) | Blocked skill / rate limit / allowlist reject |

Runtime: [`apps/gateway`](../../../../apps/gateway/). Parent: [ControlPanelERP_SRD](../../SRD/ControlPanelERP_SRD.md) (SRD-SEC-*) · [ControlPanelERP_TSD](../../TSD/ControlPanelERP_TSD.md).

**Shop how-to:** [User Guide](../../../User_Guide/README.md) · Engineering stays in this SAC.

## Related

- Downstream: [SAC-002 Screens](../SAC-002/README.md) · [SAC-004 Orchestrator](../SAC-004/README.md) · [SAC-007 Tasks/logs](../SAC-007/README.md)
- Deploy: [SAC-009](../SAC-009/README.md)

**Legacy:** `_legacy/Epic-01/phase-02/task-01-auth-users-roles` · `_legacy/Epic-01/phase-03/task-04-rate-limiting` · `_legacy/Epic-03/phase-01/task-02-rate-limiting`
