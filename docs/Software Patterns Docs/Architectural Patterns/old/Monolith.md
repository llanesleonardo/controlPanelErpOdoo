# Monolith Architecture Using Diagrams

## Core Idea

A **Monolith** is a software architecture where the application is built, packaged, and deployed as one unit.

In simple words:

```txt
One application.
One codebase or tightly connected codebase.
One deployable unit.
Many internal modules.
```

A monolith can still have clean internal architecture.

Bad monolith:

```txt
Everything calls everything.
No clear boundaries.
Business logic mixed with UI, database, and integrations.
```

Good monolith:

```txt
One deployable application.
Clear modules inside.
Strong boundaries.
Clean dependency direction.
```

The problem is not “monolith.”

The problem is usually an **unstructured monolith**.

---

# 1. Monolith: General Structure

```mermaid
flowchart TD
    USER[User / Client]

    APP[Monolithic Application]

    AUTH[Auth Module]
    ORDERS[Orders Module]
    PAYMENTS[Payments Module]
    INVENTORY[Inventory Module]
    NOTIFICATIONS[Notifications Module]

    DB[(Shared Database)]

    USER --> APP

    APP --> AUTH
    APP --> ORDERS
    APP --> PAYMENTS
    APP --> INVENTORY
    APP --> NOTIFICATIONS

    APP --> DB
```

## What This Means

The system has many responsibilities, but they are deployed together.

The modules may be separate internally, but they live inside one application process or one deployable artifact.

---

# 2. Simple Mental Model

Think of a monolith like one large building.

```txt
One building.

Inside the building:
- accounting department
- sales department
- operations department
- support department
- engineering department
```

The departments can be organized well or badly.

A good monolith has hallways, doors, labels, and rules.

A bad monolith is one giant room where everyone shouts across the floor.

---

# 3. The Problem Monolith Solves

A monolith is often the simplest way to start because it avoids distributed system complexity.

With a monolith, you do not immediately need:

```txt
Service discovery
Distributed tracing
Network retries
Eventual consistency
Cross-service authentication
Multiple deployment pipelines
Distributed transactions
Complex observability
```

For many early systems, microservices are overkill.

A monolith lets the team build the product faster.

---

# 4. What a Bad Monolith Looks Like

## Big Ball of Mud

```mermaid
flowchart TD
    UI[UI Layer]
    AUTH[Auth Logic]
    ORDER[Order Logic]
    PAYMENT[Payment Logic]
    INVENTORY[Inventory Logic]
    EMAIL[Email Logic]
    DB[(Database)]

    UI --> AUTH
    UI --> ORDER
    UI --> PAYMENT
    AUTH --> PAYMENT
    PAYMENT --> INVENTORY
    INVENTORY --> EMAIL
    EMAIL --> AUTH
    ORDER --> DB
    PAYMENT --> DB
    INVENTORY --> DB
    AUTH --> DB
    EMAIL --> DB

    PROBLEM[Problem: everything depends on everything]

    AUTH --> PROBLEM
    PAYMENT --> PROBLEM
    INVENTORY --> PROBLEM
```

This is the version people complain about.

The problem is uncontrolled coupling.

---

## Why This Becomes Painful

```txt
Small changes break unrelated features.

Testing becomes slow and fragile.

Developers are afraid to touch old code.

Business rules are duplicated.

Database tables are shared with no ownership.

No module has a clear responsibility.

Deployments become risky.
```

That is not just “monolith pain.”

That is **bad modularity pain**.

---

# 5. What a Good Monolith Looks Like

## Modular Monolith

```mermaid
flowchart TD
    CLIENT[Client]

    APP[Monolithic Application]

    API[API / Controller Layer]

    AUTH[Auth Module]
    CATALOG[Catalog Module]
    ORDERS[Orders Module]
    PAYMENTS[Payments Module]
    NOTIFICATIONS[Notifications Module]

    SHARED[Shared Kernel / Common Utilities]

    DB[(Database)]

    CLIENT --> API
    API --> AUTH
    API --> CATALOG
    API --> ORDERS
    API --> PAYMENTS
    API --> NOTIFICATIONS

    AUTH --> DB
    CATALOG --> DB
    ORDERS --> DB
    PAYMENTS --> DB
    NOTIFICATIONS --> DB

    AUTH --> SHARED
    CATALOG --> SHARED
    ORDERS --> SHARED
    PAYMENTS --> SHARED
    NOTIFICATIONS --> SHARED
```

