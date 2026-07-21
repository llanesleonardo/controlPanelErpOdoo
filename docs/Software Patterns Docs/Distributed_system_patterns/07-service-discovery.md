# Service Discovery

## Core Idea
Service Discovery lets clients locate available service instances through a registry, DNS, or platform mechanism.

## Problem It Solves
- Services need to find each other dynamically because instances scale up, scale down, move, or fail.

## Main Diagram
```text
Service Instance -> Service Registry -> Client Service
```

## 3 Concrete Examples
1. **Kubernetes Service Discovery:** Services call stable DNS names instead of individual pod IPs.
2. **Registry-Based Discovery:** Instances register with Consul or Eureka and clients query available endpoints.
3. **Client-Side Load Balancing:** A client fetches healthy service instances and chooses one.

## TypeScript Example
```typescript
const registry = new Consul();
async function call(service: string) {
  const instances = await registry.resolve(service);
  const target = loadBalance(instances);
  return fetch(`http://${target.host}:${target.port}/`);
}
```

## Architecture Questions
- Who registers service instances?
- Who discovers service instances?
- Is discovery client-side or server-side?
- How are unhealthy instances removed?
- How does load balancing work?
- What happens if the registry is unavailable?

## When to Use
- Service instances are dynamic.
- You run multiple instances per service.
- Clients should not hardcode hostnames or IP addresses.

## When NOT to Use
- The deployment topology is static and tiny.
- A platform-level mechanism already solves discovery.
- The registry would become an unmanaged single point of failure.
