# Docker Compose strategy — Concept of Operations (ConOps)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow (scaffold)

1. Copy `.env.example` to `.env` / `.env.local` (never commit secrets).
2. Review `docker/docker-compose.yml` service list against Deployment docs.
3. On Linux later: install Docker Engine + Compose; reuse the same project with production env and host volumes.
4. Expect stubs not to serve a full app until a later epic implements containers.

## Failure handling

Misconfigured secrets or attempting to treat stub containers as production is an ops error — fix env and wait for implementation epic.
