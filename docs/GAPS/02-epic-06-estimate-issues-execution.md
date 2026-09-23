# Gap 02 — Epic-06 estimate-issues execution

**Status:** docs drafted; **runtime not implemented**

The Ontology catalogs an Estimate action `find_issues` → skill `sales.estimate.find_issues`. Epic-06 specifies find → persist → list/dismiss. That path is not running in apps yet.

## What we have

- Epic-06 task packs: find/persist + UI dismiss ([Epic-06](../Development/Epic-06/README.md))
- Skill name on Estimate in `packages/ontology` (`sales.estimate.find_issues` in contracts taxonomy)
- Live read already works: `sales.estimate.read` (Epic-05)
- Control-plane patterns for issues table / soft dismiss (designed, not coded)

## What we don’t have

- Orchestrator/gateway code that **scans** estimates and emits issue rows
- Postgres **EstimateIssue** (or equivalent) persistence + upsert-by-signature
- Next.js UI to **list / dismiss** issues and trigger find
- Execute allowlist entry and end-to-end evidence for `sales.estimate.find_issues`

## Why it matters

This is the first **outcome wedge** on the Odoo connector (estimate hygiene). Ontology Language alone does not deliver operator value until this skill executes.

## Unblock by

Implementing Epic-06 phase-01 tasks 02–03 (and connector SPI task 01 as needed), then wiring the Ontology action to the live allowlist.

## Related

- [Epic-06](../Development/Epic-06/README.md)
- [Epic-06 system-design](../Development/Epic-06/system-design.md)
- [ontology Estimate actions](../Development/Epic-07/system-design.md)
