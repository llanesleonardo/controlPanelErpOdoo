# Abstract Factory Pattern Using Diagrams

## Core Idea

Abstract Factory is used when the system needs to create **families of related objects** without the main application knowing the exact concrete classes.

Instead of this:

```txt
Application directly creates:
- WindowsButton
- WindowsCheckbox
- WindowsDropdown
```

The application talks to a factory:

```txt
Application asks:
- createButton()
- createCheckbox()
- createDropdown()
```

The selected factory decides which family to create.

---

# 1. Abstract Factory: General Structure

```mermaid
flowchart TD
    APP[Client Application]

    AF[Abstract Factory Interface]

    PF1[Product Interface A]
    PF2[Product Interface B]
    PF3[Product Interface C]

    CF1[Concrete Factory 1]
    CF2[Concrete Factory 2]

    P1A[Concrete Product A1]
    P1B[Concrete Product B1]
    P1C[Concrete Product C1]

    P2A[Concrete Product A2]
    P2B[Concrete Product B2]
    P2C[Concrete Product C2]

    APP --> AF

    AF --> CF1
    AF --> CF2

    CF1 --> P1A
    CF1 --> P1B
    CF1 --> P1C

    CF2 --> P2A
    CF2 --> P2B
    CF2 --> P2C

    P1A --> PF1
    P1B --> PF2
    P1C --> PF3

    P2A --> PF1
    P2B --> PF2
    P2C --> PF3
```

## What This Means

The application does **not** create concrete objects directly.

The application only knows:

```txt
Factory Interface
Product Interfaces
```

It does **not** know:

```txt
Concrete Factory
Concrete Product Classes
```

That is the whole point.

---

# 2. Example: Cross-Platform UI

## Problem

The application needs UI components for different platforms:

```txt
Windows
macOS
Linux
```

Each platform has related UI components:

```txt
Button
Checkbox
Dropdown
```

The danger is mixing incompatible UI components.

Bad situation:

```txt
Windows Button
macOS Checkbox
Linux Dropdown
```

That creates inconsistent design and behavior.

---

## Abstract Factory Diagram

```mermaid
flowchart TD
    APP[Application]

    UIF[UI Factory Interface]

    WINF[Windows UI Factory]
    MACF[Mac UI Factory]

    B[Button Interface]
    C[Checkbox Interface]
    D[Dropdown Interface]

    WB[Windows Button]
    WC[Windows Checkbox]
    WD[Windows Dropdown]

    MB[Mac Button]
    MC[Mac Checkbox]
    MD[Mac Dropdown]

    APP --> UIF

    UIF --> WINF
    UIF --> MACF

    WINF --> WB
    WINF --> WC
    WINF --> WD

    MACF --> MB
    MACF --> MC
    MACF --> MD

    WB --> B
    WC --> C
    WD --> D

    MB --> B
    MC --> C
    MD --> D
```

---

## Architect Questions

An architect would ask:

```txt
Do these UI objects belong to a family?

Can these objects be mixed safely?

Will the application support more platforms later?

Should the business logic know about Windows or macOS classes?

Can the selected platform come from configuration?

What happens if a developer accidentally mixes Windows and Mac components?
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Config as Platform Config
    participant Factory as UI Factory
    participant Button as Button
    participant Checkbox as Checkbox

    App->>Config: Read selected platform
    Config-->>App: windows

    App->>Factory: createButton()
    Factory-->>App: WindowsButton

    App->>Factory: createCheckbox()
    Factory-->>App: WindowsCheckbox

    App->>Button: render()
    App->>Checkbox: render()
```

---

## Architectural Meaning

The application does not care whether it receives:

```txt
WindowsButton
MacButton
LinuxButton
```

It only cares that the object behaves like a:

```txt
Button
```

---

# 3. Example: Payment Provider System

## Problem

A SaaS application supports multiple payment providers:

```txt
Stripe
PayPal
Square
```

Each provider has related services:

```txt
Payment Processor
Refund Processor
Subscription Manager
Invoice Generator
```

The dangerous design is mixing providers:

```txt
Stripe Payment Processor
PayPal Refund Processor
Square Subscription Manager
```

That is a serious business and data consistency problem.

---

## Abstract Factory Diagram

