# SAC-010 — Software Requirements (SRD)

Rules for keeping the carbide-shop docs and packages from drifting — **say what the repo actually runs**, and label the rest as planned.

## Scope

- Markdown lint in CI and locally
- Package smoke tests for contracts and ontology (scripts today; CI wiring planned)
- Release evidence expectations (what to keep when you cut a version)

## Out of scope

- Hosting or releasing any peer edge (including the ERP itself)
- Claiming app build/test/deploy workflows that are not in `.github/workflows`
- Replacing human review for risky peer-edge features

## Requirements

### Current (enforced or scripted today)

#### SRD-CI-001 — Markdown lint locally

Developers SHALL be able to run `npm run lint` from the repo root. Lint SHALL cover User Guide, System Design, app/package/docker markdown, root README, and `.github` markdown as configured in `package.json`.

#### SRD-CI-002 — Markdown lint in CI

Pull requests and pushes to `main` / `master` SHALL run the GitHub Actions workflow **Lint** (`.github/workflows/lint.yml`), which installs dependencies and runs `npm run lint`.

#### SRD-CI-003 — Contracts smoke (script)

The contracts package SHALL expose a smoke/test entry runnable as `npm run test:contracts` (YAML/schema load checks). Failing smoke SHALL be treated as a merge blocker when that script is part of the release checklist — even before a dedicated CI job exists.

#### SRD-CI-004 — Ontology smoke (script)

The ontology package SHALL expose a smoke/test entry runnable as `npm run test:ontology`. Same checklist rule as SRD-CI-003.

### Planned (not in CI yet — do not claim otherwise)

#### SRD-CI-005 — Package smokes in CI

CI SHOULD gain jobs (or steps) that run `test:contracts` and `test:ontology` on PR — **planned**; not present in `.github/workflows` as of this writing.

#### SRD-CI-006 — App / gateway test CI

Automated unit or e2e CI for `apps/web`, `apps/gateway`, and orchestrator SHOULD be added later — **planned**; not present today.

#### SRD-CI-007 — Release evidence

A release (tag or version cut) SHALL be accompanied by evidence that is easy to point at:

| Evidence | Expectation |
|----------|-------------|
| Lint | Green Lint workflow (or recorded local `npm run lint`) |
| Package smokes | Recorded `test:contracts` + `test:ontology` results |
| Scenario spot-checks | Relevant OPS / E-01 reports under `docs/System_Design/TestPlans/` when claiming a capability |
| Secrets | No `.env` or credentials in the tag / artifact |

Automated “release” GitHub workflow is **planned**, not current.

## Trace

| ID | How verified |
|----|----------------|
| SRD-CI-001 … 002 | Inspection of workflow + Demonstration (`npm run lint`) · supports [E-01](../Scenarios/E-01.md) |
| SRD-CI-003 … 004 | Demonstration of root scripts · package READMEs |
| SRD-CI-005 … 007 | Track as planned until workflows/checklist land; update TRACE when CI expands |
