# ERP Map & section shell — Technical Specification Document (TSD)

**Status:** implemented (Epic-05)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

Operator navigation shell for ERP modules and intents (no Odoo RPC in this task).

## Patterns applied

- [API Gateway](../../../../Software%20Patterns%20Docs/Distributed_system_patterns/01-api-gateway.md) — browser talks only to Next.js / gateway; not Odoo
- Progressive disclosure — intents rail appears only on `/sections/*`
- Theme tokens — CSS variables for black-on-black dark mode

## Stack

| Piece | Choice |
|-------|--------|
| Web | Next.js App Router `apps/web` |
| Catalog | `apps/web/lib/erp-sections.ts` |
| Home | `ErpAppsGrid` on `/` |
| Section route | `apps/web/app/sections/[slug]/page.tsx` |
| Dual nav | `AppShell` + `IntentRail` (`parseSectionSlug`) |
| Styles | `globals.css` — `--bg #000`, tile/icon black-on-black, tight grid gap |

## Key UI behaviors

- Intent rail left offset = main sidebar width (collapsed-aware)
- Search filters label / code / status / difficulty (difficulty added in task-02)
- Section accordion stays open when path starts with `/sections`
