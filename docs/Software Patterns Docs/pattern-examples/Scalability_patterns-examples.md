# Scalability Patterns — Three Examples Each

> Concrete examples for every pattern in [Scalability Patterns INDEX](../Scalability_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Sticky sessions prevent horizontal scale-out | **Stateless Services** | **1.** REST API pods hold no session; JWT in client. **2.** Horizontally scaled checkout service any instance handles any cart. **3.** Lambda functions process events with no local state. |
| Single partition becomes hot spot or size limit | **Partitioning** | **1.** Kafka topic partitioned by `userId` for ordered per-user events. **2.** Time partition logs by day for cheap archival. **3.** Multi-tenant data partitioned by `tenantId` range. |
| One database cannot hold or serve growing dataset | **Sharding** | **1.** User accounts shard 0–999k on DB-A, 1M+ on DB-B. **2.** Ticket inventory shard by `eventId:section`. **3.** Chat messages shard by `conversationId` hash. |
| Single node failure or read overload takes system down | **Replication** | **1.** MySQL primary → two read replicas for reporting. **2.** Redis primary-replica for HA failover. **3.** S3 cross-region replication for disaster recovery. |
| Origin overloaded serving static assets globally | **CDN** | **1.** Cloudflare caches static JS/CSS at edge globally. **2.** Netflix serves video segments from nearest POP. **3.** Bitly redirect responses cached at edge for hot links. |
| Read traffic competes with write transactions on one store | **CQRS** | **1.** Write orders to OLTP; dashboard reads from ClickHouse projection. **2.** Feed writes post; timeline read from Redis fan-out cache. **3.** Bank commands to ledger; balance query from read model. |
| Analytics and public reads saturate OLTP primary | **Read Replica** | **1.** Analytics queries hit replica; checkout writes primary. **2.** WordPress public reads replica; admin writes primary. **3.** Search indexer consumes replica binlog. |
| Repeated DB hits under flash traffic | **Distributed Cache** | **1.** Redis cluster caches session and product catalog. **2.** Memcached in front of MySQL for hot keys. **3.** Hazelcast grid for near-cache across JVMs. |
| Traffic spikes overwhelm downstream capacity | **Queue-Based Load Leveling** | **1.** Flash sale orders enqueue; workers process at sustainable rate. **2.** Email burst queued instead of SMTP in request thread. **3.** LeetCode submissions queued for judge workers. |
| Fixed capacity wastes money or fails under surge | **Elastic Scaling** | **1.** K8s HPA adds API pods when CPU > 70%. **2.** AWS ASG scales transcode workers on queue depth. **3.** Serverless concurrency auto-scales function instances. |
| Single cache tier misses locality and cost tradeoffs | **Multi-Level Cache** | **1.** L1 in-process + L2 Redis + L3 CDN for product page. **2.** CPU L1/L2/L3 cache hierarchy analogy in app: browser → CDN → origin. **3.** ORM session cache + distributed cache + DB. |
| Remote data access dominates latency at scale | **Data Locality** | **1.** Spark runs compute on nodes holding HDFS blocks. **2.** Uber matches drivers using geo-sharded local indexes. **3.** Cassandra prefers local replica reads in same rack. |

## Related

- [Risk-driven pattern selection](../risk-driven-patterns.md) — pick patterns by *risk*, not hype
- [Problem solving using SEP](../Problem_solving_using_SEP/INDEX.md) — full system compositions
- [Cross-cutting concerns](../Problem_solving_using_SEP/concerns/INDEX.md) — reads, writes, contention lenses

## How to use

1. Name the **risk** first (what breaks if you get it wrong).
2. Find the **pattern** that addresses that risk.
3. Read all three examples — notice *where* the pattern shows up (API, data, ops).
4. Open the pattern doc in this category for mechanics and TypeScript sketch.
5. Map one example to a [problem file](../Problem_solving_using_SEP/INDEX.md) if you see a match.
