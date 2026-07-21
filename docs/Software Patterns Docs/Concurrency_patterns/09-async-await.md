# Async/Await

## Core Idea
Async/Await writes asynchronous code in a sequential style while the runtime handles suspension and resumption.

## Problem It Solves
- Callback or promise chains make asynchronous logic hard to read and error-prone.

## Main Diagram
```text
Client
  |
Async/Await
  |
Implementation
```

## 3 Concrete Examples
1. **API Call Flow:** Fetch user, then fetch orders, then return combined response using await.
2. **File Processing:** Await file read, transform content, then await file write.
3. **UI Data Loading:** Async function loads data without freezing the UI thread.

## TypeScript Example
```typescript
async function loadDashboard(userId: string) {
  const user = await db.users.find(userId);
  const orders = await db.orders.byUser(userId);
  return { user, orders };
}
// API Call Flow:
```

## Architecture Questions
- Which operations are truly asynchronous?
- What context resumes after await?
- How are errors handled?
- Can awaits run concurrently where possible?
- Could sequential awaits accidentally reduce performance?
- How is cancellation handled?

## When to Use
- Async workflows need readable control flow.
- The runtime supports suspension/resumption.
- I/O-bound operations should not block threads.

## When NOT to Use
- Operations are CPU-bound and should use workers instead.
- Sequential awaits accidentally serialize independent work.
- Blocking calls are hidden inside async functions.
