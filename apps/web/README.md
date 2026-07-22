# apps/web — Next.js control panel

**Status:** implemented (Epic-03 ops surfaces)

## Routes

- `/` — home
- `/console` — request console (classify + create task)
- `/tasks`, `/tasks/[id]` — task queue
- `/logs` — log explorer

## Local run

```bash
npm install
npm run dev:web
```

Requires gateway at `NEXT_PUBLIC_GATEWAY_URL` (default `http://localhost:3001`).

## Docs

- [Epic-03](../../docs/Development/Epic-03/README.md)
