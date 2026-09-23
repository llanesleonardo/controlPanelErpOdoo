# Governance and ownership

| Role | Owns |
|------|------|
| Business ops | Domain vocabulary and workflows |
| Product / platform | Ontology Language (entity types, links, actions), curated process/Vertex views, skill certification |
| Connector owner (product) | First-party connector SPI, vendor mappings, schema sync, health, ontology bindings |
| ERP / SoR owner (customer) | Data rules and credentials for systems they operate |
| OpenClaw platform | Skills, prompts, orchestration behavior |
| Security | Access control, secrets, audit, SoD |
| Support | Incident review and runbook quality |

Customers do **not** own or extend the connector SPI or Ontology Language in v1. New systems and entity types appear only when the product team ships and certifies them. Schema Manager / Explorer / Vertex are **product surfaces** over that Language — not customer editors ([Gap 03](../GAPS/03-customer-authored-ontology.md)).

## Skill certification gates (before production)

1. Contract validation  
2. Sandbox testing  
3. Approval workflow review  
4. Connector capability declared and allowlisted  
5. Ontology action (if any) points at the certified skill code  

No skill ships without passing these gates. Object Explorer live reads use the same allowlist as `POST /skills/execute`.

## Related

- [ontology](./ontology.md)  
- [governed-execution](./governed-execution.md)  
- [connectors](./connectors.md)  
- [reliability-rules](./reliability-rules.md)  
