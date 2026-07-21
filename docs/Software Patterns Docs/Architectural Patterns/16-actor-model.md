# Actor Model

## Core Idea
The Actor Model structures a system as independent actors that communicate by sending messages.

## Problem It Solves
- A highly concurrent system needs isolated state, message-driven communication, and fault containment.

## Main Diagram
```text
Actor A -> Actor B -> Actor C -> Supervisor
```

## 3 Concrete Examples
1. Chat systems
2. IoT device coordination
3. Game entities

## TypeScript Example
```typescript
class CellActor {
  private state = { cycles: 0 };
  receive(msg: Message) {
    if (msg.type === 'CYCLE_COMPLETE') this.state.cycles++;
    if (msg.type === 'GET_STATE') msg.reply(this.state);
  }
}
mailbox.send(cellActor, { type: 'CYCLE_COMPLETE' });
```

## Architecture Questions
- What entities should become actors?
- What state does each actor own?
- What messages can each actor receive?
- How will actors be supervised after failure?
- How will message ordering and backpressure be handled?
- Does the system need high concurrency?

## When to Use
- Many independent entities process messages concurrently.
- State isolation is important.
- Failure supervision matters.
- Asynchronous message passing fits the domain.

## When NOT to Use
- The workflow is simple and synchronous.
- Shared transactions across many actors are required.
- The team cannot handle actor lifecycle and messaging complexity.
