# Prototype Pattern Using Diagrams

## Core Idea

The **Prototype Pattern** is a creational design pattern used when creating a new object from scratch is expensive, repetitive, or complicated.

Instead of building a new object manually every time:

```txt
Create new object from zero:
- set field A
- set field B
- set field C
- set default rules
- set nested objects
- set configuration
```

You copy an existing object:

```txt
Clone existing prototype
Modify only what is different
Use the new object
```

The original object acts as a template.

---

# 1. Prototype Pattern: General Structure

```mermaid
flowchart TD
    CLIENT[Client]

    PROTOTYPE[Prototype Interface]

    CONCRETE_A[Concrete Prototype A]
    CONCRETE_B[Concrete Prototype B]

    CLONE_A[Cloned Object A]
    CLONE_B[Cloned Object B]

    CLIENT --> PROTOTYPE

    CONCRETE_A --> PROTOTYPE
    CONCRETE_B --> PROTOTYPE

    CLIENT -->|clone| CONCRETE_A
    CLIENT -->|clone| CONCRETE_B

    CONCRETE_A --> CLONE_A
    CONCRETE_B --> CLONE_B
```

## What This Means

The client does not need to know how to rebuild the object.

The client only asks:

```txt
clone()
```

The prototype creates a copy of itself.

---

# 2. Simple Mental Model

Think of Prototype like duplicating a document template.

```txt
Original template:
- layout
- fonts
- headers
- sections
- default styling

Copy template:
- same layout
- same fonts
- same headers
- same sections

Then edit only the unique content.
```

You do not redesign the document from scratch every time.

You duplicate and modify.

---

# 3. What Problem Prototype Solves

## Without Prototype

```mermaid
flowchart TD
    CLIENT[Client Code]

    CREATE[Create New Object From Scratch]

    STEP1[Set Defaults]
    STEP2[Configure Nested Objects]
    STEP3[Apply Rules]
    STEP4[Load Expensive Data]
    STEP5[Validate State]

    PRODUCT[New Object]

    CLIENT --> CREATE
    CREATE --> STEP1
    STEP1 --> STEP2
    STEP2 --> STEP3
    STEP3 --> STEP4
    STEP4 --> STEP5
    STEP5 --> PRODUCT

    PROBLEM[Problem: object creation is repetitive, slow, or error-prone]

    PRODUCT --> PROBLEM
```

The client has to know too much about how the object is created.

That means object creation logic gets duplicated.

---

## With Prototype

```mermaid
flowchart TD
    CLIENT[Client Code]

    PROTOTYPE[Existing Prototype Object]

    CLONE[Clone Object]

    MODIFY[Modify Differences]

    PRODUCT[Ready Object]

    CLIENT --> PROTOTYPE
    PROTOTYPE --> CLONE
    CLONE --> MODIFY
    MODIFY --> PRODUCT
```

The complicated setup already exists inside the prototype.

The client copies it and changes only what is different.

---

# 4. Example 1: Graphic Design Shapes

## Problem

A drawing application lets users create shapes:

```txt
Circle
Rectangle
Text Box
Arrow
Icon
```

Each shape can have many properties:

```txt
Position
Size
Color
Border style
Shadow
Opacity
Layer
Rotation
Text style
Animation
```

If the user duplicates a shape, the app should preserve all settings.

Creating a new shape from scratch would lose details.

---

## Architect Questions

An architect would ask:

```txt
Do users need to duplicate existing objects?

Do objects have many properties that should be preserved?

Is object creation more complicated than a simple constructor?

Do we need to copy runtime state?

Should copied objects be independent from the original?

Do we need shallow copy or deep copy?

Can new objects start from preconfigured templates?
```

---

## Prototype Diagram

```mermaid
flowchart TD
    USER[User]

    CANVAS[Drawing Canvas]

    SHAPE[Existing Shape Prototype]

    CLONE[Cloned Shape]

    EDIT[User Edits Clone]

    FINAL[New Shape on Canvas]

    USER --> CANVAS
    CANVAS --> SHAPE
    SHAPE -->|clone| CLONE
    CLONE --> EDIT
    EDIT --> FINAL
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant User as User
    participant Canvas as Canvas
    participant Shape as Existing Shape
    participant Clone as Cloned Shape

    User->>Canvas: Duplicate selected shape
    Canvas->>Shape: clone()
    Shape-->>Canvas: cloned shape
    Canvas->>Clone: move position slightly
    Canvas-->>User: display duplicated shape
```

---

## Architectural Meaning

The app does not recreate the shape manually.

It copies the existing shape with all its styling and behavior.

Then it changes only the position so the duplicate appears offset from the original.

