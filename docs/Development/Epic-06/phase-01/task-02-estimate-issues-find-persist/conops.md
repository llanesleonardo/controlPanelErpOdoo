# Estimate issues find & persist — Concept of Operations

**Status:** not started  
**Related:** [SRD](./SRD.md) · [TSD](./TSD.md) · [diagram](./diagram.md)

1. Operator (or future cron) triggers **Find issues**.  
2. Gateway calls orchestrator; Odoo connector reads/diagnoses estimates.  
3. Issue rows return to gateway and are written to Postgres.  
4. Operator later lists/dismisses in task-03.
