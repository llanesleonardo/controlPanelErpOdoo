# Ontology catalog API + UI — SRD

**Status:** implemented  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Expose read-only ontology catalog on NestJS and a thin Next.js browser at `/ontology`.

## Requirements

### SRD-E07-T03-01

**List** — `GET /ontology` shall return entity types (id, label, action summaries) without connector bindings.

### SRD-E07-T03-02

**Detail** — `GET /ontology/entity-types/:id` shall return properties, links, and actions for one entity type.

### SRD-E07-T03-03

**UI** — `/ontology` shall list entity types and actions; no Odoo model names.

### SRD-E07-T03-04

**Non-replace** — Ontology browser shall not replace ERP Map; nav link only.
