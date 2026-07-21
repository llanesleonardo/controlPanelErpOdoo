# Auth users and roles — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. User signs in via control panel.
2. Gateway issues session/JWT.
3. Role gates sensitive actions and admin screens.

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
