# SAC-001 - Front door - gateway, access, allowlist

The **gateway** is the only door the browser (and later apps/SDKs) knock on. For a carbide-tool shop — estimates, make, inspect, ship — people never talk to Odoo or other peer edges directly from the UI. Everything goes through NestJS first: who is calling (stub today), how fast they call, and which **skills** (certified actions) may touch an enabled edge.

The **ontology** is the hub; **ERP (Odoo today) is SoA peer #1**, not the sole system of record for every property. The gateway does **not** host Odoo; it forwards allowlisted work toward the orchestrator and connectors.

## What you get

| Piece | Job |
|-------|-----|
| NestJS BFF | Single application API the control panel calls (**BFF** = backend-for-frontend: shaped for our UI, not a second public vendor API) |
| Actor stub | `X-Actor-Id` header (default `dev-operator`) until real login lands |
| Allowlist | Live edge-touching work only for skills on the certified list (e.g. `sales.estimate.read`) |
| Rate limit | Per-actor (or per-IP) throttle; HTTP **429** when exceeded |
| Correlation | `X-Correlation-Id` on every request so logs/tasks can be tied together |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true at the front door |
| [TSD.md](./TSD.md) | NestJS design: middleware, allowlist, rate limit, auth stub |
| [TRACE.md](./TRACE.md) | Requirement to scenario to test |
| [Scenarios/OPS-012.md](./Scenarios/OPS-012.md) | Blocked skill / rate limit / allowlist reject |
| [Scenarios/OPS-019.md](./Scenarios/OPS-019.md) | App / SDK / API via ontology (gateway only) |

Runtime: [`apps/gateway`](../../../../apps/gateway/). Parent: [ControlPanelOntology_SRD](../../SRD/ControlPanelOntology_SRD.md) (SRD-SEC-*) · [ControlPanelOntology_TSD](../../TSD/ControlPanelOntology_TSD.md).

**Shop how-to:** [User Guide](../../../User_Guide/README.md). Engineering stays in this SAC.

## Related

- Downstream: [SAC-002 Screens](../SAC-002/README.md) · [SAC-004 Orchestrator](../SAC-004/README.md) · [SAC-007 Tasks/logs](../SAC-007/README.md)
- Deploy: [SAC-009](../SAC-009/README.md)
