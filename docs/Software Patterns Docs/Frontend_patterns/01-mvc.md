# MVC

## Core Idea
MVC separates an application into Model, View, and Controller responsibilities.

## Problem It Solves
- UI rendering, input handling, and business/data logic become tangled in the same place.

## Main Diagram
```text
User -> View -> Controller -> Model
```

## 3 Concrete Examples
1. **Server-Rendered Web App:** A controller receives a request, loads a model, and returns a rendered view.
2. **Admin Dashboard:** Controllers handle button actions while models represent users, products, or orders.
3. **Desktop GUI:** The controller responds to UI events, updates the model, and refreshes the view.

## TypeScript Example
```typescript
class TodoController {
  constructor(private model: TodoModel) {}
  add(text: string) { this.model.add(text); return this.model.all(); }
}
const view = { render(todos: string[]) { todos.forEach(t => console.log(t)); } };
// Server-Rendered Web App:
```

## Architecture Questions
- What is the model?
- What does the view render?
- What user input does the controller handle?
- Where should validation live?
- Are controllers becoming too large?
- Does the model contain behavior or only data?

## When to Use
- You need to separate input handling, rendering, and model logic.
- The framework naturally supports MVC.
- Controllers can stay thin.

## When NOT to Use
- Controllers become god objects.
- The UI is tiny and does not need structure.
- Business logic leaks into View or Controller.
