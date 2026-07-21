# How to Use the Exercises (Steps 3 & 4)

These files are **learning documentation only**. You do not need to run code, spin up Redis, or write a test suite. The goal is to **think like an architect** before any implementation or testing.

## Where this fits in your path

```text
Patterns (vocabulary)
    ↓
Concerns (technical lens)     ← reads vs writes vs contention…
    ↓
Real problems (composition)
    ↓
Step 3 — Design drills
    ↓
Step 4 — Build slice (paper)
    ↓
"Failed before testing"
```

## Step 3 — Design drill (≈15 min per exercise)

Do this **without** opening the problem file. Use a blank sheet or empty editor.

1. **Diagram from memory** — redraw the Mermaid flow in 5 minutes.
2. **Pattern trio** — name 3 patterns and one sentence each for *why* they're there.
3. **Anti-pattern** — pick one "if you only use X" row and explain the failure in your own words.
4. **Constraint twist** — answer what breaks when the requirement changes.
5. **Failure round** — given a symptom, trace which component failed and which pattern should have prevented it.

Then open the [problem file](../INDEX.md) and [self-check answers](./INDEX.md) in the exercise.

## Step 4 — Build slice (≈30 min, pseudocode only)

Implement **one happy path + one failure path** on paper:

- Write function signatures and 10–20 lines of pseudocode per path.
- Mark where **idempotency keys**, **locks**, **TTL**, or **outbox writes** happen.
- Explicitly **skip** everything out of scope (UI, email, multi-region, admin).

You are not building a product. You are proving you know **where** the hard parts live.

## Before testing — why this section exists

Automated tests verify invariants **after** you know what to assert. Junior teams often:

1. Build a naive version that "works on my machine"
2. Write tests that only cover the happy path
3. Discover double-charges or race bugs in production

The **"Before testing"** section in each exercise lists **naive implementations**, the **symptoms** you'd see (logs, support tickets, metrics), and **why passing happy-path tests wouldn't catch it**. That is the skill: **predict failure before writing `expect()`**.

## Suggested order

| Week | Exercises | Focus |
| --- | --- | --- |
| 1 | [02 Ticketmaster](./02-ticketmaster.md), [19 Rate Limiter](./19-rate-limiter.md) | [Contention](../concerns/02-dealing-with-contention.md), admission |
| 2 | [37 Payment](./37-payment-system.md), [06 Billing](./06-multi-tenant-billing.md) | [Multi-step](../concerns/03-multi-step-processes.md), idempotency |
| 3 | [48 Helpdesk](./48-helpdesk.md), [35 Cache](./35-distributed-cache.md) | [Real-time](../concerns/01-real-time-updates.md), [scale reads](../concerns/04-scaling-reads.md) |
| 4 | [50 Royalty](./50-franchise-royalty.md), [54 Menu Control](./54-hq-menu-pricing-promo-control.md) | Franchise + [writes](../concerns/05-scaling-writes.md) |
| 5 | [45 Fulfillment](./45-order-fulfillment-pick-pack-ship.md), [42 Feature Flags](./42-feature-flags-experimentation.md) | Contention + rollout |

## Self-honesty checklist (no test runner needed)

- [ ] I can draw the diagram without looking
- [ ] I can explain why **one** pattern alone fails
- [ ] I wrote pseudocode for hold → pay → confirm **and** pay fails → release
- [ ] I can name **two** naive bugs and how I'd notice them **before** writing tests
- [ ] I can point to the exact line in my pseudocode where idempotency / lock / TTL belongs

When all five are true for an exercise, move to the next one.
