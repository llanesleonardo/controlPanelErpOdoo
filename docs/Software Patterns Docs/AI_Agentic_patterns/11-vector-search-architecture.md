# Vector Search Architecture

## Core Idea
Vector Search Architecture stores embeddings and retrieves semantically similar content based on vector distance.

## Problem It Solves
- Keyword search misses relevant content when users phrase questions differently from source documents.

## Main Diagram
```text
Documents / Items -> Embedding Model -> (Vector Index) -> User Query -> Query Embedding
```

## 3 Concrete Examples
1. **Document Q&A:** User questions retrieve semantically similar document chunks.
2. **Product Search:** Customers search by intent, not exact product keywords.
3. **Support Ticket Similarity:** New tickets are matched to similar historical cases.

## TypeScript Example
```typescript
async function semanticSearch(query: string, index: VectorIndex) {
  const embedding = await embed(query);
  const neighbors = await index.query(embedding, { topK: 5 });
  return neighbors.map(n => ({ text: n.metadata.text, score: n.score }));
}
// Document Q&A:
```

## Architecture Questions
- What content should be embedded?
- What embedding model is used?
- What chunking strategy is used?
- What metadata filters are required?
- How are embeddings refreshed when content changes?
- Is hybrid keyword plus vector search needed?

## When to Use
- Semantic similarity matters.
- Users do not know exact keywords.
- Documents/items can be embedded and indexed.

## When NOT to Use
- Exact keyword or structured search is enough.
- Embeddings are stale or poorly chunked.
- Permission filtering cannot be enforced.
