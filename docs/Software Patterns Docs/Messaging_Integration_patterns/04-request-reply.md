# Request-Reply

## Core Idea
Request-Reply sends a request message and expects a related reply message, often over asynchronous messaging.

## Problem It Solves
- A sender needs a response from another component but communication still goes through messaging infrastructure.

## Main Diagram
```text
Client
  |
Request
  |
Implementation
```

## 3 Concrete Examples
1. **Credit Check:** Loan service sends a credit-check request and waits for a credit decision reply.
2. **Inventory Availability:** Order service requests inventory availability and receives a reply message.
3. **Document Conversion:** A client requests conversion and receives a reply with the converted file location.

## TypeScript Example
```typescript
const reply = await bus.request<{ available: boolean }>('inventory.check', { sku: 'CELL-18650' }, { timeout: 5000 });
if (!reply.available) throw new Error('Out of stock');
await orders.reserve({ sku: 'CELL-18650', qty: 1 });
```

## Architecture Questions
- Where should replies be sent?
- How is the request correlated to the reply?
- What timeout should the requester use?
- Is the requester blocked or async?
- What happens if the reply never arrives?
- Can duplicate replies occur?

## When to Use
- A response is required but messaging is the transport.
- The requester can use correlation and timeout handling.
- The responder can process asynchronously.

## When NOT to Use
- A normal synchronous call is simpler.
- Timeout and correlation handling are not designed.
- Replies are not actually required.
