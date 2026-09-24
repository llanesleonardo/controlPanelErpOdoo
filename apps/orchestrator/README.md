# apps/orchestrator — FastAPI skill execution

**Status:** dry-run + live estimate read; Odoo only in adapters.

## Run

```bash
cd apps/orchestrator
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
set STORAGE_ROOT=../../resources/storage/local
set ERP_MODE=simulate
uvicorn app.main:app --reload --port 8000
```

Or from repo root: `npm run dev:orchestrator` (after venv exists).

## Endpoints

- `GET /health`
- `POST /skills/dry-run` — `{ intent_code, input }`
- `POST /skills/execute` — allowlisted skills (e.g. `sales.estimate.read`)

## Docs

- [SAC-004 Orchestrator](../../docs/System_Design/Subsystem/SAC-004/README.md)  
- Legacy: [Epic-04](../../docs/System_Design/_legacy/Epic-04/README.md)  
