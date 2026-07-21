# Distributed Lock

## Core Idea
A Distributed Lock coordinates access across processes or machines so only one actor holds the lock at a time.

## Problem It Solves
- Multiple nodes need exclusive access to a shared resource or critical section.

## Main Diagram
```text
Node A -> Node B -> (Lock Service) -> Shared Resource
```

## 3 Concrete Examples
1. **Single Job Runner:** Only one instance processes a scheduled job.
2. **Inventory Reservation:** Only one process modifies a scarce inventory item at a time.
3. **Migration Guard:** Only one node runs a schema/data migration.

## TypeScript Example
```typescript
async function withLock(key: string, fn: () => Promise<void>) {
  const token = await redis.set(key, '1', 'NX', 'EX', 30);
  if (!token) throw new Error('Lock held');
  try { await fn(); } finally { await redis.del(key); }
}
// Single Job Runner:
```

## Architecture Questions
- What resource requires exclusive access?
- How is the lock acquired and released?
- Does the lock have a timeout or lease?
- How is stale lock ownership handled?
- Do we need fencing tokens?
- Can the operation be redesigned to avoid locking?

## When to Use
- Exclusive access is necessary.
- A reliable coordination store exists.
- Critical sections are short and controlled.

## When NOT to Use
- You can use optimistic concurrency instead.
- Long-running locks are needed.
- Lock failure would corrupt data.
