# Creational Patterns — Three Examples Each

> Concrete examples for every pattern in [Creational Patterns INDEX](../Creational Patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Client code depends on concrete product families | **Abstract Factory** | **1.** UI toolkit factory creates matching Win/Mac buttons and dialogs. **2.** Cloud provider factory creates S3 vs Azure blob clients behind one interface. **3.** Report factory emits PDF, HTML, or CSV exporters for same data. |
| Telescoping constructors with many optional parameters | **Builder** | **1.** `HttpRequest.Builder` sets headers, body, timeout fluently. **2.** SQL query builder chains WHERE, JOIN, ORDER safely. **3.** Pizza order builder: size, crust, toppings step-by-step. |
| Creation logic duplicated at every call site | **Factory Method** | **1.** `DocumentExporter.create()` overridden to return PDF or Word exporter. **2.** Logger factory method picks file vs console logger per config. **3.** Payment gateway factory method returns Stripe vs PayPal implementation. |
| Expensive re-initialization on every similar object | **Prototype** | **1.** Clone prototype game enemy instead of reloading assets from disk. **2.** Copy default dashboard widget layout as starting template. **3.** JavaScript `structuredClone` of config object for per-tenant overrides. |
| Uncontrolled global state and hidden dependencies | **Singleton** | **1.** One database connection pool manager per process. **2.** App-wide configuration registry loaded once. **3.** Hardware driver access single instance (use sparingly — often anti-pattern at scale). |

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
