# Semantic Routing

## Core Idea
Semantic Routing sends a user request to the right model, tool, agent, workflow, or knowledge source based on meaning rather than only keywords.

## Problem It Solves
- AI systems need to choose different handling paths for different intents, domains, risks, or capabilities.

## Main Diagram
```text
User Request -> Semantic Router -> Workflow A -> Workflow B -> Agent / Tool C
```

## 3 Concrete Examples
1. **Support Intent Routing:** Billing questions go to billing workflow; technical issues go to troubleshooting workflow.
2. **Model Routing:** Simple questions use a cheaper model; complex reasoning tasks use a stronger model.
3. **Tool Routing:** Data questions route to SQL tools while policy questions route to document retrieval.

## TypeScript Example
```typescript
const routes = [
  { intent: 'billing', handler: billingAgent },
  { intent: 'technical', handler: supportAgent },
];
async function route(message: string) {
  const intent = await classifyIntent(message);
  return routes.find(r => r.intent === intent)!.handler.run(message);
}
```

## Architecture Questions
- What routes exist?
- What signals determine route selection?
- Is routing classifier-based, embedding-based, rules-based, or hybrid?
- What confidence threshold is required?
- What is the fallback route?
- How are misroutes detected and corrected?

## When to Use
- Different requests need different models, agents, tools, or workflows.
- Intent classification improves cost, quality, or safety.
- Fallback handling is available.

## When NOT to Use
- There is only one meaningful path.
- Misrouting risk is higher than benefit.
- No fallback exists for low-confidence routing.
