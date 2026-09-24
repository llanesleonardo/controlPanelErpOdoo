# ContractsDocs

Contract-first APIs. Four types:

| Type | Role |
|------|------|
| **Intent** | Human request → taxonomy code |
| **Task** | Normalized executable job |
| **Skill** | Bounded operation execution |
| **Audit / Incident** | Outcomes, evidence, remediation knowledge |

## Shared fields (every contract)

- Input / output / error schemas
- Idempotency rule
- Timeout and retry policy
- Human approval threshold
- Observability: `correlation_id`, `actor_id`

## Sample contracts

- [schemas/common.yaml](./schemas/common.yaml)
- [sales.yaml](./sales.yaml)
- [inventory.yaml](./inventory.yaml)
- [accounting.yaml](./accounting.yaml)

## Example contract shape

```yaml
intent_code: inventory.stock.adjust
entity_type: stock_quant
operation_type: update
required_inputs: [warehouse, product, quantity_delta, reason_code]
execution_mode: [dry_run, commit]
rollback_strategy: compensating_adjustment
```

Later: promote these into `resources/packages/contracts` for codegen.
