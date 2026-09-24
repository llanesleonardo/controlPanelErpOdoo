# Ontology package Estimate — SRD

**Status:** implemented  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Ship `packages/ontology` with Estimate entity type, links, actions bound to skills, and Odoo binding YAML.

## Requirements

### SRD-E07-T02-01

**Package** — npm workspace `@control-panel-erp/ontology` shall load entity types from YAML.

### SRD-E07-T02-02

**Estimate** — Entity type `Estimate` shall declare properties, optional Customer link, and actions `read` → `sales.estimate.read` and `find_issues` → `sales.estimate.find_issues`.

### SRD-E07-T02-03

**Binding** — `bindings/odoo/estimate.yaml` shall map domain properties to vendor fields for ACL use only.

### SRD-E07-T02-04

**Smoke** — Test shall validate YAML shape and that action skills exist in contracts taxonomy.
