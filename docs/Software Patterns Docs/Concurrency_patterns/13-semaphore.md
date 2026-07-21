# Semaphore

## Core Idea
Semaphore controls access to a limited number of permits for a shared resource.

## Problem It Solves
- Only a fixed number of tasks should access a resource concurrently.

## Main Diagram
```text
Tasks -> Semaphore Permits -> Limited Resource -> Wait / Block
```

## 3 Concrete Examples
1. **Database Connections:** Only 20 concurrent operations can use DB connections.
2. **API Rate Slot Control:** Only 5 threads can call a slow external API at once.
3. **File Upload Slots:** Only 3 uploads can run concurrently per user.

## TypeScript Example
```typescript
const sem = new Semaphore(5); // max 5 concurrent DB connections
async function query(sql: string) {
  await sem.acquire();
  try { return await db.query(sql); } finally { sem.release(); }
}
// Database Connections:
```

## Architecture Questions
- What resource is limited?
- How many permits are available?
- What happens when permits are exhausted?
- Are permits always released?
- Can starvation happen?
- Is a semaphore better than a queue or pool?

## When to Use
- A limited resource needs bounded concurrent access.
- Permits model resource capacity well.
- Blocking or waiting is acceptable.

## When NOT to Use
- Ownership must be tied to a specific lock holder.
- A pool or queue is clearer.
- Permits may leak due to poor release handling.