```mermaid
flowchart TD
    BILLING[Billing Service]

    PF[Payment Provider Factory Interface]

    STRIPEF[Stripe Factory]
    PAYPALF[PayPal Factory]

    PAYMENT[Payment Processor Interface]
    REFUND[Refund Processor Interface]
    SUB[Subscription Manager Interface]
    INVOICE[Invoice Generator Interface]

    SPAY[Stripe Payment Processor]
    SREF[Stripe Refund Processor]
    SSUB[Stripe Subscription Manager]
    SINV[Stripe Invoice Generator]

    PPAY[PayPal Payment Processor]
    PREF[PayPal Refund Processor]
    PSUB[PayPal Subscription Manager]
    PINV[PayPal Invoice Generator]

    BILLING --> PF

    PF --> STRIPEF
    PF --> PAYPALF

    STRIPEF --> SPAY
    STRIPEF --> SREF
    STRIPEF --> SSUB
    STRIPEF --> SINV

    PAYPALF --> PPAY
    PAYPALF --> PREF
    PAYPALF --> PSUB
    PAYPALF --> PINV

    SPAY --> PAYMENT
    SREF --> REFUND
    SSUB --> SUB
    SINV --> INVOICE

    PPAY --> PAYMENT
    PREF --> REFUND
    PSUB --> SUB
    PINV --> INVOICE
```

---

## Architect Questions

An architect would ask:

```txt
Does each provider have multiple related services?

Should all billing operations use the same provider family?

Can the payment provider change by tenant, country, or environment?

Should billing logic know Stripe-specific or PayPal-specific classes?

How do we prevent mixing Stripe charge logic with PayPal refund logic?

Will we add more providers later?
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant Tenant as Tenant Config
    participant Billing as Billing Service
    participant Factory as Payment Provider Factory
    participant Payment as Payment Processor
    participant Refund as Refund Processor
    participant Subscription as Subscription Manager

    Billing->>Tenant: Get provider for tenant
    Tenant-->>Billing: stripe

    Billing->>Factory: createPaymentProcessor()
    Factory-->>Billing: StripePaymentProcessor

    Billing->>Factory: createRefundProcessor()
    Factory-->>Billing: StripeRefundProcessor

    Billing->>Factory: createSubscriptionManager()
    Factory-->>Billing: StripeSubscriptionManager

    Billing->>Payment: charge(customer, amount)
    Billing->>Subscription: createSubscription(customer)
    Billing->>Refund: refund(transactionId)
```

---

## Architectural Meaning

The billing service should not be full of logic like this:

```txt
if provider is Stripe, use StripePaymentProcessor
if provider is PayPal, use PayPalRefundProcessor
if provider is Square, use SquareSubscriptionManager
```

That spreads provider-specific logic everywhere.

Instead, provider selection happens once:

```txt
Select factory
Use factory-created services
```

---

# 4. Example: Cloud Provider Abstraction

## Problem

A SaaS system may run on different cloud providers:

```txt
AWS
Azure
Google Cloud
```

Each cloud provider has related infrastructure services:

```txt
Storage
Queue
Notification
Secrets Manager
```

The dangerous design is mixing cloud implementations:

```txt
AWS S3 Storage
Azure Queue
Google Secrets Manager
```

That makes deployment hard to reason about.

---

## Abstract Factory Diagram

```mermaid
flowchart TD
    APP[Application Service]

    CF[Cloud Factory Interface]

    AWSF[AWS Cloud Factory]
    AZF[Azure Cloud Factory]

    STORAGE[Storage Interface]
    QUEUE[Queue Interface]
    NOTIFY[Notification Interface]
    SECRET[Secrets Manager Interface]

    S3[AWS S3 Storage]
    SQS[AWS SQS Queue]
    SNS[AWS SNS Notification]
    ASM[AWS Secrets Manager]

    BLOB[Azure Blob Storage]
    AZQ[Azure Queue]
    AZN[Azure Notification]
    AZS[Azure Key Vault]

    APP --> CF

    CF --> AWSF
    CF --> AZF

    AWSF --> S3
    AWSF --> SQS
    AWSF --> SNS
    AWSF --> ASM

    AZF --> BLOB
    AZF --> AZQ
    AZF --> AZN
    AZF --> AZS

    S3 --> STORAGE
    SQS --> QUEUE
    SNS --> NOTIFY
    ASM --> SECRET

    BLOB --> STORAGE
    AZQ --> QUEUE
    AZN --> NOTIFY
    AZS --> SECRET
```

---

## Architect Questions

An architect would ask:

```txt
Do cloud services need to be selected as a consistent family?

Will different deployments use different cloud providers?

Should application logic depend directly on AWS, Azure, or GCP SDKs?

Do we need local or mock implementations for testing?

How do we prevent AWS storage from being used with Azure queues?

Is cloud portability actually required, or are we overengineering?
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant App as Document Processing Service
    participant Config as Deployment Config
    participant Factory as Cloud Factory
    participant Storage as Storage Service
    participant Queue as Queue Service
    participant Notify as Notification Service

    App->>Config: Read cloud provider
    Config-->>App: aws

    App->>Factory: createStorage()
    Factory-->>App: S3Storage

    App->>Factory: createQueue()
    Factory-->>App: SQSQueue

    App->>Factory: createNotification()
    Factory-->>App: SNSNotification

    App->>Storage: upload(document)
    App->>Queue: sendMessage(process document)
    App->>Notify: publish(document uploaded)
```