---

# 5. Example 2: Video Game Characters

## Problem

A game creates many characters based on predefined templates:

```txt
Basic Soldier
Elite Soldier
Mage
Archer
Boss Enemy
```

Each character has a lot of setup:

```txt
Health
Speed
Attack power
Armor
Inventory
Skills
AI behavior
Animations
Sound effects
Loot table
```

Creating every enemy from scratch during gameplay can be expensive and repetitive.

---

## Architect Questions

An architect would ask:

```txt
Are many similar objects created during runtime?

Is object creation expensive?

Can objects be preconfigured ahead of time?

Do new objects mostly differ by a few fields?

Should enemies copy default stats and behavior?

Do cloned objects need independent inventory, health, and position?

What state should be shared, and what state should be copied?
```

---

## Prototype Diagram

```mermaid
flowchart TD
    SPAWNER[Enemy Spawner]

    REGISTRY[Prototype Registry]

    SOLDIER_PROTO[Soldier Prototype]
    MAGE_PROTO[Mage Prototype]
    BOSS_PROTO[Boss Prototype]

    SOLDIER_CLONE[Soldier Clone]
    MAGE_CLONE[Mage Clone]
    BOSS_CLONE[Boss Clone]

    SPAWNER --> REGISTRY

    REGISTRY --> SOLDIER_PROTO
    REGISTRY --> MAGE_PROTO
    REGISTRY --> BOSS_PROTO

    SOLDIER_PROTO -->|clone| SOLDIER_CLONE
    MAGE_PROTO -->|clone| MAGE_CLONE
    BOSS_PROTO -->|clone| BOSS_CLONE
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant Spawner as Enemy Spawner
    participant Registry as Prototype Registry
    participant Prototype as Soldier Prototype
    participant Enemy as Soldier Clone

    Spawner->>Registry: getPrototype("soldier")
    Registry-->>Spawner: Soldier Prototype

    Spawner->>Prototype: clone()
    Prototype-->>Spawner: Soldier Clone

    Spawner->>Enemy: setPosition(x, y)
    Spawner->>Enemy: setLevel(3)
    Spawner-->>Enemy: spawn()
```

---

## Architectural Meaning

The game keeps preconfigured enemy prototypes.

When it needs a new enemy, it clones the prototype and customizes small details:

```txt
Position
Level
Current health
Spawn behavior
```

This avoids rebuilding the whole enemy setup repeatedly.

---

# 6. Example 3: E-Commerce Product Listings

## Problem

An online marketplace lets sellers create many similar product listings.

For example, a seller may sell:

```txt
Same shirt
Different size
Different color
Different price
Different stock count
```

Each listing may include:

```txt
Title
Description
Category
Images
Shipping rules
Return policy
Tax settings
SEO metadata
Variant options
```

Creating every listing manually is slow and error-prone.

---

## Architect Questions

An architect would ask:

```txt
Do users create many similar records?

Can one object serve as a template for another?

Are most fields reused with only a few differences?

Would duplication reduce user effort?

Should copied listings share media references or duplicate media?

Should copied records keep IDs, timestamps, or audit history?

Which fields must be reset during cloning?
```

---

## Prototype Diagram

```mermaid
flowchart TD
    SELLER[Seller]

    ORIGINAL[Existing Product Listing]

    CLONE[Cloned Product Listing]

    MODIFY[Modify Differences]

    NEWLISTING[New Product Listing]

    SELLER --> ORIGINAL
    ORIGINAL -->|clone| CLONE
    CLONE --> MODIFY

    MODIFY --> COLOR[Change Color]
    MODIFY --> SIZE[Change Size]
    MODIFY --> PRICE[Change Price]
    MODIFY --> STOCK[Change Stock]

    COLOR --> NEWLISTING
    SIZE --> NEWLISTING
    PRICE --> NEWLISTING
    STOCK --> NEWLISTING
```

---

## Runtime Flow

```mermaid
sequenceDiagram
    participant Seller as Seller
    participant Marketplace as Marketplace App
    participant Listing as Existing Listing
    participant Clone as Cloned Listing

    Seller->>Marketplace: Duplicate listing
    Marketplace->>Listing: clone()
    Listing-->>Marketplace: copied listing

    Marketplace->>Clone: reset id
    Marketplace->>Clone: reset publish status
    Marketplace->>Clone: change color
    Marketplace->>Clone: change inventory
    Marketplace-->>Seller: show editable copied listing
```

---

## Architectural Meaning

The cloned listing should copy reusable fields:

```txt
Title
Description
Category
Images
Shipping rules
Return policy
SEO fields
```

