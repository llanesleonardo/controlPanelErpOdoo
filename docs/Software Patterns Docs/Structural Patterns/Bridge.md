# Bridge

## Core Idea
The **Bridge Pattern** is a structural design pattern used to separate an abstraction from its implementation so both can change independently.

## Problem It Solves
- Abstraction and implementation vary independently.
- Inheritance ties them too tightly.
- Both sides need to evolve separately.

## Main Diagram
```text
Client
  |
Bridge
  |
Implementation
```

## 3 Concrete Examples
1. A system sends different kinds of notifications:
2. A home automation app supports different remotes:
3. A reporting application supports different report types:

## TypeScript Example
```typescript
class RemoteControl {
  constructor(protected device: Device) {}
  toggle() { this.device.togglePower(); }
}
class TV extends Device { togglePower() { this.on = !this.on; } }
// Bridge
```

## Architecture Questions
- Do we have two independent dimensions of variation?
- Can message type change separately from delivery channel?
- Are we creating too many combination classes?
- Will new message types be added later?
- Will new delivery channels be added later?
- Can the high-level workflow delegate low-level delivery details?
- Should business logic avoid knowing vendor-specific channel details?
- Is inheritance forcing combinations that should be composed instead?

## When to Use
- You have two independent dimensions of variation.
- You are creating too many combination classes.
- You want abstraction and implementation to evolve separately.
- You want to switch implementations at runtime.
- You want to avoid deep inheritance trees.
- You need platform-specific implementations behind stable high-level logic.
- You expect both sides of the design to grow.

## When NOT to Use
- You only have one dimension of variation.
- There are only one or two simple combinations.
- The design is not likely to grow.
- A simple interface and implementation is enough.
- You are only adapting an old interface to a new one.
- You are only swapping one algorithm.
