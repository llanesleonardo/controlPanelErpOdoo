# SAC-010 - CI, lint, release evidence

How we keep **docs and packages honest** before merge - and what we still **plan** for release proof. No inventing pipelines that are not in the repo.

Today the shop (and GitHub) mainly runs **markdown lint** on every push/PR. Package smoke tests exist as **root npm scripts** and are expected locally / before release; they are **not** yet wired as separate CI jobs.

## What you get

| Piece | Status | Job |
|-------|--------|-----|
| Markdown lint | **Current** | `npm run lint` + GitHub Action `.github/workflows/lint.yml` |
| Contracts smoke | **Current (local script)** | `npm run test:contracts` |
| Ontology smoke | **Current (local script)** | `npm run test:ontology` |
| App unit/e2e CI | **Planned** | Not in `.github/workflows` yet |
| Release evidence pack | **Planned** | Documented expectations; no automated release workflow yet |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for CI / lint / release evidence |
| [TSD.md](./TSD.md) | What exists in repo vs what is planned |
| [TRACE.md](./TRACE.md) | Requirement → scenario → test |
| [Scenarios/](./Scenarios/) | [E-05](./Scenarios/E-05.md), [E-06](./Scenarios/E-06.md) (**Open**) |

