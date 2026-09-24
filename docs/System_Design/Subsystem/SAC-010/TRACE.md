# SAC-010 — Traceability

Tracks **SRD → verification** for CI, lint, and release evidence.

| SRD | Scenario / method | Artifact | Status | Role |
|-----|-------------------|----------|--------|------|
| SRD-CI-001 · SRD-CI-002 | Inspection + Demo | [`.github/workflows/lint.yml`](../../../../.github/workflows/lint.yml) · `npm run lint` | Current | Primary |
| SRD-CI-003 · SRD-CI-004 | Demonstration | `npm run test:contracts` · `npm run test:ontology` | Current (local) | Primary |
| SRD-CI-005 … 007 | Planned | Future workflow / release checklist | Planned | Supporting |
| Cross-cut | [E-01](../Scenarios/E-01.md) | [TP-E-01](../../TestPlans/E-01/TP-E-01.md) | Not run | Supporting (docs alignment) |

No dedicated OPS scenario owns “press the CI button”; Lint on PR is the standing gate. Expand this table when package smokes move into Actions.

Index: [../SCENARIOS.md](../SCENARIOS.md)