## What This Means

The application is still deployed as one unit.

But internally, it has clear module boundaries.

Each module owns its logic.

Ideally, each module also owns its data access rules.

---

# 6. Example 1: E-Commerce Monolith

## Problem

A startup is building an online store.

The system needs:

```txt
User accounts
Product catalog
Shopping cart
Checkout
Payments
Orders
Shipping
Email notifications
Admin dashboard
```

A team might be tempted to create microservices immediately.

But early on, the business is still changing fast.

Splitting everything into services too early can slow the team down.

---

## Architect Questions

An architect would ask:

```txt
Is the product still changing quickly?

Is the team small?

Do we really need independent service deployments?

Are module boundaries clear yet?

Can one database transaction simplify the workflow?

Would microservices add more operational complexity than value?

Can we design this as a modular monolith first?

Which modules may later become services?
```

---

## Monolith Diagram

```mermaid
flowchart TD
    CUSTOMER[Customer]

    ADMIN[Admin User]

    APP[E-Commerce Monolith]

    ACCOUNT[Account Module]
    CATALOG[Catalog Module]
    CART[Cart Module]
    CHECKOUT[Checkout Module]
    PAYMENT[Payment Module]
    ORDER[Order Module]
    SHIPPING[Shipping Module]
    EMAIL[Email Module]

    DB[(Store Database)]

    CUSTOMER --> APP
    ADMIN --> APP

    APP --> ACCOUNT
    APP --> CATALOG
    APP --> CART
    APP --> CHECKOUT
    APP --> PAYMENT
    APP --> ORDER
    APP --> SHIPPING
    APP --> EMAIL

    ACCOUNT --> DB
    CATALOG --> DB
    CART --> DB
    CHECKOUT --> DB
    PAYMENT --> DB
    ORDER --> DB
    SHIPPING --> DB
    EMAIL --> DB
```

---

## Runtime Flow: Place Order

```mermaid
sequenceDiagram
    participant User as Customer
    participant App as E-Commerce Monolith
    participant Cart as Cart Module
    participant Inventory as Catalog/Inventory Module
    participant Payment as Payment Module
    participant Order as Order Module
    participant Email as Email Module
    participant DB as Database

    User->>App: placeOrder(cartId)

    App->>Cart: validateCart(cartId)
    Cart-->>App: valid cart

    App->>Inventory: reserveItems(cartItems)
    Inventory-->>App: reserved

    App->>Payment: charge(paymentInfo)
    Payment-->>App: approved

    App->>Order: createOrder(cart, payment)
    Order->>DB: save order
    DB-->>Order: saved

    App->>Email: sendConfirmation(order)
    Email-->>App: sent

    App-->>User: order confirmation
```

---

## Architectural Meaning

Everything is inside one deployable application.

The benefit is simplicity:

```txt
One deployment.
One database transaction if needed.
One place to debug.
Simpler local development.
No network calls between modules.
```

The risk is that the modules may become tangled if boundaries are not enforced.

---

# 7. Example 2: Internal HR Platform Monolith

## Problem

A company builds an internal HR platform.

Features include:

```txt
Employee profiles
Time-off requests
Payroll exports
Performance reviews
Document storage
Manager approvals
Notifications
```

The system is important, but it may not need massive scale.

A monolith may be the right choice.

---

## Architect Questions

An architect would ask:

```txt
How many users will use this system?

Does the system need independent scaling by feature?

Does each feature require separate deployment?

Is operational simplicity more valuable than service isolation?

Can the modules be separated cleanly inside one app?

Will the company have enough DevOps maturity for distributed services?

Are compliance and audit requirements easier in one deployable system?
```

---

## Monolith Diagram

```mermaid
flowchart TD
    EMPLOYEE[Employee]

    MANAGER[Manager]

    HR[HR Admin]

    APP[HR Platform Monolith]

    PROFILE[Employee Profile Module]
    PTO[Time-Off Module]
    PAYROLL[Payroll Export Module]
    REVIEW[Performance Review Module]
    DOCS[Document Module]
    APPROVAL[Approval Module]
    NOTIFY[Notification Module]

    DB[(HR Database)]

    EMPLOYEE --> APP
    MANAGER --> APP
    HR --> APP

    APP --> PROFILE
    APP --> PTO
    APP --> PAYROLL
    APP --> REVIEW
    APP --> DOCS
    APP --> APPROVAL
    APP --> NOTIFY

    PROFILE --> DB
    PTO --> DB
    PAYROLL --> DB
    REVIEW --> DB
    DOCS --> DB
    APPROVAL --> DB
    NOTIFY --> DB
```

