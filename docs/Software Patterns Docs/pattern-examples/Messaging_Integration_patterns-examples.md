# Messaging & Integration Patterns — Three Examples Each

> Concrete examples for every pattern in [Messaging & Integration Patterns INDEX](../Messaging_Integration_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Point-to-point coupling blocks new consumers | **Publish-Subscribe** | **1.** `OrderPlaced` published; email and warehouse subscribers react. **2.** Redis pub/sub invalidates cache keys cluster-wide. **3.** SNS topic fan-out to multiple SQS queues. |
| Synchronous callers block waiting for slow processors | **Queue** | **1.** SQS queue buffers webhook delivery retries. **2.** RabbitMQ queue for image processing jobs. **3.** Beanstalkd queue for background thumbnail generation. |
| Producers outpace consumers and drop or block work | **Producer-Consumer** | **1.** API produces audit events; indexer consumer updates Elasticsearch. **2.** Cron produces report jobs; workers consume. **3.** IoT gateway produces readings; analytics consumes. |
| Async workflows need correlated responses | **Request-Reply** | **1.** RPC over RabbitMQ: client waits on reply queue. **2.** gRPC synchronous request-response between services. **3.** Temp queue pattern in JMS for correlated response. |
| Direct HTTP coupling cannot buffer or decouple peaks | **Message Broker** | **1.** RabbitMQ routes messages between microservices. **2.** ActiveMQ enterprise integration backbone. **3.** Amazon MQ managed broker for legacy JMS apps. |
| Ad hoc integrations without enterprise event backbone | **Message Bus** | **1.** Kafka as enterprise event bus for domain events. **2.** Azure Service Bus topics and subscriptions. **3.** Google Pub/Sub internal platform bus. |
| Poison messages retry forever or disappear silently | **Dead Letter Queue** | **1.** Failed webhook deliveries after 5 retries → DLQ for ops. **2.** Poison Kafka messages skipped to DLQ topic. **3.** Email bounces land in DLQ for investigation. |
| Single consumer cannot scale throughput | **Competing Consumers** | **1.** Ten workers pull from same SQS queue for parallel transcode. **2.** Multiple indexers consume partition of log topic. **3.** Email senders scale by adding consumers. |
| Batch exports miss real-time downstream reactions | **Event Streaming** | **1.** Kafka log of all user clicks for analytics. **2.** Kinesis stream of IoT sensor data. **3.** Redpanda event log for order lifecycle. |
| Heavy payloads force pull callbacks on every change | **Event Notification** | **1.** Lightweight `UserRegistered` event triggers welcome email only. **2.** `PaymentFailed` notifies billing service. **3.** `DeployFinished` pings Slack webhook. |
| Consumers must call back for every field | **Event-Carried State Transfer** | **1.** Event includes full order snapshot so warehouse need not callback. **2.** Catalog change event carries product fields for search index. **3.** User profile updated event carries new attributes for cache. |
| Monolithic router cannot branch by message shape | **Content-Based Router** | **1.** Route `order.total > 1000` to fraud queue else normal. **2.** Route messages by `contentType` to PDF vs image handlers. **3.** Enterprise integration router by country code. |
| Irrelevant messages waste downstream processing | **Message Filter** | **1.** Drop heartbeat messages from metrics stream. **2.** Filter debug logs in production subscription. **3.** Ignore stale inventory events older than TTL. |
| Partial messages never compose into complete business event | **Aggregator** | **1.** Combine partial shipment messages into one `OrderComplete`. **2.** Merge multi-page API responses in integration flow. **3.** Batch user activity events into hourly rollup message. |
| Bulk messages cannot be processed in parallel per item | **Splitter** | **1.** Split bulk CSV import message into one message per row. **2.** Fan-out order with multiple warehouses into per-warehouse messages. **3.** Break composite ERP message into line items. |
| Out-of-order delivery corrupts stateful processing | **Resequencer** | **1.** Reorder out-of-sequence payment capture before ledger post. **2.** Buffer chat messages until gap filled. **3.** IoT sensor readings resequenced by timestamp. |
| Each service speaks a different wire format | **Message Translator** | **1.** Convert XML order to JSON for internal API. **2.** Map Shopify webhook to canonical `OrderCreated`. **3.** HL7 to FHIR translation in hospital integration. |
| Every integration uses a different field mapping | **Canonical Data Model** | **1.** Enterprise `CanonicalOrder` all departments use. **2.** Internal `Customer` schema for CRM, billing, support. **3.** Platform event envelope standard across teams. |
| Cannot trace request across async hops | **Correlation Identifier** | **1.** `traceId` propagated across microservice calls. **2.** `orderId` in all related Kafka messages. **3.** JMS `JMSCorrelationID` for request-reply pairing. |
| No durable audit or replay of integration traffic | **Message Store** | **1.** Persist all SWIFT messages for regulatory audit. **2.** Store every webhook payload for replay debugging. **3.** HIPAA audit log of PHI-related messages. |
| Oversized payloads clog brokers and consumers | **Claim Check** | **1.** Message carries S3 URL to 50MB attachment not body. **2.** Kafka event references blob store for image bytes. **3.** Email queue message with claim check to HTML body in object storage. |
| Monolithic integration step cannot reuse stages | **Pipes and Filters** | **1.** Log pipeline: parse → enrich → filter → index. **2.** Image: validate → resize → watermark → upload filters. **3.** ETL pipes between source, transform, warehouse load. |

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
