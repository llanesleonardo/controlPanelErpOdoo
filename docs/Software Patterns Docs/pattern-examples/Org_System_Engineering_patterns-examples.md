# Org & System Engineering Patterns — Three Examples Each

> Concrete examples for every pattern in [Org & System Engineering Patterns INDEX](../Org_System_Engineering_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Software boundaries fight how teams actually communicate | **Conway's Law Alignment** | **1.** Checkout team owns checkout service boundary matching org chart. **2.** Split monolith where team communication lines break. **3.** Platform team provides internal API matching stream-aligned needs. |
| One model forced on domains with different language | **Bounded Context** | **1.** `Billing` context separate from `Shipping` ubiquitous language. **2.** Franchise `Royalty` context vs `Operations` context. **3.** EMR integration ACL at hospital context boundary. |
| Teams lack clear interaction modes (stream, platform, enabling) | **Team Topologies** | **1.** Stream-aligned team owns end-to-end order flow. **2.** Platform team provides K8s and CI templates. **3.** Enabling team coaches DDD adoption temporarily. |
| Every product team rebuilds CI, K8s, and observability | **Platform Teams** | **1.** Internal developer platform for golden paths. **2.** Shared observability stack team. **3.** Identity platform team for SSO across products. |
| Duplicated email, auth, and fraud logic per product | **Shared Services** | **1.** Central email/SMS notification service. **2.** Shared fraud scoring API for all product lines. **3.** Corporate LDAP used by multiple divisions. |
| Systems organized by org chart not business value | **Capability-Based Architecture** | **1.** Map systems to capabilities: Sell, Fulfill, Bill. **2.** Capability heatmap drives investment priorities. **3.** API products aligned to business capabilities not org silos. |
| Code models do not match how the business speaks | **Domain-Driven Design** | **1.** Workshop defines aggregates for order domain. **2.** Ubiquitous language in code: `Hold`, `Seat`, `Venue`. **3.** Context map between catalog and inventory teams. |
| Hidden workflows and gaps found only in production | **Event Storming** | **1.** Sticky-note workshop maps checkout domain events. **2.** Discover `PaymentAuthorized` → `OrderConfirmed` flow gaps. **3.** Franchise onboarding event storm with biz + tech. |
| External system vocabulary corrupts internal domain | **Anti-Corruption Layer** | **1.** ACL between clean domain and legacy ERP. **2.** Translation layer for POS vendor sales feed. **3.** Shopify webhook adapter to internal order model. |

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
