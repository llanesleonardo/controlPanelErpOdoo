# Micro Frontends

## Core Idea
Micro Frontends split a frontend into independently owned and deployable frontend applications or slices.

## Problem It Solves
- A large frontend becomes a bottleneck when many teams need independent ownership, release cycles, and technology choices.

## Main Diagram
```text
Application Shell -> Frontend Router -> Catalog Micro Frontend -> Checkout Micro Frontend -> Account Micro Frontend
```

## 3 Concrete Examples
1. **E-Commerce Frontend:** Catalog, checkout, account, and support sections are owned by separate teams.
2. **Enterprise Portal:** Different business units ship independent frontend modules into one shell.
3. **Migration Strategy:** A legacy Angular area is gradually replaced by React micro frontends.

## TypeScript Example
```typescript
const shell = { mount(el: HTMLElement) {
  import('orders/App').then(m => m.mount(el.querySelector('#orders')!));
  import('billing/App').then(m => m.mount(el.querySelector('#billing')!));
}};
// E-Commerce Frontend:
// Micro Frontends split a frontend into independently owned and deploya...
```

## Architecture Questions
- What frontend boundaries map to team or business ownership?
- How are micro frontends composed?
- How is routing handled?
- How is shared design system/versioning handled?
- How is cross-app state avoided or shared safely?
- Does independent deployment justify the added complexity?

## When to Use
- Multiple teams need independent frontend ownership.
- Independent deployment is valuable.
- Frontend domains have clear boundaries.

## When NOT to Use
- One team owns the frontend.
- Shared state and styling are deeply coupled.
- Independent deployment does not justify runtime complexity.
