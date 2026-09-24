# SAC-001 — Traceability

Tracks **SRD → Scenario → Test Plan** for the front door (gateway, allowlist, rate limit, actor stub).

| SRD | Scenario | Scenario file | Test plan | Status | Role |
|-----|----------|---------------|-----------|--------|------|
| SRD-GW-001 … 010 | OPS-012 | [Scenarios/OPS-012.md](./Scenarios/OPS-012.md) | [TP-OPS-012](../../TestPlans/OPS-012/TP-OPS-012.md) | Not run | Primary |
| SRD-GW-001, 002, 010 | OPS-007 | [../SAC-009/Scenarios/OPS-007.md](../SAC-009/Scenarios/OPS-007.md) | [TP-OPS-007](../../TestPlans/OPS-007/TP-OPS-007.md) | Partial | Supporting (health / stack) |
| SRD-GW-003, 004 | E-01 | [../Scenarios/E-01.md](../Scenarios/E-01.md) | [TP-E-01](../../TestPlans/E-01/TP-E-01.md) | Not run | Supporting (docs/pack alignment) |
| SRD-GW-003 (positive path) | OPS-008 | [../SAC-004/Scenarios/OPS-008.md](../SAC-004/Scenarios/OPS-008.md) | [TP-OPS-008](../../TestPlans/OPS-008/TP-OPS-008.md) | Not run | Supporting (allowlisted skill succeeds) |

Parent SEC: SRD-SEC-001…002, SRD-SEC-004 (via SRD-GW-003, 004, 008).

Index: [../SCENARIOS.md](../SCENARIOS.md)
