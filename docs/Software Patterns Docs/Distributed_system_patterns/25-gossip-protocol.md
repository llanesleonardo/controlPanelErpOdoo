# Gossip Protocol

## Core Idea
Gossip Protocol spreads information by having nodes periodically exchange state with random peers.

## Problem It Solves
- Cluster state needs to spread across many nodes without relying on one central coordinator.

## Main Diagram
```text
Node A -> Node B -> Node C -> Node D -> Node E
```

## 3 Concrete Examples
1. **Cluster Membership:** Nodes gossip which members are alive.
2. **Configuration Spread:** Config updates propagate gradually across nodes.
3. **Failure Suspicion:** Nodes share suspected failures with peers.

## TypeScript Example
```typescript
function gossip(node: Node) {
  const peer = randomPeer(node.peers);
  peer.merge(node.state); // eventually all nodes converge
}
// Cluster Membership:
gossip();
```

## Architecture Questions
- What information should be gossiped?
- How often should nodes gossip?
- How are peers selected?
- How is stale or conflicting state resolved?
- How fast must convergence happen?
- How much network overhead is acceptable?

## When to Use
- Large clusters need decentralized state spread.
- Eventual convergence is acceptable.
- Central coordination should be avoided.

## When NOT to Use
- Immediate consistency is required.
- The cluster is small and centralized state is simpler.
- Network overhead must be minimal.
