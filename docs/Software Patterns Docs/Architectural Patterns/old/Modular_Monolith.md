# Modular Monolith Architecture Using Diagrams

## Core Idea

A **Modular Monolith** is an architectural style where the system is deployed as **one application**, but the code is organized into **clear, independent modules**.

In simple words:

```txt
One deployable application.

Multiple internal modules.

Each module has clear ownership.

Modules communicate through defined interfaces.

Modules do not freely reach into each other’s internals.
```

A modular monolith gives you some benefits of microservices without immediately paying the full cost of distributed systems.

---

# 1. Modular Monolith: General Structure

```mermaid
flowchart TD
    CLIENT[Client / User]

    APP[Single Deployable Application]

    API[API / Controller Layer]

    AUTH[Auth Module]
    CATALOG[Catalog Module]
    ORDERS[Orders Module]
    PAYMENTS[Payments Module]
    NOTIFICATIONS[Notifications Module]

    DB[(Database)]

    CLIENT --> APP
    APP --> API

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
```

## What This Means

The system is still one application.

But internally, the application is split into business modules.

Each module should have:

```txt
Its own use cases
Its own business rules
Its own internal services
Its own data access logic
Its own public interface
```

The goal is not just folders.

The goal is **controlled coupling**.

---

# 2. Simple Mental Model

Think of a modular monolith like one company building with separate departments.

```txt
One building.

Inside:
- Sales
- Finance
- Support
- Engineering
- HR
```

Each department has its own responsibilities.

Good version:

```txt
Departments communicate through clear processes.
```

Bad version:

```txt
Everyone walks into everyone else's office and changes their documents.
```

That is the difference between a modular monolith and a messy monolith.

---

# 3. Problem Modular Monolith Solves

A normal monolith often starts simple.

Then over time:

```txt
Controllers become huge.
Business rules spread everywhere.
Modules directly query each other's tables.
Shared utilities become dumping grounds.
Tests become slow.
Changes in one area break another area.
```

The system becomes a **big ball of mud**.

A modular monolith solves this by enforcing internal boundaries before the system becomes too tangled.

---

# 4. Bad Monolith vs Modular Monolith

## Bad Monolith

```mermaid
flowchart TD
    UI[UI / Controllers]

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
    EMAIL --> ORDER
    ORDER --> DB
    PAYMENT --> DB
    INVENTORY --> DB
    AUTH --> DB
    EMAIL --> DB

    PROBLEM[Problem: everything depends on everything]

    INVENTORY --> PROBLEM
```

## Problem

```txt
No clear ownership.

No clear dependency direction.

No stable module APIs.

No table ownership.

Business rules are duplicated.

Any change can break unrelated features.
```

---

## Modular Monolith

```mermaid
flowchart TD
    API[API / Controller Layer]

    ORDER_API[Orders Public API]
    PAYMENT_API[Payments Public API]
    INVENTORY_API[Inventory Public API]

    ORDER_INTERNAL[Orders Internal Logic]
    PAYMENT_INTERNAL[Payments Internal Logic]
    INVENTORY_INTERNAL[Inventory Internal Logic]

    ORDER_DB[(Order Tables)]
    PAYMENT_DB[(Payment Tables)]
    INVENTORY_DB[(Inventory Tables)]

    API --> ORDER_API
    API --> PAYMENT_API
    API --> INVENTORY_API

    ORDER_API --> ORDER_INTERNAL
    PAYMENT_API --> PAYMENT_INTERNAL
    INVENTORY_API --> INVENTORY_INTERNAL

    ORDER_INTERNAL --> ORDER_DB
    PAYMENT_INTERNAL --> PAYMENT_DB
    INVENTORY_INTERNAL --> INVENTORY_DB

    ORDER_INTERNAL --> PAYMENT_API
    ORDER_INTERNAL --> INVENTORY_API
```

## Improvement

```txt
Each module owns its internal logic.

Other modules call public APIs.

Modules do not directly modify each other's tables.

The application is still deployed as one unit.
```

---

# 5. Example 1: E-Commerce Modular Monolith

## Problem

An e-commerce platform has several business capabilities:

```txt
Account management
Product catalog
Cart
Orders
Payments
Inventory
Shipping
Notifications
Admin dashboard
```

