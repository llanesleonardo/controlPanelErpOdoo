# Event Sourcing

## Core Idea
Event Sourcing stores changes as a sequence of events instead of storing only the current state.

## Problem It Solves
- The system needs full history, auditability, replayability, and the ability to reconstruct state from business events.

## Main Diagram
```text
Command -> Aggregate -> (Event Store) -> Projection Builder -> (Read Model)
```

## 3 Concrete Examples
1. Bank account ledger
2. Order lifecycle history
3. Audit-heavy compliance system

## TypeScript Example
```typescript
const events: DomainEvent[] = [];
function apply(cmd: Command) { events.push({ type: cmd.type, payload: cmd }); }
function rebuild(id: string) {
  return events.filter(e => e.payload.id === id).reduce((state, e) => project(state, e), {});
}
// Event Sourcing
```

## Architecture Questions
- What events represent real business facts?
- Can current state be rebuilt from events?
- How will event schemas evolve?
- Do we need snapshots for performance?
- How will projections be built?
- Can the team handle event replay and eventual consistency?

## When to Use
- Audit history is critical.
- You need to reconstruct past state.
- Business events are first-class concepts.
- Replay and temporal debugging are valuable.

## When NOT to Use
- Only current state matters.
- The domain events are unclear.
- Schema evolution and replay complexity are not justified.
- The team expects simple CRUD behavior.
