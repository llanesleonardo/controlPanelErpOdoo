# Singleton

## Core Idea
Guarantees **exactly one instance** of a class and provides a global access point.

## Problem It Solves
- Duplicate shared state.
- Multiple competing managers.
- Centralized configuration.

## Main Diagram
```text
Client A ----Client B -----> Singleton
Client C ----/      |
           getInstance()
                |
          Shared Instance
```

## 3 Concrete Examples
1. Configuration manager.
2. Logger.
3. DLM ConnectionManager or LicenseManager shared by the application.

## TypeScript Example
```typescript
class Config {
  private static instance: Config;
  private constructor() {}
  static getInstance() { return this.instance ??= new Config(); }
}
const cfg = Config.getInstance();
```
## Architecture Questions
- Must only one instance exist?
- Is global access required?
- Thread safety needed?
- Could dependency injection replace it?

## When to Use
- Shared configuration.
- Resource managers.
- Logging.

## When NOT to Use
- Hidden global state is harmful.
- Unit testing becomes difficult.
- Multiple independent instances are needed.
