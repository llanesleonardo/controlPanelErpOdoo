# Intent catalog & profiles — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Operator flow

1. Open a section (e.g. Estimates).
2. Browse or search intents in the rail.
3. Select an intent — review **call path**, **execution profile**, objective/description, and output table.
4. Treat `diagnostic` / `NL compose` badges as roadmap until those skills are allowlisted.

## Guardrails

- Do not invent intent codes in the UI; extend `section-intents.ts` (and later contracts) deliberately.
- Profile classification must remain rule-based for auditability.
