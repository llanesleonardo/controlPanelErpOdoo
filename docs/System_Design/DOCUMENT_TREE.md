# Document tree (three levels)

Top-down map of `docs/System_Design/`.

```mermaid
flowchart TB
  ROOT[ControlPanelERP_System_Design]
  ROOT --> CONOPS[ConOps]
  ROOT --> SRD[SRD]
  ROOT --> TSD[TSD]
  ROOT --> SUB[Subsystem]
  ROOT --> TPL[Templates]
  ROOT --> TP[TestPlans]
  ROOT --> LEG[_legacy_Epics]
  SUB --> SACS[SAC-001_to_010]
  SUB --> RISKS[Risks]
  SUB --> SCEN[SCENARIOS]
```

```text
System_Design/
├── README.md
├── DOCUMENT_TREE.md
├── ConOps/ControlPanelERP_ConOps.md
├── SRD/ControlPanelERP_SRD.md
├── TSD/ControlPanelERP_TSD.md
├── TSD/Pattern_Selection.md
├── TSD/Monorepo_Layout.md
├── Subsystem/ (SAC-*, Risks, SCENARIOS, …)
├── Templates/
├── TestPlans/
│   └── OPS-001…007, E-01/
└── _legacy/Epic-01 … Epic-07/
```

**Pack home:** [README.md](./README.md)
