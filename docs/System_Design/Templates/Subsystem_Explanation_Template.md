# Subsystem Explanation Template

**Document type:** Subsystem guide (plain language)  
**Template version:** 1.0  

Use one folder per subsystem:

```text
docs/System_Design/Subsystem/SAC-xxx/
  README.md   ← fill this template
  SRD.md      ← candidate requirements (see SRD section below or separate file)
```

**Subsystem** = one clear responsibility of the product (e.g. access, verification, bulk jobs).  
Candidate IDs (SAC-*) are for allocation and traceability — not a claim that code already exists.

---

# SAC-xxx — [Subsystem name]

**In one sentence:**



## Plain explanation

What this piece does, in everyday language:



**Important rules / locked baselines** *(if any):*

- 
- 

**What this is not:**



## Who cares

| Role | Why |
|------|-----|
| End User | |
| System Administrator | |
| Developer | |
| Other | |

## Inputs and outputs

| Inputs | Outputs |
|--------|---------|
| | |

## Talks to (other subsystems / externals)

| From / To | What is exchanged |
|-----------|-------------------|
| | |

## Related requirement areas

- **SRD-…** —  
- **SRD-…** —  

See [SRD.md](SRD.md) in this folder for candidate requirement themes.

## Related risks

- **RISK-…** —  
- **RISK-…** —  

Full catalog: [../Risks.md](../Risks.md)

## Related ConOps

Modes:  
Scenarios (OPS / E):  
ConOps sections:  

## Folder contents

| File | Purpose |
|------|---------|
| [README.md](README.md) | This subsystem explanation |
| [SRD.md](SRD.md) | Candidate SRD themes for this subsystem |
| [TSD.md](TSD.md) | Technical design for this subsystem |
| [Scenarios/](Scenarios/) | Owned ConOps OPS / E scenario files *(when this SAC is primary owner)* |

---

# Optional: same-folder Candidate SRD (or use `SRD.md`)

## Purpose

Candidate requirement themes for **SAC-xxx**.  
Not final numbered SHALLs until promoted into the parent SRD.

## Mapped SRD areas

- **SRD-…**

## Candidate requirement themes

| Candidate ID *(local)* | Requirement theme (plain language — future SHALL seed) |
|------------------------|------------------------------------------------------|
| **XXX-001** | The system shall … *(write as a clear, testable idea)* |
| **XXX-002** | |
| **XXX-003** | |

## Traceability aids

| Trace | Value |
|-------|-------|
| Modes | |
| Scenarios | |
| Related risks | |

## Verification hint

| Theme | Suggested method | V&V level |
|-------|------------------|-----------|
| XXX-001 | Test / Demo / Inspection / Analysis | L1–L4 |

## Next step

Promote selected themes into the parent `ControlPanelERP_SRD.md` (or product SRD) with:

1. unique `SRD-<AREA>-nnn` ID  
2. testable SHALL statement  
3. ConOps / OPS / E trace  
4. verification method  
5. later: test plan TC + SRVM row  

---

*End of subsystem explanation template*
