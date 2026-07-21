# Peer-to-Peer Architecture

## Core Idea
Peer-to-Peer Architecture connects nodes that can act as both clients and servers, sharing resources directly with each other.

## Problem It Solves
- A system needs decentralized communication, resource sharing, or resilience without relying entirely on a central server.

## Main Diagram
```text
Peer 1 -> Peer 2 -> Peer 3 -> Peer 4 -> Peer 5
```

## 3 Concrete Examples
1. File sharing networks
2. Blockchain networks
3. Collaborative peer synchronization

## TypeScript Example
```typescript
class Peer {
  private peers = new Set<Peer>();
  broadcast(msg: Message) { for (const p of this.peers) p.receive(msg); }
  receive(msg: Message) { if (!this.seen.has(msg.id)) { this.seen.add(msg.id); this.broadcast(msg); } }
}
// Peer-to-Peer Architecture
```

## Architecture Questions
- Do nodes need to communicate directly?
- How will peers discover each other?
- How will trust and identity be handled?
- How will data consistency be maintained?
- What happens when peers leave or fail?
- Is decentralization worth the complexity?

## When to Use
- Decentralization is required.
- Nodes can share resources directly.
- The system benefits from no single central dependency.
- Peers can tolerate partial failure and dynamic membership.

## When NOT to Use
- Central coordination is simpler and acceptable.
- Security, trust, and consistency requirements are strict.
- Clients are unreliable or resource-constrained.
