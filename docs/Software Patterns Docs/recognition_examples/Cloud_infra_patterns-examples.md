# Cloud & Infrastructure Patterns — Three Examples Each

> Concrete examples for every pattern in [Cloud & Infrastructure Patterns INDEX](../Cloud_infra_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Local session state blocks scale-out and rolling deploys | **Stateless Services** | **1.** ECS tasks behind ALB with no sticky session state. **2.** Cloud Run services scale to zero statelessly. **3.** API pods store nothing local except temp. |
| Snowflake servers drift from documented config | **Immutable Infrastructure** | **1.** Replace EC2 AMI on deploy never SSH patch. **2.** New container image tag rolled out via K8s. **3.** Terraform destroys/recreates servers on change. |
| Manual capacity misses traffic swings | **Auto Scaling** | **1.** ASG adds instances when CPU high. **2.** K8s VPA adjusts pod CPU requests. **3.** DynamoDB on-demand scales capacity automatically. |
| In-place deploy causes downtime or rollback pain | **Blue-Green Deployment** | **1.** Switch load balancer from blue v1 to green v2 stack. **2.** Two identical envs; flip DNS for instant cutover. **3.** Database migration on green before traffic switch. |
| All users hit risky release at once | **Canary Deployment** | **1.** 5% traffic to new checkout version monitor errors. **2.** Flagger progressive traffic shift in Istio. **3.** Feature cohort gets new API version first. |
| Big-bang cutover risks full-environment failure | **Rolling Deployment** | **1.** K8s rolling update one pod at a time. **2.** ECS rolling replace tasks gradually. **3.** Ansible serial: 2 hosts at a time. |
| Long-lived branches hide integration risk until release day | **Feature Flags** | **1.** LaunchDarkly toggles new UI for 10% users. **2.** Kill switch disables broken payment path. **3.** Shopify rollout stages menu sync by region. |
| Manual console changes are unreproducible | **Infrastructure as Code** | **1.** Terraform defines VPC, RDS, EKS. **2.** Pulumi programs cloud stack in TypeScript. **3.** CloudFormation templates for compliance audit. |
| Observability and mesh concerns baked into app image | **Sidecar** | **1.** Envoy proxy container beside app in pod. **2.** Log forwarder sidecar to Datadog. **3.** Vault agent sidecar injects secrets. |
| Per-service TLS and retry policies inconsistent | **Service Mesh** | **1.** Istio manages traffic and mTLS mesh-wide. **2.** Linkerd automatic retries and metrics. **3.** AWS App Mesh for ECS services. |
| Regional outage or latency hits all users from one site | **Multi-Region Deployment** | **1.** Active-active API in us-east and eu-west. **2.** S3 cross-region replication for media. **3.** Global Aurora for read replicas per region. |
| Origin serves global static traffic without edge cache | **CDN** | **1.** CloudFront in front of S3 static site. **2.** Fastly caches API responses at edge. **3.** Shopify storefront assets on CDN. |
| Round trips to central region add latency for edge users | **Edge Computing** | **1.** Cloudflare Workers run auth at edge. **2.** Lambda@Edge modifies HTML responses. **3.** IoT inference on gateway device locally. |
| Blast radius of one failure affects entire platform | **Cell-Based Architecture** | **1.** Stripe-style cells isolate merchant shards failure domain. **2.** Gaming shard per 10k concurrent players. **3.** SaaS cell per 500 enterprise tenants. |
| Single-AZ failure takes down whole stack | **Availability Zones** | **1.** RDS multi-AZ synchronous standby. **2.** K8s nodes spread across 3 AZs. **3.** Load balancer health checks per AZ. |
| Unknown failure modes surface only in production incidents | **Chaos Engineering** | **1.** Chaos Monkey terminates random instances in staging. **2.** Gremlin injects latency on payment dependency. **3.** Game days simulate region failure. |
| Bigger machine hits hardware ceiling before load does | **Horizontal Scaling** | **1.** Add more API replicas behind load balancer. **2.** Shard workers horizontally for queue consumers. **3.** Cassandra adds nodes to ring. |
| Adding machines unnecessary when one box still suffices | **Vertical Scaling** | **1.** Upgrade DB instance from r5.large to r5.2xlarge. **2.** Increase pod memory limit for JVM heap. **3.** Bigger Redis node before cluster split. |

## Related

- [Risk-driven pattern selection](../risk-driven-patterns.md) — pick patterns by *risk*, not hype
- [Composition problems](../composition_problems/INDEX.md) — full system compositions
- [Cross-cutting concerns](../composition_problems/concerns/INDEX.md) — reads, writes, contention lenses

## How to use

1. Name the **risk** first (what breaks if you get it wrong).
2. Find the **pattern** that addresses that risk.
3. Read all three examples — notice *where* the pattern shows up (API, data, ops).
4. Open the pattern doc in this category for mechanics and TypeScript sketch.
5. Map one example to a [problem file](../composition_problems/INDEX.md) if you see a match.
