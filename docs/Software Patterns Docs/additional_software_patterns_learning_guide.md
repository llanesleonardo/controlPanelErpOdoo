# Additional Software Patterns Learning Guide

# 8. Repository Pattern

| Field | Content |
|---|---|
| Category | Data Access Pattern |
| Problem Solved | Business logic tightly coupled to database code |
| Description | Abstracts data storage behind clean interfaces |
| Best Use Cases | Enterprise systems, domain-driven systems |
| Bad Use Cases | Tiny scripts/simple CRUD |
| Tradeoffs | Extra abstraction layer |
| Related Patterns | Unit of Work, DAO |

---

## The REAL Problem

Bad implementation:

```python
def create_user():
    sql = "INSERT INTO users..."
```

Now SQL spreads everywhere:
- business logic mixed with persistence
- database changes become painful
- testing becomes difficult

---

## Repository Solution

Instead:

```text
Business Logic
   ↓
UserRepository
   ↓
Database
```

Now:
- storage logic isolated
- databases replaceable
- testing easier

---

# 9. State Pattern

| Field | Content |
|---|---|
| Category | Behavioral Pattern |
| Problem Solved | Giant conditional state logic |
| Description | Encapsulates behavior based on internal state |
| Best Use Cases | Workflows, machines, DAQ tests |
| Bad Use Cases | Simple static logic |
| Tradeoffs | More classes and abstraction |
| Related Patterns | Strategy, Workflow |

---

## The REAL Problem

Bad implementation:

```python
if state == "Charging":
    ...
elif state == "Discharging":
    ...
elif state == "Resting":
    ...
```

Over time:
- state transitions explode
- bugs appear
- workflows become impossible to reason about

---

## State Solution

Instead:

```text
BatteryTest
   ├── ChargingState
   ├── DischargingState
   └── RestingState
```

Each state:
- owns its own behavior
- controls valid transitions
- isolates complexity

Very important in:
- DAQ systems
- robotics
- manufacturing
- workflow engines

---

# 10. Event-Driven Architecture

| Field | Content |
|---|---|
| Category | Architectural Pattern |
| Problem Solved | Tight synchronous dependencies |
| Description | Systems communicate through events |
| Best Use Cases | Telemetry, SaaS workflows, IoT |
| Bad Use Cases | Strict synchronous transactions |
| Tradeoffs | Harder debugging and tracing |
| Related Patterns | Pub/Sub, Event Bus |

---

## The REAL Problem

Without events:

```text
Service A directly calls Service B
Service B directly calls Service C
Service C directly calls Service D
```

One slow service affects everything.

This creates:
- latency propagation
- tight coupling
- cascading failures

---

## Event-Driven Solution

Instead:

```text
Service A publishes event
   ↓
Interested services react independently
```

Benefits:
- asynchronous workflows
- independent scaling
- loose coupling

Very common in:
- SaaS platforms
- industrial telemetry
- cloud systems

---

# 11. Bulkhead Pattern

| Field | Content |
|---|---|
| Category | Resilience Pattern |
| Problem Solved | One subsystem consuming all resources |
| Description | Isolates resources between components |
| Best Use Cases | Cloud systems, thread pools |
| Bad Use Cases | Tiny applications |
| Tradeoffs | More operational management |
| Related Patterns | Circuit Breaker |

---

## The REAL Problem

Suppose:
- telemetry processing spikes CPU
- notification system starves
- login requests fail

One workload destroys unrelated functionality.

---

## Bulkhead Solution

Separate:
- thread pools
- queues
- resource limits

Example:

```text
Telemetry Workers → isolated
Notification Workers → isolated
API Workers → isolated
```

Now failures stay contained.

---

# 12. CQRS (Command Query Responsibility Segregation)

| Field | Content |
|---|---|
| Category | Architectural/Data Pattern |
| Problem Solved | Read and write workloads conflict |
| Description | Separates read models from write models |
| Best Use Cases | Large reporting-heavy systems |
| Bad Use Cases | Simple CRUD apps |
| Tradeoffs | Higher consistency complexity |
| Related Patterns | Event Sourcing |

