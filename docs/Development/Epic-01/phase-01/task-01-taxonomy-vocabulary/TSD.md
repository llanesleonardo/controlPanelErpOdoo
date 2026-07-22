# Taxonomy vocabulary — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Supports [SRD](./SRD.md) for Epic-01 taxonomy documentation.

## Planned components (later epic)

| Component | Role |
|-----------|------|
| `docs/Components/TaxonomyDocs/` | Source of truth for vocabulary |
| `packages/contracts` (later) | Export enums / constants for gateway + orchestrator |
| Orchestrator classifier | Map free text → taxonomy code (later) |

## Current artifact locations

- [TaxonomyDocs README](../../../../Components/TaxonomyDocs/README.md)
- [vocabulary.md](../../../../Components/TaxonomyDocs/vocabulary.md)

## Notes

- No NestJS/FastAPI code in Epic-01.
- Changes to allowed operations update TaxonomyDocs first, then contracts.
