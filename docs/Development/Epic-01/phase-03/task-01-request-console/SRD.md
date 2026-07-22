# Request console — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [ControlPanelDocs](../../../../Components/ControlPanelDocs/README.md) · [request-lifecycle](../../../request-lifecycle.md)

## Purpose

Define the Request console where operators submit intents with domain and dry-run vs commit mode.

## Scope

- Intent entry (text and/or structured fields)
- Domain / taxonomy selection
- Execution mode: `dry_run` | `commit`
- Show classified `intent_code` before creating a task
- Call Intent API on gateway (later)

## Out of Scope

- Free-form execution without taxonomy
- Auto-commit of high-risk ops without approval
- Building the Next.js console in Epic-01

## Requirements

### SRD-E01-phase-03-T01-01

**Submit intent** — Operator shall submit an intent with domain and execution mode.

### SRD-E01-phase-03-T01-02

**Classification preview** — System shall return the mapped taxonomy `intent_code` (and confidence/warnings if any) before task creation.

### SRD-E01-phase-03-T01-03

**Task creation** — On confirm, a control-plane task shall be created in `pending` or `needs_approval` per policy (later).

### SRD-E01-phase-03-T01-04

**Docs-only** — Epic-01 documents the console; UI/API deferred.
