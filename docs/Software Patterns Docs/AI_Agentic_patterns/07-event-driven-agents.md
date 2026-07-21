# Event-Driven Agents

## Core Idea
Event-Driven Agents wake up or act in response to events rather than only direct user prompts.

## Problem It Solves
- Some workflows require agents to react to system changes, alerts, messages, schedules, or business events.

## Main Diagram
```text
System Event -> Event Bus -> Event-Driven Agent -> Tools / APIs -> Human Approval
```

## 3 Concrete Examples
1. **Incident Triage Agent:** An alert event triggers an agent to collect logs and summarize likely causes.
2. **Sales Follow-Up Agent:** A CRM event triggers an agent to draft a follow-up email.
3. **Data Quality Agent:** A failed pipeline event triggers an agent to inspect errors and create a remediation ticket.

## TypeScript Example
```typescript
const bus = new EventEmitter();
bus.on('ticket.created', async (e) => await triageAgent.handle(e));
bus.on('ticket.escalated', async (e) => await supervisorAgent.handle(e));
bus.emit('ticket.created', { id: 'T-42', body: 'Cell voltage drift' });
// Incident Triage Agent:
// subscribers handle the event independently
```

## Architecture Questions
- What events should trigger the agent?
- What context is included in the event?
- What actions can the agent take automatically?
- Which actions require human approval?
- How are duplicate events handled?
- How are agent actions audited?

## When to Use
- Agents need to react to alerts, messages, schedules, or business events.
- Event context is enough to start useful work.
- Actions are auditable and bounded.

## When NOT to Use
- Events are noisy or low quality.
- The agent could take unsafe action automatically.
- Duplicate events and retries are not handled.
