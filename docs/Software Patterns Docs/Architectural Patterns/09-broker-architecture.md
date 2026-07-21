# Broker Architecture

## Core Idea
Broker Architecture uses a broker to coordinate communication between clients and services so they do not need to know each other's location or implementation.

## Problem It Solves
- Clients need to call services in a distributed system without being tightly coupled to service locations, protocols, or implementations.

## Main Diagram
```text
Client A -> Client B -> Broker -> Service A -> Service B
```

## 3 Concrete Examples
1. Message broker
2. Object request broker
3. Service registry and broker

## TypeScript Example
```typescript
class MessageBroker {
  private subs = new Map<string, Handler[]>();
  subscribe(topic: string, h: Handler) { (this.subs.get(topic) ??= []).push(h); }
  publish(topic: string, msg: unknown) { this.subs.get(topic)?.forEach(h => h(msg)); }
}
// Broker Architecture
```

## Architecture Questions
- Who discovers services?
- Should clients know service locations?
- What protocol does the broker mediate?
- Is communication synchronous or asynchronous?
- Can the broker become a bottleneck?
- How will routing, retries, and failures be handled?

## When to Use
- Distributed components need decoupled communication.
- Service location should be hidden.
- Routing or mediation is needed.
- Clients and services should evolve independently.

## When NOT to Use
- Direct calls are simpler and sufficient.
- The broker would become a single point of failure.
- The system cannot tolerate broker latency or operational complexity.
