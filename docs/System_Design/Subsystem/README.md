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
**Parent:** [ConOps](../ConOps/ControlPanelERP_ConOps.md) · [SRD](../SRD/ControlPanelERP_SRD.md) · [TSD](../TSD/ControlPanelERP_TSD.md)  
**History:** [`_legacy/`](../_legacy/) — Epic packs (read-only; already harvested into these SACs)

## Product / runtime

| ID | Name | Folder | Owns |
|----|------|--------|------|
| SAC-001 | Front door — gateway, access, allowlist | [SAC-001/](SAC-001/) | OPS-012 |
| SAC-002 | Screens — ERP Map, console, ontology UI | [SAC-002/](SAC-002/) | OPS-009 |
| SAC-003 | Shared vocabulary — taxonomy & contracts | [SAC-003/](SAC-003/) | OPS-010 |
| SAC-004 | Orchestrator — skills engine | [SAC-004/](SAC-004/) | OPS-008 |
| SAC-005 | Odoo connector (ERP #1) | [SAC-005/](SAC-005/) | OPS-001 |
| SAC-006 | Business map — ontology & visuals | [SAC-006/](SAC-006/) | OPS-004…006 |
| SAC-007 | Tasks, approvals, evidence, logs | [SAC-007/](SAC-007/) | OPS-002, OPS-003 |
| SAC-008 | Estimate issues wedge | [SAC-008/](SAC-008/) | OPS-011 |

## Delivery / infrastructure

| ID | Name | Folder | Owns |
|----|------|--------|------|
| SAC-009 | Docker, Compose, runtime layout (+ Guides) | [SAC-009/](SAC-009/) | OPS-007 |
| SAC-010 | CI, lint, release evidence | [SAC-010/](SAC-010/) | E-01 (shared) |

## Shop map (how pieces fit)

```text
People in the shop
        │
        ▼
   SAC-002 UI  ──►  SAC-001 Gateway / allowlist
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
       SAC-006      SAC-004     SAC-007
       Ontology     Skills      Tasks/logs
                        │
                        ▼
                   SAC-005 Odoo ──► ERP
```
