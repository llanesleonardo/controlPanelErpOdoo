# Producer-Consumer

## Core Idea
Producer-Consumer separates components that create work from components that process work, usually through a queue or buffer.

## Problem It Solves
- Work creation and work processing need to be decoupled so each can scale or fail independently.

## Main Diagram
```text
Producer A -> Producer B -> Queue / Buffer -> Consumer A -> Consumer B
```

## 3 Concrete Examples
1. **Video Encoding:** Upload service produces encoding jobs and worker consumers encode videos.
2. **Log Processing:** Applications produce logs and log processors consume them.
3. **Report Generation:** Users request reports and background consumers generate them.

## TypeScript Example
```typescript
const channel = new MessageChannel<{ cellId: string; voltage: number }>();
channel.subscribe('telemetry', async (reading) => await persist(reading));
channel.publish('telemetry', { cellId: 'C-1', voltage: 3.7 });
```

## Architecture Questions
- What work is produced?
- Who consumes the work?
- Can consumers scale horizontally?
- What happens if consumers are slower than producers?
- Is ordering important?
- How are poison messages handled?

## When to Use
- Work creation and work processing should scale separately.
- Background processing is needed.
- Consumers can process units of work independently.

## When NOT to Use
- Producer must immediately know final processing result.
- Work units are not independent.
- Queue buildup would hide overload.
