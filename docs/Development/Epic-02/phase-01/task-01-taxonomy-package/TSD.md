# Taxonomy package — Technical Specification Document (TSD)

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Recommended layout

Prefer colocating under `packages/contracts` to avoid an extra package for Epic-02:

```
packages/contracts/
  package.json
  src/taxonomy.ts       # enums / const arrays
  src/index.ts          # re-exports
  README.md
```

Alternatively `packages/taxonomy` if contracts stay YAML-only — default to **`packages/contracts/src/taxonomy.ts`**.

## Source of truth

Hand-maintain TypeScript from TaxonomyDocs (no codegen required in Epic-02). Comment linking back to docs paths.

## Test

- `node`/`vitest`/`node:test` smoke: imports succeed; known codes include the three sample operations.
