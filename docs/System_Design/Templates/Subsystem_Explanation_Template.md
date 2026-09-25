# Subsystem Explanation Template

**Document type:** Subsystem guide (plain language)  
**Template version:** 1.1  

```text
docs/System_Design/Subsystem/SAC-xxx/
  README.md      ← this template
  SRD.md
  TSD.md
  TRACE.md
  Scenarios/     ← owned OPS / E (README lists all; status Open)
  Issues/        ← optional GH design packs
```

**Subsystem** = one clear responsibility. Frame against the **ontology hub**: this SAC either serves the hub, the connector catalog, consumption UI, or delivery — ERP is a **peer edge**, not the center.

---

# SAC-xxx — [Subsystem name]

**In one sentence:**



## Plain explanation

What this piece does:



**Important rules / locked baselines:**

- Talk to edges only via ontology actions → allowlisted skills → connectors  
- 
- 

**What this is not:**



## Who cares

| Role | Why |
|------|-----|
| Estimator / operator | |
| Admin / IT | |
| Developer / SDK | |
| Builder / V&V | |

## Inputs and outputs

| Inputs | Outputs |
|--------|---------|
| | |

## Talks to (other SACs / edges)

| From / To | What is exchanged |
|-----------|-------------------|
| SAC-… | |
| Edge peer (SoA/data/logic) | via connector catalog — not browser-direct |

## Related requirement areas

- **SRD-…** —  

See [SRD.md](SRD.md).

## Related risks

- **GAP-… / RISK-…** —  

Catalog: [../Risks.md](../Risks.md)

## Related ConOps

| Modes | Scenarios owned (all **Open**) | ConOps §§ |
|-------|-------------------------------|-----------|
| MODE-… | OPS-… / E-… | §9 / §10 |

## Folder contents

| File | Purpose |
|------|---------|
| [README.md](README.md) | This explanation |
| [SRD.md](SRD.md) | Child SHALLs |
| [TSD.md](TSD.md) | Child design |
| [TRACE.md](TRACE.md) | SRD → Scenario → TP (status Open until TR) |
| [Scenarios/](Scenarios/) | Owned OPS/E + README index |
| [Issues/](Issues/) | Optional GH diagram packs |

---

# Optional: candidate SRD themes (or use `SRD.md`)

| Candidate ID | Theme (future SHALL seed) |
|--------------|---------------------------|
| **XXX-001** | The system shall … |
| **XXX-002** | |

## Traceability aids

| Trace | Value |
|-------|-------|
| Modes | |
| Scenarios | OPS-… / E-… (**Open**) |
| Related risks | |

## Verification hint

| Theme | Method | V&V level |
|-------|--------|-----------|
| XXX-001 | Test / Demo / Inspection / Analysis | L1–L4 |

## Next step

1. Unique `SRD-<AREA>-nnn` in parent SRD  
2. Testable SHALL + ConOps / OPS / E trace  
3. Child TSD allocation  
4. TP + TR → SRVM close only with evidence  

---

*End of subsystem explanation template*
