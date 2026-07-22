# apps/orchestrator — FastAPI skill execution

**Status:** Epic-04 — dry-run skills with hexagonal ports; Odoo only in adapters.

## Run

```bash
cd apps/orchestrator
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
set STORAGE_ROOT=../../storage/local
set ERP_MODE=simulate
uvicorn app.main:app --reload --port 8000
```

Or from repo root: `npm run dev:orchestrator` (after venv exists).

## Endpoints

- `GET /health`
- `POST /skills/dry-run` — domain body `{ intent_code, input }`; headers `X-Correlation-Id`, `X-Actor-Id`

## Docs

- [Epic-04](../../docs/Development/Epic-04/README.md)
