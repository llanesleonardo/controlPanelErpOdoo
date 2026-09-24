# Exercise 54: HQ Menu & Promo Control — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 54: HQ Menu, Pricing & Promo Control](../54-hq-menu-pricing-promo-control.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

HQ catalog → rollout controller (pilot → region → national) → sync hub → POS adapters. Monitor → rollback.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |

### Drill C — Complete the sentence

*"Emailing PDF menu updates to franchisees means \_\_\_ when combo price changes nationally."*

### Drill D — Constraint twist

**Twist:** Bad price synced to **8,000 locations** — combo $1 instead of $10.

- How fast must rollback work?
- What do you monitor to auto-trigger rollback?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| Some stores old price 2 weeks later | |
| Franchisee changed core burger price | |
| Promo started early in one timezone | |
| POS checkout blocked 20 min during sync | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `publishMenu(version, stage)` — push to location subset
- `onPosAck(locationId, version, ok|error)` — track sync status
- **Failure path:** error rate > 5% → rollback to previous version

### Out of scope

- Recipe/nutrition, franchisee-local items, kitchen display systems

### Happy path

```typescript
async function publishMenu(version: MenuVersion, stage: RolloutStage) {
  await catalog.publish(version); // immutable version
  const locations = await rollout.resolve(stage);
  await hub.pushBatch(locations, version);
}
```

### Failure path

50 pilot locations: 10 fail adapter timeout. Do you proceed to regional rollout? Write decision rule in 3 bullets.

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | Big-bang national push | One bug hits all stores | Pilot 1 store OK | Staged rollout |
| 2 | No version immutability | Can't rollback; "which menu?" | Overwrite same row | Versioned catalog |
| 3 | Sync blocks POS checkout | Lines during lunch | Off-hours test | Async sync + previous version active |
| 4 | No ack tracking | Don't know who still on old price | Assume sync worked | Per-location ack |
| 5 | Franchisee can edit restricted SKU | Brand price inconsistency | HQ-only test env | POS ACL enforcement |
| 6 | Promo start UTC not local | Early/late promo | Single timezone team | Scheduler per store TZ |
| 7 | No auto rollback on error rate | $1 combo for hours | Manual QA one store | Monitor + revert trigger |

### The lesson

HQ control systems fail on **rollout safety**, not on "can I store a menu row". The $1 combo incident is a monitoring + rollback problem.

---

## Self-check answers

<details>
<summary>Drill D</summary>

Rollback in minutes: keep previous version active until ack threshold; push REVERT command; monitor error rate and transaction price anomalies; circuit breaker on sync hub.

</details>

<details>
<summary>Failure path decision</summary>

Do **not** expand: >5% error or any critical SKU mismatch. Retry failed 10 with backoff. Investigate adapter before region stage.

</details>

## Done when

- [ ] Rollout stages named in pseudocode
- [ ] Rollback doesn't require redeploy
- [ ] Ack per location tracked
