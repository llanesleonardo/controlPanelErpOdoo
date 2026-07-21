# Bridge Pattern Using Diagrams

## Core Idea

The **Bridge Pattern** is a structural design pattern used to separate an abstraction from its implementation so both can change independently.

That sounds abstract, so here is the practical meaning:

```txt
You have two things that can vary independently.

Instead of creating a class for every combination,
you split the design into two sides:

1. Abstraction side
2. Implementation side

Then you connect them with a bridge.
```

---

# 1. The Problem Bridge Solves

Imagine you have:

```txt
Different message types:
- Short message
- Urgent message
- Scheduled message

Different delivery channels:
- Email
- SMS
- Push notification
```

A bad design creates one class for every combination:

```txt
ShortEmailMessage
ShortSmsMessage
ShortPushMessage

UrgentEmailMessage
UrgentSmsMessage
UrgentPushMessage

ScheduledEmailMessage
ScheduledSmsMessage
ScheduledPushMessage
```

That is class explosion.

If you add one new message type, you may need several new classes.

If you add one new delivery channel, you may need several new classes.

Bridge avoids this by separating:

```txt
Message type
from
Delivery channel
```

---

# 2. Bridge Pattern: General Structure

```mermaid
flowchart TD
    CLIENT[Client]

    ABSTRACTION[Abstraction]

    REFINED_A[Refined Abstraction A]
    REFINED_B[Refined Abstraction B]

    IMPLEMENTOR[Implementation Interface]

    IMPL_A[Concrete Implementation A]
    IMPL_B[Concrete Implementation B]

    CLIENT --> ABSTRACTION

    REFINED_A --> ABSTRACTION
    REFINED_B --> ABSTRACTION

    ABSTRACTION --> IMPLEMENTOR

    IMPL_A --> IMPLEMENTOR
    IMPL_B --> IMPLEMENTOR
```

## What This Means

The abstraction does not directly implement the low-level behavior.

Instead, it delegates to an implementation interface.

That gives you two independent dimensions:

```txt
Abstraction hierarchy
Implementation hierarchy
```

---

# 3. Simple Mental Model

Think of Bridge like a remote control and a device.

```txt
Remote controls:
- Basic remote
- Advanced remote
- Voice remote

Devices:
- TV
- Radio
- Projector
```

Without Bridge, you might create:

```txt
BasicTVRemote
BasicRadioRemote
BasicProjectorRemote

AdvancedTVRemote
AdvancedRadioRemote
AdvancedProjectorRemote

VoiceTVRemote
VoiceRadioRemote
VoiceProjectorRemote
```

With Bridge:

```txt
Remote controls vary independently.

Devices vary independently.

A remote has a device.
```

The remote is the abstraction.

The device is the implementation.

---

# 4. What Bridge Protects You From

## Without Bridge: Class Explosion

```mermaid
flowchart TD
    ROOT[Notification]

    A1[Urgent Email Notification]
    A2[Urgent SMS Notification]
    A3[Urgent Push Notification]

    B1[Scheduled Email Notification]
    B2[Scheduled SMS Notification]
    B3[Scheduled Push Notification]

    C1[Marketing Email Notification]
    C2[Marketing SMS Notification]
    C3[Marketing Push Notification]

    ROOT --> A1
    ROOT --> A2
    ROOT --> A3
    ROOT --> B1
    ROOT --> B2
    ROOT --> B3
    ROOT --> C1
    ROOT --> C2
    ROOT --> C3

    PROBLEM[Problem: combinations multiply quickly]

    A3 --> PROBLEM
    B3 --> PROBLEM
    C3 --> PROBLEM
```

The design becomes harder to extend because every new variation multiplies the number of classes.

---

## With Bridge: Separate the Dimensions

```mermaid
flowchart TD
    CLIENT[Client]

    MESSAGE[Message Abstraction]

    URGENT[Urgent Message]
    SCHEDULED[Scheduled Message]
    MARKETING[Marketing Message]

    CHANNEL[Delivery Channel Interface]

    EMAIL[Email Channel]
    SMS[SMS Channel]
    PUSH[Push Channel]

    CLIENT --> MESSAGE

    URGENT --> MESSAGE
    SCHEDULED --> MESSAGE
    MARKETING --> MESSAGE

    MESSAGE --> CHANNEL

    EMAIL --> CHANNEL
    SMS --> CHANNEL
    PUSH --> CHANNEL
```

