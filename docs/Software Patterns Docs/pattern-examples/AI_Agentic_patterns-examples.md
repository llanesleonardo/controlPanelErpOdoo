# AI & Agentic Patterns — Three Examples Each

> Concrete examples for every pattern in [AI & Agentic Patterns INDEX](../AI_Agentic_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Model hallucinates or uses stale knowledge without private sources | **RAG** | **1.** ChatGPT support bot retrieves policy PDF chunks before answering refund questions. **2.** Internal wiki copilot embeds Confluence pages and cites sources in replies. **3.** Legal review tool pulls clause snippets from 10k contracts by semantic similarity. |
| One agent chokes on complex workflows spanning roles | **Multi-Agent Orchestration** | **1.** Research agent gathers web facts; writer agent drafts; critic agent revises before user sees output. **2.** Code agent plans refactor; test agent generates cases; deploy agent opens PR. **3.** Sales ops: lead scorer, email drafter, and CRM updater run as coordinated agents. |
| Model guesses live facts instead of querying systems of record | **Tool Calling** | **1.** LLM calls `getWeather(city)` instead of guessing tomorrow’s rain. **2.** Assistant invokes `searchOrders(customerId)` to answer “where is my package?” **3.** Agent runs `runSql(readOnly, query)` against approved analytics views. |
| Complex tasks run ad hoc and skip verification steps | **Planner-Executor** | **1.** Planner breaks “migrate database” into backup → migrate → verify; executor runs each step. **2.** Trip planner outputs day-by-day itinerary; executor books hotels via APIs. **3.** Incident bot plans rollback steps; executor triggers k8s rollout undo. |
| First-draft answers ship wrong or incomplete | **Reflection** | **1.** Model drafts answer, then self-checks “are citations missing?” and revises. **2.** Code generator runs tests mentally, fixes bugs before returning snippet. **3.** Email agent critiques tone (“too harsh”) and softens second draft. |
| Agent forgets user context across sessions | **Memory-Augmented Agent** | **1.** Chat remembers user’s preferred language across sessions in vector + summary store. **2.** Support agent recalls prior ticket context when user returns days later. **3.** Personal tutor tracks mastered topics and adjusts difficulty. |
| Polling misses timely reactions and wastes resources | **Event-Driven Agents** | **1.** Agent wakes on `OrderShipped` Kafka event to send proactive delivery SMS. **2.** Security agent reacts to `LoginFailed` spike without polling. **3.** Inventory agent restocks when `StockBelowThreshold` fires. |
| Runaway loops, budget overruns, or unsafe tool use | **Agent Supervisor** | **1.** Supervisor caps tool-call budget and kills runaway agent loops. **2.** Manager agent routes subtasks only to workers with required skills. **3.** Compliance supervisor blocks PII export tools for external models. |
| Untrusted AI changes production without approval | **Human-in-the-Loop** | **1.** AI proposes contract redlines; lawyer must approve before CRM update. **2.** Generated image ad copy requires marketer click **Approve**. **3.** Medical summary flagged uncertain — clinician confirms before EHR note. |
| Opaque decisions erode trust in high-stakes answers | **Chain-of-Thought Pipelines** | **1.** Math tutor shows step-by-step reasoning before final numeric answer. **2.** Fraud scorer explains feature contributions before block/allow. **3.** Architecture advisor lists tradeoffs then recommends pattern mix. |
| Keyword search misses semantically similar content | **Vector Search Architecture** | **1.** Pinecone index of product embeddings powers “find similar items.” **2.** pgvector stores help-center chunks for semantic FAQ search. **3.** Milvus shards embeddings by tenant for multi-tenant RAG. |
| Wrong agent or model handles mixed user intents | **Semantic Routing** | **1.** “Refund my order” routes to commerce agent; “reset password” to IAM agent. **2.** Small classifier sends code questions to code model, chit-chat to cheap model. **3.** Multilingual router picks language-specific prompt template by embedding similarity. |

## Related

- [Risk-driven pattern selection](../risk-driven-patterns.md) — pick patterns by *risk*, not hype
- [Problem solving using SEP](../Problem_solving_using_SEP/INDEX.md) — full system compositions
- [Cross-cutting concerns](../Problem_solving_using_SEP/concerns/INDEX.md) — reads, writes, contention lenses

## How to use

1. Name the **risk** first (what breaks if you get it wrong).
2. Find the **pattern** that addresses that risk.
3. Read all three examples — notice *where* the pattern shows up (API, data, ops).
4. Open the pattern doc in this category for mechanics and TypeScript sketch.
5. Map one example to a [problem file](../Problem_solving_using_SEP/INDEX.md) if you see a match.
