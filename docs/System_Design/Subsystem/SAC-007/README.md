# SAC-007 — Tasks, approvals, evidence, logs

How the shop **queues work**, **approves risky jobs**, and **keeps a paper trail** — without surprising anyone with a live ERP write.

Operators open **Tasks** and **Logs** in the control panel. The gateway holds the queue and log store; the orchestrator runs dry-run skills and may drop evidence files under storage. Your **ERP stays outside** — we only preview or (later) commit through allowlisted skills.

## What you get

| Piece | Job |
|-------|-----|
| Task queue | List / filter jobs by state (`pending`, `running`, `needs_approval`, …) |
| Approve / reject | Human gate when policy says a write needs a second look |
| Dry-run evidence | Predicted effects + warnings before any live ERP change |
| Correlation | One `correlation_id` ties task ? logs ? evidence files |
| Structured logs | JSON lines under `LOG_DIR` (default `./resources/logs`) |
| Evidence files | Optional JSON under `STORAGE_ROOT/evidence/…` (default `./resources/storage/local`) |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for queue, logs, evidence |
| [TSD.md](./TSD.md) | How gateway, orchestrator, paths, and APIs fit |
| [TRACE.md](./TRACE.md) | Requirement ? scenario ? test |
| [Scenarios/OPS-002.md](./Scenarios/OPS-002.md) | Preview a risky write (dry-run) |
| [Scenarios/OPS-003.md](./Scenarios/OPS-003.md) | Approve or reject a queued task |

Shop screens: [User Guide — Screens](../../../User_Guide/Screens/README.md) (tasks / logs / console).  
Deploy paths for storage: [SAC-009 Storage](../SAC-009/Guides/Storage_and_Backups.md).

**Legacy:** Epic-01 task-queue + logging + dry-run + storage · Epic-03 structured-logging + task-queue · Epic-04 dry-run + storage evidence under [`_legacy/`](../../_legacy/).