But it should reset identity fields:

```txt
Product ID
Created date
Sales history
Reviews
Inventory transactions
Published status
```

That reset logic is critical.

Prototype is useful, but careless cloning can create bad data.

---

# 7. Prototype Registry

A common variation is a **Prototype Registry**.

The registry stores named prototypes.

The client asks for a prototype by key.

```mermaid
flowchart TD
    CLIENT[Client]

    REGISTRY[Prototype Registry]

    PROTO_A[Prototype A]
    PROTO_B[Prototype B]
    PROTO_C[Prototype C]

    CLONE_A[Clone A]
    CLONE_B[Clone B]
    CLONE_C[Clone C]

    CLIENT -->|request type A| REGISTRY

    REGISTRY --> PROTO_A
    REGISTRY --> PROTO_B
    REGISTRY --> PROTO_C

    PROTO_A -->|clone| CLONE_A
    PROTO_B -->|clone| CLONE_B
    PROTO_C -->|clone| CLONE_C
```

## What the Registry Solves

Without a registry, the client must know where prototypes live.

With a registry, the client says:

```txt
Give me a clone of "premium-listing"
Give me a clone of "boss-enemy"
Give me a clone of "invoice-template"
```

The registry finds the prototype and returns a clone.

---

# 8. Shallow Copy vs Deep Copy

This is the part people mess up.

## Shallow Copy

A shallow copy duplicates the top-level object but keeps references to nested objects.

```mermaid
flowchart TD
    ORIGINAL[Original Object]

    CLONE[Cloned Object]

    SHARED[Shared Nested Object]

    ORIGINAL --> SHARED
    CLONE --> SHARED
```

## Meaning

Both objects point to the same nested object.

That can be dangerous.

Example:

```txt
Original product listing and cloned listing share the same inventory object.
Changing stock in one changes the other.
```

That is usually bad.

---

## Deep Copy

A deep copy duplicates the top-level object and nested objects.

```mermaid
flowchart TD
    ORIGINAL[Original Object]

    ORIGINAL_NESTED[Original Nested Object]

    CLONE[Cloned Object]

    CLONE_NESTED[Copied Nested Object]

    ORIGINAL --> ORIGINAL_NESTED
    CLONE --> CLONE_NESTED
```

## Meaning

The clone gets its own independent nested objects.

Example:

```txt
Original character and cloned character each have separate health, inventory, and position.
```

That is usually safer when state can change.

---

# 9. What Prototype Protects You From

## Problem: Rebuilding Similar Objects Repeatedly

```mermaid
flowchart TD
    CLIENT[Client]

    BUILD1[Build Object A From Scratch]
    BUILD2[Build Object B From Scratch]
    BUILD3[Build Object C From Scratch]

    DUPLICATION[Duplicated setup logic]

    CLIENT --> BUILD1
    CLIENT --> BUILD2
    CLIENT --> BUILD3

    BUILD1 --> DUPLICATION
    BUILD2 --> DUPLICATION
    BUILD3 --> DUPLICATION
```

If many objects share the same setup, creating them from scratch repeats work.

---

## Solution: Clone From Prototype

```mermaid
flowchart TD
    PROTOTYPE[Configured Prototype]

    CLONE1[Clone 1]
    CLONE2[Clone 2]
    CLONE3[Clone 3]

    PROTOTYPE -->|clone| CLONE1
    PROTOTYPE -->|clone| CLONE2
    PROTOTYPE -->|clone| CLONE3
```

The setup exists once in the prototype.

Each clone starts with the same setup.

---

# 10. Prototype vs Factory Method

## Factory Method

Factory Method chooses which concrete type to create.

```mermaid
flowchart LR
    CREATOR[Creator]

    PRODUCT[Product Interface]

    CONCRETE_A[Concrete Product A]
    CONCRETE_B[Concrete Product B]

    CREATOR --> PRODUCT
    CONCRETE_A --> PRODUCT
    CONCRETE_B --> PRODUCT
```

Example:

```txt
Create EmailSender or SmsSender.
```

---

## Prototype

Prototype copies an existing object.

```mermaid
flowchart LR
    EXISTING[Existing Object]

    CLONE[Cloned Object]

    EXISTING -->|clone| CLONE
```

Example:

```txt
Duplicate an existing product listing.
```

---

## Main Difference

| Pattern        | Main Question                         |
| -------------- | ------------------------------------- |
| Factory Method | Which concrete class should I create? |
| Prototype      | Which existing object should I copy?  |

---

# 11. Prototype vs Builder

## Builder

Builder constructs one complex object step by step.

