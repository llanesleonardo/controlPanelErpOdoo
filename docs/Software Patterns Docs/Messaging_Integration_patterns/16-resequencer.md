# Resequencer

## Core Idea
A Resequencer reorders messages that arrive out of sequence before forwarding them.

## Problem It Solves
- A downstream system requires messages in a specific order, but the messaging infrastructure may deliver them out of order.

## Main Diagram
```text
Out-of-Order Messages -> Resequencer Buffer -> Order by Sequence -> Ordered Messages
```

## 3 Concrete Examples
1. **Account Transactions:** Transactions must be applied in sequence number order.
2. **Workflow Steps:** StepCompleted events are resequenced before state projection.
3. **File Chunk Assembly:** File chunks arrive out of order and must be processed in order.

## TypeScript Example
```typescript
class Resequencer {
  private buffer = new Map<number, Message>();
  emit(seq: number, msg: Message) {
    this.buffer.set(seq, msg);
    while (this.buffer.has(this.next)) { deliver(this.buffer.get(this.next++)!); }
  }
  private next = 1;
}
```

## Architecture Questions
- What sequence field determines order?
- How long should the resequencer wait for missing messages?
- What happens when a message never arrives?
- Can messages be processed partially?
- Is ordering required globally or per key?
- How much buffering is acceptable?

## When to Use
- Messages can arrive out of order.
- Downstream processing requires order.
- Sequence IDs and buffering rules exist.

## When NOT to Use
- Ordering is not actually required.
- Missing messages are common and block progress.
- Buffering creates unacceptable latency.
