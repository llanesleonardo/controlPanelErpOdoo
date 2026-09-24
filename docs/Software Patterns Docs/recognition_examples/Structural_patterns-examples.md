# Structural Patterns — Three Examples Each

> Concrete examples for every pattern in [Structural Patterns INDEX](../Structural Patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Incompatible third-party or legacy APIs leak into domain | **Adapter** | **1.** Stripe webhook payload adapter maps to internal `PaymentEvent`. **2.** Legacy SOAP inventory adapter for modern REST catalog service. **3.** Third-party maps API adapter normalizes geocode responses. |
| Abstraction and implementation variants multiply combinatorially | **Bridge** | **1.** Shape abstraction (Circle) bridged to Renderer (SVG vs Canvas). **2.** Notification abstraction bridged to Sender (email vs SMS). **3.** Device remote control abstraction bridged to TV vs Radio implementation. |
| Tree structures treated inconsistently (leaf vs branch) | **Composite** | **1.** File system tree: files and folders share `getSize()` interface. **2.** UI component tree: panels contain buttons and nested panels. **3.** Org chart: employee and department both report headcount. |
| Subclass explosion for every optional behavior combination | **Decorator** | **1.** `BufferedInputStream` decorates `FileInputStream` with buffering. **2.** Coffee + milk + whip decorators add cost and description. **3.** Middleware stack decorates HTTP handler with auth, logging, metrics. |
| Multiple entry points duplicate wiring and drift apart | **Facade** | **1.** `CheckoutFacade` one call for cart, tax, payment, receipt. **2.** `AiContentFacade` unifies MCP and admin chat entry points. **3.** Home automation facade: “movie mode” dims lights + TV + blinds. |
| Memory blows up duplicating identical intrinsic state | **Flyweight** | **1.** Share immutable glyph objects across thousands of text characters. **2.** Reuse tile sprite instances in game map grid. **3.** Intern common strings in symbol table for compiler AST. |
| Clients coupled to remote, lazy, or secured resources directly | **Proxy** | **1.** Lazy-loading proxy fetches product details only when opened. **2.** Access control proxy checks permissions before real document service. **3.** Remote proxy stands in for microservice on another host. |

## Related

- [Risk-driven pattern selection](../risk-driven-patterns.md) — pick patterns by *risk*, not hype
- [Composition problems](../composition_problems/INDEX.md) — full system compositions
- [Cross-cutting concerns](../composition_problems/concerns/INDEX.md) — reads, writes, contention lenses

## How to use

1. Name the **risk** first (what breaks if you get it wrong).
2. Find the **pattern** that addresses that risk.
3. Read all three examples — notice *where* the pattern shows up (API, data, ops).
4. Open the pattern doc in this category for mechanics and TypeScript sketch.
5. Map one example to a [problem file](../composition_problems/INDEX.md) if you see a match.
