# Virtual DOM

## Core Idea
Virtual DOM represents UI as an in-memory tree and efficiently updates the real DOM by diffing changes.

## Problem It Solves
- Direct DOM manipulation is expensive and error-prone when UI state changes frequently.

## Main Diagram
```text
UI State Change -> Old Virtual DOM -> New Virtual DOM -> Diff -> Patch Real DOM
```

## 3 Concrete Examples
1. **React Component Update:** A component state change creates a new virtual tree and only changed DOM nodes are patched.
2. **Dynamic List Rendering:** A list update reuses unchanged items and updates only inserted/removed elements.
3. **Conditional UI:** When app state changes, the virtual DOM diff determines minimal real DOM updates.

## TypeScript Example
```typescript
const vdom = h('ul', {}, items.map(i => h('li', { key: i.id }, i.label)));
const patches = diff(oldVdom, vdom);
patch(domNode, patches);
```

## Architecture Questions
- How often does UI state change?
- What triggers re-rendering?
- Are keys used correctly for lists?
- Is diffing overhead acceptable?
- Can unnecessary renders be avoided?
- Would direct DOM or fine-grained reactivity be better?

## When to Use
- UI changes frequently.
- Declarative rendering is preferred.
- The framework uses diffing to simplify DOM updates.

## When NOT to Use
- The UI is static or tiny.
- Fine-grained reactivity or direct rendering is more efficient.
- Unnecessary re-renders dominate performance.
