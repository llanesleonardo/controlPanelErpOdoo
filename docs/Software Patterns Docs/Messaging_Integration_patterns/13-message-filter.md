# Message Filter

## Core Idea
A Message Filter removes messages that do not meet specified criteria.

## Problem It Solves
- A consumer or downstream system should receive only relevant messages, not all messages from a channel.

## Main Diagram
```text
Message Stream -> Message Filter -> Accepted Messages -> Discarded / Ignored
```

## 3 Concrete Examples
1. **High-Value Orders:** Only orders over $1,000 continue to fraud review.
2. **Region Filter:** A regional service receives only events for its region.
3. **Noise Reduction:** Debug-level telemetry is filtered before reaching expensive storage.

## TypeScript Example
```typescript
const highValue = stream.filter(m => m.type === 'OrderCreated' && m.payload.total > 1000);
highValue.forEach(m => priorityQueue.send(m));
```

## Architecture Questions
- What criteria make a message relevant?
- Should filtered messages be discarded or sent elsewhere?
- Where should filtering happen?
- Can filtering accidentally remove needed events?
- Are filter rules configurable?
- How will filtering be monitored?

## When to Use
- Downstream consumers should receive only relevant messages.
- Filtering criteria are clear.
- Dropping or diverting messages is acceptable.

## When NOT to Use
- Filtered messages may be needed later.
- Rules are unclear.
- Filtering should happen at the producer instead.
