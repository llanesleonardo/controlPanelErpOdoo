# Exercise 50: Franchise Royalty Engine — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 50: Franchise Royalty & Fee Engine](../50-franchise-royalty-fee-engine.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

POS sales → ingest (ACL) → royalty calc → ledger → weekly invoice → ACH. Show franchisee **location** as key.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |

### Drill C — Complete the sentence

*"Billing royalty before POS data is complete means \_\_\_ for franchisee #4521."*

### Drill D — Constraint twist

**Twist:** Master franchisee in Brazil — **split** 40% master / 60% franchisor on royalty.

- Where in flow does split happen?
- One record or two ledger entries?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| Franchisee billed twice same week | |
| HQ royalty doesn't match sum of POS reports | |
| Location closed still billed | |
| Dispute: "my POS total differs" | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `ingestSale(locationId, posTxnId, gross, ts)` — idempotent
- `calculateWeeklyRoyalty(locationId, week)` — contract rates → invoice
- **Failure path:** duplicate POS file replay

### Out of scope

- Initial franchise fee, legal contract PDF, multi-currency FX

### Happy path

```typescript
async function calculateWeeklyRoyalty(locationId: string, week: string) {
  const key = `${locationId}:${week}`;
  // idempotency check
  // sum gross from events
  // apply royaltyRate + adFundRate from contract
  // ledger + invoice
}
```

### Failure path

POS vendor sends **corrected** file for prior week. How do you restate without double-charging?

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | Spreadsheet export manual | Wrong %; lawsuit | One location demo | Automated calc + audit log |
| 2 | No idempotency on `posTxnId` | Duplicate sales → inflated royalty | Single file import | Idempotent ingest |
| 3 | Bill on calendar not sales cutoff | Missing Sunday sales | Mid-week test | Cutoff window + grace |
| 4 | Flat 6% all locations | Wrong contract vintage | Prototype one rate | Contract version per location |
| 5 | No dispute tie-out view | Support can't explain line items | Never dispute in test | Event-sourced sales + invoice lines |
| 6 | Restatement = new invoice without reversal | Double week charge | Never resend file | Compensating ledger entry |

### The lesson

Franchise money failures are **trust and arbitration** failures. Franchisees call their lawyer before your integration tests finish.

---

## Self-check answers

<details>
<summary>Drill D</summary>

Split at calc time into two ledger entries (master share, franchisor share) from same gross base. Single remittance ACH may still split in saga.

</details>

## Done when

- [ ] `locationId:week` idempotency key explicit
- [ ] POS ingest idempotent on txn id
- [ ] Restatement strategy named (not "delete invoice")
