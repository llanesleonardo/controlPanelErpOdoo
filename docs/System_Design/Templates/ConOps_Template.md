# Concept of Operations (ConOps) Template

**Document type:** ConOps  
**Template version:** 1.1  
**Product defaults:** ControlPanelOntology — **ontology hub**; ERP and other systems are **peer edges** (SoA / data / logic).

**ConOps** = how the system is meant to work in real life: who uses it, what it does, what is outside it, and what success looks like.  
It is **not** a full requirements list (SRD) and **not** detailed design (TSD).

**Scenario policy:** every OPS/E stays **Open** until SRVM + test evidence closes it. Progress ≠ closed.

---

## Document control

| Field | Value |
|-------|--------|
| **Document title** | ControlPanelOntology — Concept of Operations (ConOps) |
| **Product** | ControlPanelOntology |
| **Organization** | |
| **Version** | 0.1 |
| **Updated** | |
| **Author(s)** | |
| **Status** | Draft / In review / Approved |

### Revision history

| Date | Version | Description | Author(s) |
|------|---------|-------------|-----------|
| | 0.1 | Initial draft from template | |

### Acronyms

| Acronym | Meaning |
|---------|---------|
| **ConOps** | Concept of Operations |
| **SRD** | System Requirements Document |
| **TSD** | Technical Specifications / Design Document |
| **SRVM** | System Requirements Verification Matrix |
| **SoA** | System of action (edge that executes business writes/reads — ERP, MES, …) |
| **OPS** | External / product operational scenario |
| **E** | Internal / engineering lifecycle scenario |
| **SAC** | Subsystem (allocation container) |

---

## 1. Executive summary

**What the product is (2–4 sentences):**  
*(Hint: control plane with ontology hub; skills into first-party connectors; ERP is one SoA peer.)*

**Problem it solves:**

**Core workflow:**

```text
  AI + humans / Analytics / Automations / Apps
                      │
                      ▼
                 ONTOLOGY HUB
            (types · links · actions → skills)
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
      SoA peers   Data sources  Logic sources
      (ERP · …)
```

### Critical operational principles

1. Ontology is the hub — interact with edges through objects/actions/skills.  
2. Natural language may **suggest** intents; it must **not** invent tools or payloads.  
3. Only **allowlisted skills** execute; risky writes get dry-run / approval when required.  
4. Ownership is **per binding** — ERP is not assumed to own every property.  
5. Scenarios remain **Open** until evidence closes them.

**Claim boundary:** This ConOps describes intended operation. Verified capability requires SRD, scenarios, tests, evidence, and SRVM.

---

## 2. Introduction

### 2.1 Purpose

Explain why the system exists, who uses it, how edges attach via ontology, boundaries, and **external (OPS)** vs **internal (E)** scenarios.

### 2.2 Scope

**In scope:** operational intent, actors, hub/edge model, modes, OPS/E seeds.  
**Out of scope:** numbered SHALLs (SRD), frameworks/schemas (TSD), exact SLAs unless decided.

### 2.3 Document authority

| Artifact | Authoritative for |
|----------|-------------------|
| **ConOps** | Intent, actors, edges, OPS/E |
| **SRD** | Testable SHALLs |
| **TSD** | Design / as-built |
| **Scenarios + Test plans** | How we prove |
| **SRVM** | Closure (Open until evidence) |

---

## 3. Need and vision

### 3.1 Pain



### 3.2 Need



### 3.3 Value

- 
- 

---

## 4. Stakeholders and users

| Role | What they need |
|------|----------------|
| Estimator / sales | |
| Admin / IT | |
| Developer / SDK | |
| Builder / V&V | |

**External edge actors:** SoA peers (ERP, …), data systems, logic services — **not** inside Compose.

---

## 5. System context and boundaries

### Inside

- Web, gateway, orchestrator, control-plane Postgres  
- Ontology YAML, taxonomy/contracts, skill allowlist  
- First-party **connector catalog**

### Outside

