# Problem Solving Using Software Engineering Patterns

Real systems rarely need **one** pattern. They need a **mix** — architecture, messaging, data, resilience, and security patterns working together.

Each file below takes a common production problem, states the constraints, maps patterns to responsibilities, and shows how the flows connect.

## Learning path — exercises (Steps 3 & 4)

**Patterns → Problems → [Exercises](./exercises/INDEX.md)** — design drills, pseudocode build slices, and *how naive implementations fail before testing*. Documentation only; no runnable tests.

| Start | Link |
| --- | --- |
| How to use | [exercises/00-how-to-use-exercises.md](./exercises/00-how-to-use-exercises.md) |
| All exercises | [exercises/INDEX.md](./exercises/INDEX.md) |
| Recommended first | [02 Ticketmaster exercise](./exercises/02-ticketmaster.md) |

## Cross-cutting concerns (technical lenses)

Map **how** systems fail (reads, writes, contention…) before picking **which** product to study.

| # | Concern | Link |
| --- | --- | --- |
| 1 | Real-Time Updates | [concerns/01-real-time-updates.md](./concerns/01-real-time-updates.md) |
| 2 | Dealing with Contention | [concerns/02-dealing-with-contention.md](./concerns/02-dealing-with-contention.md) |
| 3 | Multi-Step Processes | [concerns/03-multi-step-processes.md](./concerns/03-multi-step-processes.md) |
| 4 | Scaling Reads | [concerns/04-scaling-reads.md](./concerns/04-scaling-reads.md) |
| 5 | Scaling Writes | [concerns/05-scaling-writes.md](./concerns/05-scaling-writes.md) |
| 6 | Handling Large Blobs | [concerns/06-handling-large-blobs.md](./concerns/06-handling-large-blobs.md) |
| 7 | Managing Long Running Tasks | [concerns/07-managing-long-running-tasks.md](./concerns/07-managing-long-running-tasks.md) |
| 8 | Proximity Search | [concerns/08-proximity-search.md](./concerns/08-proximity-search.md) |
| 9 | Time Series Databases | [concerns/09-time-series-databases.md](./concerns/09-time-series-databases.md) |
| 10 | Data Structures for Big Data | [concerns/10-data-structures-for-big-data.md](./concerns/10-data-structures-for-big-data.md) |
| 11 | Vector Databases | [concerns/11-vector-databases.md](./concerns/11-vector-databases.md) |
| — | All concerns + matrix | [concerns/INDEX.md](./concerns/INDEX.md) |

```text
Patterns → Concerns (lens) → Problems → Exercises
```

## Classic production problems (1–10)

| # | Problem | Core challenge |
| --- | --- | --- |
| 1 | [Scaling E-Commerce with Notifications](./01-scaling-ecommerce-notifications.md) | Fast checkout; async email to customers and vendors |
| 2 | [High-Demand Event Ticketing (Ticketmaster)](./02-ticketmaster-style-event-booking.md) | Flash traffic, seat holds, no double booking |
| 3 | [Multi-Party Payment & Settlement Platform](./03-payment-settlement-platform.md) | Money movement, webhooks, audit ledger |
| 4 | [Food Delivery Dispatch](./04-food-delivery-dispatch.md) | Customer, restaurant, driver; live status and ETA |
| 5 | [Hospital Appointment + EMR Integration](./05-hospital-appointment-emr-integration.md) | Book slots; sync legacy EMR; PHI compliance |
| 6 | [Multi-Tenant SaaS with Usage Billing](./06-multi-tenant-saas-usage-billing.md) | Tenant isolation; meter usage; monthly invoices |
| 7 | [Real-Time Chat + Notifications](./07-realtime-chat-notifications.md) | Millions of rooms; unread counts; push fallback |
| 8 | [Video Upload & Transcoding Pipeline](./08-video-upload-transcoding-pipeline.md) | Large files; multi-stage encode; CDN delivery |
| 9 | [Fraud Detection on Checkout](./09-fraud-detection-on-checkout.md) | Real-time scoring; review queue; audit trail |
| 10 | [Global Inventory Sync](./10-global-inventory-sync.md) | Warehouse + stores + online; no oversell |

## System design interview classics (11–39)

