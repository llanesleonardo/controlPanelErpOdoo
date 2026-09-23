# Gap 03 — Customer-authored ontology

**Status:** deferred by design (v1 product-owned Language)

A UI/SDK where **each customer** invents their own objects, links, and actions (self-serve ontology or marketplace) — similar to a customer-extensible OSDK / ontology builder.

## What we have

- **Product-owned** entity YAML in `packages/ontology` (we ship and certify the catalog)
- Customers configure **connectors** and enable **skills** — they do not author entity types
- `/ontology` is a read-only browser/graph of the Language we ship
- First-party connector model: we absorb vendor quirks behind ACL ([connectors.md](../Development/connectors.md))

## What we don’t have

- Per-tenant ontology editor (create/edit/delete entity types in the UI)
- Customer-built ontology plugins or marketplace
- Tenant forks of the Language that diverge from the product catalog

## Why deferred

Customer-authored ontologies change **support, trust, and certification**. v1 keeps one curated business map so agents and skills stay allowlisted and auditable ([governed-execution](../Development/governed-execution.md)).

## Unblock later when

- Product needs tenant-specific extensions **with** certification gates, or
- A partner program ships approved ontology packs (still product-reviewed, not free-form)

## Related

- [ontology.md](../Development/ontology.md) (ownership + anti-goals)
- [ConnectorsDocs](../Components/ConnectorsDocs/README.md)
- [OntologyDocs](../Components/OntologyDocs/README.md)
