There is no officially complete list of “all software engineering patterns.”

The reason is:

* new patterns emerge constantly
* many overlap
* some are architecture styles
* some are infrastructure patterns
* some are organizational patterns
* some are cloud-native evolutions
* some are vendor-specific adaptations

But there ARE major recognized pattern families.

Below is one of the broadest practical categorizations used in real systems architecture.

---

# 1. GOF (Gang of Four) DESIGN PATTERNS

These are the classic object-oriented patterns.

---

# Creational Patterns

Patterns for object creation.

| Pattern          |
| ---------------- |
| Abstract Factory |
| Builder          |
| Factory Method   |
| Prototype        |
| Singleton        |

---

# Structural Patterns

Patterns for composing structures.

| Pattern   |
| --------- |
| Adapter   |
| Bridge    |
| Composite |
| Decorator |
| Facade    |
| Flyweight |
| Proxy     |

---

# Behavioral Patterns

Patterns for behavior and communication.

| Pattern                 |
| ----------------------- |
| Chain of Responsibility |
| Command                 |
| Interpreter             |
| Iterator                |
| Mediator                |
| Memento                 |
| Observer                |
| State                   |
| Strategy                |
| Template Method         |
| Visitor                 |

---

# 2. ARCHITECTURAL PATTERNS

Whole-system structures.

| Pattern                             |
| ----------------------------------- |
| Monolith                            |
| Modular Monolith                    |
| Layered Architecture                |
| Client-Server                       |
| Microservices                       |
| SOA (Service-Oriented Architecture) |
| Event-Driven Architecture           |
| Hexagonal Architecture              |
| Clean Architecture                  |
| Onion Architecture                  |
| Pipe and Filter                     |
| Broker Architecture                 |
| Peer-to-Peer                        |
| CQRS                                |
| Event Sourcing                      |
| Serverless Architecture             |
| Space-Based Architecture            |
| Reactive Architecture               |
| Actor Model                         |
| Blackboard Architecture             |
| MVC                                 |
| MVVM                                |
| MVP                                 |
| Backend-for-Frontend (BFF)          |

---

# 3. DISTRIBUTED SYSTEMS PATTERNS

Patterns for large-scale cloud/distributed systems.

| Pattern               |
| --------------------- |
| API Gateway           |
| Circuit Breaker       |
| Retry                 |
| Retry with Backoff    |
| Bulkhead              |
| Sidecar               |
| Service Discovery     |
| Leader Election       |
| Consensus             |
| Saga                  |
| Outbox Pattern        |
| Inbox Pattern         |
| Strangler Fig         |
| Ambassador Pattern    |
| Anti-Corruption Layer |
| Service Mesh          |
| Request Hedging       |
| Rate Limiting         |
| Throttling            |
| Idempotency           |
| Distributed Lock      |
| Token Bucket          |
| Leaky Bucket          |
| Heartbeat             |
| Gossip Protocol       |
| Quorum                |
| Sharding              |
| Replication           |
| Distributed Cache     |
| Event Bus             |
| Shared Database       |
| Database per Service  |

---

# 4. MESSAGING & INTEGRATION PATTERNS

Enterprise Integration Patterns (EIP).

| Pattern                      |
| ---------------------------- |
| Publish-Subscribe            |
| Queue                        |
| Producer-Consumer            |
| Request-Reply                |
| Message Broker               |
| Message Bus                  |
| Dead Letter Queue            |
| Competing Consumers          |
| Event Streaming              |
| Event Notification           |
| Event-Carried State Transfer |
| Content-Based Router         |
| Message Filter               |
| Aggregator                   |
| Splitter                     |
| Resequencer                  |
| Message Translator           |
| Canonical Data Model         |
| Correlation Identifier       |
| Message Store                |
| Claim Check                  |
| Pipes and Filters            |

---

# 5. DATA & DOMAIN PATTERNS

Database/domain-driven patterns.

| Pattern                   |
| ------------------------- |
| Repository                |
| Unit of Work              |
| Aggregate                 |
| Entity                    |
| Value Object              |
| Domain Service            |
| Specification             |
| Identity Map              |
| Lazy Loading              |
| Data Mapper               |
| Active Record             |
| Transaction Script        |
| Table Module              |
| Domain Model              |
| Event Sourcing            |
| Materialized View         |
| Read Replica              |
| Cache-Aside               |
| CQRS Read Model           |
| Database Sharding         |
| Multi-Tenant Partitioning |
| Soft Delete               |
| Temporal Tables           |

---

# 6. CONCURRENCY PATTERNS

Threading/parallelism patterns.

| Pattern              |
| -------------------- |
| Producer-Consumer    |
| Thread Pool          |
| Worker Queue         |
| Reactor              |
| Proactor             |
| Fork-Join            |
| Pipeline             |
| Futures/Promises     |
| Async/Await          |
| Double Buffer        |
| Readers-Writers Lock |
| Barrier              |
| Semaphore            |
| Actor Model          |
| Scheduler            |
| Work Stealing        |
| Event Loop           |

---

# 7. CLOUD & INFRASTRUCTURE PATTERNS

Cloud-native operational patterns.

