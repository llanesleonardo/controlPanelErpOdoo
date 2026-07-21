# Multi-Agent Orchestration

## Core Idea
Multi-Agent Orchestration coordinates multiple specialized agents to solve a task that benefits from role separation.

## Problem It Solves
- One agent becomes too broad, brittle, or hard to control when a workflow needs planning, research, coding, review, testing, and decision-making.

## Main Diagram
```text
User Task -> Orchestrator -> Planning Agent -> Research Agent -> Execution Agent
```

## 3 Concrete Examples
1. **Software Delivery Agents:** Planner, developer, reviewer, tester, and documentation agents collaborate on a feature.
2. **Research Workflow:** Search agent gathers sources, analysis agent synthesizes, critique agent checks gaps, and writer agent drafts the report.
3. **Operations Incident Response:** Triage agent classifies incident, log agent investigates evidence, remediation agent proposes actions, and supervisor approves.

## TypeScript Example
```typescript
type Agent = { role: string; run: (task: string) => Promise<string> };
const agents: Agent[] = [
  { role: 'researcher', run: async t => search(t) },
  { role: 'writer', run: async t => draft(t) },
];
const brief = await agents[0].run('battery degradation');
const report = await agents[1].run(brief);
```

## Architecture Questions
- What roles are actually needed?
- Who coordinates agent execution?
- How is state shared between agents?
- How are conflicting outputs resolved?
- Which agent can use which tools?
- Where are human approval gates required?

## When to Use
- The workflow benefits from specialized roles.
- Tasks require planning, execution, review, and tool use.
- A supervisor can manage coordination and quality.

## When NOT to Use
- One well-designed agent or workflow is enough.
- Coordination overhead exceeds value.
- Agents have unclear responsibilities.