---

# 5. What the Pattern Is Really Protecting You From

## Without Abstract Factory

```mermaid
flowchart TD
    APP[Application]

    APP --> A[AWS S3 Storage]
    APP --> B[Azure Queue]
    APP --> C[Google Notification]
    APP --> D[Stripe Payment]
    APP --> E[PayPal Refund]

    RISK[Risk: mixed incompatible implementations]

    A --> RISK
    B --> RISK
    C --> RISK
    D --> RISK
    E --> RISK
```

The application is directly responsible for choosing concrete classes.

That means the application can accidentally combine the wrong objects.

---

## With Abstract Factory

```mermaid
flowchart TD
    APP[Application]

    FACTORY[Selected Factory]

    FAMILY[Consistent Product Family]

    P1[Product A]
    P2[Product B]
    P3[Product C]

    APP --> FACTORY
    FACTORY --> FAMILY

    FAMILY --> P1
    FAMILY --> P2
    FAMILY --> P3
```

The factory becomes the gatekeeper.

It guarantees that related objects come from the same family.

---

# 6. Mental Model

Think of Abstract Factory like choosing a kit.

```txt
Windows UI Kit:
- Windows Button
- Windows Checkbox
- Windows Dropdown

Mac UI Kit:
- Mac Button
- Mac Checkbox
- Mac Dropdown

AWS Cloud Kit:
- S3 Storage
- SQS Queue
- SNS Notification

Azure Cloud Kit:
- Blob Storage
- Azure Queue
- Azure Notification
```

You do not pick each object manually.

You pick the kit.

The kit gives you compatible parts.

---

# 7. Implementation Shape Without Code

## Step 1: Define Product Interfaces

```mermaid
flowchart TD
    A[Product Interface A]
    B[Product Interface B]
    C[Product Interface C]
```

Example:

```txt
Button
Checkbox
Dropdown
```

---

## Step 2: Define Product Families

```mermaid
flowchart TD
    F1[Family 1]
    F2[Family 2]

    F1 --> A1[Product A1]
    F1 --> B1[Product B1]
    F1 --> C1[Product C1]

    F2 --> A2[Product A2]
    F2 --> B2[Product B2]
    F2 --> C2[Product C2]
```

Example:

```txt
Windows Family:
- Windows Button
- Windows Checkbox
- Windows Dropdown

Mac Family:
- Mac Button
- Mac Checkbox
- Mac Dropdown
```

---

## Step 3: Create Factory Interface

```mermaid
flowchart TD
    FACTORY[Factory Interface]

    FACTORY --> CREATE_A[createProductA]
    FACTORY --> CREATE_B[createProductB]
    FACTORY --> CREATE_C[createProductC]
```

Example:

```txt
UIFactory:
- createButton
- createCheckbox
- createDropdown
```

---

## Step 4: Create Concrete Factories

```mermaid
flowchart TD
    FACTORY[Factory Interface]

    F1[Concrete Factory 1]
    F2[Concrete Factory 2]

    FACTORY --> F1
    FACTORY --> F2
```

Example:

```txt
WindowsUIFactory
MacUIFactory
LinuxUIFactory
```

---

## Step 5: Client Uses Only the Factory

```mermaid
flowchart TD
    CLIENT[Client/Application]

    FACTORY[Factory Interface]

    CLIENT --> FACTORY

    FACTORY --> PRODUCT_A[Product A Interface]
    FACTORY --> PRODUCT_B[Product B Interface]
    FACTORY --> PRODUCT_C[Product C Interface]
```

The client does not know the concrete classes.

That is the main architectural win.

---

# 8. Decision Rule

Use Abstract Factory when this is true:

```txt
I need to create multiple related objects,
and the selected group must stay consistent.
```

Do not use Abstract Factory when this is true:

```txt
I only need to create one object.
```

For one object, a simple factory or dependency injection is usually enough.

---

# 9. Simple Pattern Summary

| Concept           | Meaning                                     |
| ----------------- | ------------------------------------------- |
| Product Interface | Common contract for one type of object      |
| Concrete Product  | Actual implementation                       |
| Abstract Factory  | Interface for creating a family of products |
| Concrete Factory  | Creates one specific family                 |
| Client            | Uses the factory, not concrete classes      |

---

# 10. Best Visual Summary

```mermaid
flowchart LR
    CONFIG[Configuration / Runtime Decision]

    CONFIG --> FACTORY[Choose Factory]

    FACTORY --> FAMILY[Create Compatible Family]

    FAMILY --> CLIENT[Client Uses Interfaces]

    CLIENT --> RESULT[No Direct Dependency on Concrete Classes]
```

## Final Meaning

Abstract Factory is not mainly about creating objects.

It is about controlling **which group of related objects** the system is allowed to use together.