---

## The REAL Problem

Suppose:
- millions of dashboard queries
- transactional writes slow down
- reports overload database

One database must satisfy:
- writes
- analytics
- dashboards
- exports

Performance collapses.

---

## CQRS Solution

Separate:

```text
Write Model → optimized for transactions
Read Model → optimized for queries
```

Benefits:
- independent scaling
- faster reporting
- specialized data structures

But:
- synchronization complexity increases

---

# 13. Hexagonal Architecture

| Field | Content |
|---|---|
| Category | Architectural Pattern |
| Problem Solved | Business logic tightly coupled to infrastructure |
| Description | Core logic isolated behind ports/adapters |
| Best Use Cases | Long-lived enterprise systems |
| Bad Use Cases | Tiny throwaway projects |
| Tradeoffs | More abstraction |
| Related Patterns | Clean Architecture, Adapter |

---

## The REAL Problem

Bad architecture:

```text
Business Logic
   ↓ directly tied to
Database
MQTT
HTTP
Vendor SDKs
```

Changing infrastructure becomes painful.

---

## Hexagonal Solution

Instead:

```text
Core Domain
   ↓ Ports
Adapters
   ├── Database Adapter
   ├── MQTT Adapter
   ├── REST Adapter
```

Benefits:
- infrastructure replaceable
- easier testing
- cleaner domain boundaries

Excellent for:
- industrial systems
- DAQ platforms
- enterprise SaaS

---

# 14. Producer-Consumer Pattern

| Field | Content |
|---|---|
| Category | Concurrency Pattern |
| Problem Solved | Work arrives faster than processing |
| Description | Producers generate work, consumers process independently |
| Best Use Cases | Streaming, telemetry, queues |
| Bad Use Cases | Small synchronous workflows |
| Tradeoffs | Queue management complexity |
| Related Patterns | Queue, Pipeline |

---

## The REAL Problem

Telemetry arrives:
- faster than processing speed
- bursts unpredictably

Without buffering:
- data loss occurs
- CPU spikes
- instability increases

---

## Producer-Consumer Solution

```text
Producers → Queue → Consumers
```

Benefits:
- absorbs spikes
- parallel processing
- scalable workers

Used heavily in:
- telemetry systems
- video encoding
- cloud event processing

---

# 15. Cache-Aside Pattern

| Field | Content |
|---|---|
| Category | Performance Pattern |
| Problem Solved | Database bottlenecks |
| Description | Cache checked before querying database |
| Best Use Cases | Frequently read data |
| Bad Use Cases | Highly volatile data |
| Tradeoffs | Cache invalidation complexity |
| Related Patterns | CDN, Read Replica |

---

## The REAL Problem

Suppose:
every dashboard request queries database directly.

At scale:
- database overloads
- latency rises
- throughput collapses

---

## Cache-Aside Solution

```text
Application
   ↓
Cache?
   ├── YES → return cached data
   └── NO → query DB and populate cache
```

Benefits:
- huge performance gains
- lower DB load
- faster response times

---

# 16. Saga Pattern

| Field | Content |
|---|---|
| Category | Distributed Transaction Pattern |
| Problem Solved | Distributed transaction coordination |
| Description | Breaks large transactions into smaller compensating steps |
| Best Use Cases | Microservices workflows |
| Bad Use Cases | Monoliths/simple systems |
| Tradeoffs | Complex orchestration |
| Related Patterns | Event-Driven, CQRS |

---

## The REAL Problem

Suppose an order process includes:
- payment
- inventory
- shipping
- notifications

If shipping fails after payment succeeds:
what happens?

Distributed transactions are extremely difficult.

---

## Saga Solution

Instead:
each step has:
- action
- compensating rollback action

Example:

```text
Reserve inventory
Charge payment
Create shipment

Shipment fails?
→ Refund payment
→ Release inventory
```

Very common in:
- e-commerce
- financial systems
- microservices