Now message types and delivery channels can grow independently.

---

# 5. Example 1: Notification Message and Delivery Channel

## Problem

A system sends different kinds of notifications:

```txt
Notification types:
- Urgent notification
- Scheduled notification
- Marketing notification
```

Through different channels:

```txt
Delivery channels:
- Email
- SMS
- Push notification
```

Without Bridge, the system creates a class for every combination.

That design gets ugly fast.

---

## Architect Questions

An architect would ask:

```txt
Do we have two independent dimensions of variation?

Can message type change separately from delivery channel?

Are we creating too many combination classes?

Will new message types be added later?

Will new delivery channels be added later?

Can the high-level workflow delegate low-level delivery details?

Should business logic avoid knowing vendor-specific channel details?

Is inheritance forcing combinations that should be composed instead?
```

---

## Bridge Diagram

```mermaid
flowchart TD
    APP[Application]

    NOTIFICATION[Notification Abstraction]

    URGENT[Urgent Notification]
    SCHEDULED[Scheduled Notification]
    MARKETING[Marketing Notification]

    CHANNEL[Delivery Channel Interface]

    EMAIL[Email Channel]
    SMS[SMS Channel]
    PUSH[Push Channel]

    APP --> NOTIFICATION

    URGENT --> NOTIFICATION
    SCHEDULED --> NOTIFICATION
    MARKETING --> NOTIFICATION

    NOTIFICATION --> CHANNEL

    EMAIL --> CHANNEL
    SMS --> CHANNEL
    PUSH --> CHANNEL
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Notification as Urgent Notification
    participant Channel as SMS Channel

    App->>Notification: send("Server is down")
    Notification->>Notification: add urgent formatting
    Notification->>Channel: deliver(formatted message)
    Channel-->>Notification: delivery result
    Notification-->>App: result
```

---

## Architectural Meaning

The urgent notification does not care whether it is sent by email, SMS, or push.

It only knows:

```txt
I format the message as urgent.
Then I ask the channel to deliver it.
```

The delivery channel handles the low-level sending details.

That is the bridge.

---

# 6. Example 2: Remote Controls and Devices

## Problem

A home automation app supports different remotes:

```txt
Remote types:
- Basic remote
- Advanced remote
- Voice remote
```

And different devices:

```txt
Devices:
- TV
- Speaker
- Projector
```

Bad design:

```txt
BasicTVRemote
AdvancedTVRemote
VoiceTVRemote

BasicSpeakerRemote
AdvancedSpeakerRemote
VoiceSpeakerRemote

BasicProjectorRemote
AdvancedProjectorRemote
VoiceProjectorRemote
```

This is not scalable.

---

## Architect Questions

An architect would ask:

```txt
Are remote features separate from device behavior?

Can we add a new device without creating new remotes?

Can we add a new remote type without modifying every device?

Does the remote need to delegate operations to a device interface?

Are we abusing inheritance to model combinations?

Would composition reduce the number of classes?
```

---

## Bridge Diagram

```mermaid
flowchart TD
    USER[User]

    REMOTE[Remote Abstraction]

    BASIC[Basic Remote]
    ADVANCED[Advanced Remote]
    VOICE[Voice Remote]

    DEVICE[Device Interface]

    TV[TV Device]
    SPEAKER[Speaker Device]
    PROJECTOR[Projector Device]

    USER --> REMOTE

    BASIC --> REMOTE
    ADVANCED --> REMOTE
    VOICE --> REMOTE

    REMOTE --> DEVICE

    TV --> DEVICE
    SPEAKER --> DEVICE
    PROJECTOR --> DEVICE
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant User as User
    participant Remote as Advanced Remote
    participant Device as Projector Device

    User->>Remote: pressPower()
    Remote->>Device: turnOn()

    User->>Remote: increaseVolume()
    Remote->>Device: setVolume(+10)

    User->>Remote: enableCinemaMode()
    Remote->>Device: applyDisplayMode("cinema")
```

---

## Architectural Meaning

The remote controls high-level behavior.

The device performs the actual hardware-specific operation.

You can pair:

```txt
Advanced Remote + TV
Advanced Remote + Speaker
Advanced Remote + Projector
```

