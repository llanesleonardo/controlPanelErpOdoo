# Double Buffer

## Core Idea
Double Buffer uses two buffers so one can be read/displayed while the other is written/updated.

## Problem It Solves
- Readers can see partially updated data or displays can flicker while data is being changed.

## Main Diagram
```text
Writer -> Back Buffer -> Atomic Swap -> Front Buffer -> Reader / Display
```

## 3 Concrete Examples
1. **Graphics Rendering:** Render next frame into a back buffer, then swap to display.
2. **Telemetry Snapshot:** Writer fills one buffer while readers read a stable previous snapshot.
3. **Audio Processing:** One buffer plays while the next buffer is filled.

## TypeScript Example
```typescript
let front: Frame = renderA();
let back: Frame = renderB();
function swap() { [front, back] = [back, front]; display(front); }
requestAnimationFrame(() => { back = computeNext(back); swap(); });
// Graphics Rendering:
// Double Buffer uses two buffers so one can be read/displayed while the...
```

## Architecture Questions
- What data must be stable while being read?
- When is the buffer swap safe?
- Who owns the front buffer and back buffer?
- Is locking needed during swap?
- What happens if producer is faster than consumer?
- Is two buffers enough or is a ring buffer needed?

## When to Use
- Readers need stable snapshots while writers update.
- Rendering or streaming should avoid partial updates.
- Atomic swapping is practical.

## When NOT to Use
- One buffer is enough.
- Memory overhead is unacceptable.
- Swap consistency cannot be guaranteed.
