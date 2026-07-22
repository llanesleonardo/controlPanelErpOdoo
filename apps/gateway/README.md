# apps/gateway — NestJS API gateway

**Status:** implemented (Epic-03 ops surfaces)

## Role

Auth stub (`X-Actor-Id`), rate limits, correlation ids, structured logging, intent classify, task queue BFF. Talks to **control-plane PostgreSQL** (not Odoo DB).

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

- [Epic-03](../../docs/Development/Epic-03/README.md)
- [GatewayDocs](../../docs/Components/GatewayDocs/README.md)
