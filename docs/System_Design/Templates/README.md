# ControlPanelERP — Templates

Reusable document templates for the V-Model pack.

| Template | Purpose |
|----------|---------|
| [ConOps_Template.md](ConOps_Template.md) | How the system is meant to work in real life (actors, modes, scenarios, boundaries) |
| [SRD_Template.md](SRD_Template.md) | Numbered, testable SHALL requirements traced to ConOps |
| [TSD_Template.md](TSD_Template.md) | Technical design: architecture, patterns, components, interfaces, data, deployment |
| [Subsystem_Explanation_Template.md](Subsystem_Explanation_Template.md) | Plain-language SAC folder (`README.md` + candidate `SRD.md`) |
| [Test_Plan_Template.md](Test_Plan_Template.md) | What to test, method, setup/data, expected results, who/when |
| [Test_Report_Template.md](Test_Report_Template.md) | One report per flow step; must name scenario under test |
| [Scenario_Template.md](Scenario_Template.md) | One ConOps OPS or E scenario file (actors, flows, success, traces) |

## Suggested order

```text
ConOps template
    → Subsystem explanation folders (SAC-xxx)
    → Scenario files (OPS / E) under SAC Scenarios/ (or shared Scenarios/)
    → SRD template (promote SAC SRD themes to SHALLs)
    → TSD template (design how SHALLs are built)
    → Test plan template
    → SRVM (requirement closure matrix — create when SHALLs exist)
```

## Related project docs

- ConOps (filled): [../ConOps/ControlPanelERP_ConOps.md](../ConOps/ControlPanelERP_ConOps.md)  
- **SRD (filled Draft 0.1):** [../SRD/ControlPanelERP_SRD.md](../SRD/ControlPanelERP_SRD.md)  
- Subsystems (filled): [../Subsystem/README.md](../Subsystem/README.md)  
- Parent TSD: [../TSD/ControlPanelERP_TSD.md](../TSD/ControlPanelERP_TSD.md)  
- Pattern selection: [../TSD/Pattern_Selection.md](../TSD/Pattern_Selection.md)  
- Scenario index: [../Subsystem/SCENARIOS.md](../Subsystem/SCENARIOS.md)  
- Test plans: [../TestPlans/README.md](../TestPlans/README.md)  
- SRD candidates catalog: [../Subsystem/SRD-Candidates.md](../Subsystem/SRD-Candidates.md)  
- Risks catalog: [../Subsystem/Risks.md](../Subsystem/Risks.md)  
- Pattern library: [../../Software Patterns Docs/](../../Software%20Patterns%20Docs/)  

## Reminder

| Artifact | Answers |
|----------|---------|
| **ConOps** | What should happen in operation? |
| **Subsystem guide** | What does this piece do? |
| **SRD** | What must the system SHALL do (testable)? |
| **TSD** | How do we design/build it? |
| **Test plan** | How do we check it? |
| **SRVM** | Is each requirement verified and closed? |
