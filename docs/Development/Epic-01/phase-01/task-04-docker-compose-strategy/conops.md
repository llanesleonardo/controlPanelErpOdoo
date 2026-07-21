# Docker Compose strategy — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. Dev copies .env.example.
2. Uses Compose when apps exist.
3. Linux host installs Docker and reuses Compose.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
