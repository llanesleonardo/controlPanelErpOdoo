# Request lifecycle

Every action (operator or agent) is a controlled business operation. Entry is always the NestJS gateway ([platform-concerns](./platform-concerns.md)). Why NL is not the executor: [governed-execution](./governed-execution.md).

1. Request hits NestJS (optional TLS/WAF in front only) — from **Next.js** (intent click) or **OpenClaw** (tool call), never direct to SoR  
2. Authenticate + authorize (RBAC; replace `X-Actor-Id` for production)  
3. Resolve tenant; enforce isolation  
4. Intent resolved — either already a taxonomy code, or **optional NL classified** via Semantic Routing to a taxonomy code  
5. Contract validated (**Fail Fast** if unknown / malformed)  
6. Skill selected (allowlist ∩ tenant entitlements) — LLM cannot invent skills  
7. Connector resolved (tenant-enabled + capability matrix)  
8. Dry-run or simulation  
9. Approval if needed (**Human-in-the-Loop**)  
10. Execution via domain port → first-party connector adapter (retry/backoff + circuit on vendor calls)  
11. Verification  
12. Structured log + audit persisted (`correlation_id`, `tenant_id`, `actor_id`, `connector_id`)  
13. Incident / resolution knowledge updated  

See also [reliability-rules](./reliability-rules.md), [connectors](./connectors.md), and [learning-loop](./learning-loop.md).
