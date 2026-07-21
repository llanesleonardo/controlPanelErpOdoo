# MVVM

## Core Idea
MVVM separates the View from presentation state and behavior using a ViewModel that the View binds to.

## Problem It Solves
- UI code becomes overloaded with state management, formatting, commands, and domain object manipulation.

## Main Diagram
```text
View -> ViewModel -> Model
```

## 3 Concrete Examples
1. **Form Screen:** A ViewModel exposes form fields, validation state, and submit commands to the View.
2. **Desktop App with Binding:** A WPF-style UI binds controls to observable ViewModel properties.
3. **Mobile Screen:** A ViewModel loads data, tracks loading/error state, and exposes display-ready values.

## TypeScript Example
```typescript
class SearchViewModel {
  query = '';
  get results() { return catalog.filter(p => p.name.includes(this.query)); }
  setQuery(q: string) { this.query = q; notify('results'); }
}
// Form Screen:
```

## Architecture Questions
- What presentation state should the ViewModel expose?
- What commands should the ViewModel handle?
- Can the ViewModel be tested without rendering UI?
- What formatting belongs in the ViewModel versus the View?
- How are model updates reflected in the View?
- Is the ViewModel becoming a duplicate domain model?

## When to Use
- The UI framework supports binding.
- Presentation state is complex.
- You want testable UI behavior outside the View.

## When NOT to Use
- The framework does not support binding well.
- ViewModels duplicate domain models without value.
- The screen is simple enough for local state.
