# Dead Letter Queue

## Core Idea
A Dead Letter Queue stores messages that cannot be delivered or processed successfully after configured attempts.

## Problem It Solves
- Failed messages should not block normal processing or disappear without investigation.

## Main Diagram
```text
Main Queue -> Consumer -> Retry Attempts -> Dead Letter Queue
```

## 3 Concrete Examples
1. **Poison Order Message:** A malformed order event fails repeatedly and is moved to a DLQ.
2. **Email Failure:** A notification job with invalid recipient data goes to a DLQ after retries.
3. **Schema Mismatch:** A consumer cannot parse a new event version, so the message is dead-lettered.

## TypeScript Example
```typescript
try { await process(msg); await queue.ack(msg); }
catch (e) { await dlq.send({ original: msg, error: String(e), attempts: msg.attempts + 1 }); }
```

## Architecture Questions
- What failures move a message to the DLQ?
- How many retries happen first?
- Who monitors the DLQ?
- Can messages be replayed after fixing the issue?
- How are poison messages diagnosed?
- How long are DLQ messages retained?

## When to Use
- Messages can fail repeatedly.
- Poison messages should not block processing.
- Failures need investigation and replay.

## When NOT to Use
- Failures are already handled safely.
- No one will monitor or act on the DLQ.
- Messages contain no useful diagnostic information.
