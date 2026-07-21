# Message Bus

## Core Idea
A Message Bus provides a shared communication backbone where applications exchange messages using common standards and routing.

## Problem It Solves
- Many applications need to communicate without point-to-point integration becoming unmanageable.

## Main Diagram
```text
Message Bus -> CRM -> ERP -> Billing -> Support
```

## 3 Concrete Examples
1. **Enterprise App Bus:** CRM, ERP, billing, and support systems exchange messages through a shared bus.
2. **Internal Platform Bus:** Company services publish and consume integration events on a standard bus.
3. **Legacy Modernization:** Old systems and new systems are connected through a bus during migration.

## TypeScript Example
```typescript
bus.registerHandler('CreateInvoice', billing.handle);
bus.registerHandler('CreateInvoice', analytics.track);
bus.send({ type: 'CreateInvoice', orderId: '42' });
```

## Architecture Questions
- What systems connect to the bus?
- What message standards are enforced?
- Does the bus route, transform, or only transport?
- Who governs schemas and topics?
- How is access controlled?
- Can the bus become a centralized bottleneck?

## When to Use
- Many enterprise systems need a shared communication backbone.
- Common message standards are valuable.
- Governance and interoperability matter.

## When NOT to Use
- A simple broker or API integration is enough.
- Governance would slow delivery without value.
- The bus becomes a bottleneck or dumping ground.
