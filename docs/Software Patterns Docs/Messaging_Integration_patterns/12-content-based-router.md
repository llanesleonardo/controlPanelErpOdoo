# Content-Based Router

## Core Idea
A Content-Based Router routes messages to different destinations based on message content.

## Problem It Solves
- Messages of the same general type need to go to different systems depending on fields, rules, or attributes.

## Main Diagram
```text
Incoming Message -> Content-Based Router -> Destination A -> Destination B -> Destination C
```

## 3 Concrete Examples
1. **Order Region Routing:** Orders are routed to US, EU, or APAC fulfillment based on shipping country.
2. **Priority Support:** Support tickets with severity critical go to the urgent queue.
3. **Payment Type Routing:** Card payments go to one processor and bank transfers go to another.

## TypeScript Example
```typescript
function route(msg: Message) {
  if (msg.headers.type === 'urgent') return urgentQueue;
  if (msg.body.region === 'EU') return euQueue;
  return defaultQueue;
}
// Order Region Routing:
```

## Architecture Questions
- Which message fields determine routing?
- Are routing rules stable or configurable?
- Can one message go to multiple destinations?
- What happens when no route matches?
- How are rules tested?
- Who owns route changes?

## When to Use
- Messages need routing based on content.
- Routing rules are meaningful and owned.
- Different destinations process different message types or conditions.

## When NOT to Use
- Routing rules are unstable or unclear.
- All messages go to the same place.
- Routing logic becomes hidden business policy.
