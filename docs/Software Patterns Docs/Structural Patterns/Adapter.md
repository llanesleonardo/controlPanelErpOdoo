# Adapter

## Core Idea
The **Adapter Pattern** is a structural design pattern used when one object has the functionality you need, but its interface does not match what your system expects.

## Problem It Solves
- Interface mismatch between client and existing code.
- Legacy or third-party APIs need a translation layer.
- Vendor-specific details should stay isolated from core logic.

## Main Diagram
```text
Client
  |
Adapter
  |
Implementation
```

## 3 Concrete Examples
1. An e-commerce application expects all payment providers to use this interface:
2. A new application expects a modern user service:
3. A product app wants to track events using a clean internal interface:

## TypeScript Example
```typescript
class LegacyXmlFeed { fetch(): string { return '<order id="1"/>'; } }
class OrderAdapter {
  constructor(private legacy: LegacyXmlFeed) {}
  getOrders(): Order[] { return parseXml(this.legacy.fetch()); }
}
const legacyXmlFeed = new LegacyXmlFeed();
```

## Architecture Questions
- Do we need to integrate with an existing external system?
- Does the external system have an interface we cannot change?
- Does our application already expect a stable internal interface?
- Are method names, parameter formats, or return values different?
- Should we isolate third-party API details from our business logic?
- Will we need to swap or add providers later?
- Can an adapter prevent vendor-specific code from spreading everywhere?

## When to Use
- You need to use an existing class, but its interface does not match what your system expects.
- You are integrating a third-party API.
- You are wrapping a legacy system.
- You want to isolate vendor-specific code.
- You want your application to depend on your own interface.
- You need to translate method names, parameters, return values, or data formats.
- You want to make old code usable in a new architecture.

## When NOT to Use
- The existing interface already matches what the client needs.
- You control both sides and can simply change the interface.
- You are only trying to hide complexity, not adapt compatibility.
- The adapter becomes a dumping ground for business logic.
- The translation rules are unclear or unstable.
- You need to add behavior while keeping the same interface.