A messy monolith would let every feature call every other feature directly.

A modular monolith separates each business capability into a module.

---

## Architect Questions

An architect would ask:

```txt
What are the main business capabilities?

Which module owns which data?

Which module owns which business rules?

What public operations should each module expose?

Which internals must be hidden?

Can this remain one deployable app for now?

Which modules might later become services?

Are we preventing direct cross-module database access?

Are module boundaries based on business meaning or technical layers only?
```

---

## Modular Monolith Diagram

```mermaid
flowchart TD
    CUSTOMER[Customer]
    ADMIN[Admin]

    APP[E-Commerce Modular Monolith]

    API[API Layer]

    ACCOUNT[Account Module]
    CATALOG[Catalog Module]
    CART[Cart Module]
    ORDER[Order Module]
    PAYMENT[Payment Module]
    INVENTORY[Inventory Module]
    SHIPPING[Shipping Module]
    NOTIFY[Notification Module]

    DB[(Database)]

    CUSTOMER --> APP
    ADMIN --> APP

    APP --> API

    API --> ACCOUNT
    API --> CATALOG
    API --> CART
    API --> ORDER
    API --> PAYMENT
    API --> INVENTORY
    API --> SHIPPING
    API --> NOTIFY

    ACCOUNT --> DB
    CATALOG --> DB
    CART --> DB
    ORDER --> DB
    PAYMENT --> DB
    INVENTORY --> DB
    SHIPPING --> DB
    NOTIFY --> DB
```

---

## Runtime Flow: Place Order

```mermaid
sequenceDiagram
    participant API as API Layer
    participant Orders as Orders Module
    participant Inventory as Inventory Module
    participant Payments as Payments Module
    participant Shipping as Shipping Module
    participant Notify as Notification Module

    API->>Orders: placeOrder(command)

    Orders->>Inventory: reserveItems(orderItems)
    Inventory-->>Orders: reservation confirmed

    Orders->>Payments: authorizePayment(paymentRequest)
    Payments-->>Orders: payment authorized

    Orders->>Orders: create order

    Orders->>Shipping: createShipment(orderId)
    Shipping-->>Orders: shipment created

    Orders->>Notify: sendOrderConfirmation(orderId)
    Notify-->>Orders: confirmation queued

    Orders-->>API: order result
```

---

## Architectural Meaning

The API layer does not manually coordinate every subsystem.

The Orders module owns the order use case.

The Orders module can call public APIs from Inventory, Payments, Shipping, and Notifications.

But it should not directly modify their internal data.

Bad:

```txt
Orders module updates payment tables directly.
```

Better:

```txt
Orders module calls Payments.authorizePayment().
```

---

# 6. Example 2: Hospital Management Modular Monolith

## Problem

A hospital system has many connected capabilities:

```txt
Patient records
Appointments
Doctors
Billing
Insurance claims
Prescriptions
Lab results
Notifications
```

These features are related, but they have different business rules.

A modular monolith can keep the system deployable as one app while still enforcing boundaries.

---

## Architect Questions

An architect would ask:

```txt
Which module owns patient identity?

Which module owns appointment scheduling?

Which module owns billing rules?

Can billing read appointment data through a public interface?

Can lab results be updated without affecting appointments?

Are there compliance boundaries around patient records?

Which module operations need audit logging?

Would microservices add value now, or just complexity?
```

---

## Modular Monolith Diagram

```mermaid
flowchart TD
    STAFF[Hospital Staff]
    PATIENT[Patient]

    APP[Hospital Management Modular Monolith]

    API[API Layer]

    PATIENTS[Patient Records Module]
    APPOINTMENTS[Appointments Module]
    DOCTORS[Doctors Module]
    BILLING[Billing Module]
    INSURANCE[Insurance Module]
    PRESCRIPTIONS[Prescriptions Module]
    LABS[Lab Results Module]
    NOTIFY[Notification Module]

    DB[(Hospital Database)]

    STAFF --> APP
    PATIENT --> APP
    APP --> API

    API --> PATIENTS
    API --> APPOINTMENTS
    API --> DOCTORS
    API --> BILLING
    API --> INSURANCE
    API --> PRESCRIPTIONS
    API --> LABS
    API --> NOTIFY

    PATIENTS --> DB
    APPOINTMENTS --> DB
    DOCTORS --> DB
    BILLING --> DB
    INSURANCE --> DB
    PRESCRIPTIONS --> DB
    LABS --> DB
    NOTIFY --> DB
```

