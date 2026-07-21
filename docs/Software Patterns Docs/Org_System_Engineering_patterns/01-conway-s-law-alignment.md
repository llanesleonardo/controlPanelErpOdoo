# Conway's Law Alignment

## Core Idea
Conway's Law Alignment designs system boundaries to match the communication structure and ownership model of the organization.

## Problem It Solves
- Architecture fights the organization: teams constantly coordinate across unclear boundaries, creating slow delivery and tangled systems.

## Main Diagram
```text
Team A -> Team B -> Team C -> System Boundary A -> System Boundary B
```

## 3 Concrete Examples
1. **Checkout Team Owns Checkout Boundary:** A dedicated checkout team owns checkout UI, checkout API, payment coordination, and checkout reliability instead of splitting work across many unrelated teams.
2. **Platform Boundary Mirrors Platform Team:** A platform team owns shared CI/CD, observability, deployment templates, and developer tooling used by product teams.
3. **Avoid Split Ownership Service:** A service used by five teams but owned by none is redesigned into clear team-owned capabilities.

## TypeScript Example
```typescript
// Team boundaries mirror service boundaries
const teams = {
  'cell-testing': ['telemetry-svc', 'daq-svc'],
  'billing': ['invoice-svc', 'payments-svc'],
};
// Checkout Team Owns Checkout Boundary:
```

## Architecture Questions
- Which teams own which business capabilities?
- Does the software architecture match communication paths?
- Where do teams block each other?
- Which services or modules have unclear ownership?
- Are team boundaries causing architectural coupling?
- Should the organization change, the architecture change, or both?

## When to Use
- Team communication is slowing delivery.
- Architecture boundaries and team ownership do not match.
- Services/modules have unclear owners.

## When NOT to Use
- The organization cannot change and architecture changes alone will not help.
- The system is tiny and owned by one team.
- Boundaries are drawn politically instead of around flow.
