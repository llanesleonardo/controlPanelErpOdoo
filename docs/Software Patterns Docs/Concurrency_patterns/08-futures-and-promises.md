# Futures and Promises

## Core Idea
A Future represents a result that will be available later; a Promise is the writable side that completes that future.

## Problem It Solves
- A caller needs to start asynchronous work and continue without blocking until the result is needed.

## Main Diagram
```text
Caller -> Promise -> Future -> Async Work -> Result / Error
```

## 3 Concrete Examples
1. **Async HTTP Request:** A future represents the eventual API response.
2. **Parallel Computation:** Several futures compute partial results, then combine.
3. **Background File Load:** UI starts file loading and receives the result later.

## TypeScript Example
```typescript
const price = fetchQuote('AAPL');
const rate = fetchFx('USD', 'EUR');
const [p, r] = await Promise.all([price, rate]);
console.log(p * r);
// Async HTTP Request:
// A Future represents a result that will be available later; a Promise ...
```

## Architecture Questions
- Who creates the promise?
- Who observes the future?
- How are success and failure represented?
- Can the future be cancelled?
- How are multiple futures combined?
- What thread runs continuations?

## When to Use
- Async results need to be represented explicitly.
- Callers should compose or wait for results later.
- Failure and success can be modeled as result completion.

## When NOT to Use
- The result is needed immediately.
- Async complexity adds no value.
- Cancellation and error handling are ignored.
