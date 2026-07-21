# Exercise 42: Feature Flags — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 42: Feature Flags & Experimentation](../42-feature-flags-experimentation.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

SDK → edge cache → eval API → config store. Admin updates → invalidation → exposure events.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |

### Drill C — Complete the sentence

*"Random `Math.random() < 0.1` per request means \_\_\_ for A/B testing."*

### Drill D — Constraint twist

**Twist:** Kill switch must propagate globally in **< 30 seconds**.

- What path must change when admin flips flag off?
- What if edge cache TTL is 5 minutes?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| Same user sees both variants same day | |
| Flag off but 5% still get feature | |
| Admin change takes 10 min to take effect | |
| Experiment conversion rate is nonsense | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `evaluate(flagKey, userId, attrs)` → boolean + variant id
- Stable bucket: `hash(flagKey + userId) % 100`
- Config version number checked by SDK

### Out of scope

- Full analytics pipeline, Bayesian stats, multivariate UI

### Happy path

```typescript
function evaluate(flag: FlagConfig, userId: string, attrs: Record<string, string>): EvalResult {
  // enabled check → targeting → stable bucket
}
```

### Failure path

Admin disables flag. SDK has 60s cached snapshot with flag **on**. User starts checkout with new UI — how do you limit blast radius?

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | Random per request | User toggles UI; bad experiment data | Refresh once looks OK | Stable hash bucketing |
| 2 | DB read every eval | API latency + DB overload | 1 flag 1 user | Edge cache + snapshot |
| 3 | No version on snapshot | Mixed old/new rules during rollout | Single deploy test | Version header + poll |
| 4 | Kill switch requires deploy | Incident lasts until CI finishes | Staging has toggle | Runtime flag + pub/sub invalidation |
| 5 | Exposure not logged | Can't compute conversion | Feature "works" | Async exposure events |
| 6 | Change bucket algo mid-experiment | Invalidates running test | New code only | New experiment ID |

### The lesson

Feature flags look trivial until **consistency** (same user) and **propagation speed** (kill switch) matter. Happy-path "flag returns true" tests prove nothing.

---

## Self-check answers

<details>
<summary>Drill C</summary>

Same user gets different variants on each request → invalid experiment + terrible UX.

</details>

<details>
<summary>Drill D</summary>

Pub/sub push invalidation; shorten TTL on kill; SDK checks version every N seconds; default-off embedded in snapshot when version mismatches.

</details>

## Done when

- [ ] Bucketing uses stable hash, not random
- [ ] Kill switch path doesn't require redeploy
- [ ] Exposure event mentioned in happy path
