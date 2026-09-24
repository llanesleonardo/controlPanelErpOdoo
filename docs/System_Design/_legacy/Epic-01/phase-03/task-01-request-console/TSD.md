# Request console — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Planned UI

- Route: `/console` or `/requests/new`
- Fields: intent text, domain select, execution_mode radio, optional structured payload JSON
- Actions: Classify, Confirm create task

## Planned API

- `POST /intents/classify` → `{ intent_code, warnings[] }`
- `POST /tasks` → task record with correlation_id

## Dependencies (later)

Auth, taxonomy, contracts, task queue entity.
