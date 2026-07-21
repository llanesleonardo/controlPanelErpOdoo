# Composite

## Core Idea
The **Composite Pattern** is a structural design pattern used when objects are organized in a **tree-like structure**, and the system should treat individual objects and groups of objects through the same interface.

## Problem It Solves
- Objects form tree/part-whole hierarchies.
- Clients should treat leaf and group uniformly.
- Recursive structures need one interface.

## Main Diagram
```text
Client
  |
Composite
  |
Implementation
```

## 3 Concrete Examples
1. A file explorer needs to work with:
2. A restaurant ordering app has menus like this:
3. A graphic design tool has objects like:

## TypeScript Example
```typescript
interface Component { render(): string; }
class Group implements Component {
  constructor(private children: Component[]) {}
  render() { return this.children.map(c => c.render()).join(''); }
}
// Composite
```

## Architecture Questions
- Do we have a tree structure?
- Are there individual objects and container objects?
- Should the client treat single items and groups the same way?
- Do containers hold children of the same general type?
- Are recursive operations common?
- Are we writing repeated type checks like "if file, if folder"?
- Can the object own the traversal logic instead of the client?

## When to Use
- You have a tree-like structure.
- You have individual objects and container objects.
- The client should treat both uniformly.
- Operations are recursive.
- Containers can contain both leaves and other containers.
- You want to move traversal logic out of client code.
- You are seeing repeated type checks for leaf vs group.

## When NOT to Use
- Your data is not hierarchical.
- Groups and individual objects do not share meaningful operations.
- You do not need recursive behavior.
- The tree is simple and unlikely to grow.
- The client must treat every type very differently.
- The abstraction would hide important differences.
