# Readers-Writers Lock

## Core Idea
Readers-Writers Lock allows multiple readers at the same time but gives writers exclusive access.

## Problem It Solves
- A shared resource has many reads and fewer writes, and normal mutex locking would reduce read concurrency.

## Main Diagram
```text
Shared Resource -> Read Lock -> Write Lock -> Reader 1 -> Reader 2
```

## 3 Concrete Examples
1. **Configuration Store:** Many threads read config while rare updates take exclusive lock.
2. **In-Memory Cache:** Many readers access cache entries while writers update them.
3. **Routing Table:** Network threads read routing data while occasional updates modify it.

## TypeScript Example
```typescript
class RwLock {
  private readers = 0; private writer = false;
  async read<T>(fn: () => T) { this.readers++; try { return fn(); } finally { this.readers--; } }
  async write<T>(fn: () => T) { await this.acquireWrite(); try { return fn(); } finally { this.writer = false; } }
}
// Configuration Store:
```

## Architecture Questions
- Is the workload read-heavy?
- Can multiple reads safely occur together?
- How are writers prevented from starving?
- How are lock upgrades/downgrades handled?
- Is a simpler mutex enough?
- How long are read and write locks held?

## When to Use
- Reads are frequent and writes are rare.
- Concurrent reads are safe.
- Exclusive writes are required.

## When NOT to Use
- Writes are frequent.
- Writer starvation is likely.
- A simple mutex is clearer and fast enough.
