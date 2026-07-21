# Risk-Driven Pattern Selection

People often pick patterns by technology ("I'll use CQRS because it's modern") instead of by **risk**.

Start with **"What can go wrong?"** — not **"What pattern name fits?"**

## Risk → Pattern (this plugin)

| Risk | Pattern in this plugin | Examples (short) |
| ---- | ---------------------- | ------------------ |
| Multiple entry points | **Facade** (`AiContentFacade`) | **1.** MCP `update_resource` and admin chat both call the same facade instead of duplicating draft + CommandBus wiring. **2.** A future CLI can list pages via `listPages()` without touching `PageService` internals. |
| Irreversible bad edits | **Draft + Publish** | **1.** Chat approves a bad paragraph — live site unchanged until **Publish Draft**. **2.** User discards draft and the public page still shows the old content. |
| Need audit / undo | **Command + CommandBus** | **1.** Every `UpdateResourceCommand` is logged with actor `ai:chat:*` for traceability. **2.** **Undo** replays the inverse command instead of hand-rolling block JSON rollback. |
| Fuzzy input | **IntentMapper** (+ `LlmClientInterface`) | **1.** "Add a paragraph under Who we are" → `add_section_resources` proposal. **2.** Phase 5 rules parse `update resource intro-paragraph content to Hello` without an LLM. |
| Untrusted actor | **Approval** (`ApprovalWorkflow`) | **1.** LLM proposes changes — user must click **Approve** before draft is touched. **2.** Destructive commands (e.g. publish) always require explicit confirmation. |
| WP coupling | **Adapter + Repository** | **1.** `GutenbergAdapter` hides `parse_blocks()` / `serialize_blocks()` from handlers. **2.** `DraftRepository` stores draft overlay so domain code never calls `get_post_meta()` directly. |

## Same risks — simple analogies

Everyday pictures for the same rows. If the code examples feel abstract, start here.

| Risk | Pattern in this plugin | Analogies (short) |
| ---- | ---------------------- | ----------------- |
| Multiple entry points | **Facade** (`AiContentFacade`) | **1.** One host at a restaurant — dine-in, takeout, and delivery all order from the same menu, not three different kitchens. **2.** One school office number — parents, teachers, and students call the same desk instead of hunting private extensions. |
| Irreversible bad edits | **Draft + Publish** | **1.** Write on scratch paper first; only photocopy to the bulletin board when you're sure. **2.** Test-drive edits in a Word doc — the printed handbook stays unchanged until you click Print. |
| Need audit / undo | **Command + CommandBus** | **1.** Every bank withdrawal gets a receipt with your name and time — you can prove what happened. **2.** Ctrl+Z in a game — the game remembers your last move so it can rewind, not guess from memory. |
| Fuzzy input | **IntentMapper** (+ `LlmClientInterface`) | **1.** You say "something warm" at a café; the barista picks "latte" or asks "tea or coffee?" **2.** A kid says "fix my bike" — the mechanic figures out flat tire vs broken chain from context. |
| Untrusted actor | **Approval** (`ApprovalWorkflow`) | **1.** A junior employee can suggest a budget change, but the manager must sign before money moves. **2.** A spell-checker underlines mistakes — you click Accept before the word actually changes. |
| WP coupling | **Adapter + Repository** | **1.** A travel plug adapter — your charger stays the same; only the wall socket part changes per country. **2.** A library desk — you ask for a book by title; you don't walk into the storage vault and search shelves yourself. |

## How to use this table

1. Name the **risk** first (what breaks if you get it wrong).
2. Pick the **smallest pattern** that addresses that risk.
3. Add more layers only when a **new risk** appears — not because a diagram looks "complete."

## Related docs

- [Pattern examples by category](./pattern-examples/INDEX.md) — risk, pattern, and three examples per row for every class
- [Phase 4 — Commands](../phases/phase-4-commands/architecture-summary.md) — Draft, CommandBus, audit
- [Phase 5 — Client Facade](../phases/phase-5-client-facade/overview.md) — Facade, approval, IntentMapper