| Pattern                  |
| ------------------------ |
| Stateless Services       |
| Immutable Infrastructure |
| Auto Scaling             |
| Blue-Green Deployment    |
| Canary Deployment        |
| Rolling Deployment       |
| Feature Flags            |
| Infrastructure as Code   |
| Sidecar                  |
| Service Mesh             |
| Multi-Region Deployment  |
| CDN                      |
| Edge Computing           |
| Cell-Based Architecture  |
| Availability Zones       |
| Chaos Engineering        |
| Horizontal Scaling       |
| Vertical Scaling         |

---

# 8. SECURITY PATTERNS

Security architecture patterns.

| Pattern                  |
| ------------------------ |
| Zero Trust               |
| RBAC                     |
| ABAC                     |
| OAuth2                   |
| OpenID Connect           |
| Federated Identity       |
| API Token Gateway        |
| JWT                      |
| Defense in Depth         |
| Bastion Host             |
| DMZ                      |
| Secrets Vault            |
| Envelope Encryption      |
| Secure Gateway           |
| Mutual TLS               |
| Policy Enforcement Point |

---

# 9. DEVOPS & DELIVERY PATTERNS

Operational delivery patterns.

| Pattern                 |
| ----------------------- |
| CI/CD Pipeline          |
| GitOps                  |
| Trunk-Based Development |
| Branch by Abstraction   |
| Infrastructure as Code  |
| Observability           |
| Centralized Logging     |
| Distributed Tracing     |
| Health Checks           |
| Self-Healing Systems    |
| Chaos Testing           |
| Progressive Delivery    |

---

# 10. AI / AGENTIC SYSTEM PATTERNS

Emerging LLM/AI patterns.

| Pattern                              |
| ------------------------------------ |
| RAG (Retrieval-Augmented Generation) |
| Multi-Agent Orchestration            |
| Tool Calling                         |
| Planner-Executor                     |
| Reflection Pattern                   |
| Memory-Augmented Agent               |
| Event-Driven Agents                  |
| Agent Supervisor                     |
| Human-in-the-Loop                    |
| Chain-of-Thought Pipelines           |
| Vector Search Architecture           |
| Semantic Routing                     |

---

# 11. RESILIENCE PATTERNS

Fault-tolerant systems.

| Pattern              |
| -------------------- |
| Circuit Breaker      |
| Retry                |
| Timeout              |
| Bulkhead             |
| Fail Fast            |
| Graceful Degradation |
| Fallback             |
| Load Shedding        |
| Backpressure         |
| Watchdog             |
| Checkpointing        |
| Heartbeat            |
| Failover             |
| Active-Active        |
| Active-Passive       |

---

# 12. SCALABILITY PATTERNS

Scaling architectures.

| Pattern                   |
| ------------------------- |
| Stateless Services        |
| Partitioning              |
| Sharding                  |
| Replication               |
| CDN                       |
| CQRS                      |
| Read Replica              |
| Distributed Cache         |
| Queue-Based Load Leveling |
| Elastic Scaling           |
| Multi-Level Cache         |
| Data Locality             |

---

# 13. UI / FRONTEND PATTERNS

Frontend/UI structures.

| Pattern                      |
| ---------------------------- |
| MVC                          |
| MVVM                         |
| MVP                          |
| Flux                         |
| Redux                        |
| Component-Based Architecture |
| Micro Frontends              |
| Observer                     |
| State Container              |
| Virtual DOM                  |

---

# 14. ORGANIZATIONAL / SYSTEMS ENGINEERING PATTERNS

High-level systems thinking patterns.

| Pattern                       |
| ----------------------------- |
| Conway’s Law Alignment        |
| Bounded Context               |
| Team Topologies               |
| Platform Teams                |
| Shared Services               |
| Capability-Based Architecture |
| Domain-Driven Design          |
| Event Storming                |
| Anti-Corruption Layer         |

---

# IMPORTANT REALITY

You are NOT supposed to learn all these at once.

Real architectural maturity happens in layers.

---

# BEST LEARNING ORDER

---

# Phase 1 — Core Structure

Learn first:

* Layered Architecture
* Modular Monolith
* Strategy
* Factory
* Observer
* Adapter
* Repository
* State

---

# Phase 2 — Distributed Systems

Then:

* Queue
* Pub/Sub
* Circuit Breaker
* Retry
* API Gateway
* Event-Driven Architecture

---

# Phase 3 — Enterprise Architecture

Then:

* Hexagonal
* DDD
* CQRS
* Saga
* Event Sourcing

---

# Phase 4 — Cloud Systems

Then:

* Stateless Services
* Service Mesh
* Sharding
* Auto Scaling
* Multi-region

---

# Phase 5 — Deep Systems Engineering

Then:

* Consensus
* Quorum
* Actor Systems
* Distributed Coordination
* CAP Theorem implications
* Cell-based architectures

---

# MOST IMPORTANT THING

Patterns are NOT:

* trophies
* checklists
* architecture goals

Patterns are:

# responses to recurring engineering pain.

The elite architect skill is:

* identifying the TRUE problem
* choosing MINIMAL sufficient structure
* avoiding unnecessary complexity

That is the real profession.
