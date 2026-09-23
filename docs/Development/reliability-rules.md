# Reliability rules

- No direct free-form writes to any external system of record.
- **No free-form NL execution** — natural language may classify/route to a taxonomy intent; it must not invent tools, models, or payloads ([governed-execution](./governed-execution.md)).
- Every task mapped to one taxonomy code.
- One skill selected from an allowlist (not dynamically invented by an LLM).
- Skills execute only through **product-owned connectors** that declare the capability.
- **Ontology actions** bind to taxonomy skills — they do not bypass the allowlist.
- Object Explorer live reads use the same execute allowlist; non-allowlisted types may show **demo** rows only (not SoR writes).
- Every write supports dry-run first.
- Every write returns structured evidence.
- Every failure creates an incident record.
- Repeated incidents update a reusable runbook (recommendation only).
- Production changes require role-based approval by threshold.
- Vendor payloads and module names stay inside the connector ACL — they must not leak into UI contracts.
- OpenClaw (and any agent) is a **gateway client**, same as Next.js — agents do not hold SoR credentials.
- Ontology Language is product-owned YAML — customer browsers do not invent entity types ([Gap 03](../GAPS/03-customer-authored-ontology.md)).

Skills call only registered APIs with typed contracts, explicit permissions, and policy guards.
