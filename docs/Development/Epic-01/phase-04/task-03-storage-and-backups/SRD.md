# Storage and backups — Software Requirements Document (SRD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [TSD](./TSD.md) · [diagram](./diagram.md) · [conops](./conops.md) · [storage-and-backups](../../../../Deployment/Docker/storage-and-backups.md)

## Purpose

Define local filesystem storage via `STORAGE_ROOT` and a backup approach for control-plane Postgres and files.

## Scope

- `STORAGE_ROOT` local path (Compose volume / Linux host path later)
- Use for exports, attachments, runbook files — not Odoo filestore
- Backup sketch: `pg_dump` + copy of storage directory
- Retention and restore testing called out as ops practice

## Out of Scope

- Offsite object storage (S3 etc.) in Epic-01
- Owning Odoo backups
- Implementing backup cron in Epic-01

## Requirements

### SRD-E01-phase-04-T03-01

**Configurable root** — Storage location shall be controlled by `STORAGE_ROOT`.

### SRD-E01-phase-04-T03-02

**Backup targets** — Docs shall describe backing up control-plane DB and `STORAGE_ROOT`.

### SRD-E01-phase-04-T03-03

**Secret hygiene** — Backup bundles shall not casually include `.env` without access control.

### SRD-E01-phase-04-T03-04

**Docs-only** — Epic-01 documents storage/backups; jobs deferred.
