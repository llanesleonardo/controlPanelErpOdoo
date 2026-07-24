# Estimate issues UI dismiss — Software Requirements Document (SRD)

**Status:** not started  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Let operators **list and dismiss** persisted estimate issues from the Estimates section of the control panel.

## Scope

- Issues list UI on Estimates / Sales section  
- Dismiss (status update in control-plane DB)  
- Trigger find-issues from UI (wires to task-02 API)  

## Out of Scope

- Auto-remediation writes to Odoo  
- Bulk ML classification  
- Non-Odoo issue sources  

## Requirements

### SRD-E06-T03-01

**List** — Operators shall see open (and optionally dismissed) estimate issues from control-plane storage.

### SRD-E06-T03-02

**Dismiss** — Operators shall dismiss an issue without calling Odoo.

### SRD-E06-T03-03

**Find action** — UI shall expose a control to run find-issues (task-02).

### SRD-E06-T03-04

**Language** — UI copy shall use product/taxonomy language, not raw Odoo model names.