without creating a separate class for each combination.

---

# 7. Example 3: Report Format and Rendering Engine

## Problem

A reporting application supports different report types:

```txt
Report types:
- Financial report
- Inventory report
- Compliance report
```

And different output renderers:

```txt
Renderers:
- PDF renderer
- HTML renderer
- Excel renderer
```

Bad design:

```txt
FinancialPdfReport
FinancialHtmlReport
FinancialExcelReport

InventoryPdfReport
InventoryHtmlReport
InventoryExcelReport

CompliancePdfReport
ComplianceHtmlReport
ComplianceExcelReport
```

This design grows badly as report types and formats increase.

---

## Architect Questions

An architect would ask:

```txt
Is report content separate from rendering format?

Can new report types be added independently of output formats?

Can new output formats be added without changing every report?

Should report logic avoid PDF, HTML, or Excel-specific details?

Can rendering be delegated to a renderer interface?

Are we creating one class per content-format combination?
```

---

## Bridge Diagram

```mermaid
flowchart TD
    APP[Reporting App]

    REPORT[Report Abstraction]

    FINANCIAL[Financial Report]
    INVENTORY[Inventory Report]
    COMPLIANCE[Compliance Report]

    RENDERER[Renderer Interface]

    PDF[PDF Renderer]
    HTML[HTML Renderer]
    EXCEL[Excel Renderer]

    APP --> REPORT

    FINANCIAL --> REPORT
    INVENTORY --> REPORT
    COMPLIANCE --> REPORT

    REPORT --> RENDERER

    PDF --> RENDERER
    HTML --> RENDERER
    EXCEL --> RENDERER
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant App as Reporting App
    participant Report as Financial Report
    participant Renderer as PDF Renderer

    App->>Report: generate()
    Report->>Report: collect financial data
    Report->>Report: structure report content
    Report->>Renderer: render(content)
    Renderer-->>Report: PDF file
    Report-->>App: generated report
```

---

## Architectural Meaning

The financial report owns the report-specific logic.

The renderer owns the output-format logic.

They are connected, but independent.

That means you can add:

```txt
New report type:
- Security report

New renderer:
- Markdown renderer
```

without creating a huge pile of combination classes.

---

# 8. Example 4: Drawing Tools and Rendering Backends

## Problem

A graphics editor has drawing tools:

```txt
Drawing tools:
- Pencil
- Brush
- Shape tool
```

And rendering backends:

```txt
Rendering backends:
- Canvas renderer
- SVG renderer
- WebGL renderer
```

Without Bridge, the system may create:

```txt
CanvasPencil
SvgPencil
WebGlPencil

CanvasBrush
SvgBrush
WebGlBrush

CanvasShapeTool
SvgShapeTool
WebGlShapeTool
```

That creates a combinatorial mess.

---

## Architect Questions

An architect would ask:

```txt
Are drawing tools separate from rendering technology?

Can tools be reused across different renderers?

Can renderers be swapped depending on platform or performance needs?

Should tool behavior avoid depending directly on Canvas, SVG, or WebGL calls?

Will more tools and renderers be added later?

Can rendering commands be abstracted behind a common interface?
```

---

## Bridge Diagram

```mermaid
flowchart TD
    EDITOR[Graphics Editor]

    TOOL[Drawing Tool Abstraction]

    PENCIL[Pencil Tool]
    BRUSH[Brush Tool]
    SHAPE[Shape Tool]

    RENDERER[Renderer Interface]

    CANVAS[Canvas Renderer]
    SVG[SVG Renderer]
    WEBGL[WebGL Renderer]

    EDITOR --> TOOL

    PENCIL --> TOOL
    BRUSH --> TOOL
    SHAPE --> TOOL

    TOOL --> RENDERER

    CANVAS --> RENDERER
    SVG --> RENDERER
    WEBGL --> RENDERER
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant Editor as Graphics Editor
    participant Tool as Brush Tool
    participant Renderer as SVG Renderer

    Editor->>Tool: drawStroke(points)
    Tool->>Tool: calculate brush shape
    Tool->>Renderer: drawPath(pathData, style)
    Renderer-->>Tool: rendered SVG path
```

---

## Architectural Meaning

The brush tool focuses on brush behavior.

