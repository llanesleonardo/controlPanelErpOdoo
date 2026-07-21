# Active Record

## Core Idea
Active Record combines domain data and persistence operations in the same object.

## Problem It Solves
- Simple database-backed objects need straightforward CRUD behavior without a separate mapper layer.

## Main Diagram
```text
Active Record Object -> Fields / Data -> Persistence Methods -> (Database)
```

## 3 Concrete Examples
1. **User Active Record:** User.find(id), user.save(), and user.delete() live on the User model.
2. **Blog Post Model:** Post object contains fields and persistence methods.
3. **Admin CRUD Table:** A simple Product model maps directly to a products table.

## TypeScript Example
```typescript
class User extends ActiveRecord {
  static table = 'users';
  async save() { return db.upsert(User.table, this); }
  static find(id: string) { return db.get(User.table, id); }
}
// User Active Record:
```

## Architecture Questions
- Is the domain simple enough for persistence and behavior to live together?
- Does the object map closely to one table?
- Will business rules become complex?
- Is testability acceptable?
- Does the framework encourage Active Record?
- Would Data Mapper better protect the domain?

## When to Use
- The domain is simple.
- Objects map closely to database tables.
- The framework favors Active Record and speed matters.

## When NOT to Use
- Business rules are complex.
- Domain must be persistence-independent.
- The model becomes bloated with database and business logic mixed.
