# Consensus

## Core Idea
Consensus algorithms let distributed nodes agree on decisions such as leader identity, committed log entries, or configuration changes.

## Problem It Solves
- Distributed nodes need to agree on a value or state despite failures, delays, and partial network problems.

## Main Diagram
```text
Leader -> Follower 1 -> Follower 2 -> Follower 3 -> Committed Decision
```

## 3 Concrete Examples
1. **Distributed Database Replication:** Nodes agree on committed writes.
2. **Cluster Membership:** Nodes agree which members are active.
3. **Configuration Store:** A cluster agrees on configuration values.

## TypeScript Example
```typescript
function raftVote(term: number, candidate: string) {
  if (term > currentTerm) { currentTerm = term; votedFor = candidate; return true; }
  return false;
}
// Distributed Database Replication:
raftVote();
```

## Architecture Questions
- What value must nodes agree on?
- How many failures must the system tolerate?
- What quorum size is required?
- What consistency guarantees are needed?
- What happens under network partition?
- Is implementing consensus yourself avoidable?

## When to Use
- Strong agreement is required.
- Cluster metadata or writes must be consistent.
- You need fault-tolerant coordination.

## When NOT to Use
- Eventual consistency is enough.
- You can use a proven system instead.
- The team intends to implement a custom consensus algorithm casually.
