# apps/gateway — NestJS API gateway

**Status:** implemented (ops + ontology BFF)

## Role

Auth stub (`X-Actor-Id`), rate limits, correlation ids, structured logging, intent classify, task queue BFF, ontology catalog/objects. Talks to **control-plane PostgreSQL** (not the ERP DB).

## Local run

```bash
# from repo root (Postgres up via Compose)
cp .env.example .env   # if needed; set DATABASE_URL
npm install
npm run prisma:generate
npm run prisma:push
npm run dev:gateway
```

## Docs

- [SAC-001 Front door](../../docs/System_Design/Subsystem/SAC-001/README.md)  
- [User Guide](../../docs/User_Guide/README.md)  
- Legacy: [Epic-03](../../docs/System_Design/_legacy/Epic-03/README.md)  
