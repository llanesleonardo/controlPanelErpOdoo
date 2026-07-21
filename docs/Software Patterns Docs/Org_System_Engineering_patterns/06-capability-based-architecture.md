# Capability-Based Architecture

## Core Idea
Capability-Based Architecture organizes systems around business capabilities rather than technical layers or arbitrary applications.

## Problem It Solves
- Architecture organized by technology or departments hides what the business actually needs the system to do.

## Main Diagram
```text
Business -> Capability: Catalog -> Capability: Checkout -> Capability: Billing -> Capability: Fulfillment
```

## 3 Concrete Examples
1. **Commerce Capabilities:** Catalog, pricing, cart, checkout, payment, fulfillment, and returns are modeled as capabilities.
2. **Healthcare Capabilities:** Patient management, scheduling, billing, prescriptions, and lab results become capability boundaries.
3. **SaaS Capabilities:** Tenant management, licensing, billing, provisioning, support, and analytics are mapped as business capabilities.

## TypeScript Example
```typescript
const capabilities = {
  'capture-telemetry': ['daq-ingest', 'signal-processing'],
  'reporting': ['report-builder', 'export'],
};
// Map business capabilities to systems, not org charts
// Commerce Capabilities:
```

## Architecture Questions
- What capabilities does the business need?
- Which capabilities are core, supporting, or generic?
- Which systems implement each capability?
- Which teams own each capability?
- Which capabilities change often?
- Which capabilities should become modules, services, or shared platforms?

## When to Use
- You need architecture aligned to business capabilities.
- Technical layers are hiding business ownership.
- Strategic planning or modernization requires capability mapping.

## When NOT to Use
- Capabilities are vague labels with no ownership.
- The map is not connected to decisions.
- Technical constraints dominate and business boundaries are ignored.
