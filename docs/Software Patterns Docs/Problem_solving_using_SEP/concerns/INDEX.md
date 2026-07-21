# Cross-Cutting Concerns

**Technical lenses** for system design. Every [problem](../INDEX.md) uses several at once — use this index when you think *"I need proximity search"* rather than *"I need Yelp"*.

| # | Concern | One-line summary |
| --- | --- | --- |
| 1 | [Real-Time Updates](./01-real-time-updates.md) | Push live state via WebSocket/SSE + pub/sub |
| 2 | [Dealing with Contention](./02-dealing-with-contention.md) | Locks, CAS, sharding — one winner |
| 3 | [Multi-Step Processes](./03-multi-step-processes.md) | Saga, outbox, state machines |
| 4 | [Scaling Reads](./04-scaling-reads.md) | Cache, CDN, replicas, CQRS |
| 5 | [Scaling Writes](./05-scaling-writes.md) | Streams, partitions, async ingest |
| 6 | [Handling Large Blobs](./06-handling-large-blobs.md) | Object store, chunks, CDN |
| 7 | [Managing Long Running Tasks](./07-managing-long-running-tasks.md) | Queues, workers, leases, DLQ |
| 8 | [Proximity Search](./08-proximity-search.md) | Geo index, H3/geohash, nearest K |
| 9 | [Time Series Databases](./09-time-series-databases.md) | Metrics TSDB, rollups, retention tiers |
| 10 | [Data Structures for Big Data](./10-data-structures-for-big-data.md) | Bloom, ZSET, inverted index, OLAP — pick by access pattern |
| 11 | [Vector Databases](./11-vector-databases.md) | Embeddings, ANN, RAG, hybrid search |

## Learning path

```text
Patterns (mechanics)
    → Concerns (lens)          ← you are here
    → Problems (full systems)
    → Exercises (drills)
```

1. Pick a concern you weak on (e.g. **Vector DBs** for RAG).
2. Read the concern doc + skim linked problems.
3. Do the linked [exercise](../exercises/INDEX.md) if one exists.
4. Open a problem file and label which data structure or index it uses.

## Concern × problem matrix

| Concern | Start with these problems |
| --- | --- |
| Real-time | [#7](../07-realtime-chat-notifications.md), [#23](../23-uber-ride-hailing.md), [#20](../20-fb-live-comments.md) |
| Contention | [#2](../02-ticketmaster-style-event-booking.md), [#45](../45-order-fulfillment-pick-pack-ship.md) |
| Multi-step | [#37](../37-payment-system.md), [#49](../49-returns-reverse-logistics.md) |
| Scale reads | [#15](../15-fb-news-feed.md), [#35](../35-distributed-cache.md) |
| Scale writes | [#26](../26-ad-click-aggregator.md), [#38](../38-metrics-monitoring.md) |
| Large blobs | [#12](../12-dropbox-file-sync.md), [#8](../08-video-upload-transcoding-pipeline.md) |
| Long tasks | [#36](../36-job-scheduler.md), [#17](../17-leetcode.md) |
| Proximity search | [#28](../28-yelp-local-discovery.md), [#23](../23-uber-ride-hailing.md), [#16](../16-tinder.md) |
| Time series | [#38](../38-metrics-monitoring.md), [#31](../31-price-tracking-service.md), [#22](../22-youtube-top-k.md) |
| Big data structures | [#25](../25-web-crawler.md), [#22](../22-youtube-top-k.md), [#21](../21-fb-post-search.md) |
| Vector DB | [#39](../39-chatgpt-llm-platform.md), [#21](../21-fb-post-search.md), [RAG pattern](../../AI_Agentic_patterns/01-rag-retrieval-augmented-generation.md) |

## Concern clusters (study together)

| Cluster | Concerns | Why together |
| --- | --- | --- |
| **Location & discovery** | #8 Proximity, #4 Scale reads | Geo index + cache hot cells |
| **Observability & analytics** | #9 Time series, #5 Scale writes, #10 Data structures | Ingest firehose → rollups |
| **AI & search** | #11 Vector, #10 Inverted index, #4 Scale reads | Hybrid retrieval for RAG |
| **Marketplace / dispatch** | #8 Proximity, #1 Real-time, #2 Contention | Uber/Yelp/Delivery stack |

Back to [Problem index](../INDEX.md) · [Exercises](../exercises/INDEX.md)
