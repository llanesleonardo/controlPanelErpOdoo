# Storage and backups — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Env

```
STORAGE_ROOT=./storage/local
```

Linux later example: `/var/lib/controlpanel/storage`

## Planned helpers (later)

- App library resolving `STORAGE_ROOT` and safe join paths
- Compose bind mount for the path
- Script: `scripts/backup-controlplane.sh` (pg_dump + tar storage) — not created in Epic-01 docs pass beyond this plan note; Deployment docs already cover approach

## References

- [storage-and-backups.md](../../../../Subsystem/SAC-009/Guides/Storage_and_Backups.md)
