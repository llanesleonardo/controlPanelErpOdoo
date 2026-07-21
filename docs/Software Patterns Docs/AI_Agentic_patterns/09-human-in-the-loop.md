# Human-in-the-Loop

## Core Idea
Human-in-the-Loop inserts human review, approval, correction, or decision-making into an AI workflow.

## Problem It Solves
- Some AI actions are too risky, ambiguous, regulated, or subjective to automate fully.

## Main Diagram
```text
AI Draft / Proposed Action -> Human Review -> Execute / Publish -> Revise / Reject -> Audit Trail
```

## 3 Concrete Examples
1. **Production Change Approval:** An agent proposes a database migration, but a human approves before execution.
2. **Medical Summary Review:** The model drafts a summary that a clinician reviews before use.
3. **Customer Refund Decision:** The agent recommends a refund decision, but a support lead approves high-value refunds.

## TypeScript Example
```typescript
async function approveAction(action: Action) {
  if (action.risk === 'high') {
    const approved = await ui.prompt(`Approve ${action.type}?`);
    if (!approved) throw new Error('Rejected by human');
  }
  return execute(action);
}
```

## Architecture Questions
- Which decisions require human review?
- What information should the human see?
- Can the human edit, reject, or approve?
- What is the SLA for human review?
- How are decisions audited?
- How is feedback used to improve the workflow?

## When to Use
- Decisions are high-risk, ambiguous, regulated, or subjective.
- Human review improves safety or trust.
- The workflow can tolerate review latency.

## When NOT to Use
- Automation risk is low and review adds unnecessary delay.
- Humans are rubber-stamping without real oversight.
- Review context is insufficient for decisions.
