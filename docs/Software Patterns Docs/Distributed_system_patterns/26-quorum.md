# Quorum

## Core Idea
Quorum requires a minimum number of participants to respond or agree before an operation succeeds.

## Problem It Solves
- A distributed system needs enough nodes to agree before accepting a read, write, or decision.

## Main Diagram
```text
Client -> Replica 1 -> Replica 2 -> Replica 3 -> Success after majority
```

## 3 Concrete Examples
1. **Replicated Database Write:** A write succeeds after 2 of 3 replicas acknowledge.
2. **Leader Election:** A candidate wins after majority votes.
3. **Distributed Read:** A read uses enough replicas to avoid stale data under configured consistency.

## TypeScript Example
```typescript
function write(key: string, value: string, replicas: Node[]) {
  const acks = replicas.filter(r => r.replicate(key, value));
  if (acks.length >= Math.floor(replicas.length / 2) + 1) return 'ok';
  throw new Error('Quorum not reached');
}
// Replicated Database Write:
```

## Architecture Questions
- What quorum size is required?
- How many failures must be tolerated?
- Are reads and writes quorum-based?
- What consistency level is needed?
- What happens if quorum cannot be reached?
- How are stale replicas repaired?

## When to Use
- Replicated systems need consistency control.
- You can tolerate some node failures.
- Majority agreement is meaningful.

## When NOT to Use
- Single-node systems.
- Low latency is more important than consistency.
- Network partitions are common and quorum failures would be unacceptable.
