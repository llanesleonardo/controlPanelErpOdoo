# Client-Server Architecture

## Core Idea
Client-Server separates the system into clients that request services and servers that provide services.

## Problem It Solves
- A system needs multiple users or applications to access shared data or shared business capabilities without duplicating the full system on every device.

## Main Diagram
```text
Web Client -> Mobile Client -> Desktop Client -> Server / Backend API -> (Database)
```

## 3 Concrete Examples
1. Web browser and web server
2. Mobile app and backend API
3. Desktop app and central database service

## TypeScript Example
```typescript
// Client
const client = { async getOrders() { return fetch('/api/orders').then(r => r.json()); } };
// Server
app.get('/api/orders', (_req, res) => res.json(db.orders.findAll()));
// Client-Server Architecture
app.listen(3000);
```

## Architecture Questions
- What runs on the client and what runs on the server?
- Does the client need offline behavior?
- How much business logic should live on the server?
- How will authentication and authorization be enforced?
- Can the server scale to many clients?
- What happens if the network is slow or unavailable?

## When to Use
- Multiple clients need centralized access to data or services.
- You want a clear separation between user interface and backend processing.
- Business rules should be controlled centrally.
- Clients may be web, mobile, desktop, or external integrations.

## When NOT to Use
- The system is fully local and does not need shared state.
- Network dependency is unacceptable.
- The server would become an unnecessary bottleneck.
