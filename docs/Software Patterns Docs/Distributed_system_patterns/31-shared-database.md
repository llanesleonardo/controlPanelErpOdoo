# Shared Database

## Core Idea
Shared Database means multiple parts of the system read or write the same database directly.

## Problem It Solves
- Multiple applications or services need access to the same data store.

## Main Diagram
```text
App / Service A -> App / Service B -> App / Service C -> (Shared Database)
```

## 3 Concrete Examples
1. **Legacy Enterprise DB:** Several applications share one customer database.
2. **Modular Monolith DB:** Modules share one physical database but ideally own separate tables.
3. **Reporting Access:** Reporting tools read from the operational database.

## TypeScript Example
```typescript
const ordersSvc = connect('shared-db');
const billingSvc = connect('shared-db');
// coupling risk: both services read/write the same schema directly
```

## Architecture Questions
- Who owns each table?
- Which components can write?
- Can schema changes break multiple systems?
- Is direct database access creating coupling?
- Should access move behind APIs?
- Are transactions simpler because of the shared DB?

## When to Use
- A monolith or modular monolith uses one database.
- Strong local transactions are important.
- The team can enforce table ownership discipline.

## When NOT to Use
- Independent services need independent evolution.
- Many services directly mutate each other's data.
- Schema changes frequently break unrelated systems.
