# Microservices Architecture

## Core Idea
Microservices split a system into independently deployable services, each owning a specific business capability.

## Problem It Solves
- A large system needs independent scaling, deployment, ownership, and failure isolation across business capabilities.

## Main Diagram
```text
Client -> API Gateway -> Order Service -> Payment Service -> Inventory Service
```

## 3 Concrete Examples
1. Order service
2. Payment service
3. Inventory service

## TypeScript Example
```typescript
const orderSvc = 'http://orders:3001';
const inventorySvc = 'http://inventory:3002';
async function placeOrder(item: string) {
  const stock = await fetch(`${inventorySvc}/check?item=${item}`);
  if (!stock.ok) throw new Error('Out of stock');
  return fetch(`${orderSvc}/orders`, { method: 'POST', body: JSON.stringify({ item }) });
}
```

## Architecture Questions
- Are the business boundaries clear and stable?
- Do teams need independent deployment?
- Does each service own its data?
- How will services communicate?
- How will distributed tracing, logging, retries, and failures be handled?
- Is the organization mature enough to operate distributed systems?

## When to Use
- Different capabilities need independent scaling.
- Different teams own different services.
- Independent deployment is valuable.
- Failure isolation is important.
- The organization has strong DevOps and observability practices.

## When NOT to Use
- The team is small and the domain boundaries are unclear.
- You are trying to fix messy code by distributing it.
- You do not have monitoring, tracing, CI/CD, and operational maturity.
- Transactions must stay simple and strongly consistent across many modules.
