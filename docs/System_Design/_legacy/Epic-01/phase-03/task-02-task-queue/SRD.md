# Task queue — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [ControlPanelDocs](../../../../../User_Guide/Screens/README.md)

## Purpose

Define the Task queue for monitoring control-plane jobs across lifecycle states.

## Scope

- List/filter by state: `pending`, `running`, `completed`, `failed`, `needs_approval`
- Task detail with inputs, outputs, evidence, errors
- Approve / reject when `needs_approval`
- Result states aligned with taxonomy

## Out of Scope

- Advanced analytics dashboards
- Implementing queue UI/API in Epic-01

## Requirements

### SRD-E01-phase-03-T02-01

**Queue list** — Operators shall list tasks filtered by state and time range.

### SRD-E01-phase-03-T02-02

**Detail** — Operators shall open a task and see correlation_id, intent_code, skill, payloads, status, evidence.

### SRD-E01-phase-03-T02-03

**Approval actions** — Authorized roles shall approve or reject `needs_approval` tasks.

### SRD-E01-phase-03-T02-04

**Docs-only** — Epic-01 documents the queue; persistence/UI deferred.
