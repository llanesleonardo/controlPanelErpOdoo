# Flyweight

## Core Idea
The **Flyweight Pattern** is a structural design pattern used to reduce memory usage when a system creates a large number of similar objects.

## Problem It Solves
- Many similar objects consume memory.
- Shared intrinsic state can be reused.
- Unique extrinsic state stays outside.

## Main Diagram
```text
Client
  |
Flyweight
  |
Implementation
```

## 3 Concrete Examples
1. A game renders a large forest.
2. A text editor displays millions of characters.
3. A mapping application displays a huge grid of map tiles.

## TypeScript Example
```typescript
const glyphCache = new Map<string, Glyph>();
function getGlyph(char: string, font: string) {
  const key = `${char}:${font}`;
  return glyphCache.get(key) ?? glyphCache.set(key, new Glyph(char, font)).get(key)!;
}
// Flyweight
```

## Architecture Questions
- Are we creating many similar objects?
- Do many objects share the same heavy data?
- Can shared state be separated from unique state?
- Is memory usage becoming a real problem?
- Can repeated data be cached and reused?
- Are objects mostly identical except for location or small variations?
- Can clients pass unique state when rendering or operating?

## When to Use
- The application creates a very large number of similar objects.
- Many objects share identical data.
- Memory usage is a real concern.
- Shared state can be separated from unique state.
- The shared state can be immutable or safely reused.
- Objects differ mostly by position, context, or small external values.
- A factory/cache can manage shared instances.

## When NOT to Use
- You only have a small number of objects.
- Memory usage is not a problem.
- Objects do not share much data.
- Shared and unique state cannot be separated cleanly.
- Shared state is highly mutable.
- The added complexity is worse than the memory savings.
- The system becomes harder to understand for a tiny optimization.
