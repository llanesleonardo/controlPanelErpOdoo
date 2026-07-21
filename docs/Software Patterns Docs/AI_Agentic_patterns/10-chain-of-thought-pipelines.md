# Chain-of-Thought Pipelines

## Core Idea
Chain-of-Thought Pipelines decompose reasoning into explicit stages such as classify, retrieve, analyze, verify, and answer, while exposing only safe outputs.

## Problem It Solves
- One-shot generation is brittle for tasks that require multi-step reasoning, validation, and transformation.

## Main Diagram
```text
Input -> Classify -> Retrieve -> Analyze -> Verify
```

## 3 Concrete Examples
1. **Support Diagnosis Pipeline:** Classify issue, retrieve docs, infer likely cause, verify against logs, then draft response.
2. **Contract Review Pipeline:** Extract clauses, classify risks, compare policy, summarize findings.
3. **Data Analysis Pipeline:** Interpret question, generate query, validate result, explain output.

## TypeScript Example
```typescript
async function reason(problem: string) {
  const steps: string[] = [];
  let thought = problem;
  for (let i = 0; i < 3; i++) {
    thought = await llm(`Step ${i + 1}: ${thought}`);
    steps.push(thought);
  }
  return llm(`Given ${steps.join(' -> ')}, final answer:`);
}
```

## Architecture Questions
- What reasoning stages are needed?
- Which intermediate outputs should be stored or hidden?
- Where is external verification needed?
- How are stage failures handled?
- Can stages be tested independently?
- How is sensitive reasoning protected from user-visible output?

## When to Use
- The task benefits from staged reasoning and verification.
- Intermediate stages can be tested.
- Only safe final outputs should be exposed.

## When NOT to Use
- A single step is enough.
- Intermediate outputs expose sensitive reasoning unnecessarily.
- The pipeline hides errors instead of validating them.
