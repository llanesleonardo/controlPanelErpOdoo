# MVP

## Core Idea
MVP separates presentation logic into a Presenter that coordinates between a passive View and the Model.

## Problem It Solves
- UI behavior is hard to test because it is embedded directly inside the View.

## Main Diagram
```text
User -> View -> Presenter -> Model
```

## 3 Concrete Examples
1. **Legacy Web Form:** The View forwards button clicks to the Presenter, which updates the View.
2. **Mobile Screen Presenter:** The Presenter loads data and calls view.showLoading(), view.showData(), or view.showError().
3. **Desktop Dialog:** The Presenter validates input and tells the View which messages to display.

## TypeScript Example
```typescript
class ProfilePresenter {
  constructor(private view: ProfileView) {}
  load() { this.view.show(this.api.fetchProfile()); }
  save(data: Profile) { this.api.update(data).then(() => this.view.toast('Saved')); }
}
// Legacy Web Form:
```

## Architecture Questions
- Can the View be passive?
- What user actions does the Presenter handle?
- How does the Presenter update the View?
- Can the Presenter be tested with a mock View?
- Where does model access happen?
- Would MVVM fit the framework better?

## When to Use
- You want a passive View and testable Presenter.
- The framework does not provide strong binding.
- UI behavior needs to be separated from rendering code.

## When NOT to Use
- The framework favors MVVM or component state.
- Presenter and View become tightly coupled anyway.
- The View is not actually passive.
