# ERP Map & section shell — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Operator flow

1. Open `/` (ERP Map) — pick a module tile (e.g. Estimates).
2. Land on `/sections/estimates` — main menu remains; intents rail lists section intents.
3. Use search in the intents rail when the list grows.
4. Collapse either rail as needed; on mobile open Intents from the top bar.

## Guardrails

- Do not put Odoo credentials or free-form RPC in the map UI.
- Sections without intents show an empty-state message in the rail.
