# Branch by Abstraction

## Core Idea
Branch by Abstraction lets teams make large code changes on the main branch by introducing an abstraction layer and switching implementations gradually.

## Problem It Solves
- Large refactors or replacements are risky when done on long-lived branches that diverge from main.

## Main Diagram
```text
Client Code -> Abstraction -> Old Implementation -> New Implementation -> Switch / Flag
```

## 3 Concrete Examples
1. **Payment Provider Replacement:** Introduce PaymentGateway interface, run old and new providers behind it, then switch.
2. **Database Access Refactor:** Add repository abstraction and migrate queries module by module.
3. **UI Framework Migration:** Wrap old and new UI components behind a common interface during migration.

## TypeScript Example
```typescript
interface Storage { save(data: Blob): Promise<void>; }
let storage: Storage = new LocalDiskStorage(); // swap to S3Storage behind interface
async function archive(data: Blob) { await storage.save(data); }
// Payment Provider Replacement:
await archive();
// concrete adapter implements the port at the boundary
```

## Architecture Questions
- What abstraction isolates the old and new implementation?
- Can both implementations coexist?
- How will traffic or calls be switched?
- How is parity verified?
- When will the old implementation be removed?
- Will the abstraction become permanent unnecessary complexity?

## When to Use
- A large change must happen without a long-lived branch.
- Old and new implementations can coexist.
- Gradual switching and cleanup are planned.

## When NOT to Use
- The abstraction will become permanent clutter.
- Old and new implementations cannot coexist.
- The migration has no cleanup plan.
