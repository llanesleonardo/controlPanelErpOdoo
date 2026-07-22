from __future__ import annotations

import os
from typing import Any

import httpx

from app.ports.domain import (
    AccountingPort,
    DomainEvidence,
    InventoryPort,
    InvoicePostPreview,
    PredictedEffect,
    StockAdjustPreview,
)


def erp_mode() -> str:
    mode = (os.environ.get("ERP_MODE") or os.environ.get("ODOO_MODE") or "simulate").lower()
    return "live" if mode == "live" else "simulate"


def odoo_settings() -> dict[str, str]:
    return {
        "url": os.environ.get("ODOO_URL", "").rstrip("/"),
        "db": os.environ.get("ODOO_DB", ""),
        "username": os.environ.get("ODOO_USERNAME", ""),
        "secret": os.environ.get("ODOO_API_KEY") or os.environ.get("ODOO_PASSWORD") or "",
    }


class _CircuitBreaker:
    def __init__(self, threshold: int = 3, cool_ms: int = 30_000) -> None:
        self.threshold = threshold
        self.cool_ms = cool_ms
        self.failures = 0
        self.opened_at = 0.0

    @property
    def open(self) -> bool:
        import time

        if self.failures < self.threshold:
            return False
        if (time.time() * 1000) - self.opened_at > self.cool_ms:
            self.failures = 0
            return False
        return True

    def success(self) -> None:
        self.failures = 0

    def fail(self) -> None:
        import time

        self.failures += 1
        if self.failures >= self.threshold:
            self.opened_at = time.time() * 1000


_breaker = _CircuitBreaker()


def _json_rpc(service: str, method: str, args: list[Any], attempts: int = 2) -> Any:
    settings = odoo_settings()
    if not settings["url"]:
        raise RuntimeError("ODOO_URL not configured")
    if _breaker.open:
        raise RuntimeError("ERP circuit open")

    endpoint = f"{settings['url']}/jsonrpc"
    last_err: Exception | None = None
    for i in range(attempts):
        try:
            payload = {
                "jsonrpc": "2.0",
                "method": "call",
                "params": {"service": service, "method": method, "args": args},
                "id": 1,
            }
            with httpx.Client(timeout=8.0) as client:
                res = client.post(endpoint, json=payload)
                res.raise_for_status()
                body = res.json()
            if body.get("error"):
                raise RuntimeError(body["error"].get("message", "JSON-RPC error"))
            _breaker.success()
            return body.get("result")
        except Exception as exc:  # noqa: BLE001 — map to domain warnings
            last_err = exc
            _breaker.fail()
            if i < attempts - 1:
                import time

                time.sleep(0.2 * (i + 1))
    raise last_err or RuntimeError("JSON-RPC failed")


class OdooInventoryAdapter(InventoryPort):
    """ACL: domain stock preview ↔ Odoo reads (no writes)."""

    def preview_stock_adjust(self, payload: StockAdjustPreview) -> DomainEvidence:
        mode = erp_mode()
        if mode == "simulate":
            return DomainEvidence(
                predicted_effects=[
                    PredictedEffect(
                        kind="stock_quantity_change",
                        summary=(
                            f"Would adjust stock for {payload.product_ref or 'product'} "
                            f"by {payload.quantity_delta if payload.quantity_delta is not None else '?'}"
                        ),
                        details={
                            "product_ref": payload.product_ref,
                            "quantity_delta": payload.quantity_delta,
                            "location_ref": payload.location_ref,
                        },
                    )
                ],
                warnings=["Simulated evidence — ERP not contacted"],
                skill_id="inventory.stock.adjust.simulate",
                adapter={"provider": "odoo", "mode": "simulate"},
            )

        warnings: list[str] = []
        details: dict[str, Any] = {
            "product_ref": payload.product_ref,
            "quantity_delta": payload.quantity_delta,
            "location_ref": payload.location_ref,
        }
        try:
            settings = odoo_settings()
            version = _json_rpc("common", "version", [])
            details["erp_reachable"] = True
            details["erp_version_hint"] = (
                version.get("server_version") if isinstance(version, dict) else True
            )
            if settings["username"] and settings["secret"]:
                uid = _json_rpc(
                    "common",
                    "authenticate",
                    [settings["db"], settings["username"], settings["secret"], {}],
                )
                details["authenticated"] = bool(uid)
            else:
                warnings.append("Credentials incomplete — preview limited to reachability")
        except Exception as exc:  # noqa: BLE001
            warnings.append(f"ERP read limited: {exc}")
            details["erp_reachable"] = False

        return DomainEvidence(
            predicted_effects=[
                PredictedEffect(
                    kind="stock_quantity_change",
                    summary=(
                        f"Would adjust stock for {payload.product_ref or 'product'} "
                        f"by {payload.quantity_delta if payload.quantity_delta is not None else '?'}"
                    ),
                    details=details,
                )
            ],
            warnings=warnings or ["Dry-run only — no stock write performed"],
            skill_id="inventory.stock.adjust.simulate",
            adapter={"provider": "odoo", "mode": "live"},
        )


class OdooAccountingAdapter(AccountingPort):
    """ACL: domain invoice post preview ↔ Odoo reads (no action_post)."""

    def preview_invoice_post(self, payload: InvoicePostPreview) -> DomainEvidence:
        mode = erp_mode()
        if mode == "simulate":
            return DomainEvidence(
                predicted_effects=[
                    PredictedEffect(
                        kind="invoice_state_change",
                        summary=f"Would post invoice {payload.invoice_ref or '(unspecified)'}",
                        details={"invoice_ref": payload.invoice_ref, "from_state": "draft", "to_state": "posted"},
                    )
                ],
                warnings=["Simulated evidence — ERP not contacted"],
                skill_id="accounting.invoice.post.simulate",
                adapter={"provider": "odoo", "mode": "simulate"},
            )

        warnings: list[str] = ["Dry-run only — invoice will not be posted"]
        details: dict[str, Any] = {"invoice_ref": payload.invoice_ref}
        try:
            version = _json_rpc("common", "version", [])
            details["erp_reachable"] = True
            details["erp_version_hint"] = (
                version.get("server_version") if isinstance(version, dict) else True
            )
        except Exception as exc:  # noqa: BLE001
            warnings.append(f"ERP read limited: {exc}")
            details["erp_reachable"] = False

        return DomainEvidence(
            predicted_effects=[
                PredictedEffect(
                    kind="invoice_state_change",
                    summary=f"Would post invoice {payload.invoice_ref or '(unspecified)'}",
                    details=details,
                )
            ],
            warnings=warnings,
            skill_id="accounting.invoice.post.simulate",
            adapter={"provider": "odoo", "mode": "live"},
        )
