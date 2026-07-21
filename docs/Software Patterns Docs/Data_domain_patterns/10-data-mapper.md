# Data Mapper

## Core Idea
Data Mapper moves data between domain objects and database records while keeping domain objects independent of persistence details.

## Problem It Solves
- Domain objects become polluted with SQL, ORM metadata, persistence methods, or database schema concerns.

## Main Diagram
```text
Domain Object -> Data Mapper -> Database Record -> (Database)
```

## 3 Concrete Examples
1. **Order Mapper:** Maps order rows and order_line rows into an Order aggregate.
2. **Customer Mapper:** Maps database customer records into clean Customer domain objects.
3. **Invoice Mapper:** Converts between invoice domain model and relational tables.

## TypeScript Example
```typescript
class OrderMapper {
  toDomain(row: OrderRow): Order { return new Order(row.id, row.status); }
  toPersistence(o: Order): OrderRow { return { id: o.id, status: o.status }; }
}
// Order Mapper:
const orderMapper = new OrderMapper();
```

## Architecture Questions
- What domain object maps to what database structure?
- Should mapping be manual or ORM-supported?
- How are relationships handled?
- Where does validation belong?
- Can domain objects stay persistence-ignorant?
- Is Active Record simpler for this case?

## When to Use
- Domain objects should stay persistence-ignorant.
- Database schema differs from domain model.
- Business rules should not depend on ORM models.

## When NOT to Use
- The app is simple CRUD.
- The database model and domain model are identical.
- Active Record is enough and faster to deliver.
