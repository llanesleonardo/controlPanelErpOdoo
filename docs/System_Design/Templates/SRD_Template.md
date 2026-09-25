# System Requirements Document (SRD) Template

**Document type:** SRD  
**Template version:** 1.1  
**Product defaults:** ControlPanelOntology — ontology hub; multi–system-of-action peers; ERP = SoA peer #1.

**SRD** = testable “the system shall…” requirements derived from ConOps.  
Design → TSD. Closure → SRVM (**Open** until evidence).

---

## Document control

| Field | Value |
|-------|--------|
| **Document title** | ControlPanelOntology — System Requirements Document (SRD) |
| **Product** | ControlPanelOntology |
| **Version** | 0.1 |
| **Updated** | |
| **Author(s)** | |
| **Status** | Draft / In review / Baseline |
| **Parent ConOps** | link / version |
| **Related TSD** | link / version |
| **Architecture baseline** | Ontology hub; SoA/data/logic = peer edges via first-party connectors |

### Revision history

| Date | Version | Description | Author(s) |
|------|---------|-------------|-----------|
| | 0.1 | Initial SRD from template | |

---

## 1. Purpose

State required behavior so developers build, testers prove, and SRVM can close each SHALL with evidence.  
**Do not** mark requirements closed because a demo exists — scenarios stay Open until TR + SRVM.

---

## 2. Scope

**In scope:** functional, interface, security, measurable reliability SHALLs.  
**Out of scope:** how to implement (TSD), test steps (Test plans), storytelling (ConOps).

---

## 3. Definitions

| Term | Meaning |
|------|---------|
| **SHALL** | Mandatory |
| **SHOULD** | Recommended (use sparingly) |
| **MAY** | Optional |
| **SoA** | System of action edge |
| **Open** | Not closed in SRVM — progress ≠ complete |

---

## 4. Requirement rules

Each requirement must be: atomic, unambiguous, testable, traced (ConOps / OPS / E / MODE / SAC), uniquely identified.

| Field | Content |
|-------|---------|
| **ID** | e.g. SRD-ONT-005 |
| **Statement** | The system shall … |
| **Priority** | Must / Should |
| **ConOps trace** | §… / MODE-… / OPS-… / E-… |
| **Subsystem** | SAC-… |
| **Verification method** | Test / Demonstration / Inspection / Analysis |
| **Notes / OPEN** | |

---

## 5. Requirement areas *(ControlPanelOntology catalog)*

| Area ID | Name | Description |
|---------|------|-------------|
| SRD-SEC | Safety & governance | Allowlist, dry-run, evidence, ACL |
| SRD-UI | Control panel & consumption | Map, console, ontology UI, analytics via gateway |
| SRD-TAX | Taxonomy / contracts | Intent codes, YAML sync |
| SRD-EST | Estimates wedge | ERP SoA peer estimate skills |
| SRD-ONT | Ontology hub | Types, links, actions, Process, ownership |
| SRD-CONN | Connectors | Catalog SPI, peers, capability matrix |
| SRD-EDGE | Edge families | Multi-SoA, data, logic, automation, SDK, AI+human |
| SRD-OPS | Operations | Tasks, logs, Compose |
| SRD-CI | Quality gates | Lint, smokes, release honesty |

---

## 6. Requirements by area

Copy per area / ID.

### 6.x [Area ID] — [Name]

#### SRD-XXX-001

| Field | Content |
|-------|---------|
| **Statement** | The system shall … |
| **Priority** | Must |
| **ConOps trace** | |
| **Subsystem** | SAC-… |
| **Verification method** | Test / Demo / Inspection / Analysis |
| **Primary scenario** | OPS-… / E-… (**Open** until SRVM) |
| **Notes** | |

---

## 7. Cross-cutting

### 7.1 Security / allowlist / anti-corruption



### 7.2 Audit / provenance / connector_id on evidence



### 7.3 Degraded modes (edge down, simulate)



---

## 8. External interfaces

| Interface | Direction | Edge kind | Requirement IDs |
|-----------|-----------|-----------|-----------------|
| | In / Out | SoA / data / logic / none | |

Prefer: clients → **gateway only**; edges → **connector catalog**.

---

## 9. Assumptions, constraints, open decisions

| OD ID | Topic | Impact on SRD |
|-------|-------|---------------|
| | | |

---

## 10. Traceability summary

| ConOps / OPS / E / MODE | SRD IDs | Primary SAC |
|-------------------------|---------|-------------|
| | | |

Scenario index: [../Subsystem/SCENARIOS.md](../Subsystem/SCENARIOS.md)

---

## 11. Verification hand-off

| SRD ID | Method | Scenario | Test plan | SRVM status |
|--------|--------|----------|-----------|-------------|
| | | OPS-/E- | TP- | **Open** |

Detailed steps → **Test Plan**. Closure → **SRVM** only with TR evidence.

---

## 12. Summary

- Total requirements:  
- Areas covered:  
- Ready for TSD allocation: Yes / No  

## Appendix — ID conventions

```text
SRD-<AREA>-<nnn>
Examples: SRD-SEC-001, SRD-ONT-005, SRD-CONN-003, SRD-EDGE-001
```

Local seeds in `SAC-xxx/SRD.md` until promoted to parent SRD.

---

*End of SRD template*
