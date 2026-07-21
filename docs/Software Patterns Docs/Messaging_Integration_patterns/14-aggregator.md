# Aggregator

## Core Idea
An Aggregator collects related messages and combines them into one complete message or result.

## Problem It Solves
- A complete result requires multiple messages that arrive separately.

## Main Diagram
```text
Message 1 -> Message 2 -> Message 3 -> Aggregator -> Combined Message
```

## 3 Concrete Examples
1. **Order Shipment Aggregation:** Separate package shipment confirmations are aggregated into one order-shipped status.
2. **Travel Quote Aggregation:** Flight, hotel, and car quotes are combined into one trip quote.
3. **Batch Sensor Summary:** Multiple sensor readings are aggregated into a time-window summary.

## TypeScript Example
```typescript
const pending = new Map<string, Partial<Order>>();
function onFragment(msg: Fragment) {
  const agg = { ...pending.get(msg.correlationId), ...msg.data };
  if (agg.complete) deliver(agg);
  else pending.set(msg.correlationId, agg);
}
```

## Architecture Questions
- Which messages belong together?
- What correlation key groups them?
- How does the aggregator know the group is complete?
- What timeout should be used?
- What happens with missing messages?
- Is partial aggregation acceptable?

## When to Use
- Multiple related messages form one logical result.
- A correlation key exists.
- Completion rules and timeouts are clear.

## When NOT to Use
- Messages do not have a reliable correlation key.
- Completion cannot be determined.
- Waiting for all parts would create unacceptable delays.