```mermaid
flowchart LR
    CLIENT[Client]

    BUILDER[Builder]

    PRODUCT[Complex Object]

    CLIENT --> BUILDER
    BUILDER --> PRODUCT
```

Example:

```txt
Build a custom report from selected sections.
```

---

## Prototype

Prototype clones a pre-existing configured object.

```mermaid
flowchart LR
    TEMPLATE[Configured Template Object]

    CLONE[Copied Object]

    TEMPLATE -->|clone| CLONE
```

Example:

```txt
Copy an existing report template and change the title.
```

---

## Main Difference

| Pattern   | Main Question                                |
| --------- | -------------------------------------------- |
| Builder   | How do I assemble this object step by step?  |
| Prototype | Can I copy an existing object and modify it? |

---

# 12. Implementation Shape Without Code

## Step 1: Identify Cloneable Objects

```mermaid
flowchart TD
    OBJECT[Candidate Object]

    OBJECT --> MANY_FIELDS[Many fields]
    OBJECT --> EXPENSIVE_SETUP[Expensive setup]
    OBJECT --> SIMILAR_COPIES[Many similar copies]
    OBJECT --> TEMPLATE_USE[Template-style usage]
```

Good candidates:

```txt
Graphic shapes
Game characters
Product listings
Document templates
Workflow templates
UI layout templates
Configuration presets
```

---

## Step 2: Define Clone Behavior

```mermaid
flowchart TD
    PROTOTYPE[Prototype Interface]

    CLONE_METHOD[clone]

    PROTOTYPE --> CLONE_METHOD
```

The important decision is not just “copy everything.”

The important decision is:

```txt
What should be copied?
What should be shared?
What should be reset?
```

---

## Step 3: Implement Concrete Prototypes

```mermaid
flowchart TD
    PROTOTYPE[Prototype Interface]

    A[Concrete Prototype A]
    B[Concrete Prototype B]
    C[Concrete Prototype C]

    A --> PROTOTYPE
    B --> PROTOTYPE
    C --> PROTOTYPE
```

Each prototype controls how it copies itself.

---

## Step 4: Clone and Customize

```mermaid
flowchart TD
    CLIENT[Client]

    PROTOTYPE[Prototype]

    CLONE[Clone]

    CUSTOMIZE[Customize Differences]

    FINAL[Final Object]

    CLIENT --> PROTOTYPE
    PROTOTYPE -->|clone| CLONE
    CLONE --> CUSTOMIZE
    CUSTOMIZE --> FINAL
```

---

# 13. When to Use Prototype

Use Prototype when:

```txt
You need many similar objects.

Object creation is expensive.

Objects have complex default configuration.

Users duplicate existing objects.

You want template-based object creation.

The exact concrete class should not matter to the client.

New objects differ only slightly from existing ones.

You need runtime-created templates, not only hardcoded classes.
```

---

# 14. When Not to Use Prototype

Do not use Prototype when:

```txt
Objects are simple.

A constructor is clear enough.

Copying state is risky or unclear.

Object identity is important and hard to reset.

Nested mutable objects make cloning dangerous.

The object contains resources that should not be copied, like file handles, sockets, or database connections.

You cannot clearly define deep-copy vs shallow-copy rules.
```

Prototype can become dangerous when developers blindly copy everything.

---

# 15. Common Smell That Suggests Prototype

Prototype is often useful when users or code repeatedly do this:

```txt
Create something similar to this existing thing.
```

Examples:

```txt
Duplicate this slide.
Copy this listing.
Clone this workflow.
Create another enemy like this one.
Start from this template.
```

That usually means a prototype-style copy makes sense.

---

# 16. Simple Pattern Summary

| Concept             | Meaning                                              |
| ------------------- | ---------------------------------------------------- |
| Prototype           | Existing object used as a template                   |
| Clone               | New object copied from the prototype                 |
| Prototype Interface | Defines clone behavior                               |
| Concrete Prototype  | Object that knows how to copy itself                 |
| Prototype Registry  | Optional catalog of named prototypes                 |
| Shallow Copy        | Copies top-level object but shares nested references |
| Deep Copy           | Copies top-level object and nested objects           |

---

# 17. Best Visual Summary

```mermaid
flowchart LR
    EXISTING[Existing configured object]

    CLONE[Clone object]

    MODIFY[Modify differences]

    FINAL[Ready-to-use new object]

    EXISTING -->|clone| CLONE
    CLONE --> MODIFY
    MODIFY --> FINAL
```

## Final Meaning

Prototype is not mainly about avoiding constructors.

It is about using an existing configured object as a template.

Use it when copying and modifying is safer, faster, or clearer than rebuilding from scratch.