---

## Runtime Flow: Schedule Appointment

```mermaid
sequenceDiagram
    participant API as API Layer
    participant Appointments as Appointments Module
    participant Patients as Patient Records Module
    participant Doctors as Doctors Module
    participant Notify as Notification Module

    API->>Appointments: scheduleAppointment(patientId, doctorId, time)

    Appointments->>Patients: verifyPatient(patientId)
    Patients-->>Appointments: patient valid

    Appointments->>Doctors: checkAvailability(doctorId, time)
    Doctors-->>Appointments: available

    Appointments->>Appointments: create appointment

    Appointments->>Notify: sendAppointmentConfirmation(patientId)
    Notify-->>Appointments: notification queued

    Appointments-->>API: appointment scheduled
```

---

## Architectural Meaning

Appointments owns the scheduling workflow.

Patients owns patient data.

Doctors owns provider availability.

Notifications owns message delivery.

The modules cooperate through public operations, not by reaching into each other's internals.

---

# 7. Example 3: Banking Modular Monolith

## Problem

A banking application has capabilities like:

```txt
Customer profiles
Accounts
Transactions
Cards
Loans
Fraud checks
Statements
Notifications
```

A bank may eventually split some parts into services, but starting as a modular monolith may be safer if the team needs strong consistency and simple transactions.

---

## Architect Questions

An architect would ask:

```txt
Which module owns account balances?

Which module owns transaction rules?

Which operations must be strongly consistent?

Should fraud checks be synchronous or asynchronous?

Can notifications be event-driven inside the monolith?

Which modules are security-sensitive?

Which modules might later require independent scaling?

What database tables belong to each module?
```

---

## Modular Monolith Diagram

```mermaid
flowchart TD
    CUSTOMER[Customer]

    APP[Banking Modular Monolith]

    API[API Layer]

    CUSTOMER_MOD[Customer Module]
    ACCOUNT[Account Module]
    TRANSACTION[Transaction Module]
    CARD[Card Module]
    LOAN[Loan Module]
    FRAUD[Fraud Module]
    STATEMENT[Statement Module]
    NOTIFY[Notification Module]

    DB[(Banking Database)]

    CUSTOMER --> APP
    APP --> API

    API --> CUSTOMER_MOD
    API --> ACCOUNT
    API --> TRANSACTION
    API --> CARD
    API --> LOAN
    API --> FRAUD
    API --> STATEMENT
    API --> NOTIFY

    CUSTOMER_MOD --> DB
    ACCOUNT --> DB
    TRANSACTION --> DB
    CARD --> DB
    LOAN --> DB
    FRAUD --> DB
    STATEMENT --> DB
    NOTIFY --> DB
```

---

## Runtime Flow: Transfer Money

```mermaid
sequenceDiagram
    participant API as API Layer
    participant Tx as Transaction Module
    participant Account as Account Module
    participant Fraud as Fraud Module
    participant Notify as Notification Module

    API->>Tx: transferMoney(fromAccount, toAccount, amount)

    Tx->>Account: verifyAccounts(fromAccount, toAccount)
    Account-->>Tx: accounts valid

    Tx->>Fraud: evaluateTransferRisk(transfer)
    Fraud-->>Tx: approved

    Tx->>Account: debit(fromAccount, amount)
    Account-->>Tx: debited

    Tx->>Account: credit(toAccount, amount)
    Account-->>Tx: credited

    Tx->>Tx: record transaction

    Tx->>Notify: sendTransferNotification(customerId)
    Notify-->>Tx: notification queued

    Tx-->>API: transfer complete
```

---

## Architectural Meaning

The Transaction module owns the transfer workflow.

The Account module owns account operations.

The Fraud module owns risk evaluation.

The Notification module owns messaging.

This keeps responsibilities separated even though the app is deployed as one unit.

---

# 8. Internal Module Structure

A module should not be just a random folder.

