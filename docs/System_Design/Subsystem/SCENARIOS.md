# Scenario index

**Every scenario is Open** until a test report + SRVM row closes it. Partial demos or smoke do **not** close a scenario.

**Source ConOps:** [../ConOps/ControlPanelOntology_ConOps.md](../ConOps/ControlPanelOntology_ConOps.md) §9 (external OPS) · §10 (internal E)  
**Template:** [../Templates/Scenario_Template.md](../Templates/Scenario_Template.md)

```text
docs/System_Design/Subsystem/
  SCENARIOS.md                 ← this index
  Scenarios/E-01…E-08.md       ← internal (engineering)
  SAC-xxx/Scenarios/OPS-*.md   ← external (product)

docs/System_Design/TestPlans/
  <ID>/TP-<ID>.md              ← planned or present
```

## Distinguishing OPS vs E

| | **OPS — external (product)** | **E — internal (engineering)** |
|--|------------------------------|--------------------------------|
| Ask | What happens when someone runs the product? | What happens when we change, prove, or ship? |
| Actors | Estimator, admin, automation, SDK, AI+human | Builder, V&V, approver, auditor |
| Selection | GitHub `type:impl` (product scenarios) | GitHub `type:process` |

---

## External — product operational scenarios (OPS)

| ID | Friendly title | Owner SAC | Scenario | Test plan | Status |
|----|----------------|-----------|----------|-----------|--------|
| OPS-001 | Read estimates via SoA connector (ERP peer) | SAC-005 | [OPS-001](./SAC-005/Scenarios/OPS-001.md) | [TP-OPS-001](../TestPlans/OPS-001/TP-OPS-001.md) | **Open** |
| OPS-002 | Preview a risky write (dry-run) | SAC-007 | [OPS-002](./SAC-007/Scenarios/OPS-002.md) | [TP-OPS-002](../TestPlans/OPS-002/TP-OPS-002.md) | **Open** |
| OPS-003 | Approve or reject a queued task | SAC-007 | [OPS-003](./SAC-007/Scenarios/OPS-003.md) | [TP-OPS-003](../TestPlans/OPS-003/TP-OPS-003.md) | **Open** |
| OPS-004 | Browse Schema (business map) | SAC-006 | [OPS-004](./SAC-006/Scenarios/OPS-004.md) | [TP-OPS-004](../TestPlans/OPS-004/TP-OPS-004.md) | **Open** |
| OPS-005 | Search objects in Explorer | SAC-006 | [OPS-005](./SAC-006/Scenarios/OPS-005.md) | [TP-OPS-005](../TestPlans/OPS-005/TP-OPS-005.md) | **Open** |
| OPS-006 | Expand related types in Vertex | SAC-006 | [OPS-006](./SAC-006/Scenarios/OPS-006.md) | [TP-OPS-006](../TestPlans/OPS-006/TP-OPS-006.md) | **Open** |
| OPS-007 | Bring up control-plane stack (Compose) | SAC-009 | [OPS-007](./SAC-009/Scenarios/OPS-007.md) | [TP-OPS-007](../TestPlans/OPS-007/TP-OPS-007.md) | **Open** |
| OPS-008 | Run allowlisted skill through skills engine | SAC-004 | [OPS-008](./SAC-004/Scenarios/OPS-008.md) | [TP-OPS-008](../TestPlans/OPS-008/TP-OPS-008.md) | **Open** |
| OPS-009 | Pick intent from Map / section → console | SAC-002 | [OPS-009](./SAC-002/Scenarios/OPS-009.md) | [TP-OPS-009](../TestPlans/OPS-009/TP-OPS-009.md) | **Open** |
| OPS-010 | Classify / resolve known intent vs taxonomy | SAC-003 | [OPS-010](./SAC-003/Scenarios/OPS-010.md) | [TP-OPS-010](../TestPlans/OPS-010/TP-OPS-010.md) | **Open** |
| OPS-011 | Find / dismiss estimate issues | SAC-008 | [OPS-011](./SAC-008/Scenarios/OPS-011.md) | [TP-OPS-011](../TestPlans/OPS-011/TP-OPS-011.md) | **Open** |
| OPS-012 | Allowlist / rate-limit reject | SAC-001 | [OPS-012](./SAC-001/Scenarios/OPS-012.md) | [TP-OPS-012](../TestPlans/OPS-012/TP-OPS-012.md) | **Open** |
| OPS-013 | Act on ontology object targeting any SoA | SAC-004 | [OPS-013](./SAC-004/Scenarios/OPS-013.md) | [TP-OPS-013](../TestPlans/OPS-013/TP-OPS-013.md) | **Open** |
| OPS-014 | Enable / health-check a non-ERP SoA connector | SAC-005 | [OPS-014](./SAC-005/Scenarios/OPS-014.md) | [TP-OPS-014](../TestPlans/OPS-014/TP-OPS-014.md) | **Open** |
| OPS-015 | Bind a data-source edge into ontology | SAC-005 | [OPS-015](./SAC-005/Scenarios/OPS-015.md) | [TP-OPS-015](../TestPlans/OPS-015/TP-OPS-015.md) | **Open** |
| OPS-016 | Invoke a logic-source edge as ontology action | SAC-004 | [OPS-016](./SAC-004/Scenarios/OPS-016.md) | [TP-OPS-016](../TestPlans/OPS-016/TP-OPS-016.md) | **Open** |
| OPS-017 | Analytics / workflow reads ontology objects | SAC-002 | [OPS-017](./SAC-002/Scenarios/OPS-017.md) | [TP-OPS-017](../TestPlans/OPS-017/TP-OPS-017.md) | **Open** |
| OPS-018 | Automation fires skill on ontology action | SAC-007 | [OPS-018](./SAC-007/Scenarios/OPS-018.md) | [TP-OPS-018](../TestPlans/OPS-018/TP-OPS-018.md) | **Open** |
| OPS-019 | App / SDK / API via ontology (not vendor RPC) | SAC-001 | [OPS-019](./SAC-001/Scenarios/OPS-019.md) | [TP-OPS-019](../TestPlans/OPS-019/TP-OPS-019.md) | **Open** |
| OPS-020 | AI suggests intent; human/skill executes | SAC-003 | [OPS-020](./SAC-003/Scenarios/OPS-020.md) | [TP-OPS-020](../TestPlans/OPS-020/TP-OPS-020.md) | **Open** |
| OPS-021 | Walk Estimate→…→Ship Process spine | SAC-006 | [OPS-021](./SAC-006/Scenarios/OPS-021.md) | [TP-OPS-021](../TestPlans/OPS-021/TP-OPS-021.md) | **Open** |
| OPS-022 | Inspect which connector owns object properties | SAC-006 | [OPS-022](./SAC-006/Scenarios/OPS-022.md) | [TP-OPS-022](../TestPlans/OPS-022/TP-OPS-022.md) | **Open** |
| OPS-023 | Dedicated single-tenant — multi-tenant features off | SAC-009 | [OPS-023](./SAC-009/Scenarios/OPS-023.md) | [TP-OPS-023](../TestPlans/OPS-023/TP-OPS-023.md) | **Open** |
| OPS-024 | SaaS multi-tenant — multi-tenant features on | SAC-009 | [OPS-024](./SAC-009/Scenarios/OPS-024.md) | [TP-OPS-024](../TestPlans/OPS-024/TP-OPS-024.md) | **Open** |

