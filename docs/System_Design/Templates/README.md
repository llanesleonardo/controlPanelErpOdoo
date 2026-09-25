# ControlPanelOntology — Templates

Reusable V-Model templates. Align new docs with the **ontology hub** model: edges (SoA / data / logic) are peers; **ERP is SoA peer #1**, not the product brain. Scenarios stay **Open** until SRVM evidence closes them.

**Path note:** Relative links inside template scaffolds (e.g. `../../TSD/…`, `flow.md`) are written for the **destination** folder after you copy the template into a SAC (or Issues pack) — not for opening the template in-place under `Templates/`.

| Template | Purpose | Ver |
|----------|---------|-----|
| [ConOps_Template.md](ConOps_Template.md) | Ops intent: actors, hub/edges, modes, **external OPS** + **internal E** | 1.1 |
| [SRD_Template.md](SRD_Template.md) | Testable SHALLs traced to ConOps / OPS / E / SAC | 1.1 |
| [TSD_Template.md](TSD_Template.md) | Design: hub, connector catalog, action→skill→peer | 1.1 |
| [Subsystem_Explanation_Template.md](Subsystem_Explanation_Template.md) | SAC `README` + folder shape (SRD/TSD/TRACE/Scenarios/Issues) | 1.1 |
| [Scenario_Template.md](Scenario_Template.md) | One OPS or E file under owning SAC (or cross-cutting `Scenarios/`) | 1.1 |
| [Issue_Design_Diagrams_Template.md](Issue_Design_Diagrams_Template.md) | Per-issue flow / activity / sequence / class under `SAC-*/Issues/` | 1.1 |
| [Test_Plan_Template.md](Test_Plan_Template.md) | How to check a scenario; does not close SRVM alone | 1.1 |
| [Test_Report_Template.md](Test_Report_Template.md) | One TR per run; required before marking scenario closed | 1.1 |

## Suggested order

```text
ConOps (hub + edges + OPS/E seeds)
  → SAC README folders
  → Scenario files under SAC-*/Scenarios/ (or Subsystem/Scenarios/ for cross-cut E)
  → Parent + child SRD SHALLs
  → Parent + child TSD (Pattern_Selection first for code)
  → Test plans (TP-*) + reports (TR-*)
  → SRVM (Open until evidence)
```

## Scenario policy (locked for this product)

| Rule | Meaning |
|------|---------|
| **External = OPS** | Product use (shop, admin, SDK, AI+human) |
| **Internal = E** | Change / prove / ship the baseline |
| **Open until closed** | Demo or smoke does **not** close OPS/E or SRVM rows |
| **Owner SAC** | File lives under that SAC’s `Scenarios/` (E-04→SAC-009; E-05/06→SAC-010) |

## Related filled docs

- ConOps: [../ConOps/ControlPanelOntology_ConOps.md](../ConOps/ControlPanelOntology_ConOps.md)  
- SRD: [../SRD/ControlPanelOntology_SRD.md](../SRD/ControlPanelOntology_SRD.md) (Draft 0.3+)  
- Parent TSD: [../TSD/ControlPanelOntology_TSD.md](../TSD/ControlPanelOntology_TSD.md) (Draft 0.4+)  
- Pattern selection: [../TSD/Pattern_Selection.md](../TSD/Pattern_Selection.md)  
- Component map: [../TSD/Component_Map.md](../TSD/Component_Map.md)  
- Subsystems: [../Subsystem/README.md](../Subsystem/README.md)  
- Scenario index: [../Subsystem/SCENARIOS.md](../Subsystem/SCENARIOS.md)  
- SRVM: [../SRVM/ControlPanelOntology_SRVM.md](../SRVM/ControlPanelOntology_SRVM.md)  
- Test plans: [../TestPlans/README.md](../TestPlans/README.md)  
- Risks: [../Subsystem/Risks.md](../Subsystem/Risks.md)  

## Reminder

| Artifact | Answers |
|----------|---------|
| **ConOps** | What should happen in operation? |
| **Scenario** | One OPS/E story to prove |
| **SRD** | What the system SHALL do (testable)? |
| **TSD** | How we design/build it? |
| **Test plan / report** | How we check / what we observed |
| **SRVM** | Is each requirement verified and closed? |
