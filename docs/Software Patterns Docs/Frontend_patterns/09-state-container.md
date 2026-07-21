# State Container

## Core Idea
State Container centralizes shared state and provides controlled ways to read and update it.

## Problem It Solves
- State is scattered across components, causing prop drilling, duplicated state, and inconsistent UI behavior.

## Main Diagram
```text
Component A -> Component B -> Component C -> State Container -> Actions / Mutations
```

## 3 Concrete Examples
1. **Auth State Container:** User identity and permissions are stored centrally for navigation and route guards.
2. **Editor State:** Selected object, undo history, canvas settings, and tool mode live in one state container.
3. **Dashboard Filters:** Date range, selected customers, and active filters are centralized and reused by many widgets.

## TypeScript Example
```typescript
const store = createContainer({ count: 0 });
store.setState((s) => ({ count: s.count + 1 }));
const Count = () => <span>{store.useState().count}</span>;
```

## Architecture Questions
- What state must be shared?
- What state should stay local?
- How is state updated?
- Are updates immutable?
- How are derived values selected?
- How is state debugged and tested?

## When to Use
- State is shared across many components.
- Prop drilling or duplicated state is becoming painful.
- Controlled state updates improve predictability.

## When NOT to Use
- State is mostly local.
- The container becomes a global dumping ground.
- Updates are uncontrolled and unpredictable.