A strong module usually has internal layers.

```mermaid
flowchart TD
    MODULE[Module]

    PUBLIC[Public Interface / Module API]

    APP_SERVICE[Application Services / Use Cases]

    DOMAIN[Domain Model / Business Rules]

    REPO[Repository / Data Access]

    INTERNAL[Internal Helpers]

    MODULE --> PUBLIC
    PUBLIC --> APP_SERVICE
    APP_SERVICE --> DOMAIN
    APP_SERVICE --> REPO
    APP_SERVICE --> INTERNAL
```

## Meaning

```txt
Public Interface:
What other modules are allowed to call.

Application Services:
Use cases and orchestration inside the module.

Domain:
Business rules, entities, value objects.

Repository:
Data access owned by this module.

Internal Helpers:
Private implementation details.
```

The important rule:

```txt
Other modules should call the public interface only.
```

---

# 9. Module Communication Rules

## Bad Communication

```mermaid
flowchart TD
    ORDERS[Orders Module]

    PAYMENT_INTERNAL[Payments Internal Logic]

    PAYMENT_TABLE[(Payment Tables)]

    ORDERS --> PAYMENT_INTERNAL
    ORDERS --> PAYMENT_TABLE

    PROBLEM[Problem: Orders bypasses Payment module boundary]

    PAYMENT_TABLE --> PROBLEM
```

This creates tight coupling.

If Payments changes internally, Orders breaks.

---

## Good Communication

```mermaid
flowchart TD
    ORDERS[Orders Module]

    PAYMENT_API[Payments Public API]

    PAYMENTS[Payments Module]

    PAYMENT_TABLE[(Payment Tables)]

    ORDERS --> PAYMENT_API
    PAYMENT_API --> PAYMENTS
    PAYMENTS --> PAYMENT_TABLE
```

Orders asks Payments to do payment work.

Payments owns its own data and rules.

---

# 10. Shared Database in Modular Monolith

A modular monolith can use one physical database.

That is okay.

The issue is not one database.

The issue is no ownership.

## Better Database Ownership

```mermaid
flowchart TD
    DB[(Single Physical Database)]

    ORDER_SCHEMA[Orders Schema / Tables]
    PAYMENT_SCHEMA[Payments Schema / Tables]
    INVENTORY_SCHEMA[Inventory Schema / Tables]

    ORDERS[Orders Module]
    PAYMENTS[Payments Module]
    INVENTORY[Inventory Module]

    DB --> ORDER_SCHEMA
    DB --> PAYMENT_SCHEMA
    DB --> INVENTORY_SCHEMA

    ORDERS --> ORDER_SCHEMA
    PAYMENTS --> PAYMENT_SCHEMA
    INVENTORY --> INVENTORY_SCHEMA
```

## Rule

```txt
One physical database is fine.

But each module should own its own tables or schema.

Other modules should not directly write those tables.
```

Bad:

```txt
Inventory directly updates order_status.
```

Better:

```txt
Inventory emits reservation result or calls Orders public API.
```

---

# 11. Synchronous vs Event-Based Communication

Inside a modular monolith, modules can communicate synchronously or through internal events.

## Synchronous Module Call

```mermaid
sequenceDiagram
    participant Orders as Orders Module
    participant Inventory as Inventory Module

    Orders->>Inventory: reserveItems(orderItems)
    Inventory-->>Orders: reservation result
```

Good for:

```txt
Immediate decisions
Validation
Required workflow steps
Strong consistency
```

---

## Internal Event

```mermaid
sequenceDiagram
    participant Orders as Orders Module
    participant Bus as Internal Event Bus
    participant Notify as Notification Module
    participant Analytics as Analytics Module

    Orders->>Bus: OrderPlaced event
    Bus->>Notify: OrderPlaced event
    Bus->>Analytics: OrderPlaced event
```

Good for:

```txt
Notifications
Analytics
Audit logs
Secondary workflows
Loose coupling
```

---

## Architect Judgment

Do not turn everything into events.

Use direct calls when the caller needs an immediate answer.

Use events when other modules need to react but the main workflow should not depend on them.

---

# 12. Modular Monolith vs Regular Monolith

## Regular Monolith

