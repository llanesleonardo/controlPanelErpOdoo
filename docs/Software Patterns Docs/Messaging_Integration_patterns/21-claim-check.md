# Claim Check

## Core Idea
Claim Check stores large message payloads externally and sends only a reference through the messaging system.

## Problem It Solves
- Messages are too large or sensitive to send directly through the broker.

## Main Diagram
```text
Producer -> (External Payload Store) -> Small Message with Claim Check -> Consumer
```

## 3 Concrete Examples
1. **Large Document Processing:** The document is stored in object storage and the message carries a file reference.
2. **Medical Image Workflow:** Large images stay in secure storage while messages carry claim IDs.
3. **Batch Import:** A large CSV is stored externally and processing messages reference it.

## TypeScript Example
```typescript
const ref = await blobStore.put(largePayload);
await queue.send({ type: 'ProcessReport', claimCheck: ref });
const payload = await blobStore.get(ref);
```

## Architecture Questions
- Where is the large payload stored?
- What reference is included in the message?
- Who can access the payload?
- How long should the payload be retained?
- What happens if the payload is missing?
- How is cleanup handled?

## When to Use
- Payloads are too large or sensitive for the broker.
- External payload storage is available.
- Consumers can retrieve payloads by reference.

## When NOT to Use
- Payloads are small.
- Consumers cannot access external storage.
- Reference lifecycle and cleanup are unclear.
