# Intent catalog & profiles — Technical Specification Document (TSD)

**Status:** implemented (Epic-05)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Section→intent catalog, UI detail panels, deterministic execution profiles for future routing.

## Patterns applied

- Taxonomy / controlled vocabulary — intent codes stay `{domain}.{entity}.{verb}`
- [Anti-Corruption Layer](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md) — UI speaks taxonomy; Odoo model names only in call-path / adapters
- Deterministic classification — `classifyIntentProfile` (no ML)

## Stack

| Piece | Choice |
|-------|--------|
| Catalog | `apps/web/lib/section-intents.ts` |
| Resolve | `resolveIntentDetail`, `classifyIntentProfile` |
| Detail UI | `apps/web/app/sections/[slug]/page.tsx` |
| Rail badges | status + difficulty hint |

## Difficulty classes

| Class | Meaning | Example |
|-------|---------|---------|
| `simple` | Single fetch | `sales.estimate.read` |
| `structured` | Typed mutate | `sales.quotation.create` |
| `diagnostic` | Multi-read + rules | `sales.estimate.find_issues` |
| `nl_compose` | NL → grounded extract → write | `sales.estimate.create_from_text` |

## Default call-path sketch

`intent` → `POST /skills/execute` (or dry-run) → `{model}.{method}` → `POST /jsonrpc`
