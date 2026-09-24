# Dry-run execution path — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Contract linkage

Samples in ContractsDocs already carry `execution_mode` and verification/rollback annotations (e.g. inventory adjust, invoice post).

## Planned runtime (later)

- Orchestrator Skill API accepts mode
- Adapters implement `simulate(intent)` vs `commit(intent)`
- Task record stores mode and dry-run evidence JSON
- Console defaults high-risk ops to dry_run

## Notes

No FastAPI skill code in Epic-01.
