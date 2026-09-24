# Frontend Patterns — Three Examples Each

> Concrete examples for every pattern in [Frontend Patterns INDEX](../Frontend_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| UI, state, and server logic tangled in components | **MVC** | **1.** Server-rendered Rails product pages. **2.** ASP.NET MVC marketing site. **3.** PHP Laravel controller returns Blade view. |
| View code untestable without UI automation | **MVVM** | **1.** Knockout.js bindings to ViewModel observables. **2.** Android Jetpack ViewModel + LiveData. **3.** WPF desktop app with ICommand bindings. |
| Business logic trapped in DOM event handlers | **MVP** | **1.** GWT presenter handles history token navigation. **2.** Android MVP with passive fragment view. **3.** Testable presenter unit tests without UI robot. |
| Bidirectional data flow causes unpredictable UI state | **Flux** | **1.** Facebook Flux: actions → dispatcher → stores → views. **2.** Early React ecosystem flux implementations. **3.** Unidirectional data flow in legacy chat UI. |
| Prop drilling and scattered local state across deep trees | **Redux** | **1.** Global store for cart, user, UI state in React SPA. **2.** Redux Toolkit slices for ecommerce checkout. **3.** Time-travel debug of state changes. |
| Copy-paste UI with no reusable building blocks | **Component-Based Architecture** | **1.** React component tree for design system Storybook. **2.** Vue SFC building blocks for dashboard. **3.** Web Components shared across micro frontends. |
| One SPA deploy blocks independent product teams | **Micro Frontends** | **1.** Shell loads product, cart, checkout as separate deployables. **2.** IKEA-style page composed of team-owned widgets. **3.** Module federation shares React across apps. |
| Manual DOM updates miss state changes and cause bugs | **Observer** | **1.** UI subscribes to store changes and re-renders. **2.** EventEmitter on model updates view. **3.** RxJS observables drive Angular templates. |
| Global state scattered across unrelated components | **State Container** | **1.** Zustand store for global modal and auth state. **2.** Pinia container in Vue 3 app. **3.** Context API provider for theme and locale. |
| Direct DOM manipulation causes expensive full reflows | **Virtual DOM** | **1.** React diffs virtual tree before patching real DOM. **2.** Vue compiler + VDOM update on reactive data. **3.** Preact lightweight VDOM for performance. |

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
