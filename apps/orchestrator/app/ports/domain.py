from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Protocol


@dataclass
class PredictedEffect:
    kind: str
    summary: str
    details: dict[str, Any] = field(default_factory=dict)


@dataclass
class DomainEvidence:
    predicted_effects: list[PredictedEffect]
    warnings: list[str]
    mode: str = "dry_run"
    skill_id: str = ""
    adapter: dict[str, Any] | None = None


@dataclass
class StockAdjustPreview:
    product_ref: str | None
    quantity_delta: float | None
    location_ref: str | None
    input: dict[str, Any]


@dataclass
class InvoicePostPreview:
    invoice_ref: str | None
    input: dict[str, Any]


class InventoryPort(Protocol):
    def preview_stock_adjust(self, payload: StockAdjustPreview) -> DomainEvidence: ...


class AccountingPort(Protocol):
    def preview_invoice_post(self, payload: InvoicePostPreview) -> DomainEvidence: ...
