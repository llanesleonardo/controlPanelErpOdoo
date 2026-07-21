# Inbox

## Core Idea
The Inbox Pattern stores received message IDs before or during processing so duplicate messages can be detected and ignored.

## Problem It Solves
- Message consumers may receive duplicate messages and accidentally process the same event more than once.

## Main Diagram
```text
Message Broker -> Consumer -> (Inbox / Processed Messages) -> (Consumer Database)
```

## 3 Concrete Examples
1. **Payment Event Consumer:** Order service ignores duplicate PaymentAuthorized events.
2. **Email Consumer:** Notification service avoids sending the same email twice.
3. **Projection Builder:** Read model updater records processed event IDs.

## TypeScript Example
```typescript
async function handleMessage(msg: Message) {
  if (await inbox.exists(msg.id)) return; // already processed
  await process(msg);
  await inbox.markProcessed(msg.id);
}
// Payment Event Consumer:
```

## Architecture Questions
- Can messages be delivered more than once?
- What is the unique message ID?
- Where are processed IDs stored?
- Is processing atomic with inbox recording?
- How long should inbox records be retained?
- What happens if processing fails midway?

## When to Use
- Consumers need idempotent message handling.
- The broker provides at-least-once delivery.
- Duplicate side effects would be harmful.

## When NOT to Use
- Messages are naturally idempotent and duplicates do not matter.
- The system does not use async messages.
- There is no reliable message ID.
