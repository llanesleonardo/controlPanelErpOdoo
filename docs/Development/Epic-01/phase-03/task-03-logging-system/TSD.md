# Logging system — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Env (documented in `.env.example`)

- `LOG_LEVEL=info`
- `LOG_DIR=./logs`

## Planned approach (later)

- NestJS / FastAPI structured logger
- Request middleware minting or accepting `X-Correlation-Id`
- File sink under `LOG_DIR` with rotation policy TBD
- Gateway API `GET /logs?correlation_id=` for explorer (or read from store)

## UI

- `/logs` explorer in ControlPanelDocs
