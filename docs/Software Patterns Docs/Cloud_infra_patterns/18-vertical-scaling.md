# Vertical Scaling

## Core Idea
Vertical Scaling increases the resources of a single machine or instance, such as CPU, memory, or disk.

## Problem It Solves
- A workload needs more capacity, and scaling up one node is simpler than distributing the workload.

## Main Diagram
```text
Small Instance -> Increase CPU / Memory / Disk -> Large Instance
```

## 3 Concrete Examples
1. **Database Scale-Up:** Move a database to a larger instance with more memory and IOPS.
2. **Memory-Heavy Analytics:** Run analytics on a larger machine with more RAM.
3. **Legacy App Scaling:** Increase CPU and memory for an app that cannot easily run multiple replicas.

## TypeScript Example
```typescript
const server = { cpu: 4, memoryGb: 16 };
function upgrade() {
  server.cpu = 8; server.memoryGb = 32; // scale up single node
  restart(server);
}
// Database Scale-Up:
```

## Architecture Questions
- Is the workload hard to distribute?
- What resource is the bottleneck?
- What is the largest available instance size?
- Does scaling require downtime?
- Is vertical scaling a short-term fix?
- When will horizontal scaling become necessary?

## When to Use
- The workload cannot easily be distributed.
- A single machine resource is the bottleneck.
- Scaling up is simpler and sufficient for now.

## When NOT to Use
- You are near instance size limits.
- The workload needs high availability.
- Scaling up only postpones a distribution problem.
