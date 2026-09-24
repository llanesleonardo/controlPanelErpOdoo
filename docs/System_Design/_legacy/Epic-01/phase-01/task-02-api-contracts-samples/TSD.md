# API contracts samples — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Artifact map

| File | Contents |
|------|----------|
| [common.yaml](../../../../Subsystem/SAC-003/Authoring/ContractsDocs/schemas/common.yaml) | ResultState, ErrorClass, Observability, AuditEnvelope |
| [sales.yaml](../../../../Subsystem/SAC-003/Authoring/ContractsDocs/sales.yaml) | `sales.order.create` |
| [inventory.yaml](../../../../Subsystem/SAC-003/Authoring/ContractsDocs/inventory.yaml) | `inventory.stock.adjust` |
| [accounting.yaml](../../../../Subsystem/SAC-003/Authoring/ContractsDocs/accounting.yaml) | `accounting.invoice.post` |

## Later components

- `packages/contracts` — load YAML, export types
- NestJS gateway — validate Intent/Task payloads
- FastAPI orchestrator — Skill execution against contracts

## Notes

No application validation code in Epic-01.
