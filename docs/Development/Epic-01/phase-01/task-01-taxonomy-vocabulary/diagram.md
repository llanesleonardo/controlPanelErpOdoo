# Taxonomy vocabulary — Diagrams

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [conops](./conops.md)

## Implements

```mermaid
flowchart LR
  Intent[Human_or_OpenClaw_intent]
  Tax[TaxonomyDocs]
  Code[intent_code]
  Skill[Allowlisted_skill]
  Intent --> Tax
  Tax --> Code
  Code --> Skill
```

Intent classification always resolves through the published vocabulary before skill selection.
