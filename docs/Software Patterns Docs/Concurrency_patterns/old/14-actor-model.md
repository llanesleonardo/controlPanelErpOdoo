# Actor Model

## Core Idea

Actor Model organizes concurrency around isolated actors that own state and communicate by messages.

---

## Problem It Solves

Shared mutable state and locks make concurrent code hard to reason about.

---

## 3 Concrete Examples

### Example 1: Chat Room Actor

Each chat room actor owns messages and participants.

### Example 2: Game Entity Actor

Each game entity processes its own movement and interaction messages.

### Example 3: IoT Device Actor

Each device actor owns state and receives commands/readings.

---

## Architect Questions

- What entities should become actors?
- What state does each actor own?
- What messages can it receive?
- How are actors supervised?
- How are slow actors handled?
- What ordering guarantees exist per actor mailbox?

---

## Main Diagram

```mermaid
flowchart TD
    A1[Actor A]
    A2[Actor B]
    A3[Actor C]
    M1[Mailbox A]
    M2[Mailbox B]
    M3[Mailbox C]

    A1 -->|message| M2 --> A2
    A2 -->|message| M3 --> A3
    A3 -->|message| M1 --> A1
```

---

## Runtime / Responsibility Flow

```mermaid
sequenceDiagram
    participant Caller as Caller / Producer
    participant Pattern as Actor Model
    participant Worker as Worker / Runtime

    Caller->>Pattern: submit work / event / async operation
    Pattern->>Pattern: coordinate concurrency rule
    Pattern->>Worker: execute / dispatch / synchronize
    Worker-->>Pattern: result / completion
    Pattern-->>Caller: result / signal / callback
```

---

## Implementation Shape

```txt
1. Identify the concurrency problem: throughput, latency, isolation, synchronization, or resource control.
2. Define the unit of work.
3. Define ownership of shared state.
4. Define execution model: threads, tasks, event loop, actors, workers, or async operations.
5. Define synchronization and backpressure behavior.
6. Define failure behavior: cancellation, timeout, retry, poison work, and shutdown.
7. Add observability: queue depth, worker utilization, latency, deadlocks, blocked time, and error rates.
```

---

## When to Use

- State should be isolated per actor.
- Message passing fits the domain.
- You want to reduce shared-memory locking.

---

## When Not to Use

- Strong transactions across many actors are required.
- Message ordering and supervision are not understood.
- The workflow is simple synchronous code.

---

## Common Smell That Suggests This Pattern

```txt
The current design is blocked, overloaded, race-prone, wasting threads,
or mixing work creation, execution, and synchronization in one tangled place.
```

---

## Common Mistakes

```txt
Using concurrency before the bottleneck is real.

Sharing mutable state without clear ownership.

Ignoring backpressure.

Ignoring cancellation and shutdown.

Creating unbounded queues.

Blocking inside event loops or async handlers.

Assuming parallelism always makes code faster.
```

---

## Best Visual Summary

```mermaid
flowchart LR
    PROBLEM[Concurrency Problem]
    PATTERN[Actor Model]
    RESULT[Controlled Execution / Synchronization]

    PROBLEM --> PATTERN
    PATTERN --> RESULT
```

## Final Meaning

Actor Model is useful when it solves a real concurrency pressure. If the workload is simple, this pattern may add complexity without improving correctness or performance.
