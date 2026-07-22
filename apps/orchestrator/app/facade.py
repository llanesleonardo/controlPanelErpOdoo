from __future__ import annotations

from dataclasses import asdict
from typing import Any

from app.adapters.odoo_erp import OdooAccountingAdapter, OdooInventoryAdapter
from app.ports.domain import (
    AccountingPort,
    DomainEvidence,
    InventoryPort,
    InvoicePostPreview,
    StockAdjustPreview,
)
from app.storage import write_evidence_json


ALLOWLIST = {
    "inventory.stock.adjust": "inventory.stock.adjust.simulate",
    "accounting.invoice.post": "accounting.invoice.post.simulate",
}


class SkillExecutionFacade:
    """Domain facade: intent → allowlisted skill → port.preview (no vendor types)."""

    def __init__(
        self,
        inventory: InventoryPort | None = None,
        accounting: AccountingPort | None = None,
    ) -> None:
        self.inventory = inventory or OdooInventoryAdapter()
        self.accounting = accounting or OdooAccountingAdapter()

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
                    product_ref=_str(input_payload.get("product_ref") or input_payload.get("product_id")),
                    quantity_delta=_float(input_payload.get("quantity_delta") or input_payload.get("qty")),
                    location_ref=_str(input_payload.get("location_ref") or input_payload.get("location_id")),
                    input=input_payload,
                )
            )
        elif intent_code == "accounting.invoice.post":
            evidence = self.accounting.preview_invoice_post(
                InvoicePostPreview(
                    invoice_ref=_str(input_payload.get("invoice_ref") or input_payload.get("invoice_id")),
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
