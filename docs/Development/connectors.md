# First-party connectors

## Thesis

The control plane connects **everywhere we choose to support**, through a **product-owned connector catalog**. Odoo is the first connector. We develop and ship connectors **one by one**. Customers configure and use them; they do **not** standardize payloads, modules, or connection methods.

Ontology Language ([ontology.md](./ontology.md)) sits **above** connectors: business entity types and actions. Connector **bindings** map those types to vendor fields. Object Explorer live reads go through allowlisted skills on a connector — not through a mirrored ontology DB.

## Ownership

| Actor | Responsibility |
|-------|----------------|
| Product / platform | Connector SPI, capability matrix, intent→port mapping, allowlist, evidence envelope, Ontology Language |
| Connector owner (us) | Auth, vendor API, field/module maps, health, schema sync, simulate mode, ontology bindings |
| Customer | Credentials, which connectors to enable, which skills to allow for their tenant |

No customer-built adapters in v1. Support and trust require curated connectors only.

## SPI (stable surface)

Every connector must implement (directly or via domain adapters):

1. **Identity** — `connector_id` (e.g. `odoo`), display name, version  
2. **Config + secrets** — typed settings; secrets write-only; env fallback allowed  
3. **Health** — `ok | degraded | down` with last check  
4. **Modes** — `live | simulate` (and dry-run for writes via skill path)  
5. **Capabilities** — declared skill codes this connector can execute  
6. **ACL** — vendor models/payloads never leak above the adapter  
7. **Evidence** — structured result + optional artifact under `STORAGE_ROOT`  
8. **Error mapping** — vendor faults → control-plane error classes  
9. **Ontology binding (when applicable)** — `packages/ontology/bindings/<connector_id>/*.yaml`  

Patterns: [Anti-Corruption Layer](../Software%20Patterns%20Docs/Distributed_system_patterns/15-anti-corruption-layer.md), [Adapter](../Software%20Patterns%20Docs/Structural%20Patterns/Adapter.md), [Hexagonal Architecture](../Software%20Patterns%20Docs/Architectural%20Patterns/05-hexagonal-architecture.md), [Health Checks](../Software%20Patterns%20Docs/DevOps_Delivery_patterns/09-health-checks.md).

## Ship order

1. **Odoo** — live today (`sales.estimate.read`); prove SPI against real SoR; Estimate binding + Explorer live path  
2. **Next connector** — only when there is a concrete buyer/workflow; may be a thin second adapter (even mock) that proves the registry before a large ERP  
3. **Further connectors** — one at a time; expand capability matrix, do not fork the control plane  

## Capability matrix (concept)

UI and allowlist only offer skills the tenant’s **enabled connectors** declare. Ontology **actions** reference the same skill codes. Explorer calls live skill only when on the execute allowlist.

| Skill | `odoo` | Ontology action | Explorer |
|-------|--------|-----------------|----------|
| `sales.estimate.read` | yes | Estimate → read | live |
| Other `*.read` in Language | taxonomy only | declared | demo stub until allowlisted |
| estimate-issues (Epic-06) | planned | Estimate → find_issues | — |

## What differs per connector (intentionally)

- Connection method (JSON-RPC, REST, GraphQL, file drop, …)  
- Payload and pagination shapes  
- Modules / objects / field names  
- Schema discovery (e.g. Odoo `fields_get` vs another catalog API)  
- Binding YAML field maps for ontology entity types  

All of that stays **inside** the connector package/adapters. Control panel, gateway contracts, taxonomy, and Ontology Language stay connector-agnostic.

## Related

- [architecture-overview](./architecture-overview.md)  
- [ontology](./ontology.md) — business objects above connectors  
- [Components/ConnectorsDocs](../Components/ConnectorsDocs/README.md)  
- [OdooIntegrationDocs](../Components/OdooIntegrationDocs/README.md) (connector #1)  
- [Epic-06](./Epic-06/README.md)  
- [Epic-07](./Epic-07/README.md)  
