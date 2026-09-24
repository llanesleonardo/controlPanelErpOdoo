# Exercise 06: Multi-Tenant Billing — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 6: Multi-Tenant SaaS Billing](../06-multi-tenant-saas-usage-billing.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

Tenant API → meter → event stream → billing → invoice. Show where tenant isolation lives.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |

### Drill C — One pattern fails alone

*"If we only add `tenant_id` column with no other guard, \_\_\_ because \_\_\_.*

### Drill D — Constraint twist

**Twist:** One tenant sends **50% of all usage events** (whale tenant).

- What breaks?
- Two patterns to protect the rest?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| Tenant A sees Tenant B's invoice line items | |
| Invoice double the expected amount | |
| API latency spikes every time usage is recorded | |
| Usage events lost during broker outage | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `recordUsage(tenantId, metric, qty)` — async fire-and-forget to stream
- `generateInvoice(tenantId, period)` — idempotent; sum events → line items
- **Failure path:** invoice job retried → must not double-bill

### Out of scope

- Stripe UI, PDF rendering, tax engines, plan upgrades

### Happy path

```typescript
// Mark: tenant in every key/query
async function recordUsage(tenantId: string, metric: string, qty: number) { }
async function generateInvoice(tenantId: string, period: string, idempotencyKey: string) { }
```

### Failure path

Broker down for 10 minutes. Usage events buffered on API nodes (bad idea) — what should happen instead?

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | Sync `INSERT usage` in API handler | p99 latency 2s at scale | 10 events in dev OK | Async stream + queue |
| 2 | Invoice = `SUM(usage)` without period idempotency | Retry job → 2× charge | Run invoice once manually | Idempotency key per tenant+period |
| 3 | Cache key `user:123` not `tenant:5:user:123` | Cross-tenant data in dashboard | Single tenant dev account | Tenant-scoped keys everywhere |
| 4 | Lost events on crash before ACK | Under-billing; angry enterprise | Small volume hides gaps | Durable queue + at-least-once + reconcile |
| 5 | Same DB sequence for invoice numbers across tenants | One tenant blocks others | Low concurrency | Sharded billing or async batch |
| 6 | Metering bug adds negative qty | Credit explosion or NaN invoice | Only tested positive increments | Validation + audit event log |

### The lesson

Billing bugs are **trust bugs**. Users notice before your test suite if you only ever call `recordUsage` once.

---

## Self-check answers

<details>
<summary>Drill D</summary>

Hot partition on stream shard; noisy neighbor API if sync meter. Fix: shard by tenantId, rate limit whale, bulkhead metering pool, CQRS separate read path.

</details>

## Done when

- [ ] Every pseudocode function takes `tenantId` first
- [ ] Invoice idempotency key named explicitly
- [ ] You can explain failure #2 to a finance stakeholder
