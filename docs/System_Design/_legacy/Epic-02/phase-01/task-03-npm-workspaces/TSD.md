# npm workspaces — Technical Specification Document (TSD)

**Status:** planned (Epic-02 implementation)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Root package.json changes

```json
{
  "private": true,
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "docs:sync-patterns": "...",
    "lint": "..."
  }
}
```

## packages/contracts/package.json

```json
{
  "name": "@control-panel-erp/contracts",
  "version": "0.0.1",
  "private": true,
  "main": "src/index.ts",
  "exports": { ".": "./src/index.ts" }
}
```

(Exact main/exports may use `dist/` if a build step is added.)

## Notes

`apps/*` can remain README-only packages with minimal `package.json` so workspace glob does not break, or limit workspaces to `packages/*` only if apps lack package.json — **default: workspaces = `packages/*` only** until apps are scaffolded.
