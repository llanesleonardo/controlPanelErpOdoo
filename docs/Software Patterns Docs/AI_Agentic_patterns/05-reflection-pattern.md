# Reflection

## Core Idea
Reflection Pattern makes a model critique, verify, or revise its own output or another agent's output before finalizing.

## Problem It Solves
- First-pass LLM outputs often contain omissions, weak reasoning, formatting issues, or unchecked assumptions.

## Main Diagram
```text
Draft Output -> Reflection / Critic -> Issues Found -> Revision -> Final Output
```

## 3 Concrete Examples
1. **Answer Quality Review:** A reflection step checks whether the answer actually addresses the user's constraints.
2. **Code Review Agent:** A reviewer model inspects generated code for bugs, missing tests, and style issues.
3. **Plan Critique:** A model critiques a proposed project plan for missing dependencies and risks.

## TypeScript Example
```typescript
async function solve(task: string) {
  let answer = await agent(task);
  const critique = await agent(`Review: ${answer}. List flaws.`);
  if (critique.includes('flaw')) answer = await agent(`Fix: ${critique}`);
  return answer;
}
```

## Architecture Questions
- What should reflection check?
- Is the critic the same model or a separate role?
- How many revision loops are allowed?
- What stops infinite critique loops?
- What evidence can the critic use?
- Can reflection catch factual errors, or is external verification needed?

## When to Use
- First-pass output quality is not enough.
- A critique/revision loop can catch issues.
- There are clear criteria for review.

## When NOT to Use
- There are no objective review criteria.
- Reflection loops waste tokens without improving quality.
- External verification is needed but not used.
