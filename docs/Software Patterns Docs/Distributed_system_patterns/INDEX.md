# Distributed Systems

| Pattern | Definition |
| --- | --- |
| API Gateway | Sits between clients and backend services. |
| Circuit Breaker | Stops calls to failing dependencies temporarily. |
| Retry | Repeats a failed operation a limited number of. |
| Retry with Backoff | Waits longer between retry attempts. |
| Bulkhead | Isolates resources. |
| Sidecar | Is a companion process deployed alongside an. |
| Service Discovery | Lets clients locate available service instances. |
| Leader Election | Selects one node as the leader while others act. |
| Consensus | Algorithms let distributed nodes agree on. |
| Saga | Breaks a distributed transaction into a sequence. |
| Outbox | Writes the business change and outgoing message. |
| Inbox | Stores received message IDs before or during. |
| Strangler Fig | Wraps the old system and incrementally routes. |
| Ambassador | Acts as a helper proxy for a service. |
| Anti-Corruption Layer | Anti-Corruption Layer translates between your. |
| Service Mesh | Moves network concerns such as mTLS. |
| Request Hedging | Sends a duplicate request after a short delay. |
| Rate Limiting | Restricts how many requests are allowed over a. |
| Throttling | Controls request throughput by delaying. |
| Idempotency | Ensures the same request can be repeated without. |
| Distributed Lock | Coordinates access across processes or machines. |
| Token Bucket | Adds tokens at a fixed rate. |
| Leaky Bucket | Queues incoming requests and releases them at a. |
| Heartbeat | Sends periodic signals from one component to. |
| Gossip Protocol | Spreads information by having nodes periodically. |
| Quorum | Requires a minimum number of participants to. |
| Sharding | Partitions data across multiple shards. |
| Replication | Copies data from one node to others. |
| Distributed Cache | Stores frequently accessed data across a cache. |
| Event Bus | Carries events from producers to interested. |
| Shared Database | Means multiple parts of systems read or write. |
| Database per Service | Means each service owns its data store and other. |
