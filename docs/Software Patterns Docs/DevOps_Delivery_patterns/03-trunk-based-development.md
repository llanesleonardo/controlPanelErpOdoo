# Trunk-Based Development

## Core Idea
Trunk-Based Development keeps developers integrating small changes frequently into a shared main branch.

## Problem It Solves
- Long-lived feature branches create painful merges, delayed integration, and late discovery of conflicts.

## Main Diagram
```text
Client
  |
Trunk
  |
Implementation
```

## 3 Concrete Examples
1. **Small Daily Commits:** Developers merge small tested changes into main multiple times per day.
2. **Feature Flags with Trunk:** Incomplete features are merged behind flags instead of waiting on a branch.
3. **Release Branch Only When Needed:** A short-lived release branch is created only for stabilization.

## TypeScript Example
```typescript
// Short-lived branches merge to main daily
git checkout main && git pull;
git checkout -b feat/small-change;
// ... commit ...
git push && gh pr create --merge-when-ready;
// Small Daily Commits:
```

## Architecture Questions
- Can developers merge small changes safely?
- Are tests fast enough to protect main?
- Are feature flags available for incomplete work?
- How are releases cut from trunk?
- How are broken builds handled?
- What branch lifetime is allowed?

## When to Use
- Teams can make small frequent changes.
- Automated tests protect main.
- Feature flags can hide incomplete work.

## When NOT to Use
- Tests are too slow or weak to protect main.
- Large unflagged changes cannot be hidden safely.
- The team is not ready for frequent integration.
