# Exercise 45: Pick-Pack-Ship — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 45: Order Fulfillment](../45-order-fulfillment-pick-pack-ship.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

OMS → wave planner → pick → bin inventory → pack → ship → carrier.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |

### Drill C — Complete the sentence

*"Two pickers assigned the same bin line without allocation means \_\_\_."*

### Drill D — Constraint twist

**Twist:** Black Friday — **5× pick tasks** in same warehouse zone.

- Hot spot: bins or pickers?
- One pattern to absorb burst?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| Customer got wrong item | |
| System shows available; picker finds empty bin | |
| Same order shipped twice | |
| Pack station idle; pick queue huge | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `assignWave(orderIds[])` → pick tasks by zone
- `confirmPick(taskId, binId, sku, qty)` — CAS decrement bin
- **Failure path:** bin empty → exception flow

### Out of scope

- Robot AMR routing, cartonization optimization

### Happy path

```typescript
async function confirmPick(taskId: string, binId: string, sku: string, qty: number) {
  // CAS bin qty
  // mark task complete
  // route to pack station
}
```

### Failure path

Picker confirms pick but network fails before ACK. Picker retries scan. What must happen?

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | `SELECT qty; UPDATE qty = qty - 1` race | Two picks one item; negative qty | One picker test | CAS / lock per bin line |
| 2 | No idempotent pick confirm | Double decrement one retry | Network always OK in dev | Idempotent scanId |
| 3 | Ship label before pack validation | Wrong SKU in box | Happy scan once | State machine: pack validates all lines |
| 4 | Global warehouse lock | One pick at a time | Tiny warehouse | Zone sharding |
| 5 | Inventory not event-sourced | Can't explain shrinkage | Manual adjustment hides | Receive/pick/adjust events |
| 6 | Wave planner sync in OMS request | OMS timeout peak day | 10 orders test | Async wave queue |

### The lesson

Warehouse systems fail on **physical reality vs digital qty**. Tests with perfect inventory never find pick races.

---

## Self-check answers

<details>
<summary>Drill E</summary>

- Wrong item → pack validation skipped
- Empty bin → sync drift; need cycle count
- Double ship → idempotent ship confirm missing
- Idle pack → wave/bulkhead imbalance

</details>

## Done when

- [ ] CAS on bin in pseudocode
- [ ] Retry pick is idempotent
- [ ] Pack validates before ship state transition
