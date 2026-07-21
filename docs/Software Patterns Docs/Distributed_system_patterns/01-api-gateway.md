# API Gateway

## Core Idea
An API Gateway sits between clients and backend services. It routes requests, can aggregate responses, and centralizes cross-cutting concerns like authentication, rate limits, request shaping, and protocol translation.

## Problem It Solves
- Multiple clients need one entry point into a backend made of several services.

## Main Diagram
```text
Client -> API Gateway -> Auth -> User Service -> Order Service
```

## 3 Concrete Examples
1. **Mobile App Gateway:** A mobile app calls one gateway endpoint that aggregates profile, orders, and notifications instead of making many calls.
2. **Public Partner API:** External partners call a gateway that validates tokens, applies quotas, and routes to internal services.
3. **Microservices Front Door:** A web client calls the gateway, which routes traffic to user, order, payment, and inventory services.

## TypeScript Example
```typescript
app.use('/api/*', async (req, res) => {
  const token = req.headers.authorization;
  if (!auth.verify(token)) return res.status(401).end();
  return proxy.web(req, res, { target: serviceFor(req.path) });
});
// Mobile App Gateway:
```

## Architecture Questions
- Do clients currently call too many backend services directly?
- Do different clients need different API shapes?
- Should authentication, rate limiting, or request validation be centralized?
- Will the gateway aggregate data or only route requests?
- Can the gateway become a bottleneck or god service?
- Who owns gateway routes and versioning?

## When to Use
- You need a single entry point for clients.
- Backend services should not be exposed directly.
- You need request routing, aggregation, authentication, or rate limiting at the edge.

## When NOT to Use
- The system has one backend service.
- The gateway would contain core business logic.
- The gateway becomes a large centralized bottleneck.