The renderer focuses on how that behavior is drawn on a specific backend.

This lets the editor reuse the same tools across multiple rendering technologies.

---

# 9. Implementation Shape Without Code

## Step 1: Identify the Two Dimensions

Bridge starts with this question:

```txt
What are the two things changing independently?
```

Example:

```txt
Dimension 1:
- Notification type

Dimension 2:
- Delivery channel
```

Diagram:

```mermaid
flowchart TD
    SYSTEM[System]

    DIM1[Abstraction Dimension]
    DIM2[Implementation Dimension]

    SYSTEM --> DIM1
    SYSTEM --> DIM2
```

---

## Step 2: Define the Implementation Interface

The implementation side is the lower-level behavior that the abstraction delegates to.

```mermaid
flowchart TD
    IMPLEMENTOR[Implementation Interface]

    METHOD1[operation A]
    METHOD2[operation B]
    METHOD3[operation C]

    IMPLEMENTOR --> METHOD1
    IMPLEMENTOR --> METHOD2
    IMPLEMENTOR --> METHOD3
```

Example:

```txt
DeliveryChannel:
- deliver(message)
```

---

## Step 3: Create Concrete Implementations

```mermaid
flowchart TD
    IMPLEMENTOR[Delivery Channel Interface]

    EMAIL[Email Channel]
    SMS[SMS Channel]
    PUSH[Push Channel]

    EMAIL --> IMPLEMENTOR
    SMS --> IMPLEMENTOR
    PUSH --> IMPLEMENTOR
```

Each concrete implementation handles low-level behavior.

---

## Step 4: Define the Abstraction

The abstraction stores a reference to the implementation interface.

```mermaid
flowchart TD
    ABSTRACTION[Notification Abstraction]

    IMPLEMENTOR[Delivery Channel Interface]

    ABSTRACTION --> IMPLEMENTOR
```

The abstraction uses the implementation instead of hardcoding concrete classes.

---

## Step 5: Create Refined Abstractions

```mermaid
flowchart TD
    ABSTRACTION[Notification Abstraction]

    URGENT[Urgent Notification]
    SCHEDULED[Scheduled Notification]
    MARKETING[Marketing Notification]

    URGENT --> ABSTRACTION
    SCHEDULED --> ABSTRACTION
    MARKETING --> ABSTRACTION
```

Each refined abstraction adds high-level behavior.

---

## Step 6: Compose Them at Runtime

```mermaid
flowchart TD
    CONFIG[Configuration / User Choice]

    ABSTRACTION[Urgent Notification]

    IMPLEMENTATION[SMS Channel]

    OBJECT[Urgent Notification using SMS]

    CONFIG --> ABSTRACTION
    CONFIG --> IMPLEMENTATION

    ABSTRACTION --> IMPLEMENTATION
    IMPLEMENTATION --> OBJECT
```

Instead of inheritance creating every combination, composition connects the two sides.

---

# 10. Bridge vs Adapter

Bridge and Adapter both involve interfaces, but they solve different problems.

## Adapter

Adapter is usually used after the fact.

```txt
We already have an incompatible class.
We need to make it fit our expected interface.
```

```mermaid
flowchart LR
    CLIENT[Client expects Target]

    ADAPTER[Adapter]

    OLD[Existing Incompatible Class]

    CLIENT --> ADAPTER
    ADAPTER --> OLD
```

## Bridge

Bridge is usually designed upfront.

```txt
We know two dimensions will vary.
We separate them so they can evolve independently.
```

```mermaid
flowchart LR
    ABSTRACTION[Abstraction]

    IMPLEMENTATION[Implementation Interface]

    CONCRETE[Concrete Implementation]

    ABSTRACTION --> IMPLEMENTATION
    CONCRETE --> IMPLEMENTATION
```

## Main Difference

| Pattern | Main Purpose                                                    |
| ------- | --------------------------------------------------------------- |
| Adapter | Make incompatible interfaces work together                      |
| Bridge  | Separate two changing dimensions so they can vary independently |

Bluntly:

```txt
Adapter is a compatibility patch.

Bridge is an architectural split.
```

---

# 11. Bridge vs Strategy

Bridge and Strategy can look similar because both use composition.

## Strategy

Strategy swaps an algorithm or behavior.

```txt
How should this calculation / validation / sorting / pricing be done?
```