| # | Problem | Core challenge |
| --- | --- | --- |
| 11 | [Bitly (URL Shortener)](./11-bitly-url-shortener.md) | Billions of links; sub-50 ms redirects; async analytics |
| 12 | [Dropbox (File Sync)](./12-dropbox-file-sync.md) | Block dedup; delta sync; conflict resolution |
| 13 | [Local Delivery Service](./13-local-delivery-service.md) | Geo dispatch; live GPS; payment split saga |
| 15 | [Facebook News Feed](./15-fb-news-feed.md) | Hybrid fan-out; ranking; celebrity read-merge |
| 16 | [Tinder (Match & Discovery)](./16-tinder.md) | Geo candidates; atomic mutual match |
| 17 | [LeetCode (Code Judge)](./17-leetcode.md) | Sandboxed execution; fair queue; leaderboards |
| 18 | [WhatsApp (Messaging)](./18-whatsapp.md) | E2E encryption; multi-device; store-and-forward |
| 19 | [Rate Limiter](./19-rate-limiter.md) | Distributed counters; token bucket; &lt; 1 ms decision |
| 20 | [Facebook Live Comments](./20-fb-live-comments.md) | Viral stream fan-out; moderation pipeline |
| 21 | [Facebook Post Search](./21-fb-post-search.md) | Full-text index; privacy filter; real-time ingest |
| 22 | [YouTube Top K](./22-youtube-top-k.md) | Stream aggregation; trending windows |
| 23 | [Uber (Ride Hailing)](./23-uber-ride-hailing.md) | Geo match; surge pricing; trip saga |
| 24 | [YouTube (Video Platform)](./24-youtube-video-platform.md) | Upload; transcode; CDN; recommendations |
| 25 | [Web Crawler](./25-web-crawler.md) | Politeness; dedup; priority frontier |
| 26 | [Ad Click Aggregator](./26-ad-click-aggregator.md) | Million events/sec; idempotent billing counts |
| 27 | [News Aggregator](./27-news-aggregator.md) | RSS ingest; story clustering; personalized feed |
| 28 | [Yelp (Local Discovery)](./28-yelp-local-discovery.md) | Geo + text search; reviews; open-now ranking |
| 29 | [Strava (Fitness Tracking)](./29-strava-fitness-tracking.md) | GPS upload; segment leaderboards; social feed |
| 30 | [Online Auction](./30-online-auction.md) | Atomic bids; proxy bidding; anti-snipe close |
| 31 | [Price Tracking Service](./31-price-tracking-service.md) | Smart polling; price history; drop alerts |
| 32 | [Instagram (Photo Sharing)](./32-instagram-photo-sharing.md) | Media CDN; feed fan-out; 24h Stories TTL |
| 33 | [Robinhood (Trading)](./33-robinhood-trading.md) | Live quotes; order saga; ledger audit |
| 34 | [Google Docs (Collaboration)](./34-google-docs-collaboration.md) | OT/CRDT; real-time sync; version history |
| 35 | [Distributed Cache](./35-distributed-cache.md) | Consistent hash; cache-aside; invalidation |
| 36 | [Job Scheduler](./36-job-scheduler.md) | Cron at scale; leases; idempotent workers |
| 37 | [Payment System](./37-payment-system.md) | Idempotent charges; ledger; webhook outbox |
| 38 | [Metrics Monitoring](./38-metrics-monitoring.md) | TSDB ingest; rollups; alert evaluation |
| 39 | [ChatGPT (LLM Platform)](./39-chatgpt-llm-platform.md) | Streaming inference; RAG; tool agents; rate tiers |

## Porter Value Chain — enterprise back office (40–49)

| # | Porter section | Problem | Core challenge |
| --- | --- | --- | --- |
| 40 | Firm Infrastructure | [Enterprise SSO & Identity](./40-enterprise-sso-identity.md) | SAML/OIDC; MFA; SCIM; audit trail |
| 41 | Human Resource Management | [HRIS + Payroll Platform](./41-hris-payroll-platform.md) | Pay runs; regional tax rules; idempotent batches |
| 42 | Technology Development | [Feature Flags & Experimentation](./42-feature-flags-experimentation.md) | Edge eval; bucketing; kill switch |
| 43 | Procurement | [Supplier Portal & PO Workflow](./43-supplier-portal-procurement.md) | RFQ → PO → 3-way match |
| 44 | Inbound Logistics | [Warehouse Receiving & ASN](./44-warehouse-receiving-asn.md) | ASN ingest; scan-to-put-away |
| 45 | Operations | [Order Fulfillment Pick-Pack-Ship](./45-order-fulfillment-pick-pack-ship.md) | Waves; no double-pick; ship saga |
| 46 | Outbound Logistics | [Parcel Routing Network](./46-parcel-routing-network.md) | Hub routing; tracking scans |
| 47 | Marketing & Sales | [CRM & Sales Pipeline](./47-crm-sales-pipeline.md) | Leads; stages; forecast roll-up |
| 48 | Service | [Customer Support Helpdesk](./48-customer-support-helpdesk.md) | Tickets; SLA; skill routing |
| 49 | Margin (cross-chain) | [Returns & Reverse Logistics](./49-returns-reverse-logistics.md) | RMA; refund saga; restock |

## Franchise model — franchisor ↔ franchisee (50–62)

