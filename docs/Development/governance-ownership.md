# Governance and ownership

| Role | Owns |
|------|------|
| Business ops | Domain vocabulary and workflows |
| Connector owner (product) | First-party connector SPI, vendor mappings, schema sync, health |
| ERP / SoR owner (customer) | Data rules and credentials for systems they operate |
| OpenClaw platform | Skills, prompts, orchestration behavior |
| Security | Access control, secrets, audit, SoD |
| Support | Incident review and runbook quality |

Customers do **not** own or extend the connector SPI. New systems appear only when the product team ships and certifies a connector.

## Skill certification gates (before production)

1. Contract validation  
2. Sandbox testing  
3. Approval workflow review  
4. Connector capability declared and allowlisted  

No skill ships without passing these gates.
