# Resilience Patterns — Three Examples Each

> Concrete examples for every pattern in [Resilience Patterns INDEX](../Resilience_Pattern/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Hanging dependencies take down callers | **Circuit Breaker** | **1.** Open circuit to failing fraud API; fail fast checkout. **2.** Breaker on geocoder during maps outage. **3.** Hystrix dashboard shows open circuits per dependency. |
| Transient faults surface as hard failures to users | **Retry** | **1.** Retry S3 upload on transient network error. **2.** Idempotent charge retry after timeout unknown. **3.** Mobile client retries GET on 502. |
| Slow calls exhaust threads and connection pools | **Timeout** | **1.** 2s timeout on payment authorization call. **2.** HTTP client timeout prevents thread exhaustion. **3.** DB query timeout kills runaway report. |
| One fault domain drains resources for the whole system | **Bulkhead** | **1.** Dedicated pool for admin vs public API traffic. **2.** Separate K8s deployment for batch vs online. **3.** Thread limit for external webhook callbacks only. |
| Work proceeds on invalid state wasting downstream effort | **Fail Fast** | **1.** Reject hold on seat already `SOLD` immediately. **2.** Validate cart empty before payment attempt. **3.** Return 400 on invalid JWT before hitting DB. |
| Partial outage becomes total user-facing failure | **Graceful Degradation** | **1.** Show cached product catalog if live API slow. **2.** Disable recommendations widget; core checkout works. **3.** Read-only mode during partial outage. |
| Hard failure when optional dependency is down | **Fallback** | **1.** Use stale ETA if maps routing unavailable. **2.** Default avatar if Gravatar down. **3.** Secondary payment processor if primary fails. |
| Overload collapses entire service instead of protecting core | **Load Shedding** | **1.** Reject non-login traffic during auth DB incident. **2.** Drop analytics beacons under CPU pressure. **3.** Waiting room sheds users during ticket onsale. |
| Fast producers overwhelm slow consumers without flow control | **Backpressure** | **1.** Kafka consumer pauses when downstream slow. **2.** Reactive streams `onBackpressureBuffer`. **3.** TCP window signals sender to slow down. |
| Hung processes run forever without recovery | **Watchdog** | **1.** Supervisor restarts crashed worker process. **2.** K8s liveness probe kills hung pod. **3.** Hardware watchdog resets embedded device. |
| Long jobs restart from scratch after crash | **Checkpointing** | **1.** Flink checkpoint stream state every minute. **2.** Video transcode saves progress at 25% intervals. **3.** Migration job records last processed id. |
| Coordinator cannot detect dead workers or instances | **Heartbeat** | **1.** Worker heartbeat to coordinator; missed → requeue job. **2.** Load balancer health check every 10s. **3.** Distributed lock renewed via heartbeat TTL. |
| Primary failure causes prolonged total outage | **Failover** | **1.** DNS failover to secondary region on primary down. **2.** Database automatic failover to standby replica. **3.** Active-passive API cluster promotion. |
| Single region outage or latency dominates all users | **Active-Active** | **1.** Two regions serve traffic simultaneously with conflict rules. **2.** Multi-master Redis for geo-low-latency reads/writes. **3.** Global load balancer across US and EU clusters. |
| No warm standby lengthens recovery time objective | **Active-Passive** | **1.** Standby K8s cluster warms but receives no traffic until failover. **2.** Hot standby DB replica promoted on primary failure. **3.** DR site passive until disaster declared. |

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
