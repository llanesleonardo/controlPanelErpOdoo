# ERP Map & section shell — Software Requirements Document (SRD)

**Status:** implemented (Epic-05)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Replace the early mind-map home with an **Odoo-style module grid** and give each module a **section workspace** with a collapsible **intents** sub-sidebar beside the main menu — so operators browse modules and intents instead of searching cluelessly.

## Scope

- Home `/` — 4-column module tiles for all ERP sections (black-on-black dark theme)
- Routes `/sections/[slug]` — blank section workspace per module
- Dual sidebar: **Main menu** | **List of intents** (section-scoped, searchable, collapsible)
- Mobile: intents drawer via topbar control

## Out of Scope

- Live skill execution (task-03)
- Full intent metadata (task-02 expands catalog)

## Requirements

### SRD-E05-T01-01

**Module grid** — Home shall present all mapped ERP sections as equal tiles linking to `/sections/:slug`.

### SRD-E05-T01-02

**Section pages** — Each slug shall resolve to a blank workspace with breadcrumb back to ERP Map.

### SRD-E05-T01-03

**Intents rail** — On section routes only, a second sidebar shall list that section’s intents and support collapse + search.

### SRD-E05-T01-04

**Theme** — Dark theme shall be black-on-black (page, rails, tiles) consistent with the control-panel shell.
