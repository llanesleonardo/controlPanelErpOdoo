# Blackboard Architecture

## Core Idea
Blackboard Architecture uses a shared knowledge base where independent components contribute partial solutions until a final solution emerges.

## Problem It Solves
- A complex problem cannot be solved by one deterministic algorithm and requires multiple specialized knowledge sources to collaborate.

## Main Diagram
```text
Shared Blackboard / Knowledge Base -> Knowledge Source A -> Knowledge Source B -> Knowledge Source C -> Control Component
```

## 3 Concrete Examples
1. Speech recognition
2. AI reasoning systems
3. Complex diagnostics

## TypeScript Example
```typescript
class Blackboard { facts = new Map<string, unknown>(); }
const board = new Blackboard();
hypothesisAgent.run(board); // writes candidate diagnosis
validationAgent.run(board); // reads hypothesis, adds evidence
// Blackboard Architecture
// Blackboard Architecture uses a shared knowledge base where independen...
```

## Architecture Questions
- What shared knowledge representation is needed?
- What specialized knowledge sources contribute?
- Who controls which component runs next?
- How is progress measured?
- How are conflicts resolved?
- Is the problem exploratory or heuristic?

## When to Use
- Multiple specialized solvers contribute partial answers.
- The solution emerges iteratively.
- The problem is complex, uncertain, or heuristic.
- A shared knowledge base is useful.

## When NOT to Use
- A simple deterministic pipeline works.
- The workflow is linear and predictable.
- Shared state coordination would create unnecessary complexity.