| # | Franchise focus | Problem | Core challenge |
| --- | --- | --- | --- |
| 50 | Royalties & fees | [Franchise Royalty & Fee Engine](./50-franchise-royalty-fee-engine.md) | % of gross; weekly remittance; disputes |
| 51 | Compliance | [Brand Compliance & Audit Platform](./51-brand-compliance-audit-platform.md) | Audits; scoring; corrective action |
| 52 | Training | [Franchise Training & Certification LMS](./52-franchise-training-certification-lms.md) | Cert gating; POS access; expiry |
| 53 | Marketing co-op | [Marketing Co-op Fund Allocation](./53-marketing-coop-fund-allocation.md) | Contributions vs campaign spend |
| 54 | HQ operations | [HQ Menu, Pricing & Promo Control](./54-hq-menu-pricing-promo-control.md) | Staged POS rollout; rollback |
| 55 | Multi-unit structure | [Multi-Unit Franchisee Dashboard](./55-multi-unit-franchisee-dashboard.md) | Roll-up metrics; regional RBAC |
| 56 | Area development | [Territory & Area Development](./56-territory-area-development.md) | Exclusive geo; milestones; penalties |
| 57 | Master franchise | [Master Franchise Sub-Franchising](./57-master-franchise-sub-franchising.md) | 3-level hierarchy; fee splits |
| 58 | Site selection | [Franchise Site Selection Pipeline](./58-franchise-site-selection-pipeline.md) | Demographics; approval workflow |
| 59 | Approved suppliers | [Franchisee Purchasing Portal](./59-approved-supplier-purchasing-portal.md) | Contract catalog; compliance gate |
| 60 | Performance reporting | [POS Aggregation & Comp Sales](./60-franchise-pos-aggregation-comp-sales.md) | Normalize vendors; same-store sales |
| 61 | Consumer channel | [Consumer App & Cross-Location Loyalty](./61-franchise-consumer-app-loyalty.md) | Geo; loyalty; revenue attribution |
| 62 | Network growth | [Franchise Sales & FDD Pipeline](./62-franchise-sales-fdd-pipeline.md) | Lead → FDD → signing → opening |

### Franchise problem clusters

| Start here… | Then read… |
| --- | --- |
| Money & reporting | [#50](./50-franchise-royalty-fee-engine.md) → [#60](./60-franchise-pos-aggregation-comp-sales.md) → [#55](./55-multi-unit-franchisee-dashboard.md) |
| Franchisor control | [#54](./54-hq-menu-pricing-promo-control.md) → [#51](./51-brand-compliance-audit-platform.md) → [#52](./52-franchise-training-certification-lms.md) |
| Growth & territory | [#62](./62-franchise-sales-fdd-pipeline.md) → [#58](./58-franchise-site-selection-pipeline.md) → [#56](./56-territory-area-development.md) |
| Master franchise | [#57](./57-master-franchise-sub-franchising.md) + [#50](./50-franchise-royalty-fee-engine.md) |

## Website & commerce platforms (63–67)

| # | Platform | Problem | Core challenge |
| --- | --- | --- | --- |
| 63 | WordPress | [CMS Platform at Scale](./63-wordpress-cms-platform.md) | Object cache, CDN, job queue, plugins |
| 64 | Wix | [Multi-Tenant Website Builder](./64-wix-website-builder.md) | Autosave, publish pipeline, CDN |
| 65 | Elementor | [WordPress Page Builder Plugin](./65-elementor-page-builder-plugin.md) | JSON document, CSS cache, WP integration |
| 66 | Shopify | [Commerce Platform](./66-shopify-commerce-platform.md) | Shop tenancy, checkout saga, webhooks |
| 67 | Square | [POS + Payments Platform](./67-square-pos-payments-platform.md) | Offline sync, unified inventory, ledger |

### Platform comparison (quick study)

| Lens | WordPress + Elementor | Wix | Shopify | Square |
| --- | --- | --- | --- | --- |
| Hosting | Self / managed | Fully hosted SaaS | Fully hosted SaaS | App + cloud |
| Tenancy | Single site / multisite | Multi-tenant builder | Shop = tenant | Seller → locations |
| Render | PHP per request + cache | Static CDN publish | Liquid + CDN | POS + online |
| Money | WooCommerce (optional) | Apps / payments partners | Native checkout | Native payments |

### Quick lookup by name

| You asked for… | File |
| --- | --- |
| Ticketmaster | [#2](./02-ticketmaster-style-event-booking.md) |
| Payment System | [#37](./37-payment-system.md) (also [#3](./03-payment-settlement-platform.md)) |
| Uber | [#23](./23-uber-ride-hailing.md) (also [#4](./04-food-delivery-dispatch.md) for delivery) |
| WhatsApp | [#18](./18-whatsapp.md) (also [#7](./07-realtime-chat-notifications.md)) |
| YouTube | [#24](./24-youtube-video-platform.md) + [#22 Top K](./22-youtube-top-k.md) |
| Porter / Value Chain | [#40–49](./40-enterprise-sso-identity.md) |
| Franchise | [#50–62](./50-franchise-royalty-fee-engine.md) |
| WordPress / Wix / Shopify / Square | [#63–67](./63-wordpress-cms-platform.md) |
| **PeopleForms** | [#68](./68-peopleforms-visual-form-builder-saas.md) |

## Product reference — shipped implementations (68+)

| # | Product | Problem | Core challenge |
| --- | --- | --- | --- |
| 68 | PeopleForms | [Visual Form Builder on Dual-Mode SaaS](./68-peopleforms-visual-form-builder-saas.md) | Schema + embed + CRM outbox + workspace tenancy + usage billing |

Print one file at a time. Pattern names link to docs in sibling folders (`../Scalability_patterns/`, etc.). Architecture diagrams use **Mermaid** (`flowchart`).
