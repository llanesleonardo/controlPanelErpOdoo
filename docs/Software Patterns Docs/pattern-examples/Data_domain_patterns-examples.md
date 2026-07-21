# Data & Domain Patterns — Three Examples Each

> Concrete examples for every pattern in [Data & Domain Patterns INDEX](../Data_domain_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| SQL and persistence details leak into domain logic | **Repository** | **1.** `OrderRepository.findById` hides SQL from domain. **2.** `UserRepository` interface with Postgres implementation. **3.** In-memory repo for unit tests of use cases. |
| Partial commits leave inconsistent aggregate state | **Unit of Work** | **1.** EF Core DbContext tracks changes; single `SaveChanges`. **2.** Hibernate session flushes one transaction boundary. **3.** Domain tracks dirty aggregates before commit. |
| Invariants violated when children mutate outside root | **Aggregate** | **1.** `Order` aggregate root controls `OrderLine` mutations. **2.** `ShoppingCart` root enforces max items rule. **3.** `Invoice` root coordinates line items and totals. |
| Identity confusion when only attributes distinguish objects | **Entity** | **1.** `Customer` identified by `customerId` not just name. **2.** `Ticket` entity with unique ticket number. **3.** `Employee` same person after address change. |
| Primitive obsession allows invalid combined state | **Value Object** | **1.** `Money` amount + currency immutable object. **2.** `EmailAddress` validates format on construction. **3.** `GeoCoordinate` lat/lng pair without identity. |
| Domain logic wrongly placed in entities or infrastructure | **Domain Service** | **1.** `PricingService` calculates tax across line items. **2.** `TransferService` moves money between accounts. **3.** `MatchingService` pairs riders and drivers. |
| Business rules duplicated across queries and validations | **Specification** | **1.** `EligibleForDiscountSpec` encapsulates promo rules. **2.** `OverdueInvoiceSpec` for collections batch query. **3.** `ActiveSubscriptionSpec` reused in reports and API. |
| Same row loaded twice as different object instances | **Identity Map** | **1.** ORM first-level cache returns same `User` instance per request. **2.** In-memory map prevents duplicate load of `Product#42`. **3.** Unit of work identity map for aggregate consistency. |
| N+1 queries or loading data never used | **Lazy Loading** | **1.** Order loads lines only when `.lines` accessed. **2.** Hibernate lazy proxy for customer address. **3.** GraphQL resolver fetches comments on demand. |
| Domain objects entangled with ORM or row shapes | **Data Mapper** | **1.** Mapper converts `OrderRow` ↔ `Order` entity. **2.** MyBatis maps result sets to domain objects. **3.** Manual mapper between API DTO and domain. |
| Anemic domain with logic scattered in services | **Active Record** | **1.** Rails `User.find(1).update(email: …)` model. **2.** Laravel Eloquent `Post::where(...)->get()`. **3.** Django ORM model with `.save()` on instance. |
| Rich domain rules lost in procedural scripts | **Transaction Script** | **1.** Procedural `processRefund(orderId)` script in service class. **2.** Nightly batch script transfers ledger entries. **3.** Simple CRUD app with one function per use case. |
| Table-centric design fights object-oriented domain | **Table Module** | **1.** `OrdersTable` class with all order-related DB procedures. **2.** Legacy VB module per database table. **3.** Generated DAO per table in early enterprise apps. |
| Anemic entities; rules live only in application layer | **Domain Model** | **1.** Rich `BankAccount` with `withdraw` enforcing balance rules. **2.** `Reservation` enforces hold TTL in domain method. **3.** `ShoppingCart` calculates totals internally. |
| Cannot reconstruct history or audit past state | **Event Sourcing** | **1.** Account state from `Deposited`/`Withdrawn` events. **2.** Shopping cart replay from event log. **3.** Compliance audit from immutable event store. |
| Expensive joins on every dashboard read | **Materialized View** | **1.** Nightly `sales_by_region` table for CFO dashboard. **2.** Redis ZSET trending videos from view stream. **3.** CQRS read model `OrderSummary` from commands. |
| Heavy reads contend with transactional writes | **Read Replica** | **1.** BI tool queries replica not OLTP primary. **2.** Public catalog API read replica; writes primary. **3.** Search CDC from replica binlog. |
| Every read hits database on cache miss storms | **Cache-Aside** | **1.** App checks Redis for product; on miss loads DB and sets cache. **2.** WordPress object cache for options and postmeta. **3.** API gateway caches OAuth JWKS keys. |
| Write-optimized schema serves read queries poorly | **CQRS Read Model** | **1.** `FeedTimeline` read model separate from `Post` write model. **2.** `Customer360View` denormalized for support console. **3.** `InventoryAvailability` projection from stock events. |
| Single DB size or QPS ceiling hit | **Database Sharding** | **1.** Users table sharded by `user_id % 16`. **2.** Messages shard by `conversation_id`. **3.** Multi-tenant SaaS shard large customers dedicated DB. |
| Tenant data leaks across isolation boundaries | **Multi-Tenant Partitioning** | **1.** Row-level `tenant_id` on all tables with RLS. **2.** Schema-per-tenant for enterprise customers. **3.** Shopify logical shop isolation in shared platform. |
| Hard deletes lose recoverability and referential clarity | **Soft Delete** | **1.** `deleted_at` timestamp on user; hide from UI. **2.** Recycle bin for wiki pages before purge. **3.** GDPR-friendly retain audit but hide profile. |
| Cannot answer what value was true at a past time | **Temporal Tables** | **1.** SQL Server system-versioned table for price history. **2.** Audit who changed contract terms when. **3.** Replay inventory level at past date for dispute. |

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
