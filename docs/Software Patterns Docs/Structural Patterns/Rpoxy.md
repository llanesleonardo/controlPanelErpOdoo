# Proxy

## Core Idea
The **Proxy Pattern** is a structural design pattern used when you want one object to stand in front of another object and control access to it.

## Problem It Solves
- Direct access needs control or lazy loading.
- Remote, expensive, or protected object access.
- Cross-cutting control without changing target.

## Main Diagram
```text
Client
  |
Proxy
  |
Implementation
```

## 3 Concrete Examples
1. A photo gallery shows many high-resolution images.
2. An application has sensitive admin operations:
3. A client application needs to call a remote service.

## TypeScript Example
```typescript
class SecureDocumentProxy implements Document {
  constructor(private real: Document, private user: User) {}
  view() {
    if (!this.user.canRead()) throw new Error('Denied');
    return this.real.view();
  }
}
```

## Architecture Questions
- Is the real object expensive to create or load?
- Can the object be loaded only when actually needed?
- Can the proxy expose the same interface as the real object?
- Should the client avoid knowing whether the object is loaded?
- Can lazy loading improve performance?
- Do we need placeholders before real data is available?
- What happens if loading fails?

## When to Use
- You need to control access to an object.
- The real object is expensive to create.
- The real object should be loaded lazily.
- The real object is remote.
- The real object needs permission checks.
- You need caching around an expensive call.
- You want to isolate network, security, or lifecycle logic.
- The client should use the same interface as the real object.

## When NOT to Use
- There is no access-control, loading, remote, or caching problem.
- The proxy only forwards calls and adds no value.
- The wrapper changes the interface.
- You are trying to simplify many subsystem calls.
- You are trying to add stackable behavior.
- The proxy hides too much and makes debugging harder.
