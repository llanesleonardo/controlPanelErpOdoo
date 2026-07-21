# Observer

## Core Idea
Observer lets objects subscribe to changes from a subject and get notified when state changes.

## Problem It Solves
- Multiple UI elements or objects need to react to changes without being tightly coupled to the source.

## Main Diagram
```text
Subject / Observable -> Observer A -> Observer B -> Observer C -> State Change
```

## 3 Concrete Examples
1. **Form Field Updates:** Validation messages and submit button state react when form values change.
2. **Theme Changes:** Multiple components update when the app theme changes.
3. **Model-View Updates:** Views subscribe to model changes and refresh when data changes.

## TypeScript Example
```typescript
class Observable<T> {
  private subs = new Set<(v: T) => void>();
  subscribe(fn: (v: T) => void) { this.subs.add(fn); return () => this.subs.delete(fn); }
  next(v: T) { this.subs.forEach(fn => fn(v)); }
}
// Form Field Updates:
```

## Architecture Questions
- What object is observed?
- Who subscribes to changes?
- What event payload is sent?
- How are subscriptions removed?
- Can notification order matter?
- Could too many observers make flow hard to trace?

## When to Use
- Multiple objects need to react to state changes.
- The subject should not know concrete observers.
- Loose event notification is useful.

## When NOT to Use
- Notification flow becomes impossible to trace.
- Observers are not unsubscribed and leak memory.
- Strict ordering or transactions are required.
