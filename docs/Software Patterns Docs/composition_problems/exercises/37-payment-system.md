# Exercise 37: Payment System — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 37: Payment System](../37-payment-system.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

Merchant API → idempotency → processor → ledger → outbox → webhook.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |

### Drill C — Complete the sentence

*"Charging without an Idempotency-Key means \_\_\_ when the merchant retries POST /charges."*

### Drill D — Constraint twist

**Twist:** Payment processor returns **timeout** (unknown if charge succeeded).

- What do you return to merchant? (200? 202? 500?)
- What state is charge in?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| Customer double-charged same order | |
| Webhook delivered 5 times; merchant shipped 5 times | |
| Ledger balance ≠ processor dashboard | |
| Charge succeeded; merchant never notified | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `createCharge(req, idempotencyKey)` — check store → authorize → ledger → outbox
- **Failure path:** processor timeout → `PENDING` + poll/reconcile endpoint

### Out of scope

- 3DS UI, dispute chargebacks, multi-currency FX

### Happy path

```typescript
async function createCharge(req: ChargeRequest, idempotencyKey: string): Promise<Charge> {
  // 1. idempotency early return
  // 2. processor call (circuit breaker?)
  // 3. ledger + outbox SAME transaction
}
```

### Failure path

Write reconcile pseudocode: `reconcileCharge(chargeId)` when processor later confirms success.

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | No idempotency store | Double charge on network retry | Postman sends once | Idempotency-Key |
| 2 | Webhook HTTP directly after charge | Merchant timeout → you retry charge | Fast localhost webhook | Outbox + worker retry |
| 3 | Treat processor timeout as failure | User charged; your DB says FAILED | Mock always returns in 100ms | PENDING + reconcile job |
| 4 | Ledger updated before processor confirms | Books show money you don't have | Mock always succeeds | Saga ordering |
| 5 | Merchant webhook without signature | Fraudulent "payment OK" posts | No security test | HMAC + idempotent webhook ingest |
| 6 | `balance = SUM(charges)` mutable overwrite | Lost audit; can't explain dispute | Single charge demo | Event-sourced ledger |

### The lesson

Payment systems fail on **retry semantics**, not on "can I charge once". If you cannot describe timeout behavior in Drill D, do not write code.

---

## Self-check answers

<details>
<summary>Drill D</summary>

Return **202 Accepted** + `chargeId` + poll URL. State `PENDING`. Reconcile job or webhook moves to `SUCCEEDED` or `FAILED`. Never assume timeout = failure.

</details>

## Done when

- [ ] Idempotency check is first line of pseudocode
- [ ] Outbox in same transaction as ledger
- [ ] Timeout path documented without guessing
