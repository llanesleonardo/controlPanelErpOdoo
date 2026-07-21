# Event Sourcing

## Core Idea
Event Sourcing stores state changes as a sequence of events and reconstructs current state by replaying those events.

## Problem It Solves
- The system needs full history, auditability, replay, or temporal reconstruction instead of only current state.

## Main Diagram
```text
Command -> Aggregate -> (Event Store) -> Projection -> (Read Model)
```

## 3 Concrete Examples
1. **Bank Ledger:** Deposits, withdrawals, and transfers are stored as events.
2. **Order Lifecycle:** OrderCreated, PaymentAuthorized, Shipped, and Cancelled events define order state.
3. **Collaboration Document:** Every edit operation is stored and can be replayed.

## TypeScript Example
```typescript
type Event = { type: string; payload: unknown };
const stream: Event[] = [];
function fold(events: Event[]) { return events.reduce(applyEvent, initialState()); }
const state = fold(stream.filter(e => e.payload.id === orderId));
// Bank Ledger:
// Event Sourcing stores state changes as a sequence of events and recon...
```

## Architecture Questions
- What are the business events?
- Can current state be derived from events?
- How are event schemas versioned?
- Are snapshots needed?
- How are projections built?
- Can the team handle replay and event evolution?

## When to Use
- Full event history is required.
- State reconstruction and replay matter.
- Business events are first-class concepts.

## When NOT to Use
- Only current state matters.
- Events are unclear.
- Replay and schema evolution complexity is not justified.
