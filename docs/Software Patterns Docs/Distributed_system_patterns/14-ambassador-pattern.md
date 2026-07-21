# Ambassador

## Core Idea
An Ambassador acts as a helper proxy for a service, handling outbound connectivity concerns such as retries, TLS, routing, or protocol translation.

## Problem It Solves
- A service needs helper behavior for outbound communication without embedding that behavior in the application.

## Main Diagram
```text
Application Service -> Ambassador -> Remote Service
```

## 3 Concrete Examples
1. **Outbound API Helper:** An ambassador handles retries and auth for external API calls.
2. **Legacy Protocol Translator:** A service calls localhost HTTP while ambassador speaks legacy TCP to the external system.
3. **Database Connection Helper:** Ambassador manages secure connection setup to a remote database.

## TypeScript Example
```typescript
class LoggingAmbassador {
  constructor(private remote: RemoteService) {}
  async call(req: Request) {
    logger.info('outbound', req);
    return this.remote.invoke(req);
  }
}
```

## Architecture Questions
- Which outbound concern should be separated from the app?
- Is this a sidecar-like deployment?
- What protocol translation is needed?
- How does the app communicate with the ambassador?
- What happens if the ambassador fails?
- Is this better handled by a library or service mesh?

## When to Use
- Outbound communication logic should be externalized.
- Legacy or remote protocols should be hidden from the app.
- Multiple services need the same communication helper.

## When NOT to Use
- A simple client library is enough.
- The ambassador adds more failure points than value.
- Business logic starts moving into the ambassador.
