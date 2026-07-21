# Exercises — Steps 3 & 4 (Design & Build Slice)

**Learning documentation only.** No runnable code, no test suite, no CI.

Start here: [How to use these exercises](./00-how-to-use-exercises.md) · [Cross-cutting concerns](../concerns/INDEX.md)

## What each exercise contains

| Section | Purpose |
| --- | --- |
| **Step 3 — Design drill** | Diagram from memory, pattern trio, constraint twists, symptom → cause |
| **Step 4 — Build slice** | In/out of scope, happy + failure path pseudocode |
| **Before testing** | Naive implementations that fail *before* you'd write automated tests |
| **Self-check** | Collapsed answers — peek only after attempting drills |

## Exercise index

| Exercise | Problem | Theme | Est. time |
| --- | --- | --- | --- |
| [02 Ticketmaster](./02-ticketmaster.md) | [#2](../02-ticketmaster-style-event-booking.md) | CAS, saga, idempotency, admission | 45 min |
| [06 Multi-Tenant Billing](./06-multi-tenant-billing.md) | [#6](../06-multi-tenant-saas-usage-billing.md) | Tenant isolation, async metering | 40 min |
| [19 Rate Limiter](./19-rate-limiter.md) | [#19](../19-rate-limiter.md) | Distributed counters, fail-open/closed | 35 min |
| [35 Distributed Cache](./35-distributed-cache.md) | [#35](../35-distributed-cache.md) | Cache-aside, stampede, invalidation | 35 min |
| [37 Payment System](./37-payment-system.md) | [#37](../37-payment-system.md) | Idempotency, timeout, outbox | 40 min |
| [42 Feature Flags](./42-feature-flags-experimentation.md) | [#42](../42-feature-flags-experimentation.md) | Stable bucketing, kill switch | 35 min |
| [45 Pick-Pack-Ship](./45-order-fulfillment-pick-pack-ship.md) | [#45](../45-order-fulfillment-pick-pack-ship.md) | Warehouse CAS, waves | 40 min |
| [48 Helpdesk](./48-helpdesk.md) | [#48](../48-customer-support-helpdesk.md) | SLA timers, routing, dedupe | 40 min |
| [50 Franchise Royalty](./50-franchise-royalty.md) | [#50](../50-franchise-royalty-fee-engine.md) | POS ingest, weekly idempotent bill | 40 min |
| [54 HQ Menu Control](./54-hq-menu-pricing-promo-control.md) | [#54](../54-hq-menu-pricing-promo-control.md) | Staged rollout, rollback | 40 min |

## Suggested 5-week path

```text
Week 1: 02 Ticketmaster → 19 Rate Limiter
Week 2: 37 Payment → 06 Billing
Week 3: 48 Helpdesk → 35 Cache
Week 4: 50 Royalty → 54 Menu Control
Week 5: 45 Fulfillment → 42 Feature Flags
```

## After these exercises (optional later)

When you eventually write real code, the **invariants** implied in "Before testing" become your test cases — but only after you could predict the failure without them.

Back to [Problem index](../INDEX.md) · [Pattern docs](../../Scalability_patterns/INDEX.md)
