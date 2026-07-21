# Serverless Architecture

## Core Idea
Serverless Architecture runs application logic in managed functions or services where the cloud provider handles server provisioning and scaling.

## Problem It Solves
- A team wants to run event-triggered or API-driven workloads without managing servers directly.

## Main Diagram
```text
Client -> API Gateway -> Serverless Function -> (Managed Database) -> (Object Storage)
```

## 3 Concrete Examples
1. HTTP function
2. File upload trigger
3. Scheduled background task

## TypeScript Example
```typescript
export const handler = async (event: S3Event) => {
  for (const record of event.Records) {
    const data = await s3.getObject(record.s3.object.key);
    await dynamo.put({ id: record.s3.object.key, parsed: parse(data) });
  }
};
```

## Architecture Questions
- What triggers the function?
- Is the workload stateless?
- What are cold-start implications?
- How will state be stored externally?
- What are provider lock-in risks?
- How will observability and debugging work?

## When to Use
- Workloads are event-driven or bursty.
- You want managed scaling.
- You want low operational overhead.
- The functions are stateless and short-lived.

## When NOT to Use
- Long-running processes are required.
- Low latency is critical and cold starts are unacceptable.
- You need full control over runtime infrastructure.
- Provider lock-in is a major concern.
