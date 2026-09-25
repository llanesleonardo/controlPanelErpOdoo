# apps/web — Next.js control panel

**Status:** implemented (ops surfaces + ontology UI)

## Routes

- `/` — ERP Map home  
- `/ontology` — Schema | Explorer | Vertex | Process map  
- `/console` — request console  
- `/tasks`, `/tasks/[id]` — task queue  
- `/logs` — log explorer  

## Local run

```bash
npm install
npm run dev:web
```

Requires gateway at `NEXT_PUBLIC_GATEWAY_URL` (default `http://localhost:3001`).

## Docs

- [User Guide — Screens](../../docs/User_Guide/Screens/README.md)  
- [SAC-002](../../docs/System_Design/Subsystem/SAC-002/README.md)  
- [System Design pack](../../docs/System_Design/README.md)  
