# Idempotency

## Core Idea
Idempotency ensures the same request can be repeated without changing the result after the first successful execution.

## Problem It Solves
- Retries or duplicate requests can accidentally perform the same operation multiple times.

## Main Diagram
```text
Request with Idempotency Key -> (Idempotency Store) -> Process Operation -> Save Result -> Return Stored Result
```

## 3 Concrete Examples
1. **Payment Charge:** Same idempotency key prevents charging a customer twice.
2. **Order Creation:** Duplicate create-order requests return the same order.
3. **Message Consumer:** Processing the same event twice does not create duplicate side effects.

## TypeScript Example
```typescript
async function pay(idempotencyKey: string, amount: number) {
  const existing = await db.idempotency.get(idempotencyKey);
  if (existing) return existing.result;
  const result = await gateway.charge(amount);
  await db.idempotency.save(idempotencyKey, result);
  return result;
}
```

## Architecture Questions
- Which operations may be repeated?
- What key identifies the logical operation?
- Where are request outcomes stored?
- How long should idempotency records live?
- What response should duplicates receive?
- How are partial failures handled?

## When to Use
- Clients retry requests.
- Operations have side effects.
- Duplicate execution would be harmful.

## When NOT to Use
- Operations are naturally read-only.
- There is no stable operation key.
- The system cannot store operation results or status.
