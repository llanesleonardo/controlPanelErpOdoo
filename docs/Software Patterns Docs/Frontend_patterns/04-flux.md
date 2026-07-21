# Flux

## Core Idea
Flux uses one-way data flow where actions go through a dispatcher to stores, and views render from stores.

## Problem It Solves
- Complex UI state becomes unpredictable when many components update each other directly in multiple directions.

## Main Diagram
```text
View -> Action -> Dispatcher -> Store -> View Re-render
```

## 3 Concrete Examples
1. **Notification UI:** User actions dispatch events that update notification stores, then views re-render.
2. **Shopping Cart UI:** Add/remove item actions flow through dispatcher into a cart store.
3. **Dashboard Filters:** Filter change actions update store state and all dependent views render consistently.

## TypeScript Example
```typescript
const dispatcher = createDispatcher();
const store = createStore(reducer, { todos: [] });
dispatcher.register(store.handleAction);
dispatcher.dispatch({ type: 'ADD_TODO', text: 'Calibrate DAQ' });
render(<TodoList todos={store.getState().todos} />);
```

## Architecture Questions
- What actions can happen in the UI?
- What stores own the state?
- Is data flow one-way?
- How are async effects handled?
- How do views subscribe to store changes?
- Is Flux too heavy for this UI?

## When to Use
- One-way data flow would make state changes predictable.
- Multiple views depend on shared stores.
- UI actions need a consistent event flow.

## When NOT to Use
- State flow is simple.
- Dispatcher/store ceremony adds more complexity than clarity.
- Async effects are not well-defined.
