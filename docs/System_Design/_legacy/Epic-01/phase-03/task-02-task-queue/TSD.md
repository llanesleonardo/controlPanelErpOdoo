# Task queue — Technical Specification Document (TSD)

**Status:** docs-complete (Epic-01 scaffold)  
**Related:** [SRD](./SRD.md) · [diagram](./diagram.md) · [conops](./conops.md)

## Implements

## Planned entity `Task`

- id, correlation_id, actor_id, intent_code, skill_id
- state, execution_mode
- input_json, output_json, error_json
- created_at, updated_at, approved_by, approved_at

## Planned API

- `GET /tasks?state=`
- `GET /tasks/:id`
- `POST /tasks/:id/approve`
- `POST /tasks/:id/reject`

## Planned UI

- `/tasks` list + `/tasks/[id]` detail
