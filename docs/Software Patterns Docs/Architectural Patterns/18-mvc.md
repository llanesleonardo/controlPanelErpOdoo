# MVC - Model View Controller

## Core Idea
MVC separates an application into Model, View, and Controller responsibilities.

## Problem It Solves
- UI rendering, input handling, and business/data logic are mixed together.

## Main Diagram
```text
User -> View -> Controller -> Model
```

## 3 Concrete Examples
1. Server-rendered web app
2. Desktop GUI app
3. Admin dashboard

## TypeScript Example
```typescript
class OrderController {
  constructor(private model: OrderModel) {}
  list() { return this.model.getAll(); }
}
const view = { render(orders: Order[]) { return orders.map(o => o.id).join(', '); } };
view.render(controller.list());
```

## Architecture Questions
- What is the model?
- What does the view render?
- What input does the controller handle?
- Should business logic live in the model or service layer?
- How does the view get updated?
- Are controllers becoming too large?

## When to Use
- You need to separate UI, input, and model logic.
- The framework naturally supports MVC.
- The app has multiple views over shared data.
- You want better testability and UI organization.

## When NOT to Use
- The app is a simple script or very small UI.
- Controllers become god objects.
- The model becomes anemic and all logic moves into controllers.
