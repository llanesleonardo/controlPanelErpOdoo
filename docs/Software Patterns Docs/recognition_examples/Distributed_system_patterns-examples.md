# Distributed System Patterns — Three Examples Each

> Concrete examples for every pattern in [Distributed System Patterns INDEX](../Distributed_system_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Clients couple to many service endpoints and auth schemes | **API Gateway** | **1.** Kong routes `/api/*` to microservices with auth plugin. **2.** AWS API Gateway fronts Lambda and ECS backends. **3.** Mobile apps hit single gateway URL not 12 service hosts. |
| Cascading failures when dependencies hang or fail | **Circuit Breaker** | **1.** Stop calling failing payment API for 30s after 5 errors. **2.** Hystrix-style breaker on maps geocode dependency. **3.** Inventory service breaker open → show “try again” not hang. |
| Transient network blips cause user-visible failures | **Retry** | **1.** Retry idempotent GET on transient 503 from CDN. **2.** AWS SDK default retry on throttling. **3.** Mobile app retries photo upload on network blip. |
| Retries amplify load and trigger thundering herd | **Retry with Backoff** | **1.** Exponential backoff on Stripe rate limit 429. **2.** Kafka consumer retry with jitter on poison-ish messages. **3.** DNS resolver retry with increasing delay. |
| One slow dependency exhausts shared thread or connection pools | **Bulkhead** | **1.** Separate thread pool for payments vs catalog reads. **2.** Kubernetes resource limits per namespace. **3.** Judge worker pool isolated from web tier (LeetCode-style). |
| Cross-cutting concerns duplicated in every service codebase | **Sidecar** | **1.** Envoy sidecar handles mTLS for app container. **2.** Log shipping Fluent Bit sidecar per pod. **3.** Service mesh proxy intercepts outbound HTTP. |
| Hard-coded hosts break when instances move or scale | **Service Discovery** | **1.** Consul registers healthy `payment-v2` instances. **2.** Kubernetes DNS `orders.default.svc.cluster.local`. **3.** Eureka in Spring Cloud for dynamic service list. |
| Multiple nodes run the same singleton job | **Leader Election** | **1.** One scheduler pod elected leader runs cron jobs. **2.** ZooKeeper elects Kafka controller broker. **3.** etcd leader for Kubernetes control plane. |
| Split-brain writes corrupt shared state | **Consensus** | **1.** Raft replicates log across 3 etcd nodes. **2.** Paxos for distributed lock service. **3.** Quorum write in CockroachDB before ack. |
| Distributed steps leave partial state without compensation | **Saga** | **1.** Hold seat → pay → confirm ticket or release on failure. **2.** Food delivery: order → assign driver → deliver → capture payment. **3.** Franchise royalty: calculate → invoice → ACH with compensate steps. |
| DB commit succeeds but downstream message never sent | **Outbox** | **1.** Insert order + outbox row same TX; worker sends webhook. **2.** Ticket issued event in outbox → email worker. **3.** Payment captured → outbox → merchant notification. |
| Duplicate webhook or message delivery causes double processing | **Inbox** | **1.** Store webhook `eventId` before processing to dedup Stripe retries. **2.** POS sync inbox dedupes offline replay from Square device. **3.** Bank callback inbox prevents double ledger post. |
| Big-bang rewrite risks prolonged freeze and failure | **Strangler Fig** | **1.** Route 5% traffic to new checkout service; rest legacy. **2.** Replace monolith reports module with microservice incrementally. **3.** WordPress plugin gradually replaces old shortcodes. |
| Every client reimplements retries, TLS, and protocol translation | **Ambassador** | **1.** Local proxy handles retries to remote payment service. **2.** Client library ambassador adds tracing headers. **3.** Legacy app ambassador translates REST to internal gRPC. |
| Legacy or vendor models corrupt clean domain | **Anti-Corruption Layer** | **1.** Translate SAP IDoc to internal `PurchaseOrder` model. **2.** POS vendor feed ACL normalizes sales for royalty engine. **3.** EMR HL7 adapter protects clean appointment domain. |
| Inconsistent retries, TLS, and observability per service | **Service Mesh** | **1.** Istio policies mTLS and retries between all pods. **2.** Linkerd golden metrics per route without code changes. **3.** Consul connect encrypts east-west traffic. |
| Tail latency from single slow replica ruins p99 | **Request Hedging** | **1.** Send duplicate read to second replica if first slow > 50ms. **2.** Google Bigtable hedged reads for tail latency. **3.** Search queries hedge to backup index shard. |
| Abuse or burst traffic overwhelms backends | **Rate Limiting** | **1.** 100 req/min per API key at gateway. **2.** Login endpoint 10 attempts per IP per hour. **3.** OpenAI TPM limits per organization tier. |
| Bursty senders overwhelm receivers or downstream quotas | **Throttling** | **1.** Smooth outgoing webhook delivery at 50/sec to merchant. **2.** Client SDK throttles analytics batch sends. **3.** Admission control delays non-VIP requests in queue. |
| Retries create duplicate charges or side effects | **Idempotency** | **1.** `Idempotency-Key` on POST /charges prevents double charge. **2.** Ticket purchase retry returns same ticket id. **3.** Weekly royalty bill idempotent on `locationId:week`. |
| Concurrent writers corrupt shared mutable state | **Distributed Lock** | **1.** Redis lock on `auction:item:42` during bid. **2.** ZooKeeper lock for single-writer migration job. **3.** DynamoDB lock for leader election fallback. |
| Unfair or bursty traffic exceeds sustainable throughput | **Token Bucket** | **1.** API allows burst 20 then refill 10 tokens/sec. **2.** Shopify app rate limit per shop bucket. **3.** Crawler politeness 1 req/sec token per host. |
| Bursts exceed downstream or carrier capacity | **Leaky Bucket** | **1.** Outbound SMS queue drips messages at carrier max rate. **2.** Log shipper leaky bucket to indexing service. **3.** Video encoder output paced to streaming bitrate. |
| Failed workers keep assignments; coordinator cannot detect death | **Heartbeat** | **1.** Worker sends heartbeat every 30s; missed → job reassigned. **2.** Kubernetes kubelet heartbeat to control plane. **3.** Gaming server heartbeat to matchmaker. |
| Cluster membership and failure state stay stale | **Gossip Protocol** | **1.** Cassandra nodes gossip membership and failure detection. **2.** Consul serf gossip for agent health. **3.** Redis Cluster gossip slot map updates. |
| Minority partitions accept writes that should not commit | **Quorum** | **1.** Write ack after 2 of 3 replicas confirm. **2.** etcd quorum required for config change. **3.** Distributed lock service requires majority nodes. |
| Single shard cannot scale data or query load | **Sharding** | **1.** DynamoDB partition key sharding for orders table. **2.** Vitess shards MySQL by user id. **3.** Elasticsearch index shards for post search. |
| Node loss or read pressure without redundant copies | **Replication** | **1.** Multi-AZ RDS synchronous replica for failover. **2.** Kafka topic replication factor 3. **3.** Global CDN replicates static assets to POPs. |
| Cross-node sessions and hot keys miss shared cache | **Distributed Cache** | **1.** Redis Cluster for session store across nodes. **2.** Memcached ring for HTML fragment cache. **3.** Hazelcast replicated map for config. |
| Point-to-point service calls block and couple teams | **Event Bus** | **1.** Internal Kafka bus for domain events between teams. **2.** AWS EventBridge routes SaaS events to Lambdas. **3.** Google Pub/Sub for microservice choreography. |
| Schema coupling blocks independent service evolution | **Shared Database** | **1.** Legacy reporting and app share one Oracle schema (anti-pattern but common). **2.** Small startup team one Postgres for all services initially. **3.** WordPress plugins share `wp_posts` tables. |
| Shared schema lets one team break another’s data | **Database per Service** | **1.** Order service owns `orders_db`; catalog owns `products_db`. **2.** Each microservice private MongoDB collection set. **3.** Shopify shop data isolated per tenant shard logically. |

## Related

- [Risk-driven pattern selection](../risk-driven-patterns.md) — pick patterns by *risk*, not hype
- [Composition problems](../composition_problems/INDEX.md) — full system compositions
- [Cross-cutting concerns](../composition_problems/concerns/INDEX.md) — reads, writes, contention lenses

## How to use

1. Name the **risk** first (what breaks if you get it wrong).
2. Find the **pattern** that addresses that risk.
3. Read all three examples — notice *where* the pattern shows up (API, data, ops).
4. Open the pattern doc in this category for mechanics and TypeScript sketch.
5. Map one example to a [problem file](../composition_problems/INDEX.md) if you see a match.
