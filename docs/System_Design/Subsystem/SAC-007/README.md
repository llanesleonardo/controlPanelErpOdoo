# SAC-007 - Tasks, approvals, evidence, logs

How the shop **queues work**, **approves risky jobs**, and **keeps a paper trail** — without surprising anyone with a live peer write. Carbide-tool path: preview a write before it hits estimates, inventory, or shipping data on the owning edge.

Operators open **Tasks** and **Logs** in the control panel. The gateway holds the queue and log store; the orchestrator runs dry-run skills and may drop evidence files under storage. Peer edges (including **ERP SoA peer #1**) stay outside Compose — we only preview or (later) commit through allowlisted skills. Automations must use the **same** path ([OPS-018](./Scenarios/OPS-018.md)).

## What you get

| Piece | Job |
|-------|-----|
| Task queue | List / filter jobs by state (`pending`, `running`, `needs_approval`, …) |
| Approve / reject | Human gate when policy says a write needs a second look |
| Dry-run evidence | Predicted effects + warnings before any live peer change |
| Correlation | One `correlation_id` ties task → logs → evidence files |
| Structured logs | JSON lines under `LOG_DIR` (default `./resources/logs`) |
| Evidence files | Optional JSON under `STORAGE_ROOT/evidence/{correlation_id}/` (default `./resources/storage/local`) |

## Documents in this subsystem

| File | What it answers |
|------|-----------------|
| [SRD.md](./SRD.md) | What SHALL be true for queue, logs, evidence |
| [TSD.md](./TSD.md) | How gateway, orchestrator, paths, and APIs fit |
| [TRACE.md](./TRACE.md) | Requirement to scenario to test |
| [Scenarios/OPS-002.md](./Scenarios/OPS-002.md) | Preview a risky write (dry-run) |
| [Scenarios/OPS-003.md](./Scenarios/OPS-003.md) | Approve or reject a queued task |
| [Scenarios/OPS-018.md](./Scenarios/OPS-018.md) | Automation fires skill on ontology action |

Shop screens: [User Guide - Screens](../../../User_Guide/Screens/README.md) (tasks / logs / console).  
Deploy paths for storage: [SAC-009 Storage](../SAC-009/Guides/Storage_and_Backups.md).
