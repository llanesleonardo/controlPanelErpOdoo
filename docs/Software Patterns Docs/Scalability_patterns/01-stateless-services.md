# Stateless Services

## Core Idea
Stateless Services avoid storing client/session-specific state inside service instances so any replica can handle any request.

## Problem It Solves
- Services that store local session state are hard to scale horizontally, replace, restart, or load-balance safely.

## Main Diagram
```text
Client -> Load Balancer -> Service Instance A -> Service Instance B -> Service Instance C
```

## 3 Concrete Examples
1. **API Replica Scaling:** A backend API runs 20 replicas behind a load balancer because all user/session state lives in tokens or external storage.
2. **Container Restart Safety:** A crashed container can be replaced without losing workflow state because the service instance stores no durable state locally.
3. **Serverless Request Handling:** Each function invocation reads needed state from a database or object store instead of relying on local process memory.

## TypeScript Example
```typescript
class OrderApi {
  // No local session state — any replica can serve any request
  async create(req: Request) {
    const order = { ...req.body, id: crypto.randomUUID() };
    await db.orders.insert(order);
    return order;
  }
}
```

## Architecture Questions
- What state is currently stored inside the service instance?
- Where should session, workflow, cache, or user state live instead?
- Can any replica handle any request?
- Does the service need sticky sessions?
- What happens if an instance dies mid-request?
- Is local cache safe to lose?

## When to Use
- You need horizontal scaling.
- Instances should be replaceable and load-balanced.
- State can live in external stores or tokens.

## When NOT to Use
- Local durable state is required.
- Externalizing state creates worse latency or complexity.
- Sticky sessions are unavoidable.
