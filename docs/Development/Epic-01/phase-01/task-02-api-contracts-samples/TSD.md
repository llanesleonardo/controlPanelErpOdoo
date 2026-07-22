# API contracts samples — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Artifact map

| File | Contents |
|------|----------|
| [common.yaml](../../../../Components/ContractsDocs/schemas/common.yaml) | ResultState, ErrorClass, Observability, AuditEnvelope |
| [sales.yaml](../../../../Components/ContractsDocs/sales.yaml) | `sales.order.create` |
| [inventory.yaml](../../../../Components/ContractsDocs/inventory.yaml) | `inventory.stock.adjust` |
| [accounting.yaml](../../../../Components/ContractsDocs/accounting.yaml) | `accounting.invoice.post` |

## Later components

- `packages/contracts` — load YAML, export types
- NestJS gateway — validate Intent/Task payloads
- FastAPI orchestrator — Skill execution against contracts

## Notes

No application validation code in Epic-01.
