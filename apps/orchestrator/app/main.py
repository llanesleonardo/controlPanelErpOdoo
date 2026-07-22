from __future__ import annotations

from typing import Any

from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

from app.facade import SkillExecutionFacade
from app.storage import ensure_storage, storage_writable

app = FastAPI(title="ControlPanelERP Orchestrator", version="0.0.1")
facade = SkillExecutionFacade()


class DryRunRequest(BaseModel):
    intent_code: str
    input: dict[str, Any] = Field(default_factory=dict)
    correlation_id: str | None = None
    actor_id: str | None = None


@app.on_event("startup")
def _startup() -> None:
    ensure_storage()


@app.get("/health")
def health() -> dict[str, Any]:
    ok = storage_writable()
    return {
        "status": "ok" if ok else "degraded",
        "service": "orchestrator",
        "checks": {"storage": ok},
    }


@app.post("/skills/dry-run")
def dry_run(
    body: DryRunRequest,
    x_correlation_id: str | None = Header(default=None, alias="X-Correlation-Id"),
    x_actor_id: str | None = Header(default=None, alias="X-Actor-Id"),
) -> dict[str, Any]:
    correlation_id = body.correlation_id or x_correlation_id or "unknown"
    actor_id = body.actor_id or x_actor_id or "dev-operator"
    result = facade.dry_run(
        intent_code=body.intent_code.strip(),
        input_payload=body.input or {},
        correlation_id=correlation_id,
        actor_id=actor_id,
    )
    if not result.get("ok"):
        raise HTTPException(status_code=400, detail=result)
    return result