---

## Runtime Flow: Request Time Off

```mermaid
sequenceDiagram
    participant Employee as Employee
    participant App as HR Monolith
    participant PTO as Time-Off Module
    participant Approval as Approval Module
    participant Notify as Notification Module
    participant DB as Database

    Employee->>App: requestTimeOff(dateRange)

    App->>PTO: validateRequest(employee, dateRange)
    PTO->>DB: check balance
    DB-->>PTO: available balance

    PTO-->>App: valid request

    App->>Approval: createApprovalTask(manager)
    Approval->>DB: save approval task

    App->>Notify: notifyManager(manager)
    Notify-->>App: notification sent

    App-->>Employee: request submitted
```

---

## Architectural Meaning

The HR platform may not need microservices.

A well-structured monolith is easier to build, deploy, audit, and maintain.

The key is module discipline.

---

# 8. Example 3: Learning Management System Monolith

## Problem

A school or training company builds a learning platform.

Features include:

```txt
Courses
Lessons
Students
Assignments
Quizzes
Grades
Certificates
Payments
Notifications
```

This system has many modules, but they are tightly related.

A modular monolith can be a strong fit.

---

## Architect Questions

An architect would ask:

```txt
Are the features tightly connected?

Do courses, quizzes, grades, and certificates share workflows?

Will independent deployment actually help?

Is the team large enough to manage many services?

Can a single database simplify reporting?

Do we expect extreme scaling differences between modules?

Can we keep modules separated internally?
```

---

## Monolith Diagram

```mermaid
flowchart TD
    STUDENT[Student]

    INSTRUCTOR[Instructor]

    ADMIN[Admin]

    APP[Learning Platform Monolith]

    COURSE[Course Module]
    LESSON[Lesson Module]
    QUIZ[Quiz Module]
    ASSIGNMENT[Assignment Module]
    GRADE[Grade Module]
    CERT[Certificate Module]
    PAYMENT[Payment Module]
    NOTIFY[Notification Module]

    DB[(Learning Database)]

    STUDENT --> APP
    INSTRUCTOR --> APP
    ADMIN --> APP

    APP --> COURSE
    APP --> LESSON
    APP --> QUIZ
    APP --> ASSIGNMENT
    APP --> GRADE
    APP --> CERT
    APP --> PAYMENT
    APP --> NOTIFY

    COURSE --> DB
    LESSON --> DB
    QUIZ --> DB
    ASSIGNMENT --> DB
    GRADE --> DB
    CERT --> DB
    PAYMENT --> DB
    NOTIFY --> DB
```

---

## Runtime Flow: Complete Course

```mermaid
sequenceDiagram
    participant Student as Student
    participant App as LMS Monolith
    participant Course as Course Module
    participant Grade as Grade Module
    participant Cert as Certificate Module
    participant Notify as Notification Module

    Student->>App: completeCourse(courseId)

    App->>Course: verifyCourseCompletion(student, course)
    Course-->>App: completed

    App->>Grade: calculateFinalGrade(student, course)
    Grade-->>App: passing grade

    App->>Cert: generateCertificate(student, course)
    Cert-->>App: certificate created

    App->>Notify: sendCompletionEmail(student)
    Notify-->>App: email sent

    App-->>Student: course completed
```

---

## Architectural Meaning

This is a good monolith candidate because the workflows are closely connected.

Splitting too early could create unnecessary distributed complexity.

---

# 9. Monolith vs Modular Monolith

## Traditional Unstructured Monolith

```mermaid
flowchart TD
    APP[Application]

    MIXED[Mixed Logic]

    DB[(Database)]

    APP --> MIXED
    MIXED --> DB

    MIXED --> A[UI Logic]
    MIXED --> B[Business Logic]
    MIXED --> C[Data Access]
    MIXED --> D[Integrations]
    MIXED --> E[Validation]
```

This is bad.

Everything is mixed.

---

## Modular Monolith

