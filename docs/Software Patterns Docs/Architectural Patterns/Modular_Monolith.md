# Modular Monolith Architecture

## Core Idea
A **Modular Monolith** is an architectural style where the system is deployed as **one application**, but the code is organized into **clear, independent modules**.

## Problem It Solves
- See pattern document.

## Main Diagram
```text
Client
  |
Modular Monolith Architecture
  |
Implementation
```

## 3 Concrete Examples
1. An e-commerce platform has several business capabilities:
2. A hospital system has many connected capabilities:
3. A banking application has capabilities like:

## TypeScript Example
```typescript
// modules/billing and modules/inventory share one deployable
import { InvoiceModule } from './billing';
import { StockModule } from './inventory';
const app = createApp([InvoiceModule, StockModule]); // bounded modules, single process
// Modular Monolith Architecture
// A **Modular Monolith** is an architectural style where the system is ...
```

## Architecture Questions
- What are the main business capabilities?
- Which module owns which data?
- Which module owns which business rules?
- What public operations should each module expose?
- Which internals must be hidden?
- Can this remain one deployable app for now?
- Which modules might later become services?
- Are we preventing direct cross-module database access?
- Are module boundaries based on business meaning or technical layers only?

## When to Use
- See pattern document.

## When NOT to Use
- See pattern document.
