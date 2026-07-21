import fs from 'fs';
import path from 'path';

const dir = path.resolve('../Problem_solving_using_SEP');

const mermaidByFile = {
  '01-scaling-ecommerce-notifications.md': `flowchart TD
    Browser["Browser / Mobile"]
    CDN["CDN + BFF"]
    Gateway["API Gateway<br/>(rate limit / auth)"]
    Checkout["Checkout Service"]
    Catalog["Catalog Query Service"]
    Cache["Read Replica + Distributed Cache<br/>(catalog)"]
    CmdDB["Command DB<br/>(orders, inventory commands)"]
    Outbox["Outbox Relay"]
    Broker["Message Broker"]
    Notify["Notification Workers"]
    InvWorker["Inventory Worker"]
    EmailCust["Email Adapter (customer)"]
    EmailVendor["Email Adapter (vendor A, B…)"]

    Browser --> CDN --> Gateway
    Gateway --> Checkout
    Gateway --> Catalog
    Catalog --> Cache
    Checkout --> CmdDB
    CmdDB --> Outbox --> Broker
    Broker --> Notify
    Broker --> InvWorker
    Notify --> EmailCust
    Notify --> EmailVendor`,

  '02-ticketmaster-style-event-booking.md': `flowchart TD
    Users["Users"]
    CDN["CDN<br/>(static seat map assets)"]
    Gateway["API Gateway<br/>+ Rate Limiting<br/>+ Token Bucket"]
    WR["Virtual Waiting Room<br/>(queue token)"]
    BFF["Booking BFF"]
    Hold["Seat Hold Service<br/>(sharded)"]
    Pay["Payment Service<br/>(idempotent)"]
    Inv["Event Store / Inventory shards<br/>(by section or event)"]
    Outbox["Outbox"]
    Ticket["Ticket Issued"]
    Email["Email/PDF worker"]
    Notify["Event Notification<br/>(waitlist)"]

    Users --> CDN
    Users --> Gateway
    Gateway --> WR --> BFF
    BFF --> Hold
    BFF --> Pay
    Hold --> Inv
    Pay --> Inv
    Inv --> Outbox
    Outbox --> Ticket --> Email
    Outbox --> Notify`,

  '03-payment-settlement-platform.md': `flowchart TD
    Merchant["Merchant App / E-Commerce"]
    Gateway["API Gateway + mTLS + OAuth2"]
    API["Payments API (stateless)"]
    Ledger["Ledger<br/>(Event Sourced)"]
    Orchestrator["Provider Orchestrator<br/>(Saga + Circuit Breaker)"]
    BankA["Bank A Adapter"]
    BankB["Bank B Adapter"]
    Outbox["Outbox"]
    WebhookIn["Webhook Ingest (Inbox)"]
    Settlement["Settlement Worker"]
    MerchantWH["Merchant Webhook<br/>(Outbox again)"]

    Merchant --> Gateway --> API
    API --> Ledger
    API --> Orchestrator
    Orchestrator --> BankA
    Orchestrator --> BankB
    BankA --> WebhookIn
    BankB --> WebhookIn
    Ledger --> Outbox
    Outbox --> Settlement --> MerchantWH`,

  '04-food-delivery-dispatch.md': `flowchart TD
    Apps["Customer / Restaurant / Driver Apps"]
    Gateway["API Gateway + BFF"]
    Order["Order Service"]
    Dispatch["Dispatch Service"]
    Tracking["Tracking Service (geo)"]
    DB["Command DB + Event Bus<br/>(order lifecycle)"]
    Outbox["Outbox"]
    Push["Push/SMS workers"]
    ETA["ETA projection worker"]

    Apps --> Gateway
    Gateway --> Order
    Gateway --> Dispatch
    Gateway --> Tracking
    Order --> DB
    Dispatch --> DB
    Tracking --> DB
    DB --> Outbox
    Outbox --> Push
    Outbox --> ETA`,

  '05-hospital-appointment-emr-integration.md': `flowchart TD
    Patient["Patient Portal"]
    Gateway["API Gateway + OAuth2/OIDC"]
    Appt["Appointment Service<br/>(domain model)"]
    SlotDB["Slot DB<br/>(sharded)"]
    EMR["EMR Anti-Corruption Layer<br/>+ Adapter (HL7 / FHIR)"]
    Outbox["Outbox"]
    Inbox["Inbox<br/>(EMR callbacks)"]
    Reminder["Reminder Worker<br/>(SMS/email Adapter)"]

    Patient --> Gateway --> Appt
    Appt --> SlotDB
    Appt --> EMR
    SlotDB --> Outbox
    EMR --> Outbox
    Outbox <--> Inbox
    Outbox --> Reminder`,

  '06-multi-tenant-saas-usage-billing.md': `flowchart TD
    Tenant["Tenant Apps / API Keys"]
    Gateway["API Gateway<br/>(tenant routing)"]
    API["Product API"]
    Meter["Usage Metering Service"]
    Stream["Event Stream<br/>(usage events)"]
    Billing["Billing / Invoice Service"]
    Stripe["Payment Provider Adapter"]
    DB["Tenant-isolated DB<br/>(schema or row-level)"]

    Tenant --> Gateway --> API
    API --> Meter --> Stream
    Stream --> Billing
    Billing --> Stripe
    API --> DB
    Billing --> DB`,

  '07-realtime-chat-notifications.md': `flowchart TD
    Clients["Mobile / Web Clients"]
    Gateway["API Gateway + WebSocket Gateway"]
    Chat["Chat Service<br/>(sharded by roomId)"]
    MsgStore["Message Store"]
    Presence["Presence Service"]
    Push["Push Notification Service"]
    Unread["Unread Counter Service<br/>(CQRS projection)"]

    Clients --> Gateway
    Gateway --> Chat
    Chat --> MsgStore
    Chat --> Presence
    Chat --> Unread
    Chat --> Push`,

  '08-video-upload-transcoding-pipeline.md': `flowchart TD
    Creator["Creator Upload Client"]
    Upload["Resumable Upload API"]
    Object["Object Store (raw video)"]
    Queue["Transcode Queue"]
    Workers["Transcode Worker Pool"]
    CDN["CDN Origin"]
    Meta["Video Metadata DB"]
    Notify["Notification Worker"]

    Creator --> Upload --> Object
    Object --> Queue --> Workers
    Workers --> CDN
    Workers --> Meta
    Meta --> Notify`,

  '09-fraud-detection-on-checkout.md': `flowchart TD
    Checkout["Checkout API"]
    Fraud["Fraud Scoring Service<br/>(real-time pipeline)"]
    Rules["Rules Engine"]
    ML["ML Model Service"]
    Decision["Decision: allow / review / block"]
    Review["Manual Review Queue"]
    Audit["Audit Event Store"]
    Payment["Payment Service"]

    Checkout --> Fraud
    Fraud --> Rules
    Fraud --> ML
    Rules --> Decision
    ML --> Decision
    Decision -->|review| Review
    Decision -->|allow| Payment
    Decision --> Audit`,

  '10-global-inventory-sync.md': `flowchart TD
    Channels["Online / Store POS / Warehouse WMS"]
    Ingest["Inventory Ingest API"]
    Events["Inventory Event Stream"]
    Projector["Projection Workers"]
    Global["Global Inventory View<br/>(materialized)"]
    Reserve["Reservation Service<br/>(compare-and-set)"]
    Sync["Sync / Reconciliation Job"]

    Channels --> Ingest --> Events
    Events --> Projector --> Global
    Reserve --> Global
    Sync --> Global`,

  '11-bitly-url-shortener.md': `flowchart TD
    Client["Client"]
    API["Create Short URL API"]
    IDGen["ID Generator<br/>(snowflake / counter shard)"]
    LinkDB["Link Store<br/>(sharded by hash prefix)"]
    CDN["CDN / Edge"]
    Redis["Redis Cache"]
    Analytics["Analytics Workers → OLAP"]

    Client -->|shorten| API --> IDGen --> LinkDB
    Client -->|redirect| CDN --> Redis --> LinkDB
    CDN --> Analytics`,

  '12-dropbox-file-sync.md': `flowchart TD
    Client["Client (file watcher)"]
    Hasher["Block Hasher"]
    Blocks["Object Store (blocks)"]
    Meta["Metadata Service<br/>(file tree, versions)"]
    Notify["Notification Service"]
    Conflict["Conflict Resolver"]

    Client --> Hasher --> Blocks
    Client --> Meta
    Meta --> Notify
    Meta --> Conflict`,

  '13-local-delivery-service.md': `flowchart TD
    Customer["Customer App"]
    Order["Order Service"]
    Payment["Payment Hold"]
    Dispatch["Dispatch Service<br/>(geo index: H3 / geohash)"]
    Driver["Driver App<br/>(GPS stream → Kafka)"]
    Tracking["Tracking BFF → WebSocket"]
    Settlement["Settlement Saga"]

    Customer --> Order --> Payment
    Order --> Dispatch
    Driver --> Dispatch
    Dispatch --> Tracking
    Order --> Settlement`,

  '15-fb-news-feed.md': `flowchart TD
    User["User creates post"]
    PostSvc["Post Service"]
    Fanout["Fan-out Worker<br/>(non-celebrity)"]
    FeedCache["Feed Cache Shards"]
    FeedAPI["Feed Service"]
    Rank["Ranking Service<br/>(ML features + rules)"]
    Celeb["Celebrity Merge<br/>(read-time fan-out)"]
    PostStore["Post Store"]

    User --> PostSvc
    PostSvc --> Fanout --> FeedCache
    FeedAPI --> FeedCache
    FeedAPI --> Celeb
    FeedAPI --> Rank --> PostStore`,

  '16-tinder.md': `flowchart TD
    Swipe["Swipe API"]
    SwipeStore["Swipe Shard<br/>(by swiper ID)"]
    Match["Match Service<br/>(atomic mutual detect)"]
    Notify["Push Notification"]
    Discovery["Discovery Service"]
    Geo["Geo Index"]
    Rank["Ranker<br/>(precomputed deck)"]

    Swipe --> SwipeStore --> Match --> Notify
    Discovery --> Geo --> Rank`,

  '17-leetcode.md': `flowchart TD
    Submit["Submit API"]
    Queue["Submission Queue<br/>(contest > premium > free)"]
    Workers["Judge Workers<br/>(Docker / Firecracker sandbox)"]
    Results["Result Store"]
    WS["WebSocket / Poll"]
    Board["Leaderboard<br/>(Redis sorted set / Flink)"]

    Submit --> Queue --> Workers --> Results
    Results --> WS
    Workers --> Board`,

  '18-whatsapp.md': `flowchart TD
    ClientA["Client A<br/>(Signal protocol)"]
    Gateway["Message Gateway<br/>(metadata only)"]
    Router["Chat Router<br/>(shard by conversationId)"]
    Blob["Encrypted Payload Store"]
    Inbox["Delivery Queue<br/>(per recipient device)"]
    WS["WebSocket Deliver"]
    Push["FCM / APNs Push"]
    ClientB["Client B"]

    ClientA --> Gateway --> Router
    Router --> Blob
    Router --> Inbox
    Inbox -->|online| WS --> ClientB
    Inbox -->|offline| Push --> ClientB`,

  '19-rate-limiter.md': `flowchart TD
    Req["Request"]
    GW["API Gateway Middleware"]
    RL["Rate Limit Service<br/>(local cache + Redis cluster)"]
    Algo["Token Bucket / Sliding Window"]
    Allow["Allow → forward"]
    Deny["Deny → 429 + Retry-After"]
    Config["Config Service<br/>(etcd / Consul)"]

    Req --> GW --> RL --> Algo
    Algo -->|allow| Allow
    Algo -->|deny| Deny
    Config --> RL`,

  '20-fb-live-comments.md': `flowchart TD
    Viewer["Viewer Comment"]
    Ingest["Ingest API"]
    Log["Live Stream Log<br/>(Kafka partition = videoId)"]
    Mod["Moderation Filter<br/>(ML + blocklist)"]
    Fanout["Fan-out Service<br/>(WebSocket edges)"]
    React["Reaction Aggregator<br/>(Flink / Redis)"]

    Viewer --> Ingest --> Log
    Log --> Mod --> Fanout
    Log --> React`,

  '21-fb-post-search.md': `flowchart TD
    Post["Post Created"]
    CDC["Change Capture"]
    Indexer["Indexing Pipeline"]
    SearchIdx["Search Index<br/>(sharded by time)"]
    Query["Search Query API"]
    Privacy["Privacy Filter Service"]
    Rank["Ranker<br/>(ML + engagement)"]

    Post --> CDC --> Indexer --> SearchIdx
    Query --> SearchIdx
    Query --> Privacy --> Rank`,

  '22-youtube-top-k.md': `flowchart TD
    View["View Event"]
    Kafka["Kafka"]
    Stream["Stream Processor<br/>(Flink / Spark Streaming)"]
    Counters["Per (videoId, region) Counters"]
    TopK["Heavy Hitters / TopK Heap"]
    Store["Materialized TopK Store<br/>(Redis ZSET)"]
    API["TopK API"]

    View --> Kafka --> Stream
    Stream --> Counters --> TopK --> Store
    API --> Store`,

  '23-uber-ride-hailing.md': `flowchart TD
    Rider["Rider App"]
    Trip["Trip Request"]
    Pricing["Pricing<br/>(surge by H3 cell)"]
    Dispatch["Dispatch Service"]
    Geo["Geo Index<br/>(available drivers)"]
    GPS["GPS Location Stream"]
    Live["Live Tracking → Rider Map"]
    Complete["Complete → Payment + Payout"]

    Rider --> Trip --> Pricing --> Dispatch
    Geo --> Dispatch
    GPS --> Geo
    Dispatch --> Live
    Trip --> Complete`,

  '24-youtube-video-platform.md': `flowchart TD
    Upload["Upload API"]
    Raw["Object Store (raw)"]
    Queue["Transcode Queue"]
    Workers["Transcode Worker Farm"]
    CDN["CDN Origin + HLS Manifest"]
    Playback["Playback → CDN Edge"]
    Views["Views → Kafka → Analytics"]
    Recs["Recommendation Engine"]

    Upload --> Raw --> Queue --> Workers
    Workers --> CDN --> Playback
    Playback --> Views
    Recs --> Playback`,

  '25-web-crawler.md': `flowchart TD
    Seed["Seed URLs"]
    Frontier["Frontier<br/>(priority queue, sharded by host)"]
    Politeness["Politeness Scheduler<br/>(token bucket per host)"]
    Fetch["Fetch Workers"]
    Parser["Parser → extract links"]
    Dedup["Dedup<br/>(Bloom + DB)"]
    Store["Content Store + Index Pipeline"]
    Robots["robots.txt Cache"]

    Seed --> Frontier --> Politeness --> Fetch
    Fetch --> Parser --> Dedup --> Frontier
    Fetch --> Store
    Robots --> Politeness`,

  '26-ad-click-aggregator.md': `flowchart TD
    Beacon["Impression / Click Beacon"]
    Ingest["Ingest API"]
    Kafka["Kafka<br/>(partition by campaignId)"]
    Stream["Stream Processor (Flink)"]
    Redis["Redis (real-time)"]
    WH["Data Warehouse<br/>(daily billing)"]
    Fraud["Fraud Scorer"]
    Dash["Dashboard API"]

    Beacon --> Ingest --> Kafka --> Stream
    Stream --> Redis
    Stream --> WH
    Stream --> Fraud
    Redis --> Dash
    WH --> Dash`,

  '27-news-aggregator.md': `flowchart TD
    Feeds["Publisher Feeds"]
    Ingest["Ingest Workers"]
    Normalize["Normalize → Article Store"]
    Cluster["SimHash / Embedding Clustering"]
    Rank["Ranker<br/>(freshness + user profile)"]
    Cache["User Feed Cache"]
    API["Home Feed API"]

    Feeds --> Ingest --> Normalize --> Cluster
    Cluster --> Rank --> Cache
    API --> Cache`,

  '28-yelp-local-discovery.md': `flowchart TD
    Search["Search API"]
    Geo["Geo Index<br/>(Elasticsearch / PostGIS)"]
    Text["Text Search<br/>(name + categories)"]
    Filter["Filters<br/>(open now, price, rating)"]
    Rank["Ranker<br/>(distance + quality + ads)"]
    Review["Review Service<br/>(shard by businessId)"]
    CDN["CDN<br/>(business photos)"]

    Search --> Geo
    Search --> Text
    Geo --> Filter
    Text --> Filter --> Rank
    Review --> Rank
    CDN --> Search`,

  '29-strava-fitness-tracking.md': `flowchart TD
    Mobile["Mobile App<br/>(GPS record offline)"]
    Upload["Activity Upload"]
    Activity["Activity Service"]
    Feed["Feed Fan-out"]
    SegmentQ["Segment Matcher Queue"]
    Leader["Leaderboard Shard<br/>(segmentId + filter)"]
    Notify["PR Notification"]

    Mobile --> Upload --> Activity
    Activity --> Feed
    Activity --> SegmentQ --> Leader --> Notify`,

  '30-online-auction.md': `flowchart TD
    Bid["Bid API"]
    Auction["Auction Service<br/>(shard by itemId)"]
    Proxy["Proxy Bid Engine"]
    WS["WebSocket Fan-out"]
    Close["Close Scheduler"]
    Saga["Checkout Saga"]

    Bid --> Auction --> Proxy
    Auction --> WS
    Close --> Auction --> Saga`,

  '31-price-tracking-service.md': `flowchart TD
    User["User adds URL + target price"]
    Registry["Product Registry"]
    Scheduler["Priority Scheduler"]
    Scraper["Scraper Workers<br/>(rotating proxies, rate limit)"]
    History["Time-Series Price History"]
    Alerts["Alert Rule Engine"]
    Notify["Notification Service<br/>(email / push)"]

    User --> Registry --> Scheduler --> Scraper
    Scraper --> History --> Alerts --> Notify`,

  '32-instagram-photo-sharing.md': `flowchart TD
    Upload["Media Upload"]
    Object["Object Store + Thumbnails"]
    Post["Post Metadata DB"]
    Fanout["Fan-out Worker<br/>(non-celebrity)"]
    Feed["Feed API"]
    CDN["CDN Signed URLs"]
    Stories["Stories Store<br/>(24h TTL)"]
    Explore["Explore ML Ranker"]

    Upload --> Object --> Post
    Post --> Fanout --> Feed
    Feed --> CDN
    Post --> Stories
    Explore --> Feed`,

  '33-robinhood-trading.md': `flowchart TD
    Feed["Market Data Feed (SIP)"]
    Quotes["Quote Aggregator"]
    WS["WebSocket to Clients"]
    Order["Order API"]
    Risk["Risk Check<br/>(buying power)"]
    Router["Order Router → Exchange"]
    State["Order State Machine"]
    Ledger["Ledger<br/>(double-entry)"]
    Audit["Compliance Event Store"]

    Feed --> Quotes --> WS
    Order --> Risk --> Router --> State
    State --> Ledger --> Audit`,

  '34-google-docs-collaboration.md': `flowchart TD
    Client["Client keystroke"]
    Collab["Collaboration Server<br/>(shard by docId)"]
    OT["OT / CRDT Transform"]
    Broadcast["WebSocket Broadcast"]
    OpLog["Op Log + Snapshots<br/>(Event Sourcing)"]
    Presence["Presence Channel<br/>(cursor + user color)"]

    Client --> Collab --> OT --> Broadcast
    OT --> OpLog
    Collab --> Presence`,

  '35-distributed-cache.md': `flowchart TD
    App["App Service"]
    Client["Cache Client<br/>(smart routing by key hash)"]
    Cluster["Redis Cluster / Memcached Ring<br/>(consistent hash slots)"]
    Replica["Primary + Replica per Shard"]
    Invalidation["Invalidation Bus<br/>(pub/sub on DB write)"]
    Origin["Origin DB<br/>(cache-aside on miss)"]

    App --> Client --> Cluster --> Replica
    Origin --> Cluster
    Invalidation --> Client
    Client -->|miss| Origin`,

  '36-job-scheduler.md': `flowchart TD
    Define["API / Cron Define Job"]
    Store["Job Store<br/>(scheduledAt, payload, cron)"]
    Scheduler["Scheduler Service<br/>(leader elected)"]
    Ready["Ready Queue"]
    Workers["Worker Pool"]
    DLQ["Dead Letter Queue"]
    Metrics["Metrics: lag, success rate"]

    Define --> Store --> Scheduler --> Ready --> Workers
    Workers -->|fail N times| DLQ
    Workers --> Metrics`,

  '37-payment-system.md': `flowchart TD
    API["Merchant API"]
    Gateway["Payment Gateway<br/>(tokenized PAN)"]
    Idem["Idempotency Store"]
    Processor["Payment Processor Adapter"]
    Ledger["Ledger<br/>(double-entry)"]
    Outbox["Outbox"]
    Webhook["Webhook Dispatcher"]
    Settlement["Settlement Batch Job"]

    API --> Gateway --> Idem --> Processor
    Processor --> Ledger --> Outbox
    Outbox --> Webhook
    Ledger --> Settlement`,

  '38-metrics-monitoring.md': `flowchart TD
    Agents["Agents / SDK"]
    GW["Metrics Gateway<br/>(validate, sample, rate limit)"]
    Kafka["Kafka / Remote Write"]
    Ingest["Ingest Workers"]
    TSDB["TSDB Shards<br/>(tenant + time partition)"]
    Rollup["Rollup Jobs<br/>(1m → 1h → 1d)"]
    Query["Query API / Dashboards"]
    Alerts["Alert Scheduler → PagerDuty / Slack"]

    Agents --> GW --> Kafka --> Ingest --> TSDB
    TSDB --> Rollup
    TSDB --> Query
    TSDB --> Alerts`,

  '39-chatgpt-llm-platform.md': `flowchart TD
    Client["Client"]
    GW["API Gateway<br/>(auth + rate limit by tier)"]
    Orch["Chat Orchestrator<br/>(load conversation, build prompt)"]
    RAG["RAG Retrieval<br/>(embeddings + vector DB)"]
    Router["Inference Router"]
    GPU["GPU Worker Pool<br/>(model A/B, priority queue)"]
    Stream["SSE / WebSocket Stream"]
    Tools["Tool Loop<br/>(sandbox execute)"]
    Billing["Token Billing + Audit"]

    Client --> GW --> Orch
    Orch --> RAG
    Orch --> Router --> GPU --> Stream
    GPU --> Tools --> GPU
    Stream --> Billing`,
};

// Concurrency model for ticketmaster
const concurrencyMermaid = {
  '02-ticketmaster-style-event-booking.md': `flowchart TB
    Event["Event E123"]
    SA["Section A shard<br/>seats A1..A50"]
    SB["Section B shard<br/>seats B1..B50"]

    Event --> SA
    Event --> SB`,
};

let updated = 0;
for (const [file, mermaid] of Object.entries(mermaidByFile)) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.warn('Missing:', file);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const archRe = /(## Architecture Overview\r?\n)```text\r?\n[\s\S]*?```/;
  if (!archRe.test(content)) {
    console.warn('No arch block:', file);
    continue;
  }
  content = content.replace(archRe, `$1\`\`\`mermaid\n${mermaid}\n\`\`\``);

  if (concurrencyMermaid[file]) {
    const concRe = /(## Concurrency Model \(seats\)\r?\n)```text\r?\n[\s\S]*?```/;
    if (concRe.test(content)) {
      content = content.replace(
        concRe,
        `$1\`\`\`mermaid\n${concurrencyMermaid[file]}\n\`\`\``
      );
    }
  }

  fs.writeFileSync(filePath, content);
  updated++;
  console.log('Updated:', file);
}
console.log(`Done. ${updated} files updated.`);
