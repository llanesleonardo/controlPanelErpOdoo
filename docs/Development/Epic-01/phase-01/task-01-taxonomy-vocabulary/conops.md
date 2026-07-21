# Taxonomy vocabulary — Concept of Operations (ConOps)

**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

## Implements

## Operator flow
1. Author reviews taxonomy docs.
2. New operations must register a taxonomy code before skill work.
3. Operators select domain/intent from known codes in the console (later).

## Failure handling
On error: record structured failure (error class), surface message to operator, create incident when a write path fails.
