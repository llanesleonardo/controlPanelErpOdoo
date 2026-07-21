# Actor Model

## Core Idea
Actor Model organizes concurrency around isolated actors that own state and communicate by messages.

## Problem It Solves
- Shared mutable state and locks make concurrent code hard to reason about.

## Main Diagram
```text
Actor A -> Actor B -> Actor C -> Mailbox A -> Mailbox B
```

## 3 Concrete Examples
1. **Chat Room Actor:** Each chat room actor owns messages and participants.
2. **Game Entity Actor:** Each game entity processes its own movement and interaction messages.
3. **IoT Device Actor:** Each device actor owns state and receives commands/readings.

## TypeScript Example
```typescript
class InboxActor {
  private messages: Mail[] = [];
  async receive(msg: Mail) { this.messages.push(msg); await this.processNext(); }
  private async processNext() { const m = this.messages.shift(); if (m) await handle(m); }
}
// Chat Room Actor:
```

## Architecture Questions
- What entities should become actors?
- What state does each actor own?
- What messages can it receive?
- How are actors supervised?
- How are slow actors handled?
- What ordering guarantees exist per actor mailbox?

## When to Use
- State should be isolated per actor.
- Message passing fits the domain.
- You want to reduce shared-memory locking.

## When NOT to Use
- Strong transactions across many actors are required.
- Message ordering and supervision are not understood.
- The workflow is simple synchronous code.
