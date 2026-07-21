import fs from 'fs';
import path from 'path';
import { patternRisks } from './pattern-example-risks.mjs';

const outDir = path.resolve('../pattern-examples');

/** @type {Record<string, { title: string, indexPath: string, patterns: Record<string, string> }>} */
const categories = {
  'AI_Agentic_patterns': {
    title: 'AI & Agentic Patterns',
    indexPath: '../AI_Agentic_patterns/INDEX.md',
    patterns: {
      RAG: '**1.** ChatGPT support bot retrieves policy PDF chunks before answering refund questions. **2.** Internal wiki copilot embeds Confluence pages and cites sources in replies. **3.** Legal review tool pulls clause snippets from 10k contracts by semantic similarity.',
      'Multi-Agent Orchestration': '**1.** Research agent gathers web facts; writer agent drafts; critic agent revises before user sees output. **2.** Code agent plans refactor; test agent generates cases; deploy agent opens PR. **3.** Sales ops: lead scorer, email drafter, and CRM updater run as coordinated agents.',
      'Tool Calling': '**1.** LLM calls `getWeather(city)` instead of guessing tomorrow’s rain. **2.** Assistant invokes `searchOrders(customerId)` to answer “where is my package?” **3.** Agent runs `runSql(readOnly, query)` against approved analytics views.',
      'Planner-Executor': '**1.** Planner breaks “migrate database” into backup → migrate → verify; executor runs each step. **2.** Trip planner outputs day-by-day itinerary; executor books hotels via APIs. **3.** Incident bot plans rollback steps; executor triggers k8s rollout undo.',
      Reflection: '**1.** Model drafts answer, then self-checks “are citations missing?” and revises. **2.** Code generator runs tests mentally, fixes bugs before returning snippet. **3.** Email agent critiques tone (“too harsh”) and softens second draft.',
      'Memory-Augmented Agent': '**1.** Chat remembers user’s preferred language across sessions in vector + summary store. **2.** Support agent recalls prior ticket context when user returns days later. **3.** Personal tutor tracks mastered topics and adjusts difficulty.',
      'Event-Driven Agents': '**1.** Agent wakes on `OrderShipped` Kafka event to send proactive delivery SMS. **2.** Security agent reacts to `LoginFailed` spike without polling. **3.** Inventory agent restocks when `StockBelowThreshold` fires.',
      'Agent Supervisor': '**1.** Supervisor caps tool-call budget and kills runaway agent loops. **2.** Manager agent routes subtasks only to workers with required skills. **3.** Compliance supervisor blocks PII export tools for external models.',
      'Human-in-the-Loop': '**1.** AI proposes contract redlines; lawyer must approve before CRM update. **2.** Generated image ad copy requires marketer click **Approve**. **3.** Medical summary flagged uncertain — clinician confirms before EHR note.',
      'Chain-of-Thought Pipelines': '**1.** Math tutor shows step-by-step reasoning before final numeric answer. **2.** Fraud scorer explains feature contributions before block/allow. **3.** Architecture advisor lists tradeoffs then recommends pattern mix.',
      'Vector Search Architecture': '**1.** Pinecone index of product embeddings powers “find similar items.” **2.** pgvector stores help-center chunks for semantic FAQ search. **3.** Milvus shards embeddings by tenant for multi-tenant RAG.',
      'Semantic Routing': '**1.** “Refund my order” routes to commerce agent; “reset password” to IAM agent. **2.** Small classifier sends code questions to code model, chit-chat to cheap model. **3.** Multilingual router picks language-specific prompt template by embedding similarity.',
    },
  },
  'Architectural_patterns': {
    title: 'Architectural Patterns',
    indexPath: '../Architectural Patterns/INDEX.md',
    patterns: {
      'Client-Server Architecture': '**1.** Mobile banking app (client) calls REST API on bank servers. **2.** Electron desktop client talks to SaaS backend for sync. **3.** Game launcher downloads patches from patch server.',
      'Microservices Architecture': '**1.** Shopify-scale shop splits catalog, checkout, inventory, notifications. **2.** Netflix-style video: upload, transcode, playback, billing as services. **3.** Uber: rider, driver, pricing, maps as separate deployables.',
      'SOA': '**1.** Enterprise ERP exposes SOAP inventory service to warehouse and ecommerce. **2.** Bank shares customer profile service across mortgage and cards divisions. **3.** Government agency ESB routes citizen requests to agency backends.',
      'Event-Driven Architecture': '**1.** Order placed → events trigger email, warehouse pick, analytics. **2.** User signed up → CRM, welcome email, trial metering subscribe. **3.** Sensor reading → alerting, aggregation, cold storage pipeline.',
      'Hexagonal Architecture': '**1.** Payment core defines `PaymentPort`; Stripe adapter plugs in without core changes. **2.** Domain orders use `OrderRepository` interface; Postgres adapter swappable. **3.** Auth core uses `IdentityPort`; Okta vs Auth0 as adapters.',
      'Clean Architecture': '**1.** Use cases (`PlaceOrder`) orchestrate entities; UI and DB are outer rings. **2.** Loan approval rules live in domain; web and batch are delivery mechanisms. **3.** Inventory invariants enforced in entities, not controllers.',
      'Onion Architecture': '**1.** Domain at center; application services wrap; infrastructure outermost. **2.** Billing rules independent of Stripe webhooks layer. **3.** Scheduling domain unaware of React admin UI.',
      'Pipe and Filter Architecture': '**1.** Log pipeline: ingest → parse → enrich → index filters. **2.** Image upload: validate → virus scan → resize → store stages. **3.** ETL: extract CSV → transform → load warehouse filters.',
      'Broker Architecture': '**1.** Message broker routes order events to billing and shipping subscribers. **2.** MQTT broker between IoT devices and rule engine. **3.** JMS broker connects legacy mainframe to modern services.',
      'Peer-to-Peer Architecture': '**1.** BitTorrent clients exchange file blocks directly. **2.** Blockchain nodes gossip transactions without central coordinator. **3.** WebRTC video call media flows peer-to-peer when possible.',
      CQRS: '**1.** Ticketmaster: write holds to inventory shard; read seat map from projection. **2.** News feed writes posts; home timeline read from precomputed cache. **3.** Bank ledger writes events; balance queries hit materialized view.',
      'Event Sourcing': '**1.** Bank account balance rebuilt from deposit/withdraw events. **2.** Shopping cart replayed from `ItemAdded` / `ItemRemoved` stream. **3.** Audit trail for franchise royalty disputes from sales events.',
      'Serverless Architecture': '**1.** Thumbnail generator Lambda on S3 upload events. **2.** Webhook receiver function scales per burst without servers. **3.** Scheduled nightly report via Cloud Functions cron.',
      'Space-Based Architecture': '**1.** Trading platform processes in memory grid before async persist. **2.** Ad auction bids evaluated in data grid for sub-ms latency. **3.** Gaming matchmaking state in tuple space until match starts.',
      'Reactive Architecture': '**1.** Stock ticker UI streams quotes via backpressure-aware Flux. **2.** Chat app handles 10k concurrent connections with non-blocking IO. **3.** Real-time dashboard degrades chart detail under load.',
      'Actor Model': '**1.** Each chat room is an actor processing messages serially. **2.** Game entity (player, NPC) as actor with mailbox. **3.** IoT device supervisor spawns child actor per sensor.',
      'Blackboard Architecture': '**1.** Speech recognition: phoneme, grammar, lexicon agents write hypotheses to shared board. **2.** Medical diagnosis agents contribute evidence to common case blackboard. **3.** AI planning: planner, scheduler, critic share partial plans.',
      MVC: '**1.** Rails blog: Post model, article view, controller handles HTTP. **2.** Spring MVC employee directory. **3.** Django admin CRUD with template views.',
      MVVM: '**1.** WPF desktop app: View binds to ViewModel commands and observable state. **2.** Xamarin mobile forms with INotifyPropertyChanged ViewModels. **3.** Vue/React-style separation where presentation state drives UI (conceptual parallel).',
      MVP: '**1.** Android presenter fetches data, passive view shows loading spinner. **2.** WinForms app presenter handles button clicks, view is interface. **3.** GWT-style web MVP with testable presenter logic.',
      'Backend-for-Frontend': '**1.** Mobile BFF aggregates profile + orders + loyalty in one call. **2.** Web BFF shapes GraphQL for marketing site vs admin console. **3.** Partner API BFF exposes stable contract over volatile microservices.',
      'Layered Architecture': '**1.** Classic 3-tier: presentation → business → data access. **2.** Enterprise app: UI layer, service layer, DAO layer. **3.** Internal tool: API layer, domain layer, repository layer.',
      'Modular Monolith Architecture': '**1.** E-commerce monolith with `catalog`, `checkout`, `shipping` modules and clear boundaries. **2.** HR system modules: payroll, benefits, timekeeping in one deployable. **3.** WordPress-style core with plugin boundaries as modules.',
      'Monolith Architecture': '**1.** Early-stage startup single Rails app for speed. **2.** Internal admin tool one Django project. **3.** Small WooCommerce store on single PHP deployment.',
    },
  },
  'Creational_patterns': {
    title: 'Creational Patterns',
    indexPath: '../Creational Patterns/INDEX.md',
    patterns: {
      'Abstract Factory': '**1.** UI toolkit factory creates matching Win/Mac buttons and dialogs. **2.** Cloud provider factory creates S3 vs Azure blob clients behind one interface. **3.** Report factory emits PDF, HTML, or CSV exporters for same data.',
      Builder: '**1.** `HttpRequest.Builder` sets headers, body, timeout fluently. **2.** SQL query builder chains WHERE, JOIN, ORDER safely. **3.** Pizza order builder: size, crust, toppings step-by-step.',
      'Factory Method': '**1.** `DocumentExporter.create()` overridden to return PDF or Word exporter. **2.** Logger factory method picks file vs console logger per config. **3.** Payment gateway factory method returns Stripe vs PayPal implementation.',
      Prototype: '**1.** Clone prototype game enemy instead of reloading assets from disk. **2.** Copy default dashboard widget layout as starting template. **3.** JavaScript `structuredClone` of config object for per-tenant overrides.',
      Singleton: '**1.** One database connection pool manager per process. **2.** App-wide configuration registry loaded once. **3.** Hardware driver access single instance (use sparingly — often anti-pattern at scale).',
    },
  },
  'Structural_patterns': {
    title: 'Structural Patterns',
    indexPath: '../Structural Patterns/INDEX.md',
    patterns: {
      Adapter: '**1.** Stripe webhook payload adapter maps to internal `PaymentEvent`. **2.** Legacy SOAP inventory adapter for modern REST catalog service. **3.** Third-party maps API adapter normalizes geocode responses.',
      Bridge: '**1.** Shape abstraction (Circle) bridged to Renderer (SVG vs Canvas). **2.** Notification abstraction bridged to Sender (email vs SMS). **3.** Device remote control abstraction bridged to TV vs Radio implementation.',
      Composite: '**1.** File system tree: files and folders share `getSize()` interface. **2.** UI component tree: panels contain buttons and nested panels. **3.** Org chart: employee and department both report headcount.',
      Decorator: '**1.** `BufferedInputStream` decorates `FileInputStream` with buffering. **2.** Coffee + milk + whip decorators add cost and description. **3.** Middleware stack decorates HTTP handler with auth, logging, metrics.',
      Facade: '**1.** `CheckoutFacade` one call for cart, tax, payment, receipt. **2.** `AiContentFacade` unifies MCP and admin chat entry points. **3.** Home automation facade: “movie mode” dims lights + TV + blinds.',
      Flyweight: '**1.** Share immutable glyph objects across thousands of text characters. **2.** Reuse tile sprite instances in game map grid. **3.** Intern common strings in symbol table for compiler AST.',
      Proxy: '**1.** Lazy-loading proxy fetches product details only when opened. **2.** Access control proxy checks permissions before real document service. **3.** Remote proxy stands in for microservice on another host.',
    },
  },
  'Concurrency_patterns': {
    title: 'Concurrency Patterns',
    indexPath: '../Concurrency_patterns/INDEX.md',
    patterns: {
      'Producer-Consumer': '**1.** Web server threads produce log lines; background thread writes disk. **2.** Image upload produces resize jobs; worker pool consumes. **3.** Crawler fetches URLs (producer); parser workers consume HTML.',
      'Thread Pool': '**1.** Java `ExecutorService` with 50 threads serves HTTP requests. **2.** .NET thread pool handles async callbacks. **3.** Node worker_threads pool for CPU-heavy image transforms.',
      'Worker Queue': '**1.** Redis list of email jobs consumed by mailer workers. **2.** SQS queue of video transcode tasks. **3.** Sidekiq queue for Rails background jobs.',
      Reactor: '**1.** Nginx waits for socket readable, dispatches to handler. **2.** Redis single-threaded reactor processes commands. **3.** Java NIO selector loop for chat server.',
      Proactor: '**1.** Windows IOCP completes disk read then callbacks handler. **2.** Async file write on Node: operation completes → callback. **3.** Boost.Asio async accept → proactor style completion.',
      'Fork-Join': '**1.** Merge sort forks halves recursively then joins sorted arrays. **2.** Parallel image filter splits rows across CPU cores. **3.** Java `ForkJoinPool` for recursive directory size calc.',
      Pipeline: '**1.** Video: demux → decode → filter → encode stages connected. **2.** Fraud check pipeline: rules → ML → manual review queue. **3.** CI: lint → test → build → deploy pipeline stages.',
      'Futures and Promises': '**1.** `fetchUser()` promise chained to `fetchOrders(userId)`. **2.** Java `CompletableFuture` combines payment + inventory checks. **3.** Python `asyncio.gather` awaits parallel API calls.',
      'Async/Await': '**1.** Express handler `await db.query()` without blocking thread pool wrongly. **2.** C# `await HttpClient.GetAsync` in ASP.NET controller. **3.** Rust `async fn` for concurrent downloads.',
      'Double Buffer': '**1.** Game renders to back buffer while front buffer displays. **2.** Audio fills one buffer while other plays. **3.** Graphics swap buffers each frame to avoid tear.',
      'Readers-Writers Lock': '**1.** Config cache: many readers of feature flags; rare writer on deploy. **2.** In-memory catalog many concurrent reads; single writer on price update. **3.** `RwLock` protecting shared routing table.',
      Barrier: '**1.** Parallel simulation threads wait at timestep barrier before next tick. **2.** MapReduce workers barrier before reduce phase. **3.** Multi-threaded unit test setup waits all threads ready.',
      Semaphore: '**1.** DB connection pool: max 20 permits for concurrent queries. **2.** API rate limiter semaphore allows N in-flight requests. **3.** Parking lot semaphore models limited spaces.',
      'Actor Model': '**1.** Akka actor per order processes messages sequentially. **2.** Erlang process per telephony call session. **3.** Orleans grain per game player state.',
      Scheduler: '**1.** OS scheduler picks next runnable thread on CPU core. **2.** Kubernetes schedules pods onto nodes by resources. **3.** Cron scheduler fires nightly batch jobs.',
      'Work Stealing': '**1.** Java ForkJoinPool idle thread steals tasks from busy deque. **2.** Go scheduler work stealing across processors. **3.** Ray task scheduler steals from neighbor worker queues.',
      'Event Loop': '**1.** Node.js processes timers, I/O callbacks, microtasks in loop. **2.** Browser event loop handles clicks, fetch, rendering. **3.** Python asyncio loop drives coroutine scheduling.',
    },
  },
  'Scalability_patterns': {
    title: 'Scalability Patterns',
    indexPath: '../Scalability_patterns/INDEX.md',
    patterns: {
      'Stateless Services': '**1.** REST API pods hold no session; JWT in client. **2.** Horizontally scaled checkout service any instance handles any cart. **3.** Lambda functions process events with no local state.',
      Partitioning: '**1.** Kafka topic partitioned by `userId` for ordered per-user events. **2.** Time partition logs by day for cheap archival. **3.** Multi-tenant data partitioned by `tenantId` range.',
      Sharding: '**1.** User accounts shard 0–999k on DB-A, 1M+ on DB-B. **2.** Ticket inventory shard by `eventId:section`. **3.** Chat messages shard by `conversationId` hash.',
      Replication: '**1.** MySQL primary → two read replicas for reporting. **2.** Redis primary-replica for HA failover. **3.** S3 cross-region replication for disaster recovery.',
      CDN: '**1.** Cloudflare caches static JS/CSS at edge globally. **2.** Netflix serves video segments from nearest POP. **3.** Bitly redirect responses cached at edge for hot links.',
      CQRS: '**1.** Write orders to OLTP; dashboard reads from ClickHouse projection. **2.** Feed writes post; timeline read from Redis fan-out cache. **3.** Bank commands to ledger; balance query from read model.',
      'Read Replica': '**1.** Analytics queries hit replica; checkout writes primary. **2.** WordPress public reads replica; admin writes primary. **3.** Search indexer consumes replica binlog.',
      'Distributed Cache': '**1.** Redis cluster caches session and product catalog. **2.** Memcached in front of MySQL for hot keys. **3.** Hazelcast grid for near-cache across JVMs.',
      'Queue-Based Load Leveling': '**1.** Flash sale orders enqueue; workers process at sustainable rate. **2.** Email burst queued instead of SMTP in request thread. **3.** LeetCode submissions queued for judge workers.',
      'Elastic Scaling': '**1.** K8s HPA adds API pods when CPU > 70%. **2.** AWS ASG scales transcode workers on queue depth. **3.** Serverless concurrency auto-scales function instances.',
      'Multi-Level Cache': '**1.** L1 in-process + L2 Redis + L3 CDN for product page. **2.** CPU L1/L2/L3 cache hierarchy analogy in app: browser → CDN → origin. **3.** ORM session cache + distributed cache + DB.',
      'Data Locality': '**1.** Spark runs compute on nodes holding HDFS blocks. **2.** Uber matches drivers using geo-sharded local indexes. **3.** Cassandra prefers local replica reads in same rack.',
    },
  },
  'Distributed_system_patterns': {
    title: 'Distributed System Patterns',
    indexPath: '../Distributed_system_patterns/INDEX.md',
    patterns: {
      'API Gateway': '**1.** Kong routes `/api/*` to microservices with auth plugin. **2.** AWS API Gateway fronts Lambda and ECS backends. **3.** Mobile apps hit single gateway URL not 12 service hosts.',
      'Circuit Breaker': '**1.** Stop calling failing payment API for 30s after 5 errors. **2.** Hystrix-style breaker on maps geocode dependency. **3.** Inventory service breaker open → show “try again” not hang.',
      Retry: '**1.** Retry idempotent GET on transient 503 from CDN. **2.** AWS SDK default retry on throttling. **3.** Mobile app retries photo upload on network blip.',
      'Retry with Backoff': '**1.** Exponential backoff on Stripe rate limit 429. **2.** Kafka consumer retry with jitter on poison-ish messages. **3.** DNS resolver retry with increasing delay.',
      Bulkhead: '**1.** Separate thread pool for payments vs catalog reads. **2.** Kubernetes resource limits per namespace. **3.** Judge worker pool isolated from web tier (LeetCode-style).',
      Sidecar: '**1.** Envoy sidecar handles mTLS for app container. **2.** Log shipping Fluent Bit sidecar per pod. **3.** Service mesh proxy intercepts outbound HTTP.',
      'Service Discovery': '**1.** Consul registers healthy `payment-v2` instances. **2.** Kubernetes DNS `orders.default.svc.cluster.local`. **3.** Eureka in Spring Cloud for dynamic service list.',
      'Leader Election': '**1.** One scheduler pod elected leader runs cron jobs. **2.** ZooKeeper elects Kafka controller broker. **3.** etcd leader for Kubernetes control plane.',
      Consensus: '**1.** Raft replicates log across 3 etcd nodes. **2.** Paxos for distributed lock service. **3.** Quorum write in CockroachDB before ack.',
      Saga: '**1.** Hold seat → pay → confirm ticket or release on failure. **2.** Food delivery: order → assign driver → deliver → capture payment. **3.** Franchise royalty: calculate → invoice → ACH with compensate steps.',
      Outbox: '**1.** Insert order + outbox row same TX; worker sends webhook. **2.** Ticket issued event in outbox → email worker. **3.** Payment captured → outbox → merchant notification.',
      Inbox: '**1.** Store webhook `eventId` before processing to dedup Stripe retries. **2.** POS sync inbox dedupes offline replay from Square device. **3.** Bank callback inbox prevents double ledger post.',
      'Strangler Fig': '**1.** Route 5% traffic to new checkout service; rest legacy. **2.** Replace monolith reports module with microservice incrementally. **3.** WordPress plugin gradually replaces old shortcodes.',
      Ambassador: '**1.** Local proxy handles retries to remote payment service. **2.** Client library ambassador adds tracing headers. **3.** Legacy app ambassador translates REST to internal gRPC.',
      'Anti-Corruption Layer': '**1.** Translate SAP IDoc to internal `PurchaseOrder` model. **2.** POS vendor feed ACL normalizes sales for royalty engine. **3.** EMR HL7 adapter protects clean appointment domain.',
      'Service Mesh': '**1.** Istio policies mTLS and retries between all pods. **2.** Linkerd golden metrics per route without code changes. **3.** Consul connect encrypts east-west traffic.',
      'Request Hedging': '**1.** Send duplicate read to second replica if first slow > 50ms. **2.** Google Bigtable hedged reads for tail latency. **3.** Search queries hedge to backup index shard.',
      'Rate Limiting': '**1.** 100 req/min per API key at gateway. **2.** Login endpoint 10 attempts per IP per hour. **3.** OpenAI TPM limits per organization tier.',
      Throttling: '**1.** Smooth outgoing webhook delivery at 50/sec to merchant. **2.** Client SDK throttles analytics batch sends. **3.** Admission control delays non-VIP requests in queue.',
      Idempotency: '**1.** `Idempotency-Key` on POST /charges prevents double charge. **2.** Ticket purchase retry returns same ticket id. **3.** Weekly royalty bill idempotent on `locationId:week`.',
      'Distributed Lock': '**1.** Redis lock on `auction:item:42` during bid. **2.** ZooKeeper lock for single-writer migration job. **3.** DynamoDB lock for leader election fallback.',
      'Token Bucket': '**1.** API allows burst 20 then refill 10 tokens/sec. **2.** Shopify app rate limit per shop bucket. **3.** Crawler politeness 1 req/sec token per host.',
      'Leaky Bucket': '**1.** Outbound SMS queue drips messages at carrier max rate. **2.** Log shipper leaky bucket to indexing service. **3.** Video encoder output paced to streaming bitrate.',
      Heartbeat: '**1.** Worker sends heartbeat every 30s; missed → job reassigned. **2.** Kubernetes kubelet heartbeat to control plane. **3.** Gaming server heartbeat to matchmaker.',
      'Gossip Protocol': '**1.** Cassandra nodes gossip membership and failure detection. **2.** Consul serf gossip for agent health. **3.** Redis Cluster gossip slot map updates.',
      Quorum: '**1.** Write ack after 2 of 3 replicas confirm. **2.** etcd quorum required for config change. **3.** Distributed lock service requires majority nodes.',
      Sharding: '**1.** DynamoDB partition key sharding for orders table. **2.** Vitess shards MySQL by user id. **3.** Elasticsearch index shards for post search.',
      Replication: '**1.** Multi-AZ RDS synchronous replica for failover. **2.** Kafka topic replication factor 3. **3.** Global CDN replicates static assets to POPs.',
      'Distributed Cache': '**1.** Redis Cluster for session store across nodes. **2.** Memcached ring for HTML fragment cache. **3.** Hazelcast replicated map for config.',
      'Event Bus': '**1.** Internal Kafka bus for domain events between teams. **2.** AWS EventBridge routes SaaS events to Lambdas. **3.** Google Pub/Sub for microservice choreography.',
      'Shared Database': '**1.** Legacy reporting and app share one Oracle schema (anti-pattern but common). **2.** Small startup team one Postgres for all services initially. **3.** WordPress plugins share `wp_posts` tables.',
      'Database per Service': '**1.** Order service owns `orders_db`; catalog owns `products_db`. **2.** Each microservice private MongoDB collection set. **3.** Shopify shop data isolated per tenant shard logically.',
    },
  },
  'Data_domain_patterns': {
    title: 'Data & Domain Patterns',
    indexPath: '../Data_domain_patterns/INDEX.md',
    patterns: {
      Repository: '**1.** `OrderRepository.findById` hides SQL from domain. **2.** `UserRepository` interface with Postgres implementation. **3.** In-memory repo for unit tests of use cases.',
      'Unit of Work': '**1.** EF Core DbContext tracks changes; single `SaveChanges`. **2.** Hibernate session flushes one transaction boundary. **3.** Domain tracks dirty aggregates before commit.',
      Aggregate: '**1.** `Order` aggregate root controls `OrderLine` mutations. **2.** `ShoppingCart` root enforces max items rule. **3.** `Invoice` root coordinates line items and totals.',
      Entity: '**1.** `Customer` identified by `customerId` not just name. **2.** `Ticket` entity with unique ticket number. **3.** `Employee` same person after address change.',
      'Value Object': '**1.** `Money` amount + currency immutable object. **2.** `EmailAddress` validates format on construction. **3.** `GeoCoordinate` lat/lng pair without identity.',
      'Domain Service': '**1.** `PricingService` calculates tax across line items. **2.** `TransferService` moves money between accounts. **3.** `MatchingService` pairs riders and drivers.',
      Specification: '**1.** `EligibleForDiscountSpec` encapsulates promo rules. **2.** `OverdueInvoiceSpec` for collections batch query. **3.** `ActiveSubscriptionSpec` reused in reports and API.',
      'Identity Map': '**1.** ORM first-level cache returns same `User` instance per request. **2.** In-memory map prevents duplicate load of `Product#42`. **3.** Unit of work identity map for aggregate consistency.',
      'Lazy Loading': '**1.** Order loads lines only when `.lines` accessed. **2.** Hibernate lazy proxy for customer address. **3.** GraphQL resolver fetches comments on demand.',
      'Data Mapper': '**1.** Mapper converts `OrderRow` ↔ `Order` entity. **2.** MyBatis maps result sets to domain objects. **3.** Manual mapper between API DTO and domain.',
      'Active Record': '**1.** Rails `User.find(1).update(email: …)` model. **2.** Laravel Eloquent `Post::where(...)->get()`. **3.** Django ORM model with `.save()` on instance.',
      'Transaction Script': '**1.** Procedural `processRefund(orderId)` script in service class. **2.** Nightly batch script transfers ledger entries. **3.** Simple CRUD app with one function per use case.',
      'Table Module': '**1.** `OrdersTable` class with all order-related DB procedures. **2.** Legacy VB module per database table. **3.** Generated DAO per table in early enterprise apps.',
      'Domain Model': '**1.** Rich `BankAccount` with `withdraw` enforcing balance rules. **2.** `Reservation` enforces hold TTL in domain method. **3.** `ShoppingCart` calculates totals internally.',
      'Event Sourcing': '**1.** Account state from `Deposited`/`Withdrawn` events. **2.** Shopping cart replay from event log. **3.** Compliance audit from immutable event store.',
      'Materialized View': '**1.** Nightly `sales_by_region` table for CFO dashboard. **2.** Redis ZSET trending videos from view stream. **3.** CQRS read model `OrderSummary` from commands.',
      'Read Replica': '**1.** BI tool queries replica not OLTP primary. **2.** Public catalog API read replica; writes primary. **3.** Search CDC from replica binlog.',
      'Cache-Aside': '**1.** App checks Redis for product; on miss loads DB and sets cache. **2.** WordPress object cache for options and postmeta. **3.** API gateway caches OAuth JWKS keys.',
      'CQRS Read Model': '**1.** `FeedTimeline` read model separate from `Post` write model. **2.** `Customer360View` denormalized for support console. **3.** `InventoryAvailability` projection from stock events.',
      'Database Sharding': '**1.** Users table sharded by `user_id % 16`. **2.** Messages shard by `conversation_id`. **3.** Multi-tenant SaaS shard large customers dedicated DB.',
      'Multi-Tenant Partitioning': '**1.** Row-level `tenant_id` on all tables with RLS. **2.** Schema-per-tenant for enterprise customers. **3.** Shopify logical shop isolation in shared platform.',
      'Soft Delete': '**1.** `deleted_at` timestamp on user; hide from UI. **2.** Recycle bin for wiki pages before purge. **3.** GDPR-friendly retain audit but hide profile.',
      'Temporal Tables': '**1.** SQL Server system-versioned table for price history. **2.** Audit who changed contract terms when. **3.** Replay inventory level at past date for dispute.',
    },
  },
  'Messaging_Integration_patterns': {
    title: 'Messaging & Integration Patterns',
    indexPath: '../Messaging_Integration_patterns/INDEX.md',
    patterns: {
      'Publish-Subscribe': '**1.** `OrderPlaced` published; email and warehouse subscribers react. **2.** Redis pub/sub invalidates cache keys cluster-wide. **3.** SNS topic fan-out to multiple SQS queues.',
      Queue: '**1.** SQS queue buffers webhook delivery retries. **2.** RabbitMQ queue for image processing jobs. **3.** Beanstalkd queue for background thumbnail generation.',
      'Producer-Consumer': '**1.** API produces audit events; indexer consumer updates Elasticsearch. **2.** Cron produces report jobs; workers consume. **3.** IoT gateway produces readings; analytics consumes.',
      'Request-Reply': '**1.** RPC over RabbitMQ: client waits on reply queue. **2.** gRPC synchronous request-response between services. **3.** Temp queue pattern in JMS for correlated response.',
      'Message Broker': '**1.** RabbitMQ routes messages between microservices. **2.** ActiveMQ enterprise integration backbone. **3.** Amazon MQ managed broker for legacy JMS apps.',
      'Message Bus': '**1.** Kafka as enterprise event bus for domain events. **2.** Azure Service Bus topics and subscriptions. **3.** Google Pub/Sub internal platform bus.',
      'Dead Letter Queue': '**1.** Failed webhook deliveries after 5 retries → DLQ for ops. **2.** Poison Kafka messages skipped to DLQ topic. **3.** Email bounces land in DLQ for investigation.',
      'Competing Consumers': '**1.** Ten workers pull from same SQS queue for parallel transcode. **2.** Multiple indexers consume partition of log topic. **3.** Email senders scale by adding consumers.',
      'Event Streaming': '**1.** Kafka log of all user clicks for analytics. **2.** Kinesis stream of IoT sensor data. **3.** Redpanda event log for order lifecycle.',
      'Event Notification': '**1.** Lightweight `UserRegistered` event triggers welcome email only. **2.** `PaymentFailed` notifies billing service. **3.** `DeployFinished` pings Slack webhook.',
      'Event-Carried State Transfer': '**1.** Event includes full order snapshot so warehouse need not callback. **2.** Catalog change event carries product fields for search index. **3.** User profile updated event carries new attributes for cache.',
      'Content-Based Router': '**1.** Route `order.total > 1000` to fraud queue else normal. **2.** Route messages by `contentType` to PDF vs image handlers. **3.** Enterprise integration router by country code.',
      'Message Filter': '**1.** Drop heartbeat messages from metrics stream. **2.** Filter debug logs in production subscription. **3.** Ignore stale inventory events older than TTL.',
      Aggregator: '**1.** Combine partial shipment messages into one `OrderComplete`. **2.** Merge multi-page API responses in integration flow. **3.** Batch user activity events into hourly rollup message.',
      Splitter: '**1.** Split bulk CSV import message into one message per row. **2.** Fan-out order with multiple warehouses into per-warehouse messages. **3.** Break composite ERP message into line items.',
      Resequencer: '**1.** Reorder out-of-sequence payment capture before ledger post. **2.** Buffer chat messages until gap filled. **3.** IoT sensor readings resequenced by timestamp.',
      'Message Translator': '**1.** Convert XML order to JSON for internal API. **2.** Map Shopify webhook to canonical `OrderCreated`. **3.** HL7 to FHIR translation in hospital integration.',
      'Canonical Data Model': '**1.** Enterprise `CanonicalOrder` all departments use. **2.** Internal `Customer` schema for CRM, billing, support. **3.** Platform event envelope standard across teams.',
      'Correlation Identifier': '**1.** `traceId` propagated across microservice calls. **2.** `orderId` in all related Kafka messages. **3.** JMS `JMSCorrelationID` for request-reply pairing.',
      'Message Store': '**1.** Persist all SWIFT messages for regulatory audit. **2.** Store every webhook payload for replay debugging. **3.** HIPAA audit log of PHI-related messages.',
      'Claim Check': '**1.** Message carries S3 URL to 50MB attachment not body. **2.** Kafka event references blob store for image bytes. **3.** Email queue message with claim check to HTML body in object storage.',
      'Pipes and Filters': '**1.** Log pipeline: parse → enrich → filter → index. **2.** Image: validate → resize → watermark → upload filters. **3.** ETL pipes between source, transform, warehouse load.',
    },
  },
  'Resilience_patterns': {
    title: 'Resilience Patterns',
    indexPath: '../Resilience_Pattern/INDEX.md',
    patterns: {
      'Circuit Breaker': '**1.** Open circuit to failing fraud API; fail fast checkout. **2.** Breaker on geocoder during maps outage. **3.** Hystrix dashboard shows open circuits per dependency.',
      Retry: '**1.** Retry S3 upload on transient network error. **2.** Idempotent charge retry after timeout unknown. **3.** Mobile client retries GET on 502.',
      Timeout: '**1.** 2s timeout on payment authorization call. **2.** HTTP client timeout prevents thread exhaustion. **3.** DB query timeout kills runaway report.',
      Bulkhead: '**1.** Dedicated pool for admin vs public API traffic. **2.** Separate K8s deployment for batch vs online. **3.** Thread limit for external webhook callbacks only.',
      'Fail Fast': '**1.** Reject hold on seat already `SOLD` immediately. **2.** Validate cart empty before payment attempt. **3.** Return 400 on invalid JWT before hitting DB.',
      'Graceful Degradation': '**1.** Show cached product catalog if live API slow. **2.** Disable recommendations widget; core checkout works. **3.** Read-only mode during partial outage.',
      Fallback: '**1.** Use stale ETA if maps routing unavailable. **2.** Default avatar if Gravatar down. **3.** Secondary payment processor if primary fails.',
      'Load Shedding': '**1.** Reject non-login traffic during auth DB incident. **2.** Drop analytics beacons under CPU pressure. **3.** Waiting room sheds users during ticket onsale.',
      Backpressure: '**1.** Kafka consumer pauses when downstream slow. **2.** Reactive streams `onBackpressureBuffer`. **3.** TCP window signals sender to slow down.',
      Watchdog: '**1.** Supervisor restarts crashed worker process. **2.** K8s liveness probe kills hung pod. **3.** Hardware watchdog resets embedded device.',
      Checkpointing: '**1.** Flink checkpoint stream state every minute. **2.** Video transcode saves progress at 25% intervals. **3.** Migration job records last processed id.',
      Heartbeat: '**1.** Worker heartbeat to coordinator; missed → requeue job. **2.** Load balancer health check every 10s. **3.** Distributed lock renewed via heartbeat TTL.',
      Failover: '**1.** DNS failover to secondary region on primary down. **2.** Database automatic failover to standby replica. **3.** Active-passive API cluster promotion.',
      'Active-Active': '**1.** Two regions serve traffic simultaneously with conflict rules. **2.** Multi-master Redis for geo-low-latency reads/writes. **3.** Global load balancer across US and EU clusters.',
      'Active-Passive': '**1.** Standby K8s cluster warms but receives no traffic until failover. **2.** Hot standby DB replica promoted on primary failure. **3.** DR site passive until disaster declared.',
    },
  },
  'Security_patterns': {
    title: 'Security Patterns',
    indexPath: '../Security_patterns/INDEX.md',
    patterns: {
      'Zero Trust': '**1.** Every API call verified regardless of internal network. **2.** mTLS between all microservices in mesh. **3.** No VPN trust; identity-based access only.',
      RBAC: '**1.** `admin` vs `editor` vs `viewer` WordPress roles. **2.** Kubernetes RBAC for who can delete pods. **3.** Shopify staff permissions per store role.',
      ABAC: '**1.** Access if `department=finance` AND `region=US`. **2.** Doctor sees patients only in assigned hospital attribute. **3.** Franchisee manager sees only their `locationIds`.',
      OAuth2: '**1.** “Login with Google” on SaaS app. **2.** Shopify app installs via OAuth to get shop token. **3.** Mobile app authorization code flow with PKCE.',
      'OpenID Connect': '**1.** OIDC on top of OAuth returns `id_token` with user claims. **2.** Enterprise SSO to internal tools via Okta OIDC. **3.** AWS Cognito user pool OIDC for SPA login.',
      'Federated Identity': '**1.** Employees use corporate IdP to access vendor SaaS. **2.** SAML federation between university and research portal. **3.** Cross-cloud identity with Azure AD B2B guests.',
      'API Token Gateway': '**1.** Kong validates API keys before routing to backends. **2.** Cloudflare API shield checks tokens at edge. **3.** Internal gateway validates service JWTs.',
      JWT: '**1.** Stateless session: `Authorization: Bearer` JWT with `sub`, `exp`. **2.** Short-lived access JWT + refresh token pattern. **3.** Signed shop context in Shopify app session JWT.',
      'Defense in Depth': '**1.** WAF + auth + RBAC + encryption + audit logs layered. **2.** PCI: network segment + tokenization + monitoring. **3.** Admin panel behind VPN, MFA, and IP allowlist.',
      'Bastion Host': '**1.** SSH only through bastion to private DB subnet. **2.** Jump box for ops access to production VPC. **3.** Hardened admin entry point with session logging.',
      DMZ: '**1.** Public web servers in DMZ; app servers private subnet. **2.** Payment capture in PCI DMZ segment. **3.** Reverse proxy in DMZ terminates TLS.',
      'Secrets Vault': '**1.** HashiCorp Vault stores DB passwords rotated weekly. **2.** AWS Secrets Manager for API keys. **3.** K8s external secrets sync to pods at runtime.',
      'Envelope Encryption': '**1.** S3 SSE-KMS with per-object data keys. **2.** Database column encrypted with DEK wrapped by KEK. **3.** TLS session keys derived from master secret.',
      'Secure Gateway': '**1.** API gateway terminates TLS and inspects payloads. **2.** Egress proxy filters outbound calls from data center. **3.** Zero-trust access proxy (BeyondCorp style).',
      'Mutual TLS': '**1.** Service mesh mTLS between every pod pair. **2.** Bank-to-bank API client and server certs. **3.** IoT device cert authenticates to MQTT broker.',
      'Policy Enforcement Point': '**1.** OPA sidecar denies request failing policy.rego. **2.** API gateway PEP checks scopes before upstream. **3.** Service mesh authorization policy on route.',
    },
  },
  'Frontend_patterns': {
    title: 'Frontend Patterns',
    indexPath: '../Frontend_patterns/INDEX.md',
    patterns: {
      MVC: '**1.** Server-rendered Rails product pages. **2.** ASP.NET MVC marketing site. **3.** PHP Laravel controller returns Blade view.',
      MVVM: '**1.** Knockout.js bindings to ViewModel observables. **2.** Android Jetpack ViewModel + LiveData. **3.** WPF desktop app with ICommand bindings.',
      MVP: '**1.** GWT presenter handles history token navigation. **2.** Android MVP with passive fragment view. **3.** Testable presenter unit tests without UI robot.',
      Flux: '**1.** Facebook Flux: actions → dispatcher → stores → views. **2.** Early React ecosystem flux implementations. **3.** Unidirectional data flow in legacy chat UI.',
      Redux: '**1.** Global store for cart, user, UI state in React SPA. **2.** Redux Toolkit slices for ecommerce checkout. **3.** Time-travel debug of state changes.',
      'Component-Based Architecture': '**1.** React component tree for design system Storybook. **2.** Vue SFC building blocks for dashboard. **3.** Web Components shared across micro frontends.',
      'Micro Frontends': '**1.** Shell loads product, cart, checkout as separate deployables. **2.** IKEA-style page composed of team-owned widgets. **3.** Module federation shares React across apps.',
      Observer: '**1.** UI subscribes to store changes and re-renders. **2.** EventEmitter on model updates view. **3.** RxJS observables drive Angular templates.',
      'State Container': '**1.** Zustand store for global modal and auth state. **2.** Pinia container in Vue 3 app. **3.** Context API provider for theme and locale.',
      'Virtual DOM': '**1.** React diffs virtual tree before patching real DOM. **2.** Vue compiler + VDOM update on reactive data. **3.** Preact lightweight VDOM for performance.',
    },
  },
  'Cloud_infra_patterns': {
    title: 'Cloud & Infrastructure Patterns',
    indexPath: '../Cloud_infra_patterns/INDEX.md',
    patterns: {
      'Stateless Services': '**1.** ECS tasks behind ALB with no sticky session state. **2.** Cloud Run services scale to zero statelessly. **3.** API pods store nothing local except temp.',
      'Immutable Infrastructure': '**1.** Replace EC2 AMI on deploy never SSH patch. **2.** New container image tag rolled out via K8s. **3.** Terraform destroys/recreates servers on change.',
      'Auto Scaling': '**1.** ASG adds instances when CPU high. **2.** K8s VPA adjusts pod CPU requests. **3.** DynamoDB on-demand scales capacity automatically.',
      'Blue-Green Deployment': '**1.** Switch load balancer from blue v1 to green v2 stack. **2.** Two identical envs; flip DNS for instant cutover. **3.** Database migration on green before traffic switch.',
      'Canary Deployment': '**1.** 5% traffic to new checkout version monitor errors. **2.** Flagger progressive traffic shift in Istio. **3.** Feature cohort gets new API version first.',
      'Rolling Deployment': '**1.** K8s rolling update one pod at a time. **2.** ECS rolling replace tasks gradually. **3.** Ansible serial: 2 hosts at a time.',
      'Feature Flags': '**1.** LaunchDarkly toggles new UI for 10% users. **2.** Kill switch disables broken payment path. **3.** Shopify rollout stages menu sync by region.',
      'Infrastructure as Code': '**1.** Terraform defines VPC, RDS, EKS. **2.** Pulumi programs cloud stack in TypeScript. **3.** CloudFormation templates for compliance audit.',
      Sidecar: '**1.** Envoy proxy container beside app in pod. **2.** Log forwarder sidecar to Datadog. **3.** Vault agent sidecar injects secrets.',
      'Service Mesh': '**1.** Istio manages traffic and mTLS mesh-wide. **2.** Linkerd automatic retries and metrics. **3.** AWS App Mesh for ECS services.',
      'Multi-Region Deployment': '**1.** Active-active API in us-east and eu-west. **2.** S3 cross-region replication for media. **3.** Global Aurora for read replicas per region.',
      CDN: '**1.** CloudFront in front of S3 static site. **2.** Fastly caches API responses at edge. **3.** Shopify storefront assets on CDN.',
      'Edge Computing': '**1.** Cloudflare Workers run auth at edge. **2.** Lambda@Edge modifies HTML responses. **3.** IoT inference on gateway device locally.',
      'Cell-Based Architecture': '**1.** Stripe-style cells isolate merchant shards failure domain. **2.** Gaming shard per 10k concurrent players. **3.** SaaS cell per 500 enterprise tenants.',
      'Availability Zones': '**1.** RDS multi-AZ synchronous standby. **2.** K8s nodes spread across 3 AZs. **3.** Load balancer health checks per AZ.',
      'Chaos Engineering': '**1.** Chaos Monkey terminates random instances in staging. **2.** Gremlin injects latency on payment dependency. **3.** Game days simulate region failure.',
      'Horizontal Scaling': '**1.** Add more API replicas behind load balancer. **2.** Shard workers horizontally for queue consumers. **3.** Cassandra adds nodes to ring.',
      'Vertical Scaling': '**1.** Upgrade DB instance from r5.large to r5.2xlarge. **2.** Increase pod memory limit for JVM heap. **3.** Bigger Redis node before cluster split.',
    },
  },
  'DevOps_Delivery_patterns': {
    title: 'DevOps & Delivery Patterns',
    indexPath: '../DevOps_Delivery_patterns/INDEX.md',
    patterns: {
      'CI/CD Pipeline': '**1.** GitHub Actions: test → build image → deploy staging. **2.** GitLab pipeline with manual prod gate. **3.** Jenkins multibranch per PR validation.',
      GitOps: '**1.** Argo CD syncs K8s from Git repo desired state. **2.** Flux reconciles cluster to committed manifests. **3.** Infra changes via PR to `terraform/` repo.',
      'Trunk-Based Development': '**1.** Small commits daily to `main` behind feature flags. **2.** Google-style short-lived branches < 1 day. **3.** Continuous integration on every push to trunk.',
      'Branch by Abstraction': '**1.** Interface over legacy payment; new impl behind flag. **2.** Strangler abstraction layer routes % traffic to new service. **3.** Dual-write abstraction during migration.',
      'Infrastructure as Code': '**1.** Terraform plan in PR comments. **2.** Ansible playbooks provision web tier. **3.** CDK defines stack in TypeScript.',
      Observability: '**1.** Metrics + logs + traces triangulate checkout failure. **2.** SLO dashboard for 99.9% API availability. **3.** RED metrics per microservice.',
      'Centralized Logging': '**1.** ELK stack aggregates pod logs. **2.** Datadog log management with trace correlation. **3.** CloudWatch Logs Insights queries.',
      'Distributed Tracing': '**1.** OpenTelemetry trace across gateway → order → payment. **2.** Jaeger UI shows slow span in checkout. **3.** AWS X-Ray service map.',
      'Health Checks': '**1.** `/health` liveness for K8s kubelet. **2.** `/ready` checks DB connection before receiving traffic. **3.** ALB target group health HTTP 200.',
      'Self-Healing Systems': '**1.** K8s restarts failed container automatically. **2.** ASG replaces unhealthy instance. **3.** Operator controller reconciles desired replicas.',
      'Chaos Testing': '**1.** Weekly staging chaos: kill random pod. **2.** Litmus chaos experiments in CI cluster. **3.** Network partition test between services.',
      'Progressive Delivery': '**1.** Canary + automated rollback on error rate. **2.** Ring deployment through internal → beta → GA. **3.** Flag-driven release separate from deploy.',
    },
  },
  'Org_System_Engineering_patterns': {
    title: 'Org & System Engineering Patterns',
    indexPath: '../Org_System_Engineering_patterns/INDEX.md',
    patterns: {
      "Conway's Law Alignment": '**1.** Checkout team owns checkout service boundary matching org chart. **2.** Split monolith where team communication lines break. **3.** Platform team provides internal API matching stream-aligned needs.',
      'Bounded Context': '**1.** `Billing` context separate from `Shipping` ubiquitous language. **2.** Franchise `Royalty` context vs `Operations` context. **3.** EMR integration ACL at hospital context boundary.',
      'Team Topologies': '**1.** Stream-aligned team owns end-to-end order flow. **2.** Platform team provides K8s and CI templates. **3.** Enabling team coaches DDD adoption temporarily.',
      'Platform Teams': '**1.** Internal developer platform for golden paths. **2.** Shared observability stack team. **3.** Identity platform team for SSO across products.',
      'Shared Services': '**1.** Central email/SMS notification service. **2.** Shared fraud scoring API for all product lines. **3.** Corporate LDAP used by multiple divisions.',
      'Capability-Based Architecture': '**1.** Map systems to capabilities: Sell, Fulfill, Bill. **2.** Capability heatmap drives investment priorities. **3.** API products aligned to business capabilities not org silos.',
      'Domain-Driven Design': '**1.** Workshop defines aggregates for order domain. **2.** Ubiquitous language in code: `Hold`, `Seat`, `Venue`. **3.** Context map between catalog and inventory teams.',
      'Event Storming': '**1.** Sticky-note workshop maps checkout domain events. **2.** Discover `PaymentAuthorized` → `OrderConfirmed` flow gaps. **3.** Franchise onboarding event storm with biz + tech.',
      'Anti-Corruption Layer': '**1.** ACL between clean domain and legacy ERP. **2.** Translation layer for POS vendor sales feed. **3.** Shopify webhook adapter to internal order model.',
    },
  },
};