```mermaid
flowchart TD
    APP[Application]

    MODULE_A[Module A]
    MODULE_B[Module B]
    MODULE_C[Module C]

    DB[(Database)]

    APP --> MODULE_A
    APP --> MODULE_B
    APP --> MODULE_C

    MODULE_A --> DB
    MODULE_B --> DB
    MODULE_C --> DB
```

This is better.

The deployment is still one unit, but the internal boundaries are clear.

---

## Main Difference

| Type                  | Meaning                                                   |
| --------------------- | --------------------------------------------------------- |
| Unstructured Monolith | One deployable unit with tangled internal code            |
| Modular Monolith      | One deployable unit with clear internal module boundaries |

The second one is usually the smart starting point.

---

# 10. Monolith vs Microservices

## Monolith

```mermaid
flowchart LR
    CLIENT[Client]

    APP[One Application]

    DB[(Database)]

    CLIENT --> APP
    APP --> DB
```

## Microservices

```mermaid
flowchart TD
    CLIENT[Client]

    API[API Gateway]

    USER[User Service]
    ORDER[Order Service]
    PAYMENT[Payment Service]
    INVENTORY[Inventory Service]

    USER_DB[(User DB)]
    ORDER_DB[(Order DB)]
    PAYMENT_DB[(Payment DB)]
    INVENTORY_DB[(Inventory DB)]

    CLIENT --> API

    API --> USER
    API --> ORDER
    API --> PAYMENT
    API --> INVENTORY

    USER --> USER_DB
    ORDER --> ORDER_DB
    PAYMENT --> PAYMENT_DB
    INVENTORY --> INVENTORY_DB
```

## Main Difference

| Architecture  | Main Idea                              |
| ------------- | -------------------------------------- |
| Monolith      | One deployable application             |
| Microservices | Many independently deployable services |

---

# 11. Tradeoff: Monolith vs Microservices

| Question               | Monolith                             | Microservices                                             |
| ---------------------- | ------------------------------------ | --------------------------------------------------------- |
| Deployment             | One deployment                       | Many deployments                                          |
| Local development      | Easier                               | Harder                                                    |
| Transactions           | Simpler                              | Harder                                                    |
| Debugging              | Easier at first                      | Harder without tooling                                    |
| Scaling                | Whole app scales together            | Services can scale independently                          |
| Team autonomy          | Lower                                | Higher if teams are mature                                |
| Operational complexity | Lower                                | Higher                                                    |
| Failure isolation      | Lower                                | Higher if designed well                                   |
| Network complexity     | Low                                  | High                                                      |
| Best for               | Early/simple/tightly coupled systems | Large systems with clear boundaries and mature operations |

Blunt truth:

```txt
Most teams should not start with microservices unless they have a real reason.
```

A modular monolith is often the better first architecture.

---

# 12. Monolith Strengths

```txt
Simple deployment.

Simple local development.

Easy debugging.

Easy transaction management.

No network latency between internal modules.

Lower infrastructure cost.

Lower DevOps burden.

Good for small teams.

Good for early-stage products.

Good when business rules are still changing.
```

---

# 13. Monolith Weaknesses

```txt
Can become tightly coupled.

Large codebase can slow development.

One deployment can affect the whole system.

One bug can take down the whole app.

Scaling is coarse-grained.

Build/test times can become long.

Poor boundaries make future extraction difficult.

Shared database can become a coupling trap.
```

The monolith does not automatically fail.

It fails when boundaries are ignored.

---

# 14. Clean Monolith Internal Design

A monolith should still have layers and modules.

```mermaid
flowchart TD
    API[API / Controller Layer]

    APP[Application Services / Use Cases]

    DOMAIN[Domain Modules]

    INFRA[Infrastructure]

    DB[(Database)]
    EXT[External Services]

    API --> APP
    APP --> DOMAIN
    APP --> INFRA
    INFRA --> DB
    INFRA --> EXT
```

## Meaning

```txt
API layer handles requests.
Application layer coordinates use cases.
Domain modules contain business rules.
Infrastructure handles database and external systems.
```

Do not dump everything into controllers.

That is how monoliths rot.

---

# 15. Module Boundary Design

A good monolith should have explicit boundaries.

