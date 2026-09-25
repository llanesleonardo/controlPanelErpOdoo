# Subsystems guide (SAC)

Each **SAC** is one piece of the control panel. Open a folder and read:

| File | Purpose |
|------|---------|
| `README.md` | What this piece does (plain language) |
| `SRD.md` | Numbered SHALLs for this piece |
| `TSD.md` | How we build it |
| `TRACE.md` | Requirement → scenario → test plan |
| `Scenarios/` | Owned shop stories (when this SAC owns them) |

**Catalogs:** [SCENARIOS.md](./SCENARIOS.md) · [Risks.md](./Risks.md) · [SRD-Candidates.md](./SRD-Candidates.md)  
**Parent:** [ConOps](../ConOps/ControlPanelOntology_ConOps.md) · [SRD](../SRD/ControlPanelOntology_SRD.md) · [TSD](../TSD/ControlPanelOntology_TSD.md)  
**Diagrams:** [Component_Map](../TSD/Component_Map.md)

## Product / runtime

| ID | Name | Folder | Owns |
|----|------|--------|------|
| SAC-001 | Front door — gateway, access, allowlist, API face | [SAC-001/](SAC-001/) | OPS-012, 019 |
| SAC-002 | Screens — Map, console, ontology / analytics UI | [SAC-002/](SAC-002/) | OPS-009, 017 |
| SAC-003 | Shared vocabulary — taxonomy & contracts | [SAC-003/](SAC-003/) | OPS-010, 020 |
| SAC-004 | Orchestrator — skills engine | [SAC-004/](SAC-004/) | OPS-008, 013, 016 |
| SAC-005 | Connector catalog — SoA/data/logic edges (Odoo first peer) | [SAC-005/](SAC-005/) | OPS-001, 014, 015 |
| SAC-006 | Business map — ontology hub & visuals | [SAC-006/](SAC-006/) | OPS-004…006, 021, 022 |
| SAC-007 | Tasks, approvals, evidence, logs | [SAC-007/](SAC-007/) | OPS-002, 003, 018 |
| SAC-008 | Estimate issues wedge | [SAC-008/](SAC-008/) | OPS-011 |

## Delivery / infrastructure

| ID | Name | Folder | Owns |
|----|------|--------|------|
| SAC-009 | Docker, Compose, runtime layout (+ Guides) | [SAC-009/](SAC-009/) | OPS-007, E-04 |
| SAC-010 | CI, lint, release evidence | [SAC-010/](SAC-010/) | E-05, E-06 (E-01…08 shared) |

## Shop map (how pieces fit)

```text
People / AI / apps
        │
        ▼
   SAC-002 UI  ──►  SAC-001 Gateway / allowlist / API
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
       SAC-006      SAC-004     SAC-007
     Ontology hub   Skills    Tasks / automations
                        │
                        ▼
              SAC-005 connector catalog
                 │         │         │
              SoA peers  Data src  Logic src
              (ERP first …)
```
