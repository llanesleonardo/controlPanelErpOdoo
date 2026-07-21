# MVP - Model View Presenter

## Core Idea
MVP separates presentation logic into a Presenter that updates a passive View and coordinates with the Model.

## Problem It Solves
- UI logic is hard to test because it is embedded directly in the View.

## Main Diagram
```text
User -> View -> Presenter -> Model
```

## 3 Concrete Examples
1. Desktop apps
2. Legacy web UI
3. Mobile screens with testable presenters

## TypeScript Example
```typescript
class LoginPresenter {
  constructor(private view: LoginView) {}
  onSubmit(email: string) {
    if (!email.includes('@')) return this.view.showError('Invalid email');
    this.view.navigate('/dashboard');
  }
}
```

## Architecture Questions
- Can the View be passive?
- What user actions does the Presenter handle?
- What model data does the Presenter load?
- How does the Presenter update the View?
- Can the Presenter be tested with a mock View?
- Is MVP simpler than MVVM for this UI framework?

## When to Use
- You want testable presentation logic.
- The view should be passive and dumb.
- The UI framework does not support strong binding.
- Presenters can coordinate screen behavior clearly.

## When NOT to Use
- The framework already favors MVVM or declarative state.
- Presenter and View become tightly coupled anyway.
- The screen is too simple to justify the pattern.
