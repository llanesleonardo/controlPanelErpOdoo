import fs from 'fs';
import path from 'path';

const outDir = path.resolve('../Problem_solving_using_SEP/concerns');

const concerns = [
  {
    file: '01-real-time-updates.md',
    title: 'Real-Time Updates',
    tagline: 'Push fresh state to clients in seconds — without melting your database.',
    definition: `Users expect **live** data: chat messages, delivery map pins, stock prices, live comments, collaborative cursors. "Real-time" usually means **sub-second to few-second** delivery, not necessarily microsecond latency.`,
    symptoms: `- Client polls REST every 2s → DB overload\n- WebSocket hub is one giant process → can't scale viral stream\n- Stale ETA on delivery map → support calls\n- User sees own message twice or out of order`,
    naive: `| If you only use… | What breaks |\n| --- | --- |\n| HTTP polling | N × users RPS; battery drain; stale UI |\n| Single WebSocket server | Hot event (live stream) melts one node |\n| Push full row on every tick | Bandwidth and serialization cost |\n| No presence / subscription model | Fan-out to offline users wastes work |`,
    need: '**Pub/Sub or event stream**, **WebSocket/SSE gateway**, **CQRS read projections**, **delta updates**, and **push fallback** (FCM/APNs).',
    mermaid: `flowchart TD
    Source["State change<br/>(order, message, GPS)"]
    Event["Event bus / stream"]
    Projector["Read projector<br/>(optional CQRS)"]
    Fanout["Fan-out service<br/>(by room / topic / user)"]
    Gateway["WebSocket / SSE gateway"]
    Push["Push fallback<br/>(offline users)"]
    Client["Client UI"]

    Source --> Event --> Projector
    Event --> Fanout --> Gateway --> Client
    Fanout --> Push`,
    patterns: `| Transport | [Pub/Sub](../Messaging_Integration_patterns/01-publish-subscribe.md), [Event Notification](../Messaging_Integration_patterns/10-event-notification.md) | Topic per room/order |
| Connection | WebSocket / SSE at edge | Persistent client channel |
| Read path | [CQRS](../Scalability_patterns/06-cqrs.md) | Write DB ≠ push payload |
| Scale | [Partitioning](../Scalability_patterns/02-partitioning.md), shard by \`roomId\` | Viral stream isolation |
| Offline | [Queue](../Messaging_Integration_patterns/02-queue.md), push adapters | Store-and-forward |
| Resilience | [Load Shedding](../Resilience_Pattern/08-load-shedding.md) | Sample low-priority viewers |`,
    problems: `| Problem | What updates in real time |
| --- | --- |
| [#7 Chat](../07-realtime-chat-notifications.md) | Messages, unread counts |
| [#18 WhatsApp](../18-whatsapp.md) | Delivery receipts, multi-device |
| [#4 / #13 / #23 Delivery & Uber](../04-food-delivery-dispatch.md) | Order status, GPS, ETA |
| [#20 Live Comments](../20-fb-live-comments.md) | Comment stream on viral video |
| [#33 Robinhood](../33-robinhood-trading.md) | Quote ticks |
| [#34 Google Docs](../34-google-docs-collaboration.md) | Keystrokes, cursors |
| [#29 Strava](../29-strava-fitness-tracking.md) | Activity feed, live segments |`,
    drill: `**Design drill (5 min):** Food delivery app — customer sees driver on map. List: (1) event source, (2) topic key, (3) why not poll every 1s, (4) one failure if WebSocket drops.`,
    beforeTest: `| Naive build | Symptom before tests | Fix |\n| --- | --- | --- |\n| Poll \`GET /order\` every second | DB CPU graph spikes at dinner | WebSocket + event on status change |\n| Broadcast GPS to all users | Wrong privacy + wasted bandwidth | Subscribe only to \`order:{id}\` |\n| Full order JSON every GPS tick | Mobile data + janky map | Delta: \`{ lat, lng, eta }\` only |`,
    exercise: '[48 Helpdesk](../exercises/48-helpdesk.md) (agent notify) · Problem [#7](../07-realtime-chat-notifications.md)',
  },
  {
    file: '02-dealing-with-contention.md',
    title: 'Dealing with Contention',
    tagline: 'Many actors want the same resource at once — exactly one must win.',
    definition: `**Contention** happens when concurrent requests compete for one ** scarce resource**: a seat, a bin qty, a match pair, an auction lot, inventory row, or hot cache key. Goal: **correctness first** (no double sell), then **throughput** (don't serialize the world).`,
    symptoms: `- Two users "success" on same seat\n- Inventory goes negative\n- DB deadlocks on hot rows\n- p99 latency spikes when one key is hot`,
    naive: `| If you only use… | What breaks |\n| --- | --- |\n| Global DB table lock | Entire site serializes |\n| Optimistic lock without retry UX | Random "try again" for users |\n| Lock entire event/warehouse | Throughput collapses |\n| Application-level mutex on one server | Multi-node race remains |`,
    need: '**Fine-grained locks**, **compare-and-set**, **sharding** to spread hot keys, **fail-fast** UX, and **idempotent retries**.',
    mermaid: `flowchart TD
    ReqA["Request A"]
    ReqB["Request B"]
    Shard["Shard router<br/>(eventId:seatId)"]
    Lock["Atomic op<br/>(CAS / distributed lock)"]
    Store["Inventory / hold store"]
    Win["One winner"]
    Lose["Fail fast: unavailable"]

    ReqA --> Shard --> Lock
    ReqB --> Shard --> Lock
    Lock -->|success| Win --> Store
    Lock -->|fail| Lose`,
    patterns: `| Atomicity | [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md), compare-and-set | Per resource key |
| Partition | [Sharding](../Scalability_patterns/03-sharding.md), [Partitioning](../Scalability_patterns/02-partitioning.md) | Spread hot sections |
| UX | [Fail Fast](../Resilience_Pattern/05-fail-fast.md) | Immediate "taken" |
| Retry | [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Safe client retry |
| Audit | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Prove who won |`,
    problems: `| Problem | What's contended |
| --- | --- |
| [#2 Ticketmaster](../02-ticketmaster-style-event-booking.md) | Same seat |
| [#16 Tinder](../16-tinder.md) | Mutual match creation |
| [#30 Auction](../30-online-auction.md) | High bid |
| [#10 Inventory](../10-global-inventory-sync.md) | Stock qty |
| [#45 Fulfillment](../45-order-fulfillment-pick-pack-ship.md) | Bin pick qty |
| [#4 / #23 Dispatch](../23-uber-ride-hailing.md) | Assign driver to order |`,
    drill: `**Design drill:** 500k users, 1 seat left. Where is the lock key? Why not lock the whole venue?`,
    beforeTest: `| Naive build | Symptom | Fix |\n| --- | --- | --- |\n| \`UPDATE ... WHERE available\` race | Two tickets same seat | CAS on \`seatId\` |\n| Redis LOCK global | 1 op/sec worldwide | Shard by section |\n| No idempotent hold retry | Duplicate holds same user | Idempotency-Key |`,
    exercise: '[02 Ticketmaster](../exercises/02-ticketmaster.md) · [45 Fulfillment](../exercises/45-order-fulfillment-pick-pack-ship.md)',
  },
  {
    file: '03-multi-step-processes.md',
    title: 'Multi-Step Processes',
    tagline: 'Business flows span services and time — one HTTP call cannot own the whole story.',
    definition: `A **multi-step process** crosses **multiple services or minutes/hours**: place order → pay → ship → notify; hold seat → charge → issue ticket; approve PO → receive → match invoice → pay. Steps can **fail independently**; you need clear **state**, **compensation**, and **at-least-once safety**.`,
    symptoms: `- User charged but order not created\n- Payment OK, ticket never emailed\n- Stuck in \`PENDING\` forever\n- Duplicate side effects on retry`,
    naive: `| If you only use… | What breaks |\n| --- | --- |\n| One big synchronous HTTP chain | Cascading timeouts; partial failure orphan |\n| Fire-and-forget after step 1 | No recovery; lost money/data |\n| Manual ops to fix stuck rows | Doesn't scale; no audit |\n| Retry whole chain blindly | Double charge / double ship |`,
    need: '**Saga** (orchestrated/choreographed), **state machine**, **Outbox**, **idempotency**, **Job Scheduler** for timeouts.',
    mermaid: `flowchart LR
    S1["Step 1<br/>Hold / Authorize"]
    S2["Step 2<br/>Charge / Confirm"]
    S3["Step 3<br/>Fulfill / Notify"]
    Comp["Compensate<br/>(release / refund)"]
    Outbox["Outbox"]

    S1 --> S2 --> S3
    S2 -->|fail| Comp
    S3 --> Outbox`,
    patterns: `| Orchestration | [Saga](../Distributed_system_patterns/10-saga.md), state machine | Forward + compensate |
| Messaging | [Outbox](../Distributed_system_patterns/11-outbox-pattern.md), [Inbox](../Distributed_system_patterns/12-inbox-pattern.md) | Reliable handoff |
| Safety | [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Each step once |
| Time | [Job Scheduler](../36-job-scheduler.md), [Timeout](../Resilience_Pattern/03-timeout.md) | Hold expiry, SLA |
| Audit | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Replay disputes |`,
    problems: `| Problem | Multi-step flow |
| --- | --- |
| [#2 Ticketmaster](../02-ticketmaster-style-event-booking.md) | Hold → pay → ticket → email |
| [#3 / #37 Payment](../37-payment-system.md) | Auth → capture → ledger → webhook |
| [#4 Delivery](../04-food-delivery-dispatch.md) | Order → assign → deliver → settle |
| [#43 Procurement](../43-supplier-portal-procurement.md) | RFQ → PO → receive → 3-way match |
| [#49 Returns](../49-returns-reverse-logistics.md) | RMA → receive → restock → refund |
| [#62 FDD Pipeline](../62-franchise-sales-fdd-pipeline.md) | Lead → FDD → sign → open |`,
    drill: `**Design drill:** Payment succeeds, confirm inventory fails. List compensate actions in order. What does client retry?`,
    beforeTest: `| Naive build | Symptom | Fix |\n| --- | --- | --- |\n| No idempotency on charge | Double charge on retry | Idempotency-Key per step |\n| Email in same TX as payment | Lost ticket if SMTP slow | Outbox worker |\n| No timeout on hold | Seats locked forever | Scheduler release job |`,
    exercise: '[37 Payment](../exercises/37-payment-system.md) · [#2](../02-ticketmaster-style-event-booking.md)',
  },
  {
    file: '04-scaling-reads.md',
    title: 'Scaling Reads',
    tagline: 'Serve millions of reads without copying every read to the primary database.',
    definition: `Most apps are **read-heavy**: feeds, search, product pages, seat maps, dashboards. **Scaling reads** means adding **caches, replicas, CDNs, and precomputed projections** so read traffic doesn't crush the write DB.`,
    symptoms: `- Homepage slow while writes fine\n- Replica lag → users see stale feed\n- Cache stampede on hot key expiry\n- Search timeouts under load`,
    naive: `| If you only use… | What breaks |\n| --- | --- |\n| Single primary for all reads | Connection pool exhaustion |\n| Cache with no invalidation | Stale prices forever |\n| Read replica for critical money read | Stale balance |
| Materialize on every request | CPU meltdown on dashboard |`,
    need: '**Cache-aside**, **read replicas**, **CDN**, **CQRS projections**, **eventual consistency** where acceptable.',
    mermaid: `flowchart TD
    Read["Read request"]
    CDN["CDN / Edge"]
    Cache["Distributed cache"]
    Replica["Read replica"]
    Projection["Materialized view<br/>(CQRS)"]
    Primary["Primary DB<br/>(writes only)"]

    Read --> CDN
    CDN -->|miss| Cache
    Cache -->|miss| Replica
    Cache -->|miss| Projection
    Primary -.->|async replicate| Replica
    Primary -.->|async project| Projection`,
    patterns: `| Edge | [CDN](../Scalability_patterns/05-cdn.md) | Static + cacheable API |
| Cache | [Cache-Aside](../Data_domain_patterns/18-cache-aside.md), [Distributed Cache](../Scalability_patterns/08-distributed-cache.md) | Hot keys |
| DB reads | [Read Replica](../Scalability_patterns/07-read-replica.md), [Replication](../Scalability_patterns/04-replication.md) | Scale SELECT |
| Complex reads | [CQRS](../Scalability_patterns/06-cqrs.md), [Materialized View](../Data_domain_patterns/16-materialized-view.md) | Feeds, dashboards |
| Consistency | [Eventual Consistency](../Distributed_system_patterns/12-eventual-consistency.md) | Accept lag for reads |`,
    problems: `| Problem | Read-heavy surface |
| --- | --- |
| [#11 Bitly](../11-bitly-url-shortener.md) | Redirect lookup |
| [#15 News Feed](../15-fb-news-feed.md) | Home timeline |
| [#21 Post Search](../21-fb-post-search.md) | Search results |
| [#28 Yelp](../28-yelp-local-discovery.md) | Geo + review search |
| [#35 Cache](../35-distributed-cache.md) | Generic read scaling |
| [#55 Multi-Unit Dashboard](../55-multi-unit-franchisee-dashboard.md) | Roll-up metrics |`,
    drill: `**Design drill:** 10M users open feed. Draw read path without hitting primary DB.`,
    beforeTest: `| Naive build | Symptom | Fix |\n| --- | --- | --- |\n| No TTL on cache | Stale promo price | TTL + invalidate on write |\n| Stampede on expiry | DB cliff every hour | Single-flight lock |\n| Dashboard SUM on raw events | Query timeout | Materialized view |`,
    exercise: '[35 Distributed Cache](../exercises/35-distributed-cache.md)',
  },
  {
    file: '05-scaling-writes.md',
    title: 'Scaling Writes',
    tagline: 'Ingest firehoses of events and commands without serializing through one row.',
    definition: `**Write scaling** is the hard path: clicks, messages, metrics, sales events, GPS pings. Techniques: **partition**, **append-only logs**, **async queues**, **batching**, and **avoid hot primary rows**.`,
    symptoms: `- Single Kafka partition lagging\n- One \`UPDATE counters\` row locks\n- API slow because sync write to analytics\n- Shard rebalancing pain at growth`,
    naive: `| If you only use… | What breaks |\n| --- | --- |\n| One INSERT table for all clicks | Write ceiling in hours |\n| Sync counter increment in API | Latency + lock contention |\n| Random UUID partition key | Can't aggregate efficiently |\n| Scale-up only bigger DB | Cost cliff |`,
    need: '**Event streaming**, **partition by key**, **queue load leveling**, **CQRS** (write log, read aggregate), **batch writers**.',
    mermaid: `flowchart TD
    Write["Write / event ingest"]
    Gateway["API / gateway<br/>(validate, ack fast)"]
    Queue["Partitioned queue / stream"]
    Workers["Consumers / aggregators"]
    Shard["Sharded write stores"]
    Projector["Async projections"]

    Write --> Gateway --> Queue --> Workers
    Workers --> Shard
    Workers --> Projector`,
    patterns: `| Buffer | [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md), [Event Streaming](../Messaging_Integration_patterns/09-event-streaming.md) | Decouple ingest |
| Partition | [Sharding](../Scalability_patterns/03-sharding.md), [Partitioning](../Scalability_patterns/02-partitioning.md) | Key = userId, campaignId |
| Read side | [CQRS](../Scalability_patterns/06-cqrs.md) | Don't query raw firehose |
| Idempotency | [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Dedup at-least-once |
| Scale | [Competing Consumers](../Messaging_Integration_patterns/08-competing-consumers.md) | Horizontal workers |`,
    problems: `| Problem | Write firehose |
| --- | --- |
| [#26 Ad Clicks](../26-ad-click-aggregator.md) | Click/impression stream |
| [#38 Metrics](../38-metrics-monitoring.md) | Time-series points |
| [#20 Live Comments](../20-fb-live-comments.md) | Comment append log |
| [#18 WhatsApp](../18-whatsapp.md) | Message ingress |
| [#22 Top K](../22-youtube-top-k.md) | View events |
| [#6 Billing meter](../06-multi-tenant-saas-usage-billing.md) | Usage events |`,
    drill: `**Design drill:** 1M clicks/sec. Where does API return 204? Where is aggregate computed?`,
    beforeTest: `| Naive build | Symptom | Fix |\n| --- | --- | --- |\n| INSERT per click sync | API p99 5s | Kafka + batch consumer |\n| Global counter row | DB lock wait | Per-shard counters + merge |\n| No dedup on retry | Inflated billing | Idempotent eventId |`,
    exercise: '[06 Multi-Tenant Billing](../exercises/06-multi-tenant-billing.md)',
  },
  {
    file: '06-handling-large-blobs.md',
    title: 'Handling Large Blobs',
    tagline: 'Files, video, and images are too big for your app server and OLTP rows.',
    definition: `**Large blobs** (MB–GB): video uploads, photo libraries, file sync blocks, PDF tickets, audit photos. Never stream whole files through app memory or store in Postgres. Use **object storage**, **chunked/resumable upload**, **CDN delivery**, and **metadata separate from bytes**.`,
    symptoms: `- API OOM on 2 GB upload\n- Timeout at 30s proxy\n- Duplicate storage cost\n- Slow download far from user`,
    naive: `| If you only use… | What breaks |\n| --- | --- |\n| \`BYTEA\` in SQL | DB size and backup hell |\n| Single PUT upload | Fail at 90% → restart |\n| App server proxies all bytes | Bandwidth and memory |
| Same file stored per user copy | Cost explosion |`,
    need: '**Multipart upload**, **content-addressable blocks**, **object store (S3)**, **CDN**, **Claim Check** pattern for messages carrying file refs.',
    mermaid: `flowchart TD
    Client["Client"]
    Upload["Resumable upload API"]
    Object["Object store<br/>(S3 / blob)"]
    Meta["Metadata DB<br/>(pointer, hash, ACL)"]
    Process["Async workers<br/>(transcode, thumb)"]
    CDN["CDN delivery"]

    Client -->|chunks| Upload --> Object
    Upload --> Meta
    Object --> Process --> CDN
    Client -->|download| CDN`,
    patterns: `| Upload | Multipart / chunked transfer, resume tokens | Reliable large upload |
| Dedup | Content-hash addressing | Store block once |
| Async | [Pipeline](../Concurrency_patterns/07-pipeline.md), [Queue](../Scalability_patterns/09-queue-based-load-leveling.md) | Transcode off path |
| Delivery | [CDN](../Scalability_patterns/05-cdn.md) | Edge download |
| Messaging | [Claim Check](../Messaging_Integration_patterns/21-claim-check.md) | Event carries URL not bytes |`,
    problems: `| Problem | Blob type |
| --- | --- |
| [#12 Dropbox](../12-dropbox-file-sync.md) | File blocks |
| [#8 / #24 Video](../08-video-upload-transcoding-pipeline.md) | Raw + transcoded video |
| [#32 Instagram](../32-instagram-photo-sharing.md) | Images + thumbnails |
| [#51 Audit photos](../51-brand-compliance-audit-platform.md) | Compliance evidence |
| [#8 Transcode pipeline](../08-video-upload-transcoding-pipeline.md) | Worker farm |`,
    drill: `**Design drill:** 4 GB video upload on flaky WiFi. List chunk size, resume API, what metadata row stores.`,
    beforeTest: `| Naive build | Symptom | Fix |\n| --- | --- | --- |\n| Upload through API gateway body | 413 / timeout | Presigned URL to object store |\n| Full file re-upload on fail | User rage quit | Resume from last part |\n| Transcode before HTTP 200 | User waits 20 min | Async queue + status poll |`,
    exercise: 'Problem [#8](../08-video-upload-transcoding-pipeline.md) · [#12](../12-dropbox-file-sync.md)',
  },
  {
    file: '07-managing-long-running-tasks.md',
    title: 'Managing Long Running Tasks',
    tagline: 'Work that takes seconds to hours cannot live inside one HTTP request.',
    definition: `**Long-running tasks**: video transcode, payroll run, web crawl batch, ML inference job, report generation, franchise royalty week-close. Pattern: **enqueue → worker → status poll/Webhook → idempotent lease**.`,
    symptoms: `- HTTP gateway timeout at 30s while job still running\n- Duplicate job execution → double pay\n- Queue backlog invisible until crisis\n- Worker crash loses half-finished work`,
    naive: `| If you only use… | What breaks |\n| --- | --- |\n| \`await transcode()\` in controller | Timeout; no scale |\n| Cron on one server | SPOF; missed runs |\n| No job idempotency | Retry = duplicate side effect |\n| Infinite retry poison job | Workers stuck forever |`,
    need: '**Job queue**, **worker pool**, **lease/lock**, **idempotent handlers**, **DLQ**, **progress/status API**.',
    mermaid: `flowchart TD
    API["API: submit job"]
    Store["Job store<br/>(status, payload)"]
    Queue["Task queue<br/>(priority)"]
    Worker["Worker pool<br/>(bulkhead)"]
    Status["Status / poll / webhook"]
    DLQ["Dead letter queue"]
    Sched["Scheduler<br/>(cron / delayed)"]

    API --> Store --> Queue --> Worker
    Worker --> Status
    Worker -->|fail max| DLQ
    Sched --> Queue`,
    patterns: `| Queue | [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md), [Competing Consumers](../Messaging_Integration_patterns/08-competing-consumers.md) | Scale workers |
| Correctness | [Idempotency](../Distributed_system_patterns/20-idempotency.md), lease token | Exactly-once effect |
| Schedule | [Job Scheduler](../36-job-scheduler.md) | Cron, delayed, TTL jobs |
| Isolation | [Bulkhead](../Resilience_Pattern/04-bulkhead.md) | Judge pool ≠ web pool |
| Failure | [Dead Letter Queue](../Messaging_Integration_patterns/07-dead-letter-queue.md), [Retry](../Resilience_Pattern/02-retry.md) | Poison pills |`,
    problems: `| Problem | Long task |
| --- | --- |
| [#36 Job Scheduler](../36-job-scheduler.md) | Generic cron/lease |
| [#8 / #24 Video](../24-youtube-video-platform.md) | Transcode farm |
| [#17 LeetCode](../17-leetcode.md) | Code judge sandbox |
| [#25 Web Crawler](../25-web-crawler.md) | Crawl batches |
| [#41 Payroll](../41-hris-payroll-platform.md) | Pay run |
| [#39 ChatGPT](../39-chatgpt-llm-platform.md) | GPU inference queue |`,
    drill: `**Design drill:** User submits 10-min report. API response? Job states? Worker dies at 80% — what happens?`,
    beforeTest: `| Naive build | Symptom | Fix |\n| --- | --- | --- |\n| Sync transcode in POST | 504 gateway | 202 + jobId + poll |\n| No lease on worker | Two workers same job | Acquire lease TTL |\n| Retry forever on bad input | Queue stalled | DLQ after N tries |`,
    exercise: 'Problem [#36](../36-job-scheduler.md) · [#17](../17-leetcode.md)',
  },
];

