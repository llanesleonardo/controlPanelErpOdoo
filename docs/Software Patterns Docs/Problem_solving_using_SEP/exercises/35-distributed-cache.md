# Exercise 35: Distributed Cache — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 35: Distributed Cache](../35-distributed-cache.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

App → cache client → Redis cluster → (miss) → origin DB. Show invalidation path.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |

### Drill C — Complete the sentence

*"Cache-aside without stampede protection means \_\_\_ when a hot key expires."*

### Drill D — Constraint twist

**Twist:** Celebrity tweet links to `product:999` — **1M requests/sec** on one key.

- What breaks?
- Two mitigations (not "buy bigger Redis" only)?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| Users see stale price after update | |
| DB load spike every hour at :00 | |
| 50% cache miss rate after adding 2 nodes | |
| Same user sees old then new data rapidly | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `cacheAside(key, loader, ttlSec)` — get → miss → lock → load → set
- `invalidate(key)` — pub/sub broadcast to app nodes

### Out of scope

- Cluster failover automation, Redis Cluster slot migration

### Happy path

```typescript
async function cacheAside<T>(key: string, loader: () => Promise<T>, ttlSec: number): Promise<T> {
  // hit path
  // miss + single-flight lock
}
```

### Failure path

Origin DB **slow** (5 s). 1000 concurrent misses on same key. Describe stampede without load test.

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | No TTL | Stale data forever | Single read looks fine | TTL + invalidation |
| 2 | Delete cache before DB update | Cache repopulates old value | Sequential single-thread test | Invalidate **after** commit |
| 3 | Every miss hits DB concurrently | DB dies on hot key expiry | One miss in dev | Single-flight lock |
| 4 | Client not hash-aware after scale-out | Miss storm wrong nodes | Single Redis instance | Consistent hashing client |
| 5 | No invalidation bus | Each app node stale different | One server dev | Pub/sub invalidate |
| 6 | Cache stores error responses | "503" cached 5 min | One failed load | Don't cache errors / short negative TTL |

### The lesson

Caches fail on **miss storms** and **staleness**, not on "does get/set work". Hot keys expose design flaws that unit tests with cold keys never see.

---

## Self-check answers

<details>
<summary>Drill D</summary>

Redis CPU/network hot spot; origin stampede on expiry. Mitigate: local in-process L1 cache, request coalescing, pre-warm key, CDN edge for read-only product page.

</details>

## Done when

- [ ] Pseudocode has lock on miss path
- [ ] Invalidation tied to DB commit order
- [ ] Can explain stampede in plain English
