# Estimate issues UI dismiss — Technical Specification Document (TSD)

**Status:** not started  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Estimates-section UI for list / dismiss / find-issues.

## Patterns applied

- [API Gateway](../../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) — browser → gateway only  
- Progressive disclosure — issues surface inside Estimates section / intent profile  
- [Observability](../../../../../Software%20Patterns%20Docs/DevOps_Delivery_patterns/06-observability.md) — show correlation / last find status when available  

## Stack

| Piece | Choice |
|-------|--------|
| Web | Next.js `apps/web` Estimates / section intent UI |
| API | Gateway list + dismiss (+ find from task-02) |
| State | Control-plane Postgres only for dismiss |

## Notes

- Dismiss is a control-plane mutation only.  
- Reuse existing section shell / intent rail from Epic-05.
