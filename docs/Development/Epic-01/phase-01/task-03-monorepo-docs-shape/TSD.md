# Monorepo and docs shape — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Current tree (scaffold)

```
apps/web, apps/gateway, apps/orchestrator   # README stubs
packages/contracts                          # README stub
docker/                                     # Compose + Dockerfile stubs
docs/Components|Deployment|Development|Software Patterns Docs
.github/workflows/lint.yml
package.json                                # docs:sync-patterns, lint
```

## References

- [monorepo-layout.md](../../../monorepo-layout.md)
- [docs/README.md](../../../../README.md)
- Root [README.md](../../../../../README.md)

## Notes

Application frameworks are added in a later epic against Phase 02+ SRDs.
