# RAG - Retrieval-Augmented Generation

## Core Idea
RAG combines retrieval from trusted knowledge sources with generation from an LLM so answers can be grounded in external context.

## Problem It Solves
- An LLM needs to answer using private, current, or domain-specific knowledge that is not reliably stored in the model itself.

## Main Diagram
```text
User Question -> Retriever -> (Knowledge Index) -> Retrieved Context -> LLM
```

## 3 Concrete Examples
1. **Internal Policy Assistant:** The assistant retrieves HR and security policy chunks before answering employee questions.
2. **Technical Support Bot:** The system retrieves product docs, troubleshooting guides, and known issues before generating a support response.
3. **Legal Contract Review Helper:** The model retrieves clauses from uploaded contracts and answers questions using cited passages.

## TypeScript Example
```typescript
async function answer(question: string, docs: string[]) {
  const chunks = docs.flatMap(d => d.split('. '));
  const hits = chunks.filter(c => question.split(' ').some(w => c.includes(w)));
  const context = hits.slice(0, 3).join(' ');
  return fetch('/llm', { method: 'POST', body: JSON.stringify({ question, context }) });
}
```

## Architecture Questions
- What trusted knowledge sources should be retrieved?
- How will documents be chunked, indexed, and updated?
- What retrieval method is needed: keyword, vector, hybrid, or graph?
- How will the answer cite or reference sources?
- What happens when retrieval finds no reliable evidence?
- How will hallucination, stale data, and permission leakage be controlled?

## When to Use
- Answers must use private, current, or domain-specific knowledge.
- Source grounding and citations matter.
- Knowledge changes faster than model training.

## When NOT to Use
- No trusted knowledge source exists.
- Retrieval quality is poor and unmeasured.
- The task does not require external grounding.
