# Space-Based Architecture

## Core Idea
Space-Based Architecture distributes processing and state across multiple processing units to avoid database bottlenecks and support high scalability.

## Problem It Solves
- A high-traffic system is bottlenecked by centralized database access and needs to scale horizontally under heavy load.

## Main Diagram
```text
Clients -> Load Balancer / Router -> Processing Unit 1 -> Processing Unit 2 -> Processing Unit 3
```

## 3 Concrete Examples
1. High-volume trading platform
2. Ticketing system during peak sale
3. Massive reservation system

## TypeScript Example
```typescript
class ProcessingUnit {
  private grid = new Map<string, Order>();
  process(order: Order) { this.grid.set(order.id, order); this.replicate(order); }
  replicate(order: Order) { peers.forEach(p => p.grid.set(order.id, order)); }
}
// Space-Based Architecture
```

## Architecture Questions
- Is the database the main bottleneck?
- Can state be partitioned across memory/data grids?
- How will data be synchronized with persistent storage?
- Can the system tolerate eventual consistency?
- How will partitions and conflicts be handled?
- Is the scale requirement high enough to justify this complexity?

## When to Use
- The system has extreme load.
- Central database bottlenecks block scaling.
- State can be partitioned or distributed.
- Eventual consistency is acceptable in parts of the system.

## When NOT to Use
- Normal database scaling is enough.
- Strong consistency is required everywhere.
- The team cannot operate distributed state systems.
- The scale problem is theoretical, not real.
