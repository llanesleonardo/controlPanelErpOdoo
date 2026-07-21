# Specification

## Core Idea
Specification encapsulates a business rule or query predicate so it can be reused, combined, and tested.

## Problem It Solves
- Business rules such as eligibility, filtering, and validation are duplicated across services and queries.

## Main Diagram
```text
Specification -> Rule A -> Rule B -> Rule C -> isSatisfiedBy
```

## 3 Concrete Examples
1. **EligibleForDiscount:** A customer must be active, have loyalty status, and meet order total rules.
2. **ProductIsSellable:** A product must be active, in stock, and not discontinued.
3. **LoanApprovalSpecification:** Applicant must satisfy income, credit, and debt rules.

## TypeScript Example
```typescript
class HighTempSpec implements Spec<BatteryReading> {
  isSatisfiedBy(r: BatteryReading) { return r.tempC > 45; }
}
const alerts = readings.filter(r => new HighTempSpec().isSatisfiedBy(r));
// EligibleForDiscount:
// Specification encapsulates a business rule or query predicate so it c...
```

## Architecture Questions
- What business rule needs to be named and reused?
- Can the rule be evaluated in memory, database, or both?
- Can specifications be composed with AND/OR/NOT?
- Is this validation, query filtering, or policy?
- Who owns the rule?
- Will over-abstracting make the rule harder to read?

## When to Use
- Business rules need names and reuse.
- Filtering or eligibility rules are duplicated.
- Rules need composition or testing.

## When NOT to Use
- The rule is used once and is simple.
- The abstraction makes the rule harder to read.
- Database translation is impossible but required.
