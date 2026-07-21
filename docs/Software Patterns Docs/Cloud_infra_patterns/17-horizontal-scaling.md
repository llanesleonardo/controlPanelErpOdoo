# Horizontal Scaling

## Core Idea
Horizontal Scaling adds more service instances or nodes to handle more load.

## Problem It Solves
- One instance cannot handle demand, or availability requires multiple instances.

## Main Diagram
```text
Clients -> Load Balancer -> Instance 1 -> Instance 2 -> Instance 3
```

## 3 Concrete Examples
1. **API Replicas:** Increase API pods from 3 to 20 under traffic load.
2. **Worker Fleet:** Add more workers to process queue backlog faster.
3. **Database Read Replicas:** Add read replicas to scale read traffic.

## TypeScript Example
```typescript
const pool = { instances: 3 };
function addCapacity() { pool.instances += 1; deployReplica(pool.instances); }
function handleLoad(rps: number) { if (rps > 1000) addCapacity(); }
// API Replicas:
handleLoad();
// Horizontal Scaling adds more service instances or nodes to handle mor...
```

## Architecture Questions
- Can work be distributed across instances?
- Is the service stateless?
- What load balancer or routing is used?
- What shared dependencies become bottlenecks?
- How is scaling automated?
- How are instances monitored?

## When to Use
- Work can be distributed across instances.
- The service is stateless or externalizes state.
- More replicas improve throughput or availability.

## When NOT to Use
- The app stores local state.
- A shared dependency is the real bottleneck.
- Licensing or architecture prevents multiple instances.
