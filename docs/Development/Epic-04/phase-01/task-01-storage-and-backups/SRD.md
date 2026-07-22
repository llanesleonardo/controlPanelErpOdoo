# Storage and backups — Software Requirements Document (SRD)

**Status:** planned (Epic-04 implementation)  
**Upstream:** [Storage and backups (Epic-01)](../../../Epic-01/phase-04/task-03-storage-and-backups/)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [Deployment storage](../../../../Deployment/Docker/storage-and-backups.md)

## Purpose

Provide a safe, configurable filesystem root for control-plane artifacts and an operator-runnable backup path for Postgres + files — without owning Odoo backups or shipping secrets in open tarballs.

## Scope

- Resolve and create `STORAGE_ROOT` (Compose volume / local path)
- Shared helper (gateway and/or orchestrator) for safe path join under the root
- Backup script: `pg_dump` + archive of `STORAGE_ROOT`
- Explicit exclusion of `.env` / secret files from default backup bundles

## Out of Scope

- S3 / offsite object storage
- Automated cron in production (document how to schedule; script is enough for MVP)
- Odoo filestore backups

## Requirements

### SRD-E04-T01-01

**Configurable root** — Runtime shall honor `STORAGE_ROOT` and create the directory if missing.

### SRD-E04-T01-02

**Path safety** — Helpers shall reject path traversal outside `STORAGE_ROOT`.

### SRD-E04-T01-03

**Backup targets** — Operators shall be able to back up control-plane Postgres and `STORAGE_ROOT` via a documented script.

### SRD-E04-T01-04

**Secret hygiene** — Default backup artifacts shall not include `.env` or credential files.