function render(c) {
  return `# Concern: ${c.title}

${c.tagline}

> **Cross-cutting lens** — maps to many [problems](../INDEX.md) and [patterns](../../Scalability_patterns/INDEX.md). Learning doc only.

## What this concern means

${c.definition}

### Typical symptoms

${c.symptoms}

## Why one approach is not enough

${c.naive}

You need ${c.need}

## Architecture pattern (generic)

\`\`\`mermaid
${c.mermaid}
\`\`\`

## Pattern mix

| Concern | Patterns | Role |
| --- | --- | --- |
${c.patterns}

## Problems in this repo that exercise it

${c.problems}

## Step 3 — Mini design drill

${c.drill}

## Before testing (naive failures)

${c.beforeTest}

## Related exercises

${c.exercise}

## Quick pattern links

${c.patterns.split('\n').slice(0, 3).map(l => l.split('|')[2]?.trim()).filter(Boolean).join(' · ')}
`;
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const c of concerns) {
  fs.writeFileSync(path.join(outDir, c.file), render(c));
  console.log('Created:', c.file);
}

// INDEX for concerns
const index = `# Cross-Cutting Concerns

Seven **technical lenses** for system design. Every [problem](../INDEX.md) uses several of these at once — use this index when you think *"I need to scale reads"* rather than *"I need Instagram"*.

| # | Concern | One-line summary |
| --- | --- | --- |
| 1 | [Real-Time Updates](./01-real-time-updates.md) | Push live state via WebSocket/SSE + pub/sub |
| 2 | [Dealing with Contention](./02-dealing-with-contention.md) | Locks, CAS, sharding — one winner |
| 3 | [Multi-Step Processes](./03-multi-step-processes.md) | Saga, outbox, state machines |
| 4 | [Scaling Reads](./04-scaling-reads.md) | Cache, CDN, replicas, CQRS |
| 5 | [Scaling Writes](./05-scaling-writes.md) | Streams, partitions, async ingest |
| 6 | [Handling Large Blobs](./06-handling-large-blobs.md) | Object store, chunks, CDN |
| 7 | [Managing Long Running Tasks](./07-managing-long-running-tasks.md) | Queues, workers, leases, DLQ |

## Learning path

\`\`\`text
Patterns (mechanics)
    → Concerns (lens)          ← you are here
    → Problems (full systems)
    → Exercises (drills)
\`\`\`

1. Pick a concern you weak on (e.g. **Contention**).
2. Read the concern doc + skim linked problems.
3. Do the linked [exercise](../exercises/INDEX.md) if one exists.
4. Open a problem file and label which paragraphs are read vs write vs saga.

## Concern × problem matrix (sample)

| Concern | Start with these problems |
| --- | --- |
| Real-time | [#7](../07-realtime-chat-notifications.md), [#23](../23-uber-ride-hailing.md), [#20](../20-fb-live-comments.md) |
| Contention | [#2](../02-ticketmaster-style-event-booking.md), [#45](../45-order-fulfillment-pick-pack-ship.md) |
| Multi-step | [#37](../37-payment-system.md), [#49](../49-returns-reverse-logistics.md) |
| Scale reads | [#15](../15-fb-news-feed.md), [#35](../35-distributed-cache.md) |
| Scale writes | [#26](../26-ad-click-aggregator.md), [#38](../38-metrics-monitoring.md) |
| Large blobs | [#12](../12-dropbox-file-sync.md), [#8](../08-video-upload-transcoding-pipeline.md) |
| Long tasks | [#36](../36-job-scheduler.md), [#17](../17-leetcode.md) |

Back to [Problem index](../INDEX.md) · [Exercises](../exercises/INDEX.md)
`;

fs.writeFileSync(path.join(outDir, 'INDEX.md'), index);
console.log('Created: INDEX.md');
