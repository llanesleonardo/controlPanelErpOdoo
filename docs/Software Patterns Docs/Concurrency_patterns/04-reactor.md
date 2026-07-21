# Reactor

## Core Idea
Reactor waits for events and dispatches them to handlers synchronously, usually using an event loop.

## Problem It Solves
- A system needs to handle many I/O events without creating one thread per connection.

## Main Diagram
```text
Event Sources -> Event Demultiplexer -> Event Loop / Reactor -> Handler A -> Handler B
```

## 3 Concrete Examples
1. **Network Server:** A server waits for socket readiness and dispatches read/write handlers.
2. **GUI Event Loop:** UI events are dispatched to event handlers.
3. **Node.js-Style I/O:** An event loop dispatches callbacks when file or network events are ready.

## TypeScript Example
```typescript
const reactor = new EventEmitter();
const handlers = new Map<number, (data: Buffer) => void>();
reactor.on('readable', (fd) => handlers.get(fd)?.(read(fd)));
function register(fd: number, handler: (data: Buffer) => void) { handlers.set(fd, handler); }
```

## Architecture Questions
- What event source is monitored?
- Are handlers non-blocking?
- What happens if a handler blocks?
- How are errors handled?
- How is backpressure managed?
- Does the system need one loop or multiple loops?

## When to Use
- Many I/O events must be handled efficiently.
- Handlers can remain non-blocking.
- One or few event loops are preferred over many threads.

## When NOT to Use
- Handlers perform blocking work.
- CPU-heavy work dominates.
- The platform is completion-based and Proactor fits better.
