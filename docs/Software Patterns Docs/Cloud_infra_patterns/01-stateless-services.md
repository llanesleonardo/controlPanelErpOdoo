# Stateless Services

## Core Idea
Stateless Services do not store client/session-specific state inside the service instance between requests.

## Problem It Solves
- Services that keep local session state are hard to scale, replace, restart, and load-balance.

## Main Diagram
```text
Client -> Load Balancer -> Service Instance A -> Service Instance B -> Service Instance C
```

## 3 Concrete Examples
1. **Web API Replicas:** Any API replica can handle any request because session data is stored in a shared store or token.
2. **Containerized Backend:** A crashed container can be replaced without losing user workflow state.
3. **Serverless Function:** Each invocation reads needed state from external storage instead of relying on local memory.

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
- What state currently lives inside the service instance?
- Where should session, cache, workflow, or user state live instead?
- Can any replica handle any request?
- What happens when an instance is killed mid-request?
- Is local cache safe to lose?
- How will authentication/session identity be restored per request?

## When to Use
- You want easy horizontal scaling.
- Instances may restart or be replaced frequently.
- Any request should be routable to any replica.

## When NOT to Use
- The service fundamentally owns local durable state.
- Externalizing state would make the system worse.
- Sticky sessions are unavoidable and accepted.