```mermaid
flowchart TD
    ORDERS[Orders Module]

    PAYMENTS[Payments Module]

    INVENTORY[Inventory Module]

    ORDERS_API[Orders Public API]
    PAYMENTS_API[Payments Public API]
    INVENTORY_API[Inventory Public API]

    ORDERS_INTERNAL[Orders Internal Logic]
    PAYMENTS_INTERNAL[Payments Internal Logic]
    INVENTORY_INTERNAL[Inventory Internal Logic]

    ORDERS --> ORDERS_API
    ORDERS --> ORDERS_INTERNAL

    PAYMENTS --> PAYMENTS_API
    PAYMENTS --> PAYMENTS_INTERNAL

    INVENTORY --> INVENTORY_API
    INVENTORY --> INVENTORY_INTERNAL

    ORDERS_API --> PAYMENTS_API
    ORDERS_API --> INVENTORY_API
```

## Rule

Modules should not reach into each other’s internals.

They should communicate through public interfaces.

Bad:

```txt
Orders module directly modifies payment tables.
```

Better:

```txt
Orders module calls Payment module public operation.
```

---

# 16. Shared Database Risk

Many monoliths use one database.

That is normal.

But the risk is table ownership becoming unclear.

## Bad Shared Database

```mermaid
flowchart TD
    ORDERS[Orders Module]
    PAYMENTS[Payments Module]
    SHIPPING[Shipping Module]

    ORDERS_TABLE[(orders table)]
    PAYMENT_TABLE[(payments table)]
    SHIPPING_TABLE[(shipping table)]

    ORDERS --> ORDERS_TABLE
    ORDERS --> PAYMENT_TABLE
    ORDERS --> SHIPPING_TABLE

    PAYMENTS --> ORDERS_TABLE
    PAYMENTS --> PAYMENT_TABLE

    SHIPPING --> ORDERS_TABLE
    SHIPPING --> SHIPPING_TABLE
```

Problem:

```txt
Every module reads and writes every table.
No ownership.
Changes become dangerous.
```

---

## Better Shared Database Discipline

```mermaid
flowchart TD
    ORDERS[Orders Module]
    PAYMENTS[Payments Module]
    SHIPPING[Shipping Module]

    ORDERS_TABLE[(orders tables)]
    PAYMENT_TABLE[(payment tables)]
    SHIPPING_TABLE[(shipping tables)]

    ORDERS --> ORDERS_TABLE
    PAYMENTS --> PAYMENT_TABLE
    SHIPPING --> SHIPPING_TABLE

    ORDERS --> PAYMENTS_API[Payment Module API]
    ORDERS --> SHIPPING_API[Shipping Module API]
```

Each module owns its tables.

Other modules ask through module APIs or application services.

---

# 17. When to Use a Monolith

Use a monolith when:

```txt
The team is small.

The product is early.

Requirements are changing quickly.

You need fast development speed.

The system does not require independent scaling per feature.

The domain boundaries are not clear yet.

Operational simplicity matters.

The features are tightly connected.

You want simpler transactions and debugging.
```

---

# 18. When Not to Use a Monolith

Avoid a monolith when:

```txt
Different parts need very different scaling.

Different teams need independent deployment.

The system is already too large for one deployable unit.

Failures must be isolated by service boundary.

Regulatory or security boundaries require isolation.

Build and deployment times are blocking the organization.

Clear domain boundaries already exist and are stable.

You have mature DevOps, observability, and service ownership.
```

Do not jump to microservices just because the monolith is messy.

A messy monolith often becomes messy microservices.

Fix the boundaries first.

---

# 19. Common Smell That Suggests Monolith Is Still Fine

A monolith is probably fine when:

```txt
The app is mostly one business product.

The same team owns most features.

Most workflows touch many parts of the system.

The database transactions are important.

The traffic is not extreme.

The team does not yet have clear service boundaries.
```

In this case, a modular monolith is usually the best move.

---

# 20. Common Smell That Suggests Monolith Is Becoming a Problem

A monolith may be outgrowing itself when:

```txt
Every small change requires a full risky deployment.

Teams constantly block each other.

Build and test times are painful.

One module causes outages for unrelated modules.

Scaling one hot feature requires scaling the whole app.

Boundaries are clear, but deployment is still forced together.

The database is the main coupling point.
```

That is when service extraction may become reasonable.

---

# 21. Migration Path: Monolith to Services

Do not split randomly.

Split by stable business capability.