- Every SoA / data / logic edge (URLs + credentials)

### Boundary diagram

```text
  Consumers (UI · AI · SDK · automations)
        │
        ▼
  [ Gateway + Ontology hub + Skills ]
        │
        ├── SoA peers (ERP first · MES · …)
        ├── Data sources
        └── Logic sources
```

---

## 6. Candidate subsystems (SAC)

| ID | Role in the hub model |
|----|------------------------|
| SAC-001 | Gateway / allowlist / API face |
| SAC-002 | Screens |
| SAC-003 | Taxonomy & contracts |
| SAC-004 | Skills engine |
| SAC-005 | Connector catalog (peers) |
| SAC-006 | Ontology hub & visuals |
| SAC-007 | Tasks / approvals / automations |
| SAC-008 | Outcome wedges (e.g. estimate issues) |
| SAC-009 | Compose / runtime |
| SAC-010 | CI / release evidence |

---

## 7. End-to-end operational concept

Main happy path + degraded modes.

| Condition | Expected behavior |
|-----------|-------------------|
| Edge down | Honest `down` / simulate — no fake live success |
| Unknown intent | Reject — no invented edge call |

---

## 8. Operational modes

| Mode ID | Name | What the user is doing |
|---------|------|------------------------|
| MODE-01 | Browse map | |
| MODE-02 | Explore objects | |
| MODE-03 | Execute skill | |
| MODE-04 | Govern write | |
| MODE-05 | Operate connectors | |
| MODE-06 | Automate | |
| MODE-07 | Integrate (SDK) | |
| MODE-08 | AI + human | |

---

## 9. External scenarios — product operational (OPS)

**External** = day-to-day product use. Seed list in ConOps; **one file per OPS** under owning `SAC-*/Scenarios/`. Status: **Open**.

Index: [../Subsystem/SCENARIOS.md](../Subsystem/SCENARIOS.md)

| Field | Content |
|-------|---------|
| **ID** | OPS-xxx |
| **Actors** | |
| **Preconditions** | |
| **Trigger** | |
| **Normal / alternate / failure flow** | |
| **Outputs / evidence** | |
| **Success condition** | |

### Distinguishing OPS vs E

| | **OPS (external)** | **E (internal)** |
|--|--------------------|------------------|
| Ask | What happens when someone runs the product? | What happens when we change, prove, or ship? |
| Actors | Shop, admin, SDK, AI+human | Builder, V&V, approver, auditor |
| GitHub | `type:impl` | `type:process` |

---

## 10. Internal scenarios — engineering lifecycle (E)

**Internal** = change / prove / ship. Files under owning SAC or `Subsystem/Scenarios/` for cross-cutting. Status: **Open**.

| ID | Name | One-line flow |
|----|------|---------------|
| E-01 | | |

---

## 11. Verification and evidence

Implemented ≠ verified ≠ closed ≠ released. Point to TestPlans + SRVM.

---

## 12. Future evolution *(informational)*

Ideas not yet baseline (full twin, customer ontology editors, Workshop, …) — attach as **edges**, not a second product.

---

## 13. Summary

- Operational purpose:  
- Ready for next step: **SRD** with numbered SHALLs  

## Appendix A — Candidate SRD areas

| Area ID | Name | Need |
|---------|------|------|
| SRD-SEC | Safety & governance | |
| SRD-ONT | Ontology hub | |
| SRD-CONN | Connector catalog / multi-edge | |
| SRD-EDGE | Edge interaction families | |
| SRD-UI | Control panel & consumption | |
| SRD-OPS | Tasks / deploy | |

## Appendix B — Assumptions, constraints, open decisions

### Assumptions / Constraints / Open decisions

| ID | Topic |
|----|-------|
| OD-001 | |

## Appendix C — Risks

| Risk ID | Risk | Impact | Likelihood | Mitigation | Verify later |
|---------|------|--------|------------|------------|--------------|
| RISK-001 | | | Low/Med/High | | OPS-… / E-… |

---

*End of ConOps template*
