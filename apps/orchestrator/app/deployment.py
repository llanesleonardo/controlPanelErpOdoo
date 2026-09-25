from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class DeploymentSettings:
    mode: str
    tenant_id: str
    profile: str


def load_deployment_settings() -> DeploymentSettings:
    raw = (os.environ.get("DEPLOYMENT_MODE") or "single_tenant").lower().replace("-", "_")
    mode = raw if raw in ("single_tenant", "multi_tenant") else "single_tenant"
    tenant_id = (os.environ.get("TENANT_ID") or "default").strip() or "default"
    profile = (os.environ.get("DEPLOYMENT_PROFILE") or "reference_carbide").strip() or "reference_carbide"
    return DeploymentSettings(mode=mode, tenant_id=tenant_id, profile=profile)


def resolve_tenant_id(header: str | None, settings: DeploymentSettings) -> str:
    if settings.mode == "multi_tenant":
        h = (header or "").strip()
        if h:
            return h
        return settings.tenant_id
    return settings.tenant_id


def deployment_settings_for_api(settings: DeploymentSettings) -> dict[str, str | None]:
    return {
        "mode": settings.mode,
        "tenant_id": settings.tenant_id,
        "profile": settings.profile,
        "tenant_header": "X-Tenant-Id" if settings.mode == "multi_tenant" else None,
    }
