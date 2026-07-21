# MVVM - Model View ViewModel

## Core Idea
MVVM separates UI from presentation state and behavior using a ViewModel that the View binds to.

## Problem It Solves
- UI code becomes tightly coupled to state management, formatting, commands, and domain objects.

## Main Diagram
```text
View -> ViewModel -> Model
```

## 3 Concrete Examples
1. WPF app
2. SwiftUI-style state binding
3. Frontend forms with view models

## TypeScript Example
```typescript
class CycleViewModel {
  cycles = 0;
  get label() { return `${this.cycles} cycles`; }
  increment() { this.cycles++; }
}
// View binds to viewModel.label; button calls viewModel.increment()
```

## Architecture Questions
- What state should the ViewModel expose?
- What commands should the ViewModel handle?
- Can the View bind without manual DOM/UI manipulation?
- How much formatting belongs in the ViewModel?
- Can the ViewModel be tested without UI?
- Does the ViewModel hide domain complexity from the View?

## When to Use
- The UI supports data binding.
- Presentation state is complex.
- You want testable UI behavior without rendering real views.
- Views should stay declarative and thin.

## When NOT to Use
- The UI is very simple.
- The framework does not support binding well.
- ViewModels become giant duplicated models.
