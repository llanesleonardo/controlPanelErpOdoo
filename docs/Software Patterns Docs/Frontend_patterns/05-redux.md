# Redux

## Core Idea
Redux centralizes application state in a store and updates it through dispatched actions and pure reducers.

## Problem It Solves
- Shared UI/application state becomes scattered, inconsistent, and difficult to debug across components.

## Main Diagram
```text
UI Component -> Action -> Reducer -> Redux Store -> Selector
```

## 3 Concrete Examples
1. **Global Auth State:** Login/logout actions update a central store used by navigation, profile, and protected routes.
2. **Complex Form Builder:** Form layout, selected fields, validation, and undo history are managed in Redux.
3. **E-Commerce Cart:** Cart actions update a predictable store that many components can read.

## TypeScript Example
```typescript
const store = createStore(cartReducer);
store.dispatch({ type: 'cart/add', payload: { sku: 'CELL-18650', qty: 2 } });
const items = store.getState().cart.items;
```

## Architecture Questions
- What state is truly global?
- What actions describe state changes?
- Can reducers stay pure?
- How are side effects handled?
- Do we need time-travel/debug tooling?
- Is Redux overkill for local component state?

## When to Use
- Shared application state is complex.
- Predictable state transitions and debugging matter.
- Actions/reducers/selectors can be clearly defined.

## When NOT to Use
- Most state is local.
- Boilerplate outweighs benefit.
- Reducers contain side effects or mutate state directly.
