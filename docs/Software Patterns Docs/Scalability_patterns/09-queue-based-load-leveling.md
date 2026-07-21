# Queue-Based Load Leveling

## Core Idea
Queue-Based Load Leveling places a queue between producers and consumers to absorb spikes and let workers process at a controlled rate.

## Problem It Solves
- Traffic spikes overwhelm downstream workers or dependencies when work is processed immediately.

## Main Diagram
```text
Producer -> Queue -> Worker 1 -> Worker 2 -> Worker 3
```

## 3 Concrete Examples
1. **Order Processing Queue:** Checkout enqueues fulfillment work so warehouse processing can run at a stable pace.
2. **Email Sending Queue:** A campaign creates many email jobs, but workers send them gradually.
3. **Image Processing Queue:** Upload bursts are buffered while workers resize images at controlled throughput.

## TypeScript Example
```typescript
app.post('/jobs', (req, res) => { queue.push(req.body); res.status(202).end(); });
setInterval(() => workers.drain(queue, 10), 1000);
```

## Architecture Questions
- What workload should be buffered?
- How large can the queue grow?
- What is acceptable processing delay?
- How many workers are needed?
- What happens when the queue is full?
- How are retries and poison messages handled?

## When to Use
- Producers create bursts of work.
- Consumers need controlled throughput.
- Delayed processing is acceptable.

## When NOT to Use
- Work must complete synchronously.
- Queue delay is unacceptable.
- Backlog growth would hide system failure.
