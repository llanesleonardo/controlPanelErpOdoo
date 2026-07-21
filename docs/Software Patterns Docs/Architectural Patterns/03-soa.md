# SOA - Service-Oriented Architecture

## Core Idea
SOA organizes enterprise systems around reusable services that expose business capabilities, often integrated through shared infrastructure such as an enterprise service bus.

## Problem It Solves
- An enterprise has many applications that need to share capabilities such as customer lookup, billing, identity, and reporting.

## Main Diagram
```text
CRM App -> Billing App -> Support App -> Enterprise Service Bus / Integration Layer -> Customer Service
```

## 3 Concrete Examples
1. Customer service reused by CRM and billing
2. Enterprise identity service
3. Shared billing service

## TypeScript Example
```typescript
interface OrderService { create(dto: OrderDto): Promise<OrderId>; }
interface BillingService { invoice(orderId: OrderId): Promise<void>; }
class OrderFacade {
  constructor(private orders: OrderService, private billing: BillingService) {}
  async checkout(dto: OrderDto) { const id = await this.orders.create(dto); await this.billing.invoice(id); }
}
```

## Architecture Questions
- Which services represent reusable enterprise capabilities?
- Will services be shared across multiple applications?
- Do we need orchestration or a service bus?
- How will service contracts be versioned?
- How will governance prevent service sprawl?
- Are services too coarse or too fine-grained?

## When to Use
- Multiple enterprise applications need shared business capabilities.
- Reuse and governance matter more than small autonomous teams.
- Legacy systems need integration behind service contracts.
- Enterprise workflows span multiple systems.

## When NOT to Use
- You only need a small product architecture.
- Governance would slow delivery without providing value.
- A centralized ESB would become a bottleneck or god system.
