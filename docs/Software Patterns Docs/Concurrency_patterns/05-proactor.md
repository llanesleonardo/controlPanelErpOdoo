# Proactor

## Core Idea
Proactor starts asynchronous operations and dispatches completion events when the operations finish.

## Problem It Solves
- A system needs high concurrency where the OS or runtime performs async operations and notifies completion.

## Main Diagram
```text
Application -> Async Operation Processor -> OS / Runtime -> Completion Event -> Completion Handler
```

## 3 Concrete Examples
1. **Async File I/O:** Application starts file reads and handles completion callbacks.
2. **High-Performance Network Server:** Socket operations complete asynchronously and trigger completion handlers.
3. **Windows IOCP:** I/O completion ports notify workers when operations finish.

## TypeScript Example
```typescript
async function proactorRead(socket: Socket) {
  const buf = await socket.read(); // OS completes I/O, then completion handler runs
  await handleRequest(buf);
  proactorRead(socket); // re-arm
}
// Async File I/O:
```

## Architecture Questions
- Which operations can run asynchronously?
- Who initiates the async operation?
- Where are completions delivered?
- How are buffers and lifetimes managed?
- How are failures represented in completion events?
- Is the platform better suited to Reactor or Proactor?

## When to Use
- The OS/runtime can perform async operations.
- Completion-based processing fits the platform.
- High concurrency I/O is needed.

## When NOT to Use
- The platform does not support useful async completions.
- Operation lifetimes are hard to manage safely.
- A Reactor model is simpler.
