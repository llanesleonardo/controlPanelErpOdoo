# System Requirements Document (SRD) Template

**Document type:** SRD  
**Template version:** 1.0  

**SRD** = the list of **testable “the system shall…”** requirements.  
Derived from the ConOps. Design detail stays in the TSD. Verification status lives in the SRVM.

---

## Document control

| Field | Value |
|-------|--------|
| **Document title** | [Product] — System Requirements Document (SRD) |
| **Product** | |
| **Version** | 0.1 |
| **Updated** | |
| **Author(s)** | |
| **Status** | Draft / In review / Baseline |
| **Parent ConOps** | link / version |
| **Related TSD** | link / version *(future)* |

### Revision history

| Date | Version | Description | Author(s) |
|------|---------|-------------|-----------|
| | 0.1 | Initial SRD from template | |

---

## 1. Purpose

This SRD states the **required behavior** of [Product] so that:

- developers know what to build  
- testers know what to prove  
- SRVM can close each requirement with evidence  

---

## 2. Scope

**In scope:**

- Functional requirements  
- Interface requirements  
- Security / privacy requirements *(as applicable)*  
- Performance / reliability *characteristics as measurable requirements* *(when decided)*  

**Out of scope:**

- How to implement (languages, schemas, class design) → **TSD**  
- Step-by-step test procedures → **Test plans**  
- Operational storytelling → **ConOps**  

---

## 3. Definitions and acronyms

| Term | Meaning |
|------|---------|
| **SHALL** | Mandatory requirement |
| **SHOULD** | Recommended *(use sparingly)* |
| **MAY** | Optional |
| | |

---

## 4. Requirement rules (write SHALLs this way)

Each requirement must be:

1. **Atomic** — one idea  
2. **Unambiguous** — no “fast,” “easy,” “user-friendly” without a measure  
3. **Testable** — clear pass/fail  
4. **Traced** — to ConOps section / OPS / MODE / SAC  
5. **Identified** — unique ID  

### Requirement record format

| Field | Content |
|-------|---------|
| **ID** | e.g. SRD-VER-012 |
| **Statement** | The system shall … |
| **Priority** | Must / Should |
| **ConOps trace** | §… / MODE-… / OPS-… |
| **Subsystem** | SAC-… |
| **Verification method** | Test / Demonstration / Inspection / Analysis |
| **Suggested V&V level** | L1 / L2 / L3 / L4 |
| **Notes / OPEN** | |

---

## 5. Requirement areas *(catalog)*

Mirror your product. Example areas (replace as needed):

| Area ID | Name | Description |
|---------|------|-------------|
| SRD-PRO | | |
| SRD-SEC | | |
| SRD-VER | | |
| SRD-UI | | |
| SRD-INT | | |
| SRD-PER | | |
| SRD-REL | | |

---

## 6. Requirements by area

Copy the block below for each area.

### 6.x [Area ID] — [Name]

#### SRD-XXX-001

| Field | Content |
|-------|---------|
| **Statement** | The system shall … |
| **Priority** | Must |
| **ConOps trace** | |
| **Subsystem** | SAC-… |
| **Verification method** | Test / Demo / Inspection / Analysis |
| **V&V level** | L1–L4 |
| **Notes** | |

#### SRD-XXX-002

| Field | Content |
|-------|---------|
| **Statement** | The system shall … |
| **Priority** | Must |
| **ConOps trace** | |
| **Subsystem** | |
| **Verification method** | |
| **V&V level** | |
| **Notes** | |

---

## 7. Cross-cutting requirements

### 7.1 Security



### 7.2 Audit / provenance



### 7.3 Performance *(only with measurable criteria)*



### 7.4 Reliability / degraded modes



---

## 8. External interfaces

| Interface | Direction | Requirement IDs |
|-----------|-----------|-----------------|
| | In / Out / Both | |

---

## 9. Assumptions and constraints

### Assumptions

1. 

### Constraints

1. 

### Open decisions still deferred

| OD ID | Topic | Impact on SRD |
|-------|-------|---------------|
| | | |

---

## 10. Traceability summary

| ConOps / OPS / MODE | SRD IDs | Primary SAC |
|---------------------|---------|-------------|
| | | |

---

## 11. Verification planning hand-off

| SRD ID | Method | Test plan / TC *(when exists)* | SRVM row |
|--------|--------|--------------------------------|----------|
| | | | |

**Note:** Detailed steps belong in the **Test Plan**. Closure status belongs in the **SRVM**.

---

## 12. Summary

- Total requirements:  
- Areas covered:  
- Ready for TSD allocation: Yes / No  

---

## Appendix — Requirement ID conventions

Suggested pattern:

```text
SRD-<AREA>-<nnn>

Examples:
SRD-SEC-001
SRD-VER-012
SRD-BUL-003
```

Local subsystem seeds may use temporary IDs in `SAC-xxx/SRD.md` until promoted here.

---

*End of SRD template*
