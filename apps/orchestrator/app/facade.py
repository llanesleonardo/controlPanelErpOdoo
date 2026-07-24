from __future__ import annotations

from dataclasses import asdict
from typing import Any

from app.adapters.odoo_erp import (
    OdooAccountingAdapter,
    OdooEstimateAdapter,
    OdooInventoryAdapter,
)
from app.ports.domain import (
    AccountingPort,
    DomainEvidence,
    EstimatePort,
    EstimateReadQuery,
    InventoryPort,
    InvoicePostPreview,
    StockAdjustPreview,
)
from app.storage import write_evidence_json


ALLOWLIST = {
    "inventory.stock.adjust": "inventory.stock.adjust.simulate",
    "accounting.invoice.post": "accounting.invoice.post.simulate",
}

# Live (or simulate) execute skills — currently read-only estimate list
EXECUTE_ALLOWLIST = {
    "sales.estimate.read": "sales.estimate.read",
}


class SkillExecutionFacade:
    """Domain facade: intent → allowlisted skill → port (no vendor types)."""

    def __init__(
        self,
        inventory: InventoryPort | None = None,
        accounting: AccountingPort | None = None,
        estimates: EstimatePort | None = None,
    ) -> None:
        self.inventory = inventory or OdooInventoryAdapter()
        self.accounting = accounting or OdooAccountingAdapter()
        self.estimates = estimates or OdooEstimateAdapter()

    def dry_run(
        self,
        *,
        intent_code: str,
        input_payload: dict[str, Any],
        correlation_id: str,
        actor_id: str,
    ) -> dict[str, Any]:
        if intent_code not in ALLOWLIST:
            return {
                "ok": False,
                "error_class": "validation_error",
                "message": f"Intent not allowlisted for dry-run: {intent_code}",
                "intent_code": intent_code,
            }

        skill_id = ALLOWLIST[intent_code]
        evidence: DomainEvidence

        if intent_code == "inventory.stock.adjust":
            evidence = self.inventory.preview_stock_adjust(
                StockAdjustPreview(
                    product_ref=_str(
                        input_payload.get("product_ref") or input_payload.get("product_id")
                    ),
                    quantity_delta=_float(
                        input_payload.get("quantity_delta") or input_payload.get("qty")
                    ),
                    location_ref=_str(
                        input_payload.get("location_ref") or input_payload.get("location_id")
                    ),
                    input=input_payload,
                )
            )
        elif intent_code == "accounting.invoice.post":
            evidence = self.accounting.preview_invoice_post(
                InvoicePostPreview(
                    invoice_ref=_str(
                        input_payload.get("invoice_ref") or input_payload.get("invoice_id")
                    ),
                    input=input_payload,
                )
            )
        else:
            return {
                "ok": False,
                "error_class": "validation_error",
                "message": f"No skill handler for {intent_code}",
            }

        evidence.skill_id = skill_id
        body = {
            "ok": True,
            "intent_code": intent_code,
            "skill_id": skill_id,
            "correlation_id": correlation_id,
            "actor_id": actor_id,
            "predicted_effects": [asdict(e) for e in evidence.predicted_effects],
            "warnings": evidence.warnings,
            "mode": evidence.mode,
            "adapter": evidence.adapter,
        }

        try:
            path = write_evidence_json(correlation_id, f"{skill_id}.json", body)
            body["evidence_path"] = path
        except Exception as exc:  # noqa: BLE001
            body.setdefault("warnings", []).append(f"Evidence file not written: {exc}")

        return body

    def execute(
        self,
        *,
        intent_code: str,
        input_payload: dict[str, Any],
        correlation_id: str,
        actor_id: str,
    ) -> dict[str, Any]:
        if intent_code not in EXECUTE_ALLOWLIST:
            return {
                "ok": False,
                "error_class": "validation_error",
                "message": f"Intent not allowlisted for execute: {intent_code}",
                "intent_code": intent_code,
            }

        skill_id = EXECUTE_ALLOWLIST[intent_code]

        if intent_code == "sales.estimate.read":
            result = self.estimates.read_estimates(
                EstimateReadQuery(
                    limit=int(input_payload.get("limit") or 50),
                    offset=int(input_payload.get("offset") or 0),
                    active_only=bool(input_payload.get("active_only", True)),
                    partner_ref=_str(input_payload.get("partner_ref")),
                    part_no=_str(input_payload.get("part_no")),
                    contains=_str(
                        input_payload.get("contains")
                        or input_payload.get("q")
                        or input_payload.get("search")
                    ),
                    input=input_payload,
                )
            )
            rows = [asdict(r) for r in result.records]
            body: dict[str, Any] = {
                "ok": len(result.warnings) == 0 or len(rows) > 0,
                "intent_code": intent_code,
                "skill_id": skill_id,
                "correlation_id": correlation_id,
                "actor_id": actor_id,
                "mode": result.mode,
                "adapter": result.adapter,
                "warnings": result.warnings,
                "columns": [
                    {"key": "id", "label": "ID"},
                    {"key": "part_no", "label": "Part No"},
                    {"key": "description", "label": "Description"},
                    {"key": "partner_name", "label": "Customer"},
                    {"key": "revision", "label": "Revision"},
                    {"key": "total_unit_cost", "label": "Unit cost"},
                    {"key": "pricing_method", "label": "Pricing"},
                    {"key": "active", "label": "Active"},
                    {"key": "modified_at", "label": "Modified"},
                    {"key": "linked_product", "label": "Product"},
                ],
                "rows": rows,
                "total_hint": result.total_hint,
            }
            if result.warnings and not rows:
                body["ok"] = False
                body["error_class"] = "dependency_failure"
                body["message"] = result.warnings[0]
            try:
                path = write_evidence_json(
                    correlation_id, f"{skill_id}.json", body
                )
                body["evidence_path"] = path
            except Exception as exc:  # noqa: BLE001
                body.setdefault("warnings", []).append(
                    f"Evidence file not written: {exc}"
                )
            return body

        return {
            "ok": False,
            "error_class": "validation_error",
            "message": f"No execute handler for {intent_code}",
        }


def _str(value: Any) -> str | None:
    if value is None:
        return None
    return str(value)


def _float(value: Any) -> float | None:
    if value is None or value == "":
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None
