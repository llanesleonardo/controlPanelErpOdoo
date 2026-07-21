# Software Architecture & Design Patterns Learning Guide

## Purpose

This document is designed to teach software patterns through:

- real engineering pain
- operational problems
- scalability issues
- failure scenarios
- architectural tradeoffs

NOT through memorizing definitions.

---

# 1. Circuit Breaker

| Field | Content |
|---|---|
| Category | Distributed Systems Pattern |
| Problem Solved | Cascading failures |
| Description | Prevents repeated calls to failing services |
| Best Use Cases | Remote APIs, cloud services, databases |
| Bad Use Cases | Local in-memory function calls |
| Tradeoffs | Added operational complexity |
| Related Patterns | Retry, Timeout, Bulkhead |

---

## The REAL Problem

Imagine your SaaS platform depends on:

- payment API
- AI service
- telemetry service
- authentication provider

Now one dependency becomes slow.

Without protection:

Users keep sending requests.

Your application:
- waits longer
- accumulates blocked threads
- memory usage grows
- queues fill
- latency spreads

Soon:
the ENTIRE platform slows down.

This is:
## cascading failure

One failing dependency causes the entire system to fail.

---

## Why Naive Retries Fail

Bad implementation:

```python
while True:
    call_api()
```

If the API is already failing:
- retries create MORE traffic
- overloaded service becomes worse
- recovery becomes impossible

This creates:
## retry storms

---

## What Circuit Breaker Does

The pattern behaves like an electrical breaker.

Too many failures detected?

The breaker OPENS.

Requests stop temporarily.

Instead of:
- hammering dead systems
- exhausting resources
- collapsing the platform

the application fails FAST and RECOVERS gracefully.

---

## Real Example

Netflix Hystrix was created because:
- microservices caused dependency explosions
- one bad service could destroy many others
- failures spread rapidly

Circuit breakers prevented platform-wide outages.

---

# 2. Pub/Sub (Publish Subscribe)

| Field | Content |
|---|---|
| Category | Messaging Pattern |
| Problem Solved | Tight coupling between systems |
| Description | Publishers emit events without knowing subscribers |
| Best Use Cases | Notifications, telemetry, event systems |
| Bad Use Cases | Synchronous transactional workflows |
| Tradeoffs | Harder debugging and tracing |
| Related Patterns | Event Bus, Queue |

---

## The REAL Problem

Without Pub/Sub:

```text
DAQ Service
   ↓ directly calls
Email Service
Analytics Service
AI Service
Audit Service
```

Now DAQ depends on EVERYTHING.

If Email fails:
DAQ may fail.

This creates:
## tight coupling

---

## Pub/Sub Solution

Instead:

```text
DAQ publishes:
"TestCompleted"

Subscribers:
- Email Service
- Analytics Service
- AI Service
- Audit Service
```

DAQ does NOT know who listens.

This creates:
## loose coupling

Benefits:
- services evolve independently
- new subscribers added later
- failures isolated better

---

# 3. Strategy Pattern

| Field | Content |
|---|---|
| Category | Design Pattern |
| Problem Solved | Hardcoded behavior logic |
| Description | Encapsulates interchangeable algorithms |
| Best Use Cases | Multiple runtime behaviors |
| Bad Use Cases | Static/simple behavior |
| Tradeoffs | More abstraction |
| Related Patterns | Factory, State |

---

## The REAL Problem

Bad implementation:

```python
if chemistry == "LFP":
    charge_lfp()

elif chemistry == "NMC":
    charge_nmc()

elif chemistry == "SolidState":
    charge_ss()
```

Over time:
- logic explodes
- maintenance becomes painful
- adding new chemistries becomes risky

---

## Strategy Solution

Instead:

```text
ChargeStrategy
   ├── LFPStrategy
   ├── NMCStrategy
   └── SolidStateStrategy
```

Now behavior becomes:
- modular
- swappable
- extensible

This is extremely useful in:
- DAQ systems
- test systems
- payment systems
- AI model selection

---

# 4. Queue Pattern

| Field | Content |
|---|---|
| Category | Messaging Pattern |
| Problem Solved | Workload spikes and asynchronous processing |
| Description | Stores work temporarily for later processing |
| Best Use Cases | Background jobs, telemetry ingestion |
| Bad Use Cases | Immediate synchronous logic |
| Tradeoffs | Eventual consistency |
| Related Patterns | Producer-Consumer, Pub/Sub |

---

## The REAL Problem

Suppose:
10,000 telemetry messages arrive instantly.

Without buffering:
- CPU spikes
- memory overloads
- requests fail

---

## Queue Solution

Instead:

```text
Producers
   ↓
Queue
   ↓
Workers consume gradually
```

Benefits:
- absorbs spikes
- smooths workload
- improves resiliency

---

## Real Example

Used heavily in:
- telemetry systems
- video processing
- cloud workloads
- notification systems

---

# 5. API Gateway

| Field | Content |
|---|---|
| Category | Distributed Systems Pattern |
| Problem Solved | Client complexity and fragmented APIs |
| Description | Central entry point for backend services |
| Best Use Cases | Multi-service systems |
| Bad Use Cases | Tiny monoliths |
| Tradeoffs | Can become bottleneck |
| Related Patterns | BFF, Service Discovery |

---

## The REAL Problem

Without API Gateway:

Frontend must call:
- Auth Service
- Billing Service
- User Service
- Notification Service
- Telemetry Service

Clients become:
- complicated
- tightly coupled
- difficult to evolve

---

## Gateway Solution

Instead:

```text
Frontend
   ↓
API Gateway
   ↓
Backend Services
```

Benefits:
- centralized authentication
- routing
- throttling
- monitoring
- request aggregation

---

# 6. Stateless Service Pattern

| Field | Content |
|---|---|
| Category | Cloud Scalability Pattern |
| Problem Solved | Horizontal scaling limitations |
| Description | Services avoid storing local session state |
| Best Use Cases | Cloud-native scalable systems |
| Bad Use Cases | Heavy local state dependency |
| Tradeoffs | Requires external state storage |
| Related Patterns | Load Balancer, Auto Scaling |

---

## The REAL Problem

Suppose server memory stores user sessions.

Now:
- server crashes
- sessions disappear
- scaling becomes difficult

Load balancing breaks.

---

## Stateless Solution

Instead:
- state stored externally
- Redis/database/session store used

Servers become disposable.

Benefits:
- easy scaling
- failover
- elasticity

---

# 7. Adapter Pattern

| Field | Content |
|---|---|
| Category | Design Pattern |
| Problem Solved | Incompatible interfaces |
| Description | Wraps incompatible systems behind common interface |
| Best Use Cases | Hardware integration, third-party APIs |
| Bad Use Cases | When interfaces already stable |
| Tradeoffs | Additional abstraction |
| Related Patterns | Facade, Proxy |

---

## The REAL Problem

Suppose:
- vendor A returns XML
- vendor B returns JSON
- vendor C uses serial commands

Your core system becomes messy.

---

## Adapter Solution

Instead:

```text
System
   ↓
Common Interface
   ↓
Vendor Adapters
```

Benefits:
- vendor isolation
- cleaner architecture
- easier replacement

Extremely important in:
- industrial systems
- DAQ systems
- hardware integrations

---

# Final Advice

Do NOT memorize patterns.

Instead ask:

```text
What engineering pain forced this pattern to exist?
```

That question is the beginning of architectural thinking.