```mermaid
flowchart LR
    CONTEXT[Context]

    STRATEGY[Strategy Interface]

    ALGO_A[Algorithm A]
    ALGO_B[Algorithm B]

    CONTEXT --> STRATEGY
    ALGO_A --> STRATEGY
    ALGO_B --> STRATEGY
```

## Bridge

Bridge separates an abstraction from an implementation.

```txt
How do we prevent abstraction types and implementation types from multiplying into combinations?
```

```mermaid
flowchart LR
    ABSTRACTION[Abstraction Hierarchy]

    IMPLEMENTATION[Implementation Hierarchy]

    ABSTRACTION --> IMPLEMENTATION
```

## Main Difference

| Pattern  | Main Purpose                            |
| -------- | --------------------------------------- |
| Strategy | Swap behavior or algorithm              |
| Bridge   | Split two independent class hierarchies |

Strategy usually changes one behavior inside an object.

Bridge usually separates two axes of variation.

---

# 12. Bridge vs Abstract Factory

## Abstract Factory

Abstract Factory creates families of related objects.

```txt
Which family should I create?
```

```mermaid
flowchart LR
    FACTORY[Factory]

    FAMILY[Product Family]

    FACTORY --> FAMILY
```

## Bridge

Bridge connects an abstraction to an implementation.

```txt
How do I keep these two dimensions independent?
```

```mermaid
flowchart LR
    ABSTRACTION[Abstraction]

    IMPLEMENTATION[Implementation]

    ABSTRACTION --> IMPLEMENTATION
```

## How They Can Work Together

Abstract Factory can create the correct implementation objects that a Bridge uses.

Example:

```txt
Factory chooses SMSChannel.

Notification uses SMSChannel through the Bridge.
```

---

# 13. Common Smell That Suggests Bridge

Bridge may be useful when you see this:

```txt
Class names are turning into combinations.
```

Examples:

```txt
UrgentEmailNotification
UrgentSmsNotification
MarketingEmailNotification
MarketingSmsNotification

FinancialPdfReport
FinancialHtmlReport
InventoryPdfReport
InventoryHtmlReport

BasicTVRemote
AdvancedTVRemote
BasicProjectorRemote
AdvancedProjectorRemote
```

This usually means you have two dimensions trapped in one inheritance tree.

Bridge separates them.

---

# 14. When to Use Bridge

Use Bridge when:

```txt
You have two independent dimensions of variation.

You are creating too many combination classes.

You want abstraction and implementation to evolve separately.

You want to switch implementations at runtime.

You want to avoid deep inheritance trees.

You need platform-specific implementations behind stable high-level logic.

You expect both sides of the design to grow.
```

---

# 15. When Not to Use Bridge

Do not use Bridge when:

```txt
You only have one dimension of variation.

There are only one or two simple combinations.

The design is not likely to grow.

A simple interface and implementation is enough.

You are only adapting an old interface to a new one.

You are only swapping one algorithm.
```

Bridge is powerful, but it is heavier than a basic interface.

Do not add it unless you actually have independent variation.

---

# 16. Simple Pattern Summary

| Concept              | Meaning                                               |
| -------------------- | ----------------------------------------------------- |
| Abstraction          | High-level control interface used by the client       |
| Refined Abstraction  | Specialized version of the abstraction                |
| Implementor          | Interface for low-level implementation behavior       |
| Concrete Implementor | Actual implementation behind the abstraction          |
| Bridge               | The reference from abstraction to implementation      |
| Client               | Uses the abstraction, not the concrete implementation |

---

# 17. Best Visual Summary

```mermaid
flowchart LR
    CLIENT[Client]

    ABSTRACTION[High-Level Abstraction]

    IMPLEMENTATION[Low-Level Implementation Interface]

    CONCRETE_A[Implementation A]
    CONCRETE_B[Implementation B]

    CLIENT --> ABSTRACTION
    ABSTRACTION --> IMPLEMENTATION

    CONCRETE_A --> IMPLEMENTATION
    CONCRETE_B --> IMPLEMENTATION
```

## Final Meaning

Bridge is not mainly about wrapping an object.

It is about preventing two independent dimensions from collapsing into a huge inheritance mess.

Use it when the system is creating too many combination classes and both sides need to change independently.