```mermaid
flowchart TD
    APP[Application]

    MIXED[Mixed Code]

    DB[(Database)]

    APP --> MIXED
    MIXED --> DB
```

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

## Main Difference

| Architecture     | Meaning                                              |
| ---------------- | ---------------------------------------------------- |
| Regular Monolith | One deployable app, often with weak boundaries       |
| Modular Monolith | One deployable app with explicit internal boundaries |

A modular monolith is not just a monolith with folders.

It needs rules.

---

# 13. Modular Monolith vs Microservices

## Modular Monolith

```mermaid
flowchart LR
    CLIENT[Client]

    APP[One Deployable Application]

    MODULES[Internal Modules]

    DB[(Database)]

    CLIENT --> APP
    APP --> MODULES
    APP --> DB
```

## Microservices

```mermaid
flowchart TD
    CLIENT[Client]

    API[API Gateway]

    ORDER_SERVICE[Order Service]
    PAYMENT_SERVICE[Payment Service]
    INVENTORY_SERVICE[Inventory Service]

    ORDER_DB[(Order DB)]
    PAYMENT_DB[(Payment DB)]
    INVENTORY_DB[(Inventory DB)]

    CLIENT --> API

    API --> ORDER_SERVICE
    API --> PAYMENT_SERVICE
    API --> INVENTORY_SERVICE

    ORDER_SERVICE --> ORDER_DB
    PAYMENT_SERVICE --> PAYMENT_DB
    INVENTORY_SERVICE --> INVENTORY_DB
```

## Main Difference

| Topic             | Modular Monolith                           | Microservices                   |
| ----------------- | ------------------------------------------ | ------------------------------- |
| Deployment        | One deployable app                         | Many deployable services        |
| Communication     | In-process calls/events                    | Network calls/messages          |
| Database          | Often one physical DB with ownership rules | Usually separate DB per service |
| Operations        | Simpler                                    | More complex                    |
| Scaling           | Whole app scales together                  | Services can scale separately   |
| Failure isolation | Lower                                      | Higher if designed well         |
| Transactions      | Simpler                                    | Harder                          |
| Team autonomy     | Moderate                                   | Higher with mature teams        |

Blunt truth:

```txt
A modular monolith is often the right architecture before microservices.

Microservices without strong module boundaries become a distributed monolith.
```

---

# 14. Modular Monolith vs Layered Architecture

These are not the same thing.

## Layered Architecture

Organizes by technical responsibility:

```txt
Controller layer
Service layer
Repository layer
Database layer
```

Diagram:

```mermaid
flowchart TD
    CONTROLLER[Controllers]

    SERVICE[Services]

    REPOSITORY[Repositories]

    DB[(Database)]

    CONTROLLER --> SERVICE
    SERVICE --> REPOSITORY
    REPOSITORY --> DB
```

## Modular Monolith

Organizes by business capability:

```txt
Orders module
Payments module
Inventory module
Shipping module
```

Diagram:

```mermaid
flowchart TD
    ORDERS[Orders Module]

    PAYMENTS[Payments Module]

    INVENTORY[Inventory Module]

    SHIPPING[Shipping Module]
```

## Practical Combination

A good modular monolith often uses both:

```txt
Business modules first.
Layers inside each module.
```

Diagram:

```mermaid
flowchart TD
    APP[Application]

    ORDERS[Orders Module]
    PAYMENTS[Payments Module]

    ORDERS_API[Orders API]
    ORDERS_DOMAIN[Orders Domain]
    ORDERS_REPO[Orders Repository]

    PAYMENTS_API[Payments API]
    PAYMENTS_DOMAIN[Payments Domain]
    PAYMENTS_REPO[Payments Repository]

    APP --> ORDERS
    APP --> PAYMENTS

    ORDERS --> ORDERS_API
    ORDERS --> ORDERS_DOMAIN
    ORDERS --> ORDERS_REPO

    PAYMENTS --> PAYMENTS_API
    PAYMENTS --> PAYMENTS_DOMAIN
    PAYMENTS --> PAYMENTS_REPO
```

Bad design is organizing only by technical layer:

```txt
/controllers
/services
/repositories
/models
```

That often hides business boundaries.

Better:

