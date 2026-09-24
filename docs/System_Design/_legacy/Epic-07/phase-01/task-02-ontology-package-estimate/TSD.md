# Ontology package Estimate — TSD

**Status:** implemented  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Patterns

- [Domain Model](../../../../../Software%20Patterns%20Docs/Data_domain_patterns/14-domain-model.md)
- [Anti-Corruption Layer](../../../../../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md)

## Layout

```
packages/ontology/
  entity-types/estimate.yaml
  entity-types/customer.yaml
  bindings/odoo/estimate.yaml
  src/loadOntology.js
  src/index.js
  test/smoke.mjs
  package.json
```

## Notes

- `find_issues` is catalogued for Epic-06; execute allowlist may still exclude it until Epic-06 lands.
- Bindings must not be returned on public ontology catalog responses (ACL).
