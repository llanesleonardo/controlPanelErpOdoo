# Exercise 19: Rate Limiter — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 19: Rate Limiter](../19-rate-limiter.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

Include: request → gateway middleware → local cache? → Redis → allow/deny + headers.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |
| | |

### Drill C — One pattern fails alone

*"If each API node keeps its own in-memory counter only, \_\_\_ because \_\_\_.*

### Drill D — Constraint twist

**Twist:** One enterprise customer routes **10,000 employees** through a single NAT IP.

- Why per-IP limiting breaks?
- What key dimensions do you use instead?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| Limit is 100/min but client sends 500/min successfully | |
| Redis down and all traffic allowed | |
| Burst at window boundary doubles allowed traffic | |
| p99 latency jumps 50 ms on every request | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `allow(key, limit, windowSec)` → boolean
- Redis fixed-window OR token bucket (pick one; note tradeoff)
- Return headers: `X-RateLimit-Remaining`, `Retry-After` on deny

### Out of scope

- Distributed config UI, per-route admin, sliding window log at full precision

### Happy path

```typescript
// YOUR PSEUDOCODE — mark atomic increment
async function allow(key: string, limit: number, windowSec: number): Promise<AllowResult> { }
```

### Failure path

Redis **slow** (500 ms) but not down. Gateway must decide: fail-open or fail-closed?

Write 3 lines: policy for `/login` vs `/public/catalog`.

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | Counter in Node `Map` per instance | 3 nodes → 3× limit | Single instance dev | Central Redis + atomic INCR |
| 2 | `SELECT count FROM limits` per request | DB CPU 100%; API slow | Low traffic dev | Redis/Lua atomic |
| 3 | Fixed window, no TTL on key | Counter never resets | Test runs < 1 window | INCR + EXPIRE atomically |
| 4 | Fail-open everywhere when Redis blips | Auth brute-force during outage | Redis always up locally | Fail-closed on `/login` |
| 5 | No local cache mirror | Redis RTT on every HTTP request | Same-datacenter latency hides | Short-TTL local cache |
| 6 | Rate limit after heavy handler work | Limit never triggers; CPU dies first | Small payloads in test | Middleware **first** |

### The lesson

Rate limiting fails **silently** (you allow too much) or **loudly** (Redis becomes the bottleneck). Neither shows up in "call API once" testing.

---

## Self-check answers

<details>
<summary>Drill D</summary>

Use composite key: `apiKey` or `tenantId` + route, not raw IP. Optional secondary cap on IP for anonymous abuse.

</details>

<details>
<summary>Drill E</summary>

- 500/min OK → multiple nodes or wrong key scope
- All allowed → fail-open policy
- Double burst → fixed-window boundary effect → token bucket or sliding window
- Latency → Redis on hot path without local cache

</details>

## Done when

- [ ] You can draw allow vs deny path
- [ ] Pseudocode shows atomic increment + TTL
- [ ] You can argue fail-open vs fail-closed for login
