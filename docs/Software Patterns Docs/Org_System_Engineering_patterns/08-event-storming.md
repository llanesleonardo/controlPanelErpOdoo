# Event Storming

## Core Idea
Event Storming is a collaborative modeling technique where domain experts and technologists map business events, commands, actors, policies, and systems.

## Problem It Solves
- Teams lack a shared understanding of business workflows, domain events, rules, and boundaries.

## Main Diagram
```text
Actor -> Command -> Domain Event -> Policy / Reaction -> External System
```

## 3 Concrete Examples
1. **Order Fulfillment Workshop:** The team maps OrderPlaced, PaymentAuthorized, ItemsPicked, ShipmentCreated, and OrderDelivered events.
2. **Claims Processing Discovery:** Domain experts map claim submitted, document requested, claim approved, and payout issued.
3. **SaaS Provisioning Flow:** Teams map tenant registered, license activated, environment provisioned, and onboarding completed.

## TypeScript Example
```typescript
const board = { events: ['TestStarted', 'VoltageRecorded', 'AnomalyDetected', 'TestCompleted'] };
const commands = [{ name: 'StartTest', triggers: 'TestStarted' }];
const policies = [{ when: 'AnomalyDetected', then: 'NotifyEngineer' }];
```

## Architecture Questions
- What domain events happen in the business?
- What commands cause those events?
- Who performs each command?
- What policies or rules react to events?
- Where are pain points or external systems?
- What bounded contexts appear from the event map?

## When to Use
- The team needs shared understanding of a workflow.
- Bounded contexts or domain events are unclear.
- Domain experts and developers need to collaborate visually.

## When NOT to Use
- No domain experts attend.
- The workshop output is never used.
- The problem is already well understood and simple.
