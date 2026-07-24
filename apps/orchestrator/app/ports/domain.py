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


@dataclass
class EstimateReadQuery:
    """Domain query for listing estimates (ERP-agnostic)."""

    limit: int = 50
    offset: int = 0
    active_only: bool = True
    partner_ref: str | None = None
    part_no: str | None = None
    """Contains search across part no / description (ilike). Read skill only."""
    contains: str | None = None
    input: dict[str, Any] = field(default_factory=dict)


@dataclass
class EstimateRecord:
    id: str
    part_no: str
    description: str
    partner_name: str
    revision: str
    total_unit_cost: float | None
    pricing_method: str
    active: bool
    created_at: str
    modified_at: str
    linked_product: str


@dataclass
class EstimateReadResult:
    records: list[EstimateRecord]
    warnings: list[str]
    mode: str
    skill_id: str
    adapter: dict[str, Any] | None = None
    total_hint: int | None = None


class InventoryPort(Protocol):
    def preview_stock_adjust(self, payload: StockAdjustPreview) -> DomainEvidence: ...


class AccountingPort(Protocol):
    def preview_invoice_post(self, payload: InvoicePostPreview) -> DomainEvidence: ...


class EstimatePort(Protocol):
    def read_estimates(self, query: EstimateReadQuery) -> EstimateReadResult: ...
