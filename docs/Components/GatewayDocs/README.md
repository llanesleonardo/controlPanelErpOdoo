# GatewayDocs

NestJS API gateway (`apps/gateway`) — control-plane edge.

## Responsibilities

- Authenticate users; enforce roles and permissions
- Rate limiting
- Validate requests against published contracts
- Route approved work to the FastAPI orchestrator
- Persist control-plane data (users, tasks, audits) in **control-plane PostgreSQL**
- Emit structured logs with correlation ID and actor ID

## Does not

- Call Odoo directly for business writes (orchestrator + adapters do)
- Share Odoo’s database

## Related

- [ContractsDocs](../ContractsDocs/README.md)
- [reliability-rules](../../Development/reliability-rules.md)
- App stub: [apps/gateway](../../../apps/gateway/README.md)
