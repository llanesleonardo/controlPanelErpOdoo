# TaxonomyDocs

Controlled vocabulary so “do something in ERP” always maps to a known operation (e.g. `sales.order.create`).

## Domains

`sales`, `inventory`, `purchasing`, `accounting`, `customers`, `vendors`, `products`, `jobs`, `incidents`, `logs`

## Entity nouns (examples)

`sales_order`, `invoice`, `stock_move`, `stock_quant`, `partner`, `product_template`, `payment`, `purchase_order`

## Verbs

`create`, `read`, `update`, `cancel`, `approve`, `reconcile`, `allocate`, `reserve`, `close`, `adjust`, `post`

## Result states

`accepted`, `rejected`, `needs_approval`, `executed`, `failed`, `rolled_back`, `verified`

## Error classes

`validation_error`, `policy_violation`, `dependency_failure`, `odoo_rejection`, `timeout`, `data_conflict`

## Intent code shape

`{domain}.{entity}.{verb}` — e.g. `inventory.stock.adjust`, `accounting.invoice.post`

## Approval levels (sketch)

| Level | Typical use |
|-------|-------------|
| none | Safe reads / dry-run |
| operator | Low-risk writes under threshold |
| manager | Above quantity/dollar threshold |
| admin | Policy / connector / skill registry changes |

See [vocabulary.md](./vocabulary.md) for a slightly expanded dictionary.
