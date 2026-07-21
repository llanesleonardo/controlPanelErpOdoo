# Event Loop

## Core Idea
Event Loop repeatedly waits for events, dispatches handlers, and continues without blocking the main execution thread.

## Problem It Solves
- A program needs to handle many asynchronous events using a small number of threads.

## Main Diagram
```text
Event Queue -> Event Loop -> Event Handler -> Async Operation -> Next Event
```

## 3 Concrete Examples
1. **JavaScript Runtime:** The event loop handles timers, network callbacks, and UI events.
2. **GUI Application:** The UI event loop dispatches clicks, keyboard input, and repaint events.
3. **Async Server:** A server event loop handles many socket events.

## TypeScript Example
```typescript
queueMicrotask(() => console.log('micro'));
setTimeout(() => console.log('timer'), 0);
console.log('sync');
// Output: sync -> micro -> timer
// JavaScript Runtime:
// Event Loop repeatedly waits for events, dispatches handlers, and cont...
```

## Architecture Questions
- What events enter the loop?
- Are handlers non-blocking?
- What queues exist: timers, I/O, microtasks?
- How are long-running tasks offloaded?
- How is starvation avoided?
- What happens when a handler throws?

## When to Use
- Many async events must be handled with few threads.
- Handlers can avoid blocking.
- The platform uses event-driven execution.

## When NOT to Use
- Handlers block or do CPU-heavy work.
- Long tasks freeze the loop.
- Multi-threaded blocking design is simpler for the problem.
