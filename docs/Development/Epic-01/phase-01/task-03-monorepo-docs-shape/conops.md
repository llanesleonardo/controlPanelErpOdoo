# Monorepo and docs shape — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Contributor flow

1. Clone repo; read Development index and Epic-01.
2. Sync patterns: `NODE_AUTH_TOKEN` + `npm run docs:sync-patterns`.
3. Add or edit docs under the four roots; put feature work under Epic/phase/task packs.
4. Run `npm run lint` before commit.
5. Do not invent parallel top-level doc trees.

## Failure handling

Layout drift (docs outside the four roots, or app code without a task pack) is corrected by moving content back into the convention before the next epic starts coding.
