# CQRS - Command Query Responsibility Segregation

## Core Idea
CQRS separates write operations that change state from read operations that query state.

## Problem It Solves
- A single model is struggling to handle both complex writes and optimized reads.

## Main Diagram
```text
Client -> Command API -> Query API -> Write Model -> Read Model
```

## 3 Concrete Examples
1. Commands update order state
2. Read model optimized for dashboards
3. Separate write model and query model

## TypeScript Example
```typescript
// Command side
async function createOrder(cmd: CreateOrder) { await writeDb.insert(cmd); await eventStore.append(cmd); }
// Query side
async function getOrderView(id: string) { return readDb.orders.find(id); }
// CQRS - Command Query Responsibility Segregation
await createOrder();
```

## Architecture Questions
- Are read and write needs very different?
- Do queries need denormalized views?
- Are write rules complex?
- Can the system tolerate eventual consistency between write and read models?
- How are read models updated?
- Is CQRS worth the extra complexity?

## When to Use
- Reads and writes have different performance or modeling needs.
- You need optimized read projections.
- Write-side business rules are complex.
- Eventual consistency is acceptable.

## When NOT to Use
- Simple CRUD is enough.
- Immediate consistency between reads and writes is mandatory everywhere.
- The team does not need separate models.
