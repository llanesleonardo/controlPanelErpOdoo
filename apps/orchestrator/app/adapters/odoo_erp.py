from __future__ import annotations

import os
from typing import Any

import httpx

from app.ports.domain import (
    AccountingPort,
    DomainEvidence,
    EstimatePort,
    EstimateReadQuery,
    EstimateReadResult,
    EstimateRecord,
    InventoryPort,
    InvoicePostPreview,
    PredictedEffect,
    StockAdjustPreview,
)


def erp_mode() -> str:
    mode = (
        os.environ.get("ERP_MODE") or os.environ.get("ODOO_MODE") or "simulate"
    ).lower()
    return "live" if mode == "live" else "simulate"


def odoo_settings() -> dict[str, str]:
    return {
        "url": os.environ.get("ODOO_URL", "").rstrip("/"),
        "db": os.environ.get("ODOO_DB", ""),
        "username": os.environ.get("ODOO_USERNAME", ""),
        "secret": os.environ.get("ODOO_API_KEY")
        or os.environ.get("ODOO_PASSWORD")
        or "",
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


def _json_rpc(
    service: str,
    method: str,
    args: list[Any],
    attempts: int = 2,
    timeout: float = 20.0,
) -> Any:
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
            with httpx.Client(timeout=timeout) as client:
                res = client.post(endpoint, json=payload)
                res.raise_for_status()
                body = res.json()
            if body.get("error"):
                err = body["error"]
                msg = err.get("message", "JSON-RPC error")
                data = err.get("data") or {}
                detail = data.get("message") or data.get("name") or ""
                raise RuntimeError(f"{msg}: {detail}".strip(": "))
            _breaker.success()
            return body.get("result")
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            _breaker.fail()
            if i < attempts - 1:
                import time

                time.sleep(0.2 * (i + 1))
    raise last_err or RuntimeError("JSON-RPC failed")


def _authenticate() -> int:
    settings = odoo_settings()
    if not settings["username"] or not settings["secret"] or not settings["db"]:
        raise RuntimeError("ODOO_DB / ODOO_USERNAME / credentials incomplete")
    uid = _json_rpc(
        "common",
        "authenticate",
        [settings["db"], settings["username"], settings["secret"], {}],
    )
    if not uid:
        raise RuntimeError("Odoo authentication failed")
    return int(uid)


def _execute_kw(
    uid: int,
    model: str,
    method: str,
    args: list[Any],
    kwargs: dict[str, Any] | None = None,
) -> Any:
    settings = odoo_settings()
    return _json_rpc(
        "object",
        "execute_kw",
        [
            settings["db"],
            uid,
            settings["secret"],
            model,
            method,
            args,
            kwargs or {},
        ],
        timeout=30.0,
    )


def _m2o_name(value: Any) -> str:
    if isinstance(value, (list, tuple)) and len(value) >= 2:
        return str(value[1] or "")
    if value in (False, None):
        return ""
    return str(value)


def _float_or_none(value: Any) -> float | None:
    if value in (None, False, ""):
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


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
                warnings.append(
                    "Credentials incomplete — preview limited to reachability"
                )
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
                        details={
                            "invoice_ref": payload.invoice_ref,
                            "from_state": "draft",
                            "to_state": "posted",
                        },
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


class OdooEstimateAdapter(EstimatePort):
    """ACL: domain estimate read ↔ customer.estimate.search_read (SCT module)."""

    MODEL = "customer.estimate"
    FIELDS = [
        "id",
        "name",
        "part_description",
        "partner_id",
        "revision",
        "total_unit_cost",
        "pricing_method",
        "active",
        "created_at",
        "modified_at",
        "product_id_for_estimate_draft",
    ]

    def read_estimates(self, query: EstimateReadQuery) -> EstimateReadResult:
        mode = erp_mode()
        skill_id = "sales.estimate.read"

        if mode == "simulate":
            demo = [
                EstimateRecord(
                    id="SIM-1001",
                    part_no="EST-DEMO-A",
                    description="Simulated estimate A",
                    partner_name="Demo Customer",
                    revision="A",
                    total_unit_cost=12.5,
                    pricing_method="Billing Rate",
                    active=True,
                    created_at="2026-07-22 10:00:00",
                    modified_at="2026-07-22 10:00:00",
                    linked_product="",
                ),
                EstimateRecord(
                    id="SIM-1002",
                    part_no="MOD-TRI-ANGLE-DRILL",
                    description="Simulated modify shank drill",
                    partner_name="Demo Customer",
                    revision="B",
                    total_unit_cost=1.0,
                    pricing_method="Billing Rate",
                    active=True,
                    created_at="2026-07-22 10:00:00",
                    modified_at="2026-07-22 10:00:00",
                    linked_product="",
                ),
            ]
            needle = (query.contains or query.part_no or "").strip().lower()
            if needle:
                demo = [
                    r
                    for r in demo
                    if needle in r.part_no.lower() or needle in r.description.lower()
                ]
            return EstimateReadResult(
                records=demo,
                warnings=["Simulated estimates — set ODOO_MODE=live for ERP data"],
                mode="simulate",
                skill_id=skill_id,
                adapter={"provider": "odoo", "mode": "simulate", "model": self.MODEL},
                total_hint=len(demo),
            )

        domain: list[Any] = []
        if query.active_only:
            domain.append(("active", "=", True))
        # Contains rule (read only): part no OR description
        contains = (query.contains or query.part_no or "").strip()
        if contains:
            domain.extend(
                [
                    "|",
                    ("name", "ilike", contains),
                    ("part_description", "ilike", contains),
                ]
            )
        if query.partner_ref:
            domain.append(("partner_id.name", "ilike", query.partner_ref))

        limit = max(1, min(query.limit or 50, 100))
        offset = max(0, query.offset or 0)

        try:
            uid = _authenticate()
            rows = _execute_kw(
                uid,
                self.MODEL,
                "search_read",
                [domain],
                {
                    "fields": self.FIELDS,
                    "limit": limit,
                    "offset": offset,
                    "order": "id desc",
                },
            )
            if not isinstance(rows, list):
                raise RuntimeError("Unexpected search_read payload")

            records = [
                EstimateRecord(
                    id=str(row.get("id")),
                    part_no=str(row.get("name") or ""),
                    description=str(row.get("part_description") or ""),
                    partner_name=_m2o_name(row.get("partner_id")),
                    revision=str(row.get("revision") or ""),
                    total_unit_cost=_float_or_none(row.get("total_unit_cost")),
                    pricing_method=str(row.get("pricing_method") or ""),
                    active=bool(row.get("active")),
                    created_at=str(row.get("created_at") or ""),
                    modified_at=str(row.get("modified_at") or ""),
                    linked_product=_m2o_name(
                        row.get("product_id_for_estimate_draft")
                    ),
                )
                for row in rows
            ]
            return EstimateReadResult(
                records=records,
                warnings=[],
                mode="live",
                skill_id=skill_id,
                adapter={
                    "provider": "odoo",
                    "mode": "live",
                    "model": self.MODEL,
                    "method": "search_read",
                },
                total_hint=len(records),
            )
        except Exception as exc:  # noqa: BLE001
            return EstimateReadResult(
                records=[],
                warnings=[f"Estimate read failed: {exc}"],
                mode="live",
                skill_id=skill_id,
                adapter={"provider": "odoo", "mode": "live", "model": self.MODEL},
                total_hint=0,
            )
