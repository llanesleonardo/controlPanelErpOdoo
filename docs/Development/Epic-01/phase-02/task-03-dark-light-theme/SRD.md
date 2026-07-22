# Dark and light theme — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [ControlPanelDocs](../../../../Components/ControlPanelDocs/README.md)

## Purpose

Define dark and light theme support with a persisted user preference across the control panel shell.

## Scope

- Theme toggle in UI chrome
- Persist preference (profile field and/or local storage + server sync)
- Apply across control panel pages

## Out of Scope

- Per-panel custom themes / white-label branding packs
- Implementing CSS/theme provider code in Epic-01

## Requirements

### SRD-E01-phase-02-T03-01

**Modes** — The product shall support at least `light` and `dark` themes.

### SRD-E01-phase-02-T03-02

**Toggle** — Authenticated UI shall expose a theme toggle.

### SRD-E01-phase-02-T03-03

**Persistence** — Preference shall survive refresh; preferred source of truth is user profile field with local fallback.

### SRD-E01-phase-02-T03-04

**Docs-only** — Epic-01 documents behavior; Next.js theme implementation is deferred.
