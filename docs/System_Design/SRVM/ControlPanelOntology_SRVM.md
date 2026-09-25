# Software Requirements Verification Matrix (SRVM)

**Product:** ControlPanelOntology  
**Pairs with:** [Parent SRD](../SRD/ControlPanelOntology_SRD.md) · [Scenarios](../Subsystem/SCENARIOS.md) · [TestPlans](../TestPlans/README.md)

**Policy:** Status stays **Open** until a TR report exists. Demos and partial smoke do not close rows.

| SRD ID | Scenario | Test plan | Method | Status | Evidence / report |
|--------|----------|-----------|--------|--------|-------------------|
| SRD-EST-001 / SRD-CONN-001 | OPS-001 | [TP-OPS-001](../TestPlans/OPS-001/TP-OPS-001.md) | Test | **Open** | |
| SRD-SEC-003 | OPS-002 | [TP-OPS-002](../TestPlans/OPS-002/TP-OPS-002.md) | Test | **Open** | |
| SRD-OPS-001 | OPS-003 | [TP-OPS-003](../TestPlans/OPS-003/TP-OPS-003.md) | Test | **Open** | |
| SRD-ONT-002 | OPS-004 | [TP-OPS-004](../TestPlans/OPS-004/TP-OPS-004.md) | Demo | **Open** | |
| SRD-EST-002 | OPS-005 | [TP-OPS-005](../TestPlans/OPS-005/TP-OPS-005.md) | Test | **Open** | |
| SRD-ONT-003 | OPS-006 | [TP-OPS-006](../TestPlans/OPS-006/TP-OPS-006.md) | Demo | **Open** | |
| SRD-OPS-003 | OPS-007 | [TP-OPS-007](../TestPlans/OPS-007/TP-OPS-007.md) | Demo | **Open** | |
| SRD-SKL-001…012 / SRD-SEC-001 | OPS-008 | [TP-OPS-008](../TestPlans/OPS-008/TP-OPS-008.md) | Test | **Open** | |
| SRD-UI-001 | OPS-009 | [TP-OPS-009](../TestPlans/OPS-009/TP-OPS-009.md) | Demo | **Open** | |
| SRD-TAX-001…009 / SRD-CTR-001…007 | OPS-010 | [TP-OPS-010](../TestPlans/OPS-010/TP-OPS-010.md) | Test | **Open** | |
| SRD-EST-003 | OPS-011 | [TP-OPS-011](../TestPlans/OPS-011/TP-OPS-011.md) | Test | **Open** | |
| SRD-GW-001…010 / SRD-SEC-001 | OPS-012 | [TP-OPS-012](../TestPlans/OPS-012/TP-OPS-012.md) | Test | **Open** | |
| SRD-EDGE-001 / SRD-ONT-005 | OPS-013 | [TP-OPS-013](../TestPlans/OPS-013/TP-OPS-013.md) | Test | **Open** | |
| SRD-EDGE-002 / SRD-CONN-002 | OPS-014 | [TP-OPS-014](../TestPlans/OPS-014/TP-OPS-014.md) | Test | **Open** | |
| SRD-EDGE-003 | OPS-015 | [TP-OPS-015](../TestPlans/OPS-015/TP-OPS-015.md) | Test | **Open** | |
| SRD-EDGE-004 | OPS-016 | [TP-OPS-016](../TestPlans/OPS-016/TP-OPS-016.md) | Test | **Open** | |
| SRD-UI-004 | OPS-017 | [TP-OPS-017](../TestPlans/OPS-017/TP-OPS-017.md) | Demo | **Open** | |
| SRD-EDGE-005 | OPS-018 | [TP-OPS-018](../TestPlans/OPS-018/TP-OPS-018.md) | Test | **Open** | |
| SRD-EDGE-006 | OPS-019 | [TP-OPS-019](../TestPlans/OPS-019/TP-OPS-019.md) | Test | **Open** | |
| SRD-EDGE-007 / SRD-SEC-002 | OPS-020 | [TP-OPS-020](../TestPlans/OPS-020/TP-OPS-020.md) | Test | **Open** | |
| SRD-ONT-004 | OPS-021 | [TP-OPS-021](../TestPlans/OPS-021/TP-OPS-021.md) | Inspection | **Open** | |
| SRD-CONN-003 / SRD-ONT-012 | OPS-022 | [TP-OPS-022](../TestPlans/OPS-022/TP-OPS-022.md) | Inspection | **Open** | |
| SRD-TEN-001 / 003 · SRD-DEP-010 | OPS-023 | [TP-OPS-023](../TestPlans/OPS-023/TP-OPS-023.md) | Inspection / Test | **Open** | |
| SRD-TEN-002 / 004 · SRD-DEP-011 | OPS-024 | [TP-OPS-024](../TestPlans/OPS-024/TP-OPS-024.md) | Inspection / Test | **Open** | |
| Pack / ConOps alignment (E-01) | E-01 | [TP-E-01](../TestPlans/E-01/TP-E-01.md) | Inspection | **Open** | |
| Digital Thread (E-02) | E-02 | [TP-E-02](../TestPlans/E-02/TP-E-02.md) | Inspection | **Open** | |
| Verification loop (E-03) | E-03 | [TP-E-03](../TestPlans/E-03/TP-E-03.md) | Inspection | **Open** | |
| SRD-DEP-* / deploy (E-04) | E-04 | [TP-E-04](../TestPlans/E-04/TP-E-04.md) | Demo | **Open** | |
| SRD-CI-* / release (E-05) | E-05 | [TP-E-05](../TestPlans/E-05/TP-E-05.md) | Inspection | **Open** | |
| Release gate / recovery (E-06) | E-06 | [TP-E-06](../TestPlans/E-06/TP-E-06.md) | Inspection | **Open** | |
| Baseline feedback (E-07) | E-07 | [TP-E-07](../TestPlans/E-07/TP-E-07.md) | Inspection | **Open** | |
| Audit thread (E-08) | E-08 | [TP-E-08](../TestPlans/E-08/TP-E-08.md) | Inspection | **Open** | |

Detail SHALLs live in each SAC `SRD.md`. Update **Status** only when a TR report exists. Cross-cut E home: [Scenarios/TRACE.md](../Subsystem/Scenarios/TRACE.md).

## Related

- [README](./README.md)  
- [Subsystem Risks](../Subsystem/Risks.md)  
