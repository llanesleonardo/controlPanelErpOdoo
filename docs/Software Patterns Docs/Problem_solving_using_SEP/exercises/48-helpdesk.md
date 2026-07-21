# Exercise 48: Helpdesk — Design & Build Slice

> **Learning doc only** — no runnable code or test suite required.  
> **Read first:** [Problem 48: Customer Support Helpdesk](../48-customer-support-helpdesk.md)

---

## Step 3 — Design Drill

### Drill A — Diagram from memory (5 min)

Ingest → ticket state machine → router → agent + SLA timer + KB search.

### Drill B — Pattern trio

| Pattern | Job here |
| --- | --- |
| | |
| | |

### Drill C — One pattern fails alone

*"If we use shared Gmail inbox without ticket IDs, \_\_\_ because \_\_\_.*

### Drill D — Constraint twist

**Twist:** Major outage → **10× ticket volume** for 2 hours.

- What breaks first?
- What do you shed or defer?

### Drill E — Symptom → cause

| Symptom | Hypothesis |
| --- | --- |
| SLA breach but no alert | |
| Two agents reply different answers same ticket | |
| VIP customer waits 4 hours | |
| Duplicate tickets same email thread | |

---

## Step 4 — Build Slice (pseudocode only)

### In scope

- `createTicket(fromEmail, subject, body)` — dedupe by thread key
- `assignTicket(ticketId)` — skill queue pick
- `startSlaTimers(ticketId, priority)` — first response + resolution
- **Failure path:** SLA breach → escalate

### Out of scope

- Phone IVR, chat WebSocket, CSAT surveys

### Happy path

```typescript
async function onCustomerReply(email: InboundEmail) {
  // dedupe thread → create or append ticket
  // reset resolution SLA?
  // notify assigned agent
}
```

### Failure path

Agent opens ticket but crashes before reply. SLA clock still running. What fires at T-5 min?

---

## Before testing: how naive implementations fail

| # | Naive implementation | Symptom | Why manual test misses it | Fix |
| --- | --- | --- | --- | --- |
| 1 | SLA checked by hourly cron | Breach discovered 59 min late | Create ticket and wait 1 hour | Dedicated SLA scheduler / timers |
| 2 | Round-robin ignore skills | Billing question to technical agent | One ticket type tested | Skill-based queues |
| 3 | No thread dedupe on email Message-ID | 5 tickets one outage | Send one email in test | Ingest dedupe key |
| 4 | No lock on ticket edit | Conflicting agent replies | Single agent test | Distributed lock / collision UI |
| 5 | KB search same DB as ticket writes | Search slow during spike | Low ticket volume | CQRS + search index |
| 6 | Priority field cosmetic | VIP same queue as free tier | Never test priority | Priority queue routing |

### The lesson

Helpdesks fail on **time** and **routing**, not on "can I store a ticket row". SLA is a distributed timer problem.

---

## Self-check answers

<details>
<summary>Drill D</summary>

Router and agent capacity saturate. Shed: auto-reply template, deflect to status page, pause low-tier SLAs, scale read-only KB cache, queue ingest with backpressure.

</details>

## Done when

- [ ] Ticket states named (open/pending/solved)
- [ ] SLA breach has explicit escalate action
- [ ] Email dedupe key identified
