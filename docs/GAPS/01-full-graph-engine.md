# Gap 01 — Full graph engine

**Status:** deferred by design (not a bug)

Palantir-style **Ontology Engine**: a live store of **instances** (e.g. Estimate `#123` linked to Customer `#45`), sync/CDC from systems of record, queryable digital twin, subscriptions, and writeback orchestration at instance scale.

See [Palantir Ontology system](https://www.palantir.com/docs/foundry/architecture-center/ontology-system/) (Language · Engine · Toolchain) and [Fabric IQ Ontology](https://learn.microsoft.com/en-us/fabric/iq/ontology/overview) (bindings + instance graph).

## What we have

- **Ontology Language only** — YAML entity types, properties, links, actions in `packages/ontology`
- **React Flow diagram of types** — `/ontology` shows concepts (Estimate ↔ Customer), not live rows
- Read-only catalog API: `GET /ontology`, `GET /ontology/entity-types/:id`
- SoRs (e.g. Odoo) remain authoritative; control-plane Postgres is not a mirrored twin

## What we don’t have

- Database of live ontology **instances** mirrored from Odoo (or other connectors)
- Path / graph queries over instance links
- Real-time subscriptions / CDC into the ontology
- Writeback orchestration at ontology-instance scale (beyond allowlisted skills)

## Why deferred

v1 proves Language + governed skills + first-party connectors. A full Engine is a multi-epic platform investment; ship product wedges (e.g. estimate issues) before mirroring the enterprise.

## Unblock later when

- Multi-connector reasoning needs a shared instance graph, or
- Customers need path queries / digital-twin UX beyond type diagrams

## Related

- [ontology.md](../Development/ontology.md) (anti-goals)
- [Epic-07](../Development/Epic-07/README.md)
