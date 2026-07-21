# Tool Calling

## Core Idea
Tool Calling lets an LLM invoke external functions, APIs, databases, calculators, or workflows to perform actions or retrieve exact information.

## Problem It Solves
- The model alone cannot reliably calculate, fetch live data, modify systems, search private sources, or execute deterministic operations.

## Main Diagram
```text
User Request -> LLM -> External Tool / API -> Tool Result -> Response / Action Result
```

## 3 Concrete Examples
1. **Calendar Assistant:** The model calls calendar tools to search availability and create events.
2. **Data Analysis Agent:** The model calls Python or SQL tools to compute statistics instead of guessing.
3. **Customer Support Automation:** The model calls CRM and ticketing APIs to look up orders and update case status.

## TypeScript Example
```typescript
const tools = { getWeather: (city: string) => fetch(`/weather?city=${city}`) };
async function agent(prompt: string) {
  const plan = await llm(prompt, { tools: Object.keys(tools) });
  if (plan.tool) return tools[plan.tool](...plan.args);
  return plan.text;
}
```

## Architecture Questions
- Which tools should the model be allowed to call?
- What schemas and parameter validation are required?
- Which actions need user confirmation?
- How are tool errors handled?
- How is authorization enforced?
- How are tool calls logged and audited?

## When to Use
- The model needs external data or deterministic actions.
- APIs, databases, calculators, or workflows are available.
- Tool permissions and schemas can be controlled.

## When NOT to Use
- The model can answer safely without external action.
- Tool schemas are vague or unsafe.
- Authorization and confirmation are not designed.
