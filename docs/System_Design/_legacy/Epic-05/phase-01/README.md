# Phase 01 — ERP Map & first live read

## Status

done

| Task | Feature | Patterns (primary) |
|------|---------|-------------------|
| [task-01-erp-map-and-section-shell](./task-01-erp-map-and-section-shell/) | Module grid + section pages + intents rail | Gateway BFF UI, progressive disclosure |
| [task-02-intent-catalog-and-profiles](./task-02-intent-catalog-and-profiles/) | Section→intent map, call path, difficulty | Deterministic taxonomy, ACL language |
| [task-03-live-estimate-read](./task-03-live-estimate-read/) | Live `sales.estimate.read` | Hexagonal, ACL, Facade, Adapter |

Build order: shell → catalog → live skill.
