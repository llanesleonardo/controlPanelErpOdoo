# Component-Based Architecture

## Core Idea
Component-Based Architecture builds UI from reusable, self-contained components with clear inputs, outputs, and composition rules.

## Problem It Solves
- UI code becomes duplicated, inconsistent, and hard to maintain when screens are built as large custom pages.

## Main Diagram
```text
App -> Layout -> Header Component -> Sidebar Component -> Content Component
```

## 3 Concrete Examples
1. **Design System Components:** Buttons, modals, cards, tables, and forms are reused across the app.
2. **Dashboard Widgets:** Charts, KPI tiles, filters, and tables are composed into dashboards.
3. **Product Page:** Image gallery, price block, reviews, and recommendations are separate components.

## TypeScript Example
```typescript
function Dashboard({ user }: { user: User }) {
  return (
  <>
    <Header user={user} />
    <MetricsPanel />
    <AlertsList />
  </>
  );
}
```

## Architecture Questions
- What parts of the UI are reusable?
- What props/inputs does each component need?
- What events/outputs does it emit?
- Is state local or lifted up?
- Are components presentational or container components?
- How is visual consistency enforced?

## When to Use
- UI can be composed from reusable parts.
- Consistency and reuse matter.
- Screens are becoming large and duplicated.

## When NOT to Use
- Components are too coupled to reuse.
- Every component becomes a giant configurable monster.
- There is no shared design or ownership discipline.
