# Event Notification

## Core Idea
Event Notification sends a lightweight message that something happened, without carrying all the related state.

## Problem It Solves
- Consumers need to know that a change occurred but can fetch details from the source system if needed.

## Main Diagram
```text
Source System -> Event Notification: ID + Type -> Consumer -> Source API
```

## 3 Concrete Examples
1. **UserUpdated Notification:** A notification says user U123 changed; consumers fetch current user details if needed.
2. **InvoiceCreated Signal:** Billing publishes invoice ID, and consumers request full invoice data later.
3. **DocumentReady Notice:** Conversion service announces a document is ready using a document ID.

## TypeScript Example
```typescript
bus.publish('CustomerRegistered', { customerId: 'c1' });
bus.on('CustomerRegistered', (e) => crm.sync(e.customerId));
```

## Architecture Questions
- What minimum information must the notification carry?
- Where do consumers fetch details?
- Can the source state change before consumers fetch it?
- Do consumers need historical state or latest state?
- What if the detail lookup fails?
- Is event-carried state transfer better?

## When to Use
- Consumers only need to know something changed.
- Consumers can fetch details from the source.
- Events should stay small.

## When NOT to Use
- Consumers need full event state.
- Fetching details would overload the source.
- Latest-state lookup creates race conditions.