function renderFile(slug, data) {
  const rows = Object.entries(data.patterns)
    .map(([name, examples]) => {
      const risk = patternRisks[slug]?.[name];
      if (!risk) {
        console.warn(`Missing risk for ${slug} → ${name}`);
      }
      return `| ${risk ?? '—'} | **${name}** | ${examples} |`;
    })
    .join('\n');

  return `# ${data.title} — Three Examples Each

> Concrete examples for every pattern in [${data.title} INDEX](${data.indexPath}). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
${rows}

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
`;
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const indexRows = [];
for (const [slug, data] of Object.entries(categories)) {
  const filename = `${slug}-examples.md`;
  fs.writeFileSync(path.join(outDir, filename), renderFile(slug, data));
  indexRows.push({ slug, title: data.title, filename, count: Object.keys(data.patterns).length });
  console.log(`Created: ${filename} (${Object.keys(data.patterns).length} patterns)`);
}

const masterIndex = `# Pattern Examples by Category

Three **concrete examples** per pattern plus the **risk** each pattern addresses — same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Category | Patterns | File |
| --- | --- | --- |
${indexRows.map(r => `| ${r.title} | ${r.count} | [${r.filename}](./${r.filename}) |`).join('\n')}

## Learning path

\`\`\`text
Name the risk → Pattern doc (mechanics) → Examples table (recognition) → Problem file (composition)
\`\`\`

Back to [Software Patterns Docs](../risk-driven-patterns.md)
`;

fs.writeFileSync(path.join(outDir, 'INDEX.md'), masterIndex);
console.log('Created: INDEX.md');
