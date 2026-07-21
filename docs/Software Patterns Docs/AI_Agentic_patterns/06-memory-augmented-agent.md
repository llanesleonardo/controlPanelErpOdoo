# Memory-Augmented Agent

## Core Idea
Memory-Augmented Agent stores and retrieves useful information across steps or sessions to improve continuity and personalization.

## Problem It Solves
- Agents lose context across long workflows or repeated interactions unless important facts, preferences, and task state are persisted.

## Main Diagram
```text
Interaction -> Agent -> (Memory Store) -> Relevant Memories -> Memory Update
```

## 3 Concrete Examples
1. **Personal Assistant Memory:** The agent remembers user preferences for tone, format, and recurring workflows.
2. **Long-Running Project Agent:** The agent stores project decisions, open tasks, and architecture constraints.
3. **Customer Support Agent:** The agent remembers relevant case history and previous troubleshooting steps.

## TypeScript Example
```typescript
class AgentMemory {
  private store = new Map<string, string>();
  recall(key: string) { return this.store.get(key); }
  remember(key: string, value: string) { this.store.set(key, value); }
}
const mem = new AgentMemory();
mem.remember('user-pref', 'metric units');
const reply = await agent(query, mem.recall('user-pref'));
```

## Architecture Questions
- What information is worth remembering?
- Is memory short-term, long-term, episodic, semantic, or task-specific?
- How is sensitive information handled?
- How can users inspect or delete memory?
- How is stale memory updated?
- How does retrieval decide what memory is relevant?

## When to Use
- Continuity across turns or sessions is valuable.
- Stored facts improve task performance.
- Memory can be governed, updated, and deleted.

## When NOT to Use
- Stored data would be sensitive or creepy without consent.
- Memory becomes stale and ungoverned.
- Short-term context is enough.
