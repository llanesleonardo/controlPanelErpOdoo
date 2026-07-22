# Contracts package — Software Requirements Document (SRD)

**Status:** implemented (Epic-02)  
**Upstream:** [Epic-01 contracts](../../../Epic-01/phase-01/task-02-api-contracts-samples/SRD.md) · [ContractsDocs](../../../../Components/ContractsDocs/README.md)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Purpose

Promote ContractsDocs YAML into `packages/contracts` with load helpers so gateway/orchestrator can consume schemas later without copying files.

## Scope

- Copy or symlink/reference sales, inventory, accounting, and common YAML into the package
- Loader helper to read YAML by intent_code or filename
- Package README with usage
- Keep docs/Components/ContractsDocs as the authoring source (or document single source — **default: docs remain canonical; package vendors a copy updated in this task**)

## Out of Scope

- OpenAPI codegen clients
- Runtime AJV/Zod validation middleware in Nest/FastAPI
- Expanding beyond current sample contracts

## Requirements

### SRD-E02-P01-T02-01

**Package assets** — `packages/contracts` shall include the sample YAML files (common + sales + inventory + accounting).

### SRD-E02-P01-T02-02

**Load helper** — A documented function shall load a contract document by name or intent_code.

### SRD-E02-P01-T02-03

**Parity** — Package YAML shall match ContractsDocs samples at task completion.

### SRD-E02-P01-T02-04

**No app runtime** — No NestJS/FastAPI validation wiring in this task.