---

## Internal — engineering lifecycle scenarios (E)

| ID | Friendly title | Primary home | Scenario | Test plan | Status |
|----|----------------|--------------|----------|-----------|--------|
| E-01 | Docs / ConOps still match how the shop runs | Cross-cutting | [E-01](./Scenarios/E-01.md) | [TP-E-01](../TestPlans/E-01/TP-E-01.md) | **Open** |
| E-02 | Subsystem Digital Thread alignment review | Cross-cutting | [E-02](./Scenarios/E-02.md) | [TP-E-02](../TestPlans/E-02/TP-E-02.md) | **Open** |
| E-03 | Verification planning, execution, evidence, closure | Cross-cutting | [E-03](./Scenarios/E-03.md) | [TP-E-03](../TestPlans/E-03/TP-E-03.md) | **Open** |
| E-04 | Controlled build, promotion, deployment, rollback | SAC-009 | [E-04](./SAC-009/Scenarios/E-04.md) | [TP-E-04](../TestPlans/E-04/TP-E-04.md) | **Open** |
| E-05 | Controlled release and distribution | SAC-010 | [E-05](./SAC-010/Scenarios/E-05.md) | [TP-E-05](../TestPlans/E-05/TP-E-05.md) | **Open** |
| E-06 | Verification failure, blocked release, recovery | SAC-010 | [E-06](./SAC-010/Scenarios/E-06.md) | [TP-E-06](../TestPlans/E-06/TP-E-06.md) | **Open** |
| E-07 | Operational feedback and controlled baseline update | Cross-cutting | [E-07](./Scenarios/E-07.md) | [TP-E-07](../TestPlans/E-07/TP-E-07.md) | **Open** |
| E-08 | Audit reconstruction and requirement closure review | Cross-cutting | [E-08](./Scenarios/E-08.md) | [TP-E-08](../TestPlans/E-08/TP-E-08.md) | **Open** |
