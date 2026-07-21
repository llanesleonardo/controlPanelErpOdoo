# DevOps & Delivery Patterns — Three Examples Each

> Concrete examples for every pattern in [DevOps & Delivery Patterns INDEX](../DevOps_Delivery_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Manual deploys are slow, error-prone, and unrepeatable | **CI/CD Pipeline** | **1.** GitHub Actions: test → build image → deploy staging. **2.** GitLab pipeline with manual prod gate. **3.** Jenkins multibranch per PR validation. |
| Cluster drift from undeclared live changes | **GitOps** | **1.** Argo CD syncs K8s from Git repo desired state. **2.** Flux reconciles cluster to committed manifests. **3.** Infra changes via PR to `terraform/` repo. |
| Long-lived branches cause painful merge and integration | **Trunk-Based Development** | **1.** Small commits daily to `main` behind feature flags. **2.** Google-style short-lived branches < 1 day. **3.** Continuous integration on every push to trunk. |
| Big-bang rewrite freezes feature delivery | **Branch by Abstraction** | **1.** Interface over legacy payment; new impl behind flag. **2.** Strangler abstraction layer routes % traffic to new service. **3.** Dual-write abstraction during migration. |
| Environment differences cause “works on my machine” | **Infrastructure as Code** | **1.** Terraform plan in PR comments. **2.** Ansible playbooks provision web tier. **3.** CDK defines stack in TypeScript. |
| Incidents debugged blind without metrics, logs, and traces | **Observability** | **1.** Metrics + logs + traces triangulate checkout failure. **2.** SLO dashboard for 99.9% API availability. **3.** RED metrics per microservice. |
| Logs trapped on nodes; cannot correlate incidents | **Centralized Logging** | **1.** ELK stack aggregates pod logs. **2.** Datadog log management with trace correlation. **3.** CloudWatch Logs Insights queries. |
| Cannot find slow span across microservice call chain | **Distributed Tracing** | **1.** OpenTelemetry trace across gateway → order → payment. **2.** Jaeger UI shows slow span in checkout. **3.** AWS X-Ray service map. |
| Traffic routed to broken instances until manual intervention | **Health Checks** | **1.** `/health` liveness for K8s kubelet. **2.** `/ready` checks DB connection before receiving traffic. **3.** ALB target group health HTTP 200. |
| Failed pods or VMs require human restart | **Self-Healing Systems** | **1.** K8s restarts failed container automatically. **2.** ASG replaces unhealthy instance. **3.** Operator controller reconciles desired replicas. |
| Resilience assumptions never validated before production | **Chaos Testing** | **1.** Weekly staging chaos: kill random pod. **2.** Litmus chaos experiments in CI cluster. **3.** Network partition test between services. |
| Deploy equals release; no safe partial rollout | **Progressive Delivery** | **1.** Canary + automated rollback on error rate. **2.** Ring deployment through internal → beta → GA. **3.** Flag-driven release separate from deploy. |

## Related

- [Risk-driven pattern selection](../risk-driven-patterns.md) — pick patterns by *risk*, not hype
- [Problem solving using SEP](../Problem_solving_using_SEP/INDEX.md) — full system compositions
- [Cross-cutting concerns](../Problem_solving_using_SEP/concerns/INDEX.md) — reads, writes, contention lenses

## How to use

1. Name the **risk** first (what breaks if you get it wrong).
2. Find the **pattern** that addresses that risk.
3. Read all three examples — notice *where* the pattern shows up (API, data, ops).
4. Open the pattern doc in this category for mechanics and TypeScript sketch.
5. Map one example to a [problem file](../Problem_solving_using_SEP/INDEX.md) if you see a match.
