# Architectural Patterns — Three Examples Each

> Concrete examples for every pattern in [Architectural Patterns INDEX](../Architectural Patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Logic scattered on clients; hard to secure and update | **Client-Server Architecture** | **1.** Mobile banking app (client) calls REST API on bank servers. **2.** Electron desktop client talks to SaaS backend for sync. **3.** Game launcher downloads patches from patch server. |
| Monolith deploys block teams and scale unevenly | **Microservices Architecture** | **1.** Shopify-scale shop splits catalog, checkout, inventory, notifications. **2.** Netflix-style video: upload, transcode, playback, billing as services. **3.** Uber: rider, driver, pricing, maps as separate deployables. |
| Duplicated integrations without shared enterprise services | **SOA** | **1.** Enterprise ERP exposes SOAP inventory service to warehouse and ecommerce. **2.** Bank shares customer profile service across mortgage and cards divisions. **3.** Government agency ESB routes citizen requests to agency backends. |
| Tight coupling causes cascading failures on change | **Event-Driven Architecture** | **1.** Order placed → events trigger email, warehouse pick, analytics. **2.** User signed up → CRM, welcome email, trial metering subscribe. **3.** Sensor reading → alerting, aggregation, cold storage pipeline. |
| Domain logic couples to frameworks and vendors | **Hexagonal Architecture** | **1.** Payment core defines `PaymentPort`; Stripe adapter plugs in without core changes. **2.** Domain orders use `OrderRepository` interface; Postgres adapter swappable. **3.** Auth core uses `IdentityPort`; Okta vs Auth0 as adapters. |
| Business rules leak into UI and infrastructure layers | **Clean Architecture** | **1.** Use cases (`PlaceOrder`) orchestrate entities; UI and DB are outer rings. **2.** Loan approval rules live in domain; web and batch are delivery mechanisms. **3.** Inventory invariants enforced in entities, not controllers. |
| Infrastructure concerns pollute core domain code | **Onion Architecture** | **1.** Domain at center; application services wrap; infrastructure outermost. **2.** Billing rules independent of Stripe webhooks layer. **3.** Scheduling domain unaware of React admin UI. |
| Monolithic processing stages block reuse and scaling | **Pipe and Filter Architecture** | **1.** Log pipeline: ingest → parse → enrich → index filters. **2.** Image upload: validate → virus scan → resize → store stages. **3.** ETL: extract CSV → transform → load warehouse filters. |
| Point-to-point integrations become unmaintainable mesh | **Broker Architecture** | **1.** Message broker routes order events to billing and shipping subscribers. **2.** MQTT broker between IoT devices and rule engine. **3.** JMS broker connects legacy mainframe to modern services. |
| Central server becomes bottleneck or single point of failure | **Peer-to-Peer Architecture** | **1.** BitTorrent clients exchange file blocks directly. **2.** Blockchain nodes gossip transactions without central coordinator. **3.** WebRTC video call media flows peer-to-peer when possible. |
| Same model cannot scale reads and writes independently | **CQRS** | **1.** Ticketmaster: write holds to inventory shard; read seat map from projection. **2.** News feed writes posts; home timeline read from precomputed cache. **3.** Bank ledger writes events; balance queries hit materialized view. |
| Current state lost; audit and replay impossible | **Event Sourcing** | **1.** Bank account balance rebuilt from deposit/withdraw events. **2.** Shopping cart replayed from `ItemAdded` / `ItemRemoved` stream. **3.** Audit trail for franchise royalty disputes from sales events. |
| Idle servers waste money; burst capacity unavailable | **Serverless Architecture** | **1.** Thumbnail generator Lambda on S3 upload events. **2.** Webhook receiver function scales per burst without servers. **3.** Scheduled nightly report via Cloud Functions cron. |
| Disk-bound processing cannot meet sub-ms latency | **Space-Based Architecture** | **1.** Trading platform processes in memory grid before async persist. **2.** Ad auction bids evaluated in data grid for sub-ms latency. **3.** Gaming matchmaking state in tuple space until match starts. |
| Blocking IO exhausts threads under concurrent load | **Reactive Architecture** | **1.** Stock ticker UI streams quotes via backpressure-aware Flux. **2.** Chat app handles 10k concurrent connections with non-blocking IO. **3.** Real-time dashboard degrades chart detail under load. |
| Shared mutable state causes race conditions across workers | **Actor Model** | **1.** Each chat room is an actor processing messages serially. **2.** Game entity (player, NPC) as actor with mailbox. **3.** IoT device supervisor spawns child actor per sensor. |
| Independent experts cannot collaborate on one problem | **Blackboard Architecture** | **1.** Speech recognition: phoneme, grammar, lexicon agents write hypotheses to shared board. **2.** Medical diagnosis agents contribute evidence to common case blackboard. **3.** AI planning: planner, scheduler, critic share partial plans. |
| UI, logic, and data concerns entangled in one layer | **MVC** | **1.** Rails blog: Post model, article view, controller handles HTTP. **2.** Spring MVC employee directory. **3.** Django admin CRUD with template views. |
| View logic untestable and tightly bound to UI widgets | **MVVM** | **1.** WPF desktop app: View binds to ViewModel commands and observable state. **2.** Xamarin mobile forms with INotifyPropertyChanged ViewModels. **3.** Vue/React-style separation where presentation state drives UI (conceptual parallel). |
| Fat views mix presentation with business rules | **MVP** | **1.** Android presenter fetches data, passive view shows loading spinner. **2.** WinForms app presenter handles button clicks, view is interface. **3.** GWT-style web MVP with testable presenter logic. |
| Each client over-fetches or under-shapes microservice APIs | **Backend-for-Frontend** | **1.** Mobile BFF aggregates profile + orders + loyalty in one call. **2.** Web BFF shapes GraphQL for marketing site vs admin console. **3.** Partner API BFF exposes stable contract over volatile microservices. |
| No clear separation between presentation, domain, and data | **Layered Architecture** | **1.** Classic 3-tier: presentation → business → data access. **2.** Enterprise app: UI layer, service layer, DAO layer. **3.** Internal tool: API layer, domain layer, repository layer. |
| Monolith grows without boundaries before split is viable | **Modular Monolith Architecture** | **1.** E-commerce monolith with `catalog`, `checkout`, `shipping` modules and clear boundaries. **2.** HR system modules: payroll, benefits, timekeeping in one deployable. **3.** WordPress-style core with plugin boundaries as modules. |
| Premature distribution adds ops cost without team need | **Monolith Architecture** | **1.** Early-stage startup single Rails app for speed. **2.** Internal admin tool one Django project. **3.** Small WooCommerce store on single PHP deployment. |

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