```txt
/modules/orders
/modules/payments
/modules/inventory
```

---

# 15. Modular Monolith vs Distributed Monolith

A distributed monolith is when services are separated physically but still tightly coupled logically.

## Distributed Monolith

```mermaid
flowchart TD
    ORDER_SERVICE[Order Service]
    PAYMENT_SERVICE[Payment Service]
    INVENTORY_SERVICE[Inventory Service]

    SHARED_DB[(Shared Database)]

    ORDER_SERVICE --> PAYMENT_SERVICE
    PAYMENT_SERVICE --> INVENTORY_SERVICE
    INVENTORY_SERVICE --> ORDER_SERVICE

    ORDER_SERVICE --> SHARED_DB
    PAYMENT_SERVICE --> SHARED_DB
    INVENTORY_SERVICE --> SHARED_DB

    PROBLEM[Problem: distributed complexity without real independence]

    SHARED_DB --> PROBLEM
```

## Why It Is Bad

```txt
Multiple deployments.

Network failures.

Shared database coupling.

No real independence.

Hard debugging.

Harder transactions.

No clean ownership.
```

A clean modular monolith is usually better than fake microservices.

---

# 16. Implementation Shape Without Code

## Step 1: Identify Business Capabilities

```mermaid
flowchart TD
    SYSTEM[System]

    SYSTEM --> CAP1[Capability A]
    SYSTEM --> CAP2[Capability B]
    SYSTEM --> CAP3[Capability C]
```

Ask:

```txt
What does the business do?
```

Not:

```txt
What technical folders do we need?
```

Good module names:

```txt
Orders
Payments
Inventory
Shipping
Accounts
Billing
Scheduling
Claims
```

Bad module names:

```txt
Helpers
Managers
Utils
Common
Services
```

Those become junk drawers.

---

## Step 2: Define Module Ownership

```mermaid
flowchart TD
    MODULE[Module]

    RULES[Business Rules]
    DATA[Owned Data]
    USECASES[Use Cases]
    EVENTS[Events]

    MODULE --> RULES
    MODULE --> DATA
    MODULE --> USECASES
    MODULE --> EVENTS
```

Each module should own something real.

If a module owns nothing, it is probably not a module.

---

## Step 3: Define Public Interfaces

```mermaid
flowchart TD
    OTHER[Other Modules]

    PUBLIC[Module Public Interface]

    INTERNAL[Module Internals]

    OTHER --> PUBLIC
    PUBLIC --> INTERNAL

    OTHER -. should not access .-> INTERNAL
```

The public interface is the contract.

Everything else is private implementation.

---

## Step 4: Protect Data Access

```mermaid
flowchart TD
    MODULE_A[Module A]

    MODULE_B_API[Module B Public API]

    MODULE_B_DB[(Module B Tables)]

    MODULE_A --> MODULE_B_API
    MODULE_A -. should not write directly .-> MODULE_B_DB
```

This is one of the most important rules.

Modules should not freely write each other’s tables.

---

## Step 5: Add Internal Events for Side Effects

```mermaid
flowchart TD
    ORDER[Orders Module]

    EVENT[OrderPlaced Event]

    NOTIFY[Notification Module]
    ANALYTICS[Analytics Module]
    AUDIT[Audit Module]

    ORDER --> EVENT

    EVENT --> NOTIFY
    EVENT --> ANALYTICS
    EVENT --> AUDIT
```

Events are good for side effects that should not clutter the core use case.

---

# 17. Rules for a Healthy Modular Monolith

```txt
Modules are based on business capabilities.

Each module owns its business rules.

Each module owns its data access.

Modules communicate through public interfaces.

Internal implementation is hidden.

Cross-module database writes are forbidden.

Shared utilities are kept small.

Events are used for secondary reactions.

Controllers stay thin.

Use cases live inside modules.

Tests can target modules independently.
```

---

# 18. Common Mistakes

## Mistake 1: Calling Folders “Modules”

Bad:

```txt
/controllers
/services
/repositories
/models
```

That is layering, not modularity.

Better:

```txt
/modules/orders
/modules/payments
/modules/inventory
/modules/shipping
```

---

## Mistake 2: Shared Database With No Ownership

Bad:

