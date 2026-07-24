# Reliability rules

- No direct free-form writes to any external system of record.
- **No free-form NL execution** — natural language may classify/route to a taxonomy intent; it must not invent tools, models, or payloads ([governed-execution](./governed-execution.md)).
- Every task mapped to one taxonomy code.
- One skill selected from an allowlist (not dynamically invented by an LLM).
- Skills execute only through **product-owned connectors** that declare the capability.
- Every write supports dry-run first.
- Every write returns structured evidence.
- Every failure creates an incident record.
- Repeated incidents update a reusable runbook (recommendation only).
- Production changes require role-based approval by threshold.
- Vendor payloads and module names stay inside the connector ACL — they must not leak into UI contracts.
- OpenClaw (and any agent) is a **gateway client**, same as Next.js — agents do not hold SoR credentials.

Skills call only registered APIs with typed contracts, explicit permissions, and policy guards.
