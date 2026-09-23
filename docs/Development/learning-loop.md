# Learning loop

Structured operational knowledge — not autonomous behavior drift.

1. Capture failure with full trace.  
2. Classify by taxonomy and error class (and ontology entity/action when known).  
3. Record root cause and human resolution.  
4. Convert stable resolutions into **approved** runbooks.  
5. Attach runbooks to future matching incidents as **recommendations** (not automatic permission expansion).  
6. Periodically review trends and retire bad runbooks.  

Fields to store: issue signature, affected module, **ontology entity type / skill** (when applicable), root cause, fix used, approval outcome, runbook status.

Skill evidence from Explorer live reads (`sales.estimate.read`) and other execute paths feeds the same correlation/evidence store — useful for diagnosing SoR vs control-plane faults without treating demo Explorer rows as production truth.

## Related

- [reliability-rules](./reliability-rules.md)  
- [request-lifecycle](./request-lifecycle.md)  
- [ontology](./ontology.md)  
- [governed-execution](./governed-execution.md)  