```txt
Any module can read or write any table.
```

Better:

```txt
Each module owns its own tables.

Other modules request behavior through public interfaces.
```

---

## Mistake 3: Giant Shared Module

Bad:

```txt
SharedModule:
- validation
- email
- payment helpers
- date logic
- business rules
- constants
- DTOs
- random utilities
```

That becomes a landfill.

Shared code should be boring and generic.

Business logic should stay inside business modules.

---

## Mistake 4: Overusing Events

Bad:

```txt
Everything publishes events.
Everything reacts to everything.
No one knows the actual workflow.
```

Use events where decoupling is valuable.

Do not use events to hide a workflow that should be explicit.

---

## Mistake 5: Pretending It Is Microservices

A modular monolith is not microservices.

Do not add unnecessary network boundaries inside the same app.

The benefit is that modules are separated logically, not physically.

---

# 19. When to Use Modular Monolith

Use a modular monolith when:

```txt
You want simple deployment.

You want clean internal boundaries.

The team is small or medium.

The product is still evolving.

Business boundaries are emerging but not stable enough for services.

You want to avoid distributed system complexity.

You may extract services later.

You need strong consistency across workflows.

You want better maintainability than a messy monolith.
```

---

# 20. When Not to Use Modular Monolith

Do not use it when:

```txt
Independent deployment is already required.

Different modules need radically different scaling.

Teams need hard service ownership boundaries.

Security or regulatory needs require physical isolation.

One module must fail independently from the rest.

The app is already so large that one deployable unit is blocking delivery.

You have mature service infrastructure and clear domain boundaries.
```

Even then, extract carefully.

Microservices are not magic.

---

# 21. Common Smell That Suggests Modular Monolith

Modular Monolith is a good fit when you see this:

```txt
We want microservice-like boundaries,
but we do not want microservice-level operational complexity yet.
```

Other signs:

```txt
The team is tired of tangled monolith code.

The app is not large enough to justify microservices.

The domain has clear business areas.

The same deployment pipeline is still acceptable.

Most workflows are strongly connected.

You want future service extraction to be possible.
```

---

# 22. Common Smell That Suggests Extraction Later

A module may later become a service when:

```txt
It has a clear business boundary.

It owns its data.

It already communicates through public interfaces.

It needs independent scaling.

It needs independent deployment.

It has a dedicated team.

It has different reliability or security requirements.
```

Do not extract modules that are still tangled.

You will just move the mess across the network.

---

# 23. Migration Path: Messy Monolith to Modular Monolith

```mermaid
flowchart LR
    MESS[Messy Monolith]

    IDENTIFY[Identify Business Capabilities]

    GROUP[Group Code by Module]

    PUBLIC[Define Public Module APIs]

    DATA[Assign Data Ownership]

    RULES[Enforce Dependency Rules]

    EVENTS[Add Internal Events Where Useful]

    MODULAR[Modular Monolith]

    MESS --> IDENTIFY
    IDENTIFY --> GROUP
    GROUP --> PUBLIC
    PUBLIC --> DATA
    DATA --> RULES
    RULES --> EVENTS
    EVENTS --> MODULAR
```

## Practical Steps

```txt
1. Identify business capabilities.
2. Move related code into module folders.
3. Define public operations for each module.
4. Stop direct cross-module database writes.
5. Move business rules into owning modules.
6. Replace random shared utilities with clear module-owned logic.
7. Add tests around module boundaries.
8. Use internal events for secondary reactions.
9. Extract services later only when justified.
```

---

# 24. Best Visual Summary

```mermaid
flowchart LR
    CLIENT[Client]

    APP[One Deployable Application]

    MODULE_A[Module A]
    MODULE_B[Module B]
    MODULE_C[Module C]

    PUBLIC_API[Public Module Interfaces]

    CLIENT --> APP

    APP --> PUBLIC_API

    PUBLIC_API --> MODULE_A
    PUBLIC_API --> MODULE_B
    PUBLIC_API --> MODULE_C
```

## Final Meaning

A modular monolith is not “just a monolith.”

It is a monolith with discipline.

Use it when you want clean architecture, strong boundaries, simple deployment, and the option to extract services later without creating a distributed disaster.
