# Repository

## Core Idea
Repository provides a collection-like interface for loading and saving domain objects while hiding database/query details.

## Problem It Solves
- Business logic becomes coupled to SQL, ORM queries, database schemas, or persistence details.

## Main Diagram
```text
Application Service -> Repository Interface -> Repository Implementation -> (Database)
```

## 3 Concrete Examples
1. **Order Repository:** OrderService asks OrderRepository for orders instead of writing SQL in the service.
2. **Customer Repository:** Customer domain logic loads customers by ID or email through a repository interface.
3. **Product Catalog Repository:** Catalog use cases retrieve products without caring whether data comes from SQL, Elasticsearch, or cache.

## TypeScript Example
```typescript
interface OrderRepository { findById(id: string): Promise<Order | null>; save(o: Order): Promise<void>; }
class SqlOrderRepo implements OrderRepository {
  findById(id) { return db.query('SELECT * FROM orders WHERE id=$1', [id]); }
  save(o) { return db.query('INSERT INTO orders VALUES ($1)', [o]); }
}
const repo: OrderRepository = new SqlOrderRepo();
await repo.save({ id: 'O-42', status: 'draft' });
```

## Architecture Questions
- Which aggregate or entity does this repository manage?
- Should this repository expose domain-oriented methods or generic CRUD?
- Who owns transaction boundaries?
- Should queries return domain objects, DTOs, or projections?
- How will repositories be tested?
- Is the repository hiding persistence or just adding useless pass-through code?

## When to Use
- You want to hide persistence details from business logic.
- Domain code should not know SQL or ORM details.
- You need testable data access boundaries.

## When NOT to Use
- It only forwards generic CRUD with no abstraction value.
- The ORM already provides adequate boundaries.
- Queries are simple and repository adds noise.
