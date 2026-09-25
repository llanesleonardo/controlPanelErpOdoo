# Document tree (three levels)

Top-down map of `docs/System_Design/`.

```mermaid
flowchart TB
  ROOT[ControlPanelOntology_System_Design]

  ROOT --> CONOPS[ConOps_hub]
  ROOT --> SRD[SRD]
  ROOT --> TSD[TSD]
  ROOT --> SRVM[SRVM]
  ROOT --> SUB[Subsystem]
  ROOT --> TPL[Templates]
  ROOT --> TP[TestPlans]

  CONOPS --> OPS[External_OPS_001_to_022]
  CONOPS --> E[Internal_E_01_to_08]

  TSD --> CMAP[Component_Map]
  TSD --> CAP[Capability_Model]
  TSD --> PAT[Pattern_Selection]
  TSD --> MONO[Monorepo_Layout]

  SUB --> SACS[SAC_001_to_010]
  SUB --> RISKS[Risks]
  SUB --> SCEN[SCENARIOS_index]
  SUB --> ISSUES[Issues_packs]

  SCEN --> OPS
  SCEN --> E
  TP --> OPS
  TP --> E
```

```text
System_Design/
├── README.md
├── DOCUMENT_TREE.md
├── ConOps/          ← hub ConOps; OPS external / E internal
├── SRD/
├── SRVM/
├── TSD/             ← parent TSD, Capability_Model, Component_Map, Pattern_Selection
├── Subsystem/       ← SAC-*, SCENARIOS, Risks, Issues
├── Templates/       ← v1.1 ConOps/SRD/TSD/Scenario/Issue/Test (ontology hub)
└── TestPlans/       ← OPS-001…022, E-01…08
```

**Pack home:** [README.md](./README.md)  
**Architecture picture:** [TSD/Component_Map.md](./TSD/Component_Map.md)
