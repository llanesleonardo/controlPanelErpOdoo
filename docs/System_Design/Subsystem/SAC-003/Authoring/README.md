# Authoring — taxonomy & contracts

Canonical **docs** for the shared vocabulary and sample action contracts. Builders edit here; packages copy from here.

| Folder | Role |
|--------|------|
| [ContractsDocs/](./ContractsDocs/) | Intent / Task / Skill / Audit sample YAML |
| [TaxonomyDocs/](./TaxonomyDocs/) | Domains, verbs, intent-code shape, vocabulary |

After editing ContractsDocs YAML:

```bash
npm run contracts:sync -w @control-panel-ontology/contracts
```

Parent: [SAC-003](../README.md) · Package: [`resources/packages/contracts`](../../../../../resources/packages/contracts/)