```mermaid
flowchart LR
    MONOLITH[Modular Monolith]

    BOUNDARY[Identify Stable Module Boundary]

    API[Create Public Module API]

    EVENTS[Introduce Events / Integration Boundary]

    SERVICE[Extract Service]

    MONOLITH --> BOUNDARY
    BOUNDARY --> API
    API --> EVENTS
    EVENTS --> SERVICE
```

## Sensible Extraction Order

```txt
1. Clean internal module boundaries.
2. Stop cross-module database writes.
3. Define public module interfaces.
4. Add integration events where useful.
5. Extract one module only when there is a real reason.
6. Keep the rest monolithic until extraction is justified.
```

Bad migration:

```txt
Split database and services before understanding boundaries.
```

That just creates a distributed mess.

---

# 22. Monolith vs Distributed Monolith

## Distributed Monolith

A distributed monolith is the worst of both worlds.

```mermaid
flowchart TD
    SERVICE_A[Service A]
    SERVICE_B[Service B]
    SERVICE_C[Service C]

    DB[(Shared Database)]

    SERVICE_A --> SERVICE_B
    SERVICE_B --> SERVICE_C
    SERVICE_C --> SERVICE_A

    SERVICE_A --> DB
    SERVICE_B --> DB
    SERVICE_C --> DB

    PROBLEM[Problem: services are separate deployables but tightly coupled]

    SERVICE_C --> PROBLEM
```

## Why It Is Bad

```txt
Many deployments.
Network calls.
Shared database coupling.
No real team independence.
No real failure isolation.
Harder debugging.
Harder transactions.
```

This is worse than a monolith.

A clean monolith is better than fake microservices.

---

# 23. Implementation Shape Without Code

## Step 1: Start With One Deployable App

```mermaid
flowchart TD
    APP[Single Deployable Application]

    DB[(Database)]

    APP --> DB
```

Keep deployment simple at first.

---

## Step 2: Split Internally by Module

```mermaid
flowchart TD
    APP[Application]

    M1[Module A]
    M2[Module B]
    M3[Module C]

    APP --> M1
    APP --> M2
    APP --> M3
```

Modules should map to business capabilities.

---

## Step 3: Define Dependency Rules

```mermaid
flowchart TD
    API[API Layer]

    USECASE[Application / Use Case Layer]

    DOMAIN[Domain Modules]

    INFRA[Infrastructure]

    API --> USECASE
    USECASE --> DOMAIN
    USECASE --> INFRA
```

Dependencies should not be random.

---

## Step 4: Protect Module Internals

```mermaid
flowchart TD
    MODULE[Module]

    PUBLIC[Public Interface]

    INTERNAL[Internal Implementation]

    MODULE --> PUBLIC
    MODULE --> INTERNAL

    OTHER[Other Module]

    OTHER --> PUBLIC
    OTHER -. should not access .-> INTERNAL
```

Other modules should not bypass the public interface.

---

## Step 5: Extract Later Only If Needed

```mermaid
flowchart TD
    MONOLITH[Modular Monolith]

    MODULE[Stable Module]

    REASON[Real Extraction Reason]

    SERVICE[Independent Service]

    MONOLITH --> MODULE
    MODULE --> REASON
    REASON --> SERVICE
```

Valid extraction reasons:

```txt
Independent scaling
Independent deployment
Security isolation
Team ownership
Performance isolation
Clear business boundary
```

---

# 24. Simple Architecture Summary

| Concept              | Meaning                                                     |
| -------------------- | ----------------------------------------------------------- |
| Monolith             | One deployable application                                  |
| Modular Monolith     | One deployable application with clear internal modules      |
| Big Ball of Mud      | Unstructured monolith with tangled dependencies             |
| Shared Database      | One database used by the app, risky if ownership is unclear |
| Module Boundary      | Rule that controls how modules interact                     |
| Service Extraction   | Moving a module into its own deployable service             |
| Distributed Monolith | Multiple services that are still tightly coupled            |

---

# 25. Best Visual Summary

```mermaid
flowchart LR
    CLIENT[Client]

    MONOLITH[One Deployable Application]

    MODULES[Clear Internal Modules]

    DATABASE[(Database)]

    CLIENT --> MONOLITH
    MONOLITH --> MODULES
    MONOLITH --> DATABASE
```

## Final Meaning

A monolith is not automatically bad.

A messy monolith is bad.

A modular monolith is often the best starting architecture because it gives you simple deployment while still preserving clean internal boundaries.

Use microservices later only when the business, team, scale, or operational needs justify the extra complexity.
