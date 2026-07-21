import fs from 'fs';
import path from 'path';

const outDir = path.resolve('../Problem_solving_using_SEP');

const problems = [
  // ── PORTER VALUE CHAIN (40–49) ──────────────────────────────────────────
  {
    file: '40-enterprise-sso-identity.md',
    title: 'Problem 40: Enterprise SSO & Identity Platform (Okta-Style)',
    porter: 'Firm Infrastructure',
    business: `Enterprises need one place to manage **identity** across hundreds of apps: SSO via SAML/OIDC, MFA, user provisioning, and audit logs for every login. IT admins onboard/offboard employees; apps trust the identity provider — not local passwords.`,
    requirements: `- **SSO login** in < 2 s for federated apps.\n- Support **SAML, OIDC, SCIM** provisioning.\n- **MFA** (TOTP, push, WebAuthn) enforced by policy.\n- **Multi-tenant** — each customer org isolated.\n- Immutable **audit trail** for compliance (SOC2, HIPAA).`,
    breaks: `| Shared user table for all orgs | Cross-tenant data leak |\n| Session stored only in one app | Logout doesn't propagate |\n| Sync SCIM in HTTP request | Timeouts; partial provisioning |\n| No rate limit on login | Credential stuffing succeeds |`,
    need: '**Multi-tenant isolation**, **token federation**, **session management**, **SCIM async provisioning**, and **audit event sourcing**.',
    mermaid: `flowchart TD
    User["Employee / User"]
    App["SaaS App (SP)"]
    Gateway["Identity Gateway<br/>(SAML/OIDC)"]
    Auth["Auth Service<br/>(MFA, passwordless)"]
    Session["Session / Token Store"]
    SCIM["SCIM Provisioning"]
    Audit["Audit Event Store"]
    Admin["IT Admin Console"]

    User --> App
    App --> Gateway --> Auth
    Auth --> Session
    Admin --> SCIM
    SCIM --> Auth
    Auth --> Audit
    Gateway --> Audit`,
    patterns: `| Multi-tenant | [Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md), [RBAC](../Security_patterns/) | Org-scoped users and policies |
| Auth | [OAuth2](../Security_patterns/), token federation | SAML/OIDC trust |
| Abuse | [Rate Limiting](../Distributed_system_patterns/18-rate-limiting.md), [Token Bucket](../Distributed_system_patterns/22-token-bucket.md) | Login brute-force protection |
| Provisioning | [Outbox](../Distributed_system_patterns/11-outbox-pattern.md), [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md) | Async SCIM sync |
| Audit | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Every login and admin action |
| Resilience | [Circuit Breaker](../Resilience_Pattern/01-circuit-breaker.md) | IdP upstream failures |`,
    flow: `1. User hits App → redirect to IdP **OIDC** authorize.\n2. User completes **MFA** → IdP issues short-lived token.\n3. App validates token → creates local session stub.\n4. IT admin deprovisions user via **SCIM** → async revoke all sessions.`,
    failures: `| Failure | Response |\n| --- | --- |\n| MFA device lost | Backup codes + admin recovery workflow |\n| SCIM partial failure | Retry with idempotency; DLQ for manual fix |\n| Token replay | Short TTL + rotation; revoke list in cache |\n| IdP outage | Cached JWKS; optional read-only degrade policy |`,
    ts: `async function authenticate(orgId: string, credentials: LoginDto) {
  await rateLimit.check(\`login:\${orgId}:\${credentials.ip}\`, 10, 3600);
  const user = await auth.verify(orgId, credentials);
  if (user.mfaRequired) return { step: 'MFA_REQUIRED', challengeId: user.challengeId };
  const session = await sessions.create({ orgId, userId: user.id, ttlSec: 3600 });
  await audit.append({ type: 'LOGIN_SUCCESS', orgId, userId: user.id });
  return { sessionToken: session.token };
}`,
    links: '[Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md) · [Rate Limiting](../Distributed_system_patterns/18-rate-limiting.md) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Outbox](../Distributed_system_patterns/11-outbox-pattern.md) · [Circuit Breaker](../Resilience_Pattern/01-circuit-breaker.md)',
  },
  {
    file: '41-hris-payroll-platform.md',
    title: 'Problem 41: HRIS + Payroll Platform (Workday / ADP-Style)',
    porter: 'Human Resource Management',
    business: `Companies run **payroll** for thousands of employees across regions with different tax rules, benefits, and pay schedules. HR manages hiring, org structure, time-off, and compensation — payroll must never double-pay or miss a tax withholding.`,
    requirements: `- **Bi-weekly pay runs** for 100k+ employees without error.\n- **Regional tax rules** versioned and auditable.\n- Benefits enrollment windows; eligibility rules.\n- **Idempotent** pay run per period + employer.\n- Employee self-service portal for payslips.`,
    breaks: `| One global tax table | Wrong withholding per state/country |\n| Pay run without idempotency | Double paycheck on retry |\n| Sync calc in single thread | Misses payroll deadline |\n| HR and payroll same monolith DB | Lock contention on pay day |`,
    need: '**Sharding by employer**, **saga pay run**, **event-sourced payroll ledger**, **async calculation workers**, and **idempotent batch jobs**.',
    mermaid: `flowchart TD
    HR["HR Admin / Employee Portal"]
    HRIS["HRIS Service<br/>(org, benefits, PTO)"]
    Payroll["Payroll Engine"]
    Tax["Tax Rules Service<br/>(versioned by region)"]
    Workers["Calculation Workers"]
    Ledger["Payroll Ledger<br/>(Event Sourced)"]
    Bank["Bank / ACH Adapter"]
    Notify["Payslip Notification"]

    HR --> HRIS
    HR --> Payroll
    Payroll --> Tax --> Workers
    Workers --> Ledger --> Bank
    Ledger --> Notify`,
    patterns: `| Isolation | [Sharding](../Scalability_patterns/03-sharding.md), [Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md) | Per employer |
| Pay run | [Saga](../Distributed_system_patterns/10-saga.md), [Job Scheduler](./36-job-scheduler.md) | Batch with compensate |
| Correctness | [Idempotency](../Distributed_system_patterns/20-idempotency.md), [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | One run per period |
| Scale | [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md), [Bulkhead](../Resilience_Pattern/04-bulkhead.md) | Parallel calc workers |
| Payout | [Outbox](../Distributed_system_patterns/11-outbox-pattern.md), [Adapter](../Structural%20Patterns/Adapter.md) | Reliable ACH file delivery |`,
    flow: `1. HR closes timecards for period → triggers **pay run** job (idempotent key = \`employerId:period\`).\n2. Workers compute gross → deductions → net per employee using **versioned tax rules**.\n3. **Ledger** records all line items as events.\n4. **Outbox** sends ACH batch to bank adapter → payslip emails async.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Worker crash mid-run | Resume from checkpoint; idempotent line items |\n| Bank reject one ACH | Saga: partial retry; manual review queue |\n| Tax rule update mid-run | Lock rule version at run start |\n| Employee terminated same day | Eligibility rules in saga branch |`,
    ts: `async function runPayroll(employerId: string, period: string) {
  const key = \`\${employerId}:\${period}\`;
  if (await idempotency.exists(key)) return idempotency.result(key);
  const ruleVersion = await taxRules.lockVersion(employerId, period);
  const employees = await hris.activeEmployees(employerId);
  await queue.enqueueBatch(employees.map(e => ({ employerId, period, employeeId: e.id, ruleVersion })));
  const result = await ledger.finalizeRun(employerId, period);
  await idempotency.save(key, result);
  return result;
}`,
    links: '[Saga](../Distributed_system_patterns/10-saga.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Sharding](../Scalability_patterns/03-sharding.md) · [Job Scheduler](./36-job-scheduler.md)',
  },
  {
    file: '42-feature-flags-experimentation.md',
    title: 'Problem 42: Feature Flag & Experimentation Platform (LaunchDarkly-Style)',
    porter: 'Technology Development',
    business: `Product and engineering teams roll out features **gradually**, run **A/B tests**, and **kill-switch** bad releases without redeploying. SDKs in mobile, web, and backend must evaluate flags in **< 10 ms** at billions of requests/day.`,
    requirements: `- Flag evaluation **< 10 ms** p99.\n- **Percentage rollouts** and user targeting (country, tier).\n- Consistent bucketing — same user always same variant.\n- Instant kill switch propagation globally.\n- Experiment metrics tied to exposure events.`,
    breaks: `| Flag config in app config file | Requires deploy to change |\n| Random % per request | Same user sees A and B |\n| DB lookup every evaluation | Latency and DB meltdown |\n| No audit on flag changes | Who turned on production flag? |`,
    need: '**Edge-cached flag config**, **consistent hashing for bucketing**, **Pub/Sub invalidation**, **event stream for exposures**, and **versioned flag state**.',
    mermaid: `flowchart TD
    SDK["App SDKs<br/>(web, mobile, server)"]
    Edge["CDN / Edge Cache<br/>(flag snapshots)"]
    API["Flag Evaluation API"]
    Store["Flag Config Store"]
    Admin["Admin Console"]
    Stream["Exposure Event Stream"]
    Metrics["Experiment Metrics"]

    SDK --> Edge
    Edge -->|miss| API --> Store
    Admin --> Store
    Store -->|invalidate| Edge
    SDK --> Stream --> Metrics`,
    patterns: `| Speed | [CDN](../Scalability_patterns/05-cdn.md), [Cache-Aside](../Scalability_patterns/04-cache-aside.md) | Push config to edge |
| Bucketing | [Consistent Hashing](../Distributed_system_patterns/), [Sharding](../Scalability_patterns/03-sharding.md) | Stable user → variant |
| Updates | [Pub/Sub](../Messaging_Integration_patterns/08-pub-sub.md) | Instant invalidation |
| Experiments | [Event Streaming](../Messaging_Integration_patterns/), [CQRS](../Scalability_patterns/06-cqrs.md) | Exposure vs conversion |
| Safety | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Audit flag changes |`,
    flow: `1. Admin sets flag \`new-checkout\` → 10% rollout, target \`country=US\`.\n2. Config version bumped → **Pub/Sub** invalidates edge caches.\n3. SDK evaluates locally from snapshot → user bucket hash → variant B.\n4. SDK emits **exposure event** async → experiment dashboard updates.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Edge cache stale | TTL 30s max; SDK polls version header |\n| Evaluation API down | SDK uses last known snapshot (fail-safe default) |\n| Bucket algorithm change | New experiment ID; don't mix with old |\n| Kill switch | Default-off override in snapshot priority |`,
    ts: `function evaluate(flag: FlagConfig, userId: string, attrs: Record<string, string>): boolean {
  if (!flag.enabled) return false;
  if (flag.targets && !flag.targets.every(([k, v]) => attrs[k] === v)) return false;
  const bucket = hash32(\`\${flag.key}:\${userId}\`) % 100;
  return bucket < flag.rolloutPercent;
}`,
    links: '[CDN](../Scalability_patterns/05-cdn.md) · [Cache-Aside](../Scalability_patterns/04-cache-aside.md) · [Pub/Sub](../Messaging_Integration_patterns/08-pub-sub.md) · [CQRS](../Scalability_patterns/06-cqrs.md) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md)',
  },
  {
    file: '43-supplier-portal-procurement.md',
    title: 'Problem 43: Supplier Portal & PO Workflow (SAP Ariba-Style)',
    porter: 'Procurement',
    business: `Enterprises buy goods and services through **approved suppliers**. Flow: requisition → RFQ → bids → approval chain → purchase order → goods receipt → **3-way match** (PO, receipt, invoice) before payment.`,
    requirements: `- Multi-step **approval workflow** with delegation.\n- **3-way match** prevents overpayment.\n- Supplier portal for bids and invoice upload.\n- Audit trail for SOX compliance.\n- Support 10k POs/day across business units.`,
    breaks: `| Email-based approvals | Lost threads; no audit |\n| Pay invoice without receipt | Fraud and duplicate pay |\n| Single approval table | Bottleneck on CFO |\n| Supplier-specific formats | Manual data entry errors |`,
    need: '**State machine workflow**, **saga for PO lifecycle**, **Anti-Corruption Layer** for suppliers, **Outbox notifications**, and **event-sourced audit**.',
    mermaid: `flowchart TD
    Buyer["Internal Buyer"]
    Req["Requisition Service"]
    RFQ["RFQ / Bidding"]
    Supplier["Supplier Portal"]
    Approval["Approval Workflow<br/>(state machine)"]
    PO["Purchase Order Service"]
    GR["Goods Receipt"]
    Match["3-Way Match Engine"]
    Pay["Payment Adapter"]

    Buyer --> Req --> RFQ --> Supplier
    Req --> Approval --> PO
    PO --> GR
    Supplier -->|invoice| Match
    PO --> Match
    GR --> Match
    Match --> Pay`,
    patterns: `| Workflow | [State Machine](../Data_domain_patterns/), [Saga](../Distributed_system_patterns/10-saga.md) | Req → PO → pay |
| Integration | [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md), [Adapter](../Structural%20Patterns/Adapter.md) | Supplier formats |
| Audit | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | SOX trail |
| Notify | [Outbox](../Distributed_system_patterns/11-outbox-pattern.md), [Event Notification](../Messaging_Integration_patterns/10-event-notification.md) | Approver alerts |
| Correctness | [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Duplicate invoice reject |`,
    flow: `1. Buyer creates requisition → routes to manager approval chain.\n2. Approved req → **RFQ** sent to qualified suppliers.\n3. Winning bid → **PO issued** → supplier confirms.\n4. Goods received → invoice uploaded → **3-way match** → payment saga.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Approver OOO | Delegation rules; escalate after SLA |\n| Partial receipt | Partial match; pay prorated amount |\n| Duplicate invoice | Idempotency on invoice number + supplier |\n| Price mismatch | Hold for buyer review; never auto-pay |`,
    ts: `async function threeWayMatch(poId: string, receiptId: string, invoiceId: string) {
  const [po, receipt, invoice] = await Promise.all([
    poStore.get(poId), receiptStore.get(receiptId), invoiceStore.get(invoiceId),
  ]);
  if (invoice.amount > po.amount || receipt.qty < invoice.qty) {
    return { status: 'REVIEW_REQUIRED', reason: 'MISMATCH' };
  }
  return paymentSaga.start({ poId, invoiceId, amount: invoice.amount });
}`,
    links: '[Saga](../Distributed_system_patterns/10-saga.md) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) · [Outbox](../Distributed_system_patterns/11-outbox-pattern.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md)',
  },
  {
    file: '44-warehouse-receiving-asn.md',
    title: 'Problem 44: Warehouse Receiving & ASN System (WMS Inbound)',
    porter: 'Inbound Logistics',
    business: `Distribution centers receive truckloads from suppliers. **Advance Ship Notices (ASN)** describe expected cartons; dock staff scan, count, and **put away** to bin locations. Discrepancies trigger supplier claims.`,
    requirements: `- Process **ASN before truck arrives** for dock scheduling.\n- Scan-to-receive with **barcode validation**.\n- Put-away directs worker to optimal bin.\n- Reconcile expected vs received quantities.\n- Support 50k carton scans/day per warehouse.`,
    breaks: `| Receive without ASN | Dock chaos; no expected qty |\n| Manual spreadsheet reconcile | Errors; slow supplier claims |\n| Single receive queue | Peak truck hours backlog |\n| Put-away rules in worker's head | Lost inventory in wrong bins |`,
    need: '**ASN ingestion pipeline**, **idempotent scan events**, **put-away rule engine**, **event-sourced inventory**, and **dock scheduling queue**.',
    mermaid: `flowchart TD
    Supplier["Supplier EDI / Portal"]
    ASN["ASN Ingest Service"]
    Dock["Dock Scheduler"]
    Receive["Receive Station<br/>(scan app)"]
    PutAway["Put-Away Engine"]
    Inv["Inventory Event Store"]
    Claim["Discrepancy / Claim Worker"]

    Supplier --> ASN --> Dock
    Dock --> Receive --> PutAway --> Inv
    Receive -->|short/over| Claim`,
    patterns: `| Ingest | [Pipeline](../Concurrency_patterns/07-pipeline.md), [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) | EDI → canonical ASN |
| Scans | [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Duplicate scan ignored |
| Inventory | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Receive events append-only |
| Scheduling | [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md), [Priority Queue](../Concurrency_patterns/) | Dock slots |
| Scale | [Sharding](../Scalability_patterns/03-sharding.md) | Per warehouse partition |`,
    flow: `1. Supplier sends **ASN** → expected pallets/cartons by SKU.\n2. **Dock scheduler** assigns door and time slot.\n3. Worker scans carton barcode → system validates against ASN → records receive event.\n4. **Put-away** suggests bin → worker confirms → inventory updated.`,
    failures: `| Failure | Response |\n| --- | --- |\n| ASN never arrived | Receive as blind; flag for reconciliation |\n| Duplicate scan | Idempotent on scanId |\n| Wrong bin put-away | Correct with adjustment event |\n| Over-receive vs PO | Hold for supervisor approval |`,
    ts: `async function receiveScan(warehouseId: string, scan: { barcode: string; dockId: string }) {
  const idKey = \`scan:\${scan.barcode}:\${scan.dockId}\`;
  if (!(await idempotency.tryClaim(idKey))) return { status: 'DUPLICATE' };
  const expected = await asn.lookup(warehouseId, scan.barcode);
  await inv.append({ type: 'CARTON_RECEIVED', warehouseId, sku: expected.sku, qty: expected.qty });
  const bin = await putAway.suggest(warehouseId, expected.sku);
  return { status: 'OK', suggestedBin: bin };
}`,
    links: '[Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Pipeline](../Concurrency_patterns/07-pipeline.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md) · [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md) · [Sharding](../Scalability_patterns/03-sharding.md)',
  },
  {
    file: '45-order-fulfillment-pick-pack-ship.md',
    title: 'Problem 45: Order Fulfillment — Pick-Pack-Ship (Amazon FC-Style)',
    porter: 'Operations',
    business: `E-commerce **fulfillment centers** pick items from bins, pack cartons, and hand off to carriers. Systems assign **pick waves**, prevent double-pick of the same inventory, and optimize pack station throughput.`,
    requirements: `- **No double-pick** of same bin qty for two orders.\n- Wave planning groups orders by cut-off time.\n- Pack scan validates all items before label print.\n- Handoff to carrier with tracking number.\n- 1M+ order lines/day per mega-FC.`,
    breaks: `| First-come DB update on bin qty | Race → oversell physical stock |\n| One picker one order always | Inefficient walking paths |\n| Pack without validation scan | Wrong item shipped |\n| Sync label API in pick loop | Pick station idle |`,
    need: '**Distributed lock / CAS on bin allocation**, **wave queue**, **saga order→pick→pack→ship**, **CQRS for FC dashboard**, and **bulkhead per zone**.',
    mermaid: `flowchart TD
    OMS["Order Management System"]
    Wave["Wave Planner"]
    Pick["Pick Assignment<br/>(zone workers)"]
    Bin["Bin Inventory<br/>(sharded by zone)"]
    Pack["Pack Station"]
    Ship["Ship / Label Service"]
    Carrier["Carrier API"]

    OMS --> Wave --> Pick
    Pick --> Bin
    Pick --> Pack --> Ship --> Carrier`,
    patterns: `| Allocation | [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md), compare-and-set | One pick per bin line |
| Lifecycle | [Saga](../Distributed_system_patterns/10-saga.md) | Pick → pack → ship |
| Planning | [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md), [Job Scheduler](./36-job-scheduler.md) | Wave batches |
| Visibility | [CQRS](../Scalability_patterns/06-cqrs.md) | FC ops dashboard |
| Resilience | [Bulkhead](../Resilience_Pattern/04-bulkhead.md), [Circuit Breaker](../Resilience_Pattern/01-circuit-breaker.md) | Carrier API isolated |`,
    flow: `1. Orders cut off → **wave planner** creates pick tasks by zone.\n2. Picker gets task list → scans bin + item → **CAS** decrements bin qty.\n3. Tote arrives at pack → scan validates all SKUs → print label.\n4. **Ship saga** commits → carrier tracking → OMS updated.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Bin empty (sync drift) | Exception pick; cycle count trigger |\n| Label API timeout | Retry; don't double-ship same carton |\n| Picker abandons task | Release allocation after TTL |\n| Damaged item at pack | Substitute or short-ship saga branch |`,
    ts: `async function confirmPick(taskId: string, binId: string, sku: string, qty: number) {
  const ok = await bins.compareAndDecrement(binId, sku, qty);
  if (!ok) throw new BinShortError(binId, sku);
  await pickTasks.complete(taskId, { binId, sku, qty });
  return { nextStop: await routing.packStation(taskId) };
}`,
    links: '[Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md) · [Saga](../Distributed_system_patterns/10-saga.md) · [CQRS](../Scalability_patterns/06-cqrs.md) · [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md) · [Bulkhead](../Resilience_Pattern/04-bulkhead.md)',
  },
  {
    file: '46-parcel-routing-network.md',
    title: 'Problem 46: Parcel Routing Network (FedEx / UPS-Style)',
    porter: 'Outbound Logistics',
    business: `National carriers move millions of parcels through **sort hubs** daily. Each package gets a **label**, **tracking scans** at hubs, and **route optimization** across the network to meet delivery promises.`,
    requirements: `- Generate shipping label in **< 500 ms**.\n- Tracking updates within **minutes** of each scan.\n- Route packages through optimal hub path.\n- Handle mis-sorts and re-route dynamically.\n- Peak season (holidays) 3× normal volume.`,
    breaks: `| Point-to-point routing only | Inefficient; misses hub economies |\n| Tracking in OLTP row per package | Write ceiling at peak |\n| Static routes | Can't recover from hub outage |\n| Label gen sync to rating API | Dock line stops |`,
    need: '**Hub graph routing**, **event stream for scans**, **materialized tracking view**, **async rating/label**, and **partition by region**.',
    mermaid: `flowchart TD
    Shipper["Shipper API"]
    Rate["Rating Service"]
    Label["Label Generator"]
    Origin["Origin Sort Hub"]
    Network["Hub Network Graph"]
    Scans["Scan Event Stream"]
    Track["Tracking Projection"]
    LastMile["Last-Mile Depot"]
    Customer["Customer Tracking Page"]

    Shipper --> Rate --> Label
    Label --> Origin --> Network --> LastMile
    Origin --> Scans
    Network --> Scans
    LastMile --> Scans
    Scans --> Track --> Customer`,
    patterns: `| Routing | [Graph routing](../Data_domain_patterns/), [Partitioning](../Scalability_patterns/02-partitioning.md) | Hub network |
| Scans | [Event Streaming](../Messaging_Integration_patterns/), [CQRS](../Scalability_patterns/06-cqrs.md) | Append scan; read track |
| Peak | [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md) | Buffer label requests |
| Resilience | [Circuit Breaker](../Resilience_Pattern/01-circuit-breaker.md), reroute rules | Hub down |
| Scale | [Sharding](../Scalability_patterns/03-sharding.md) | Package ID hash |`,
    flow: `1. Shipper requests label → **rate** by weight/zone → barcode assigned.\n2. Origin hub scan → event \`ARRIVED_HUB\` → routing decides next hop.\n3. Each hub scan appends to **event stream** → tracking projection updates.\n4. Last-mile depot → \`OUT_FOR_DELIVERY\` → customer sees ETA.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Mis-sort scan | Exception handler re-routes |\n| Hub outage | Precomputed alternate path table |\n| Lost package | Last-known-scan audit trail |\n| Duplicate scan | Idempotent on scanId |`,
    ts: `async function onHubScan(packageId: string, hubId: string, ts: number) {
  await scans.append({ packageId, hubId, ts, type: 'HUB_SCAN' });
  const nextHop = await router.nextHop(packageId, hubId);
  await tracking.project(packageId, { lastHub: hubId, nextHop, updatedAt: ts });
  return nextHop;
}`,
    links: '[Event Streaming](../Messaging_Integration_patterns/) · [CQRS](../Scalability_patterns/06-cqrs.md) · [Partitioning](../Scalability_patterns/02-partitioning.md) · [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md) · [Circuit Breaker](../Resilience_Pattern/01-circuit-breaker.md)',
  },
  {
    file: '47-crm-sales-pipeline.md',
    title: 'Problem 47: CRM & Sales Pipeline (Salesforce-Style)',
    porter: 'Marketing & Sales',
    business: `Sales teams manage **leads → opportunities → closed deals** in a shared CRM. Managers need pipeline forecasts, activity timelines, and assignment rules — without two reps working the same hot lead unknowingly.`,
    requirements: `- **Lead assignment** rules (round-robin, territory).\n- Opportunity **stage** history immutable.\n- Activity timeline (calls, emails) unified per account.\n- Forecast roll-up by team/region.\n- 10k sales users; mobile offline sync optional.`,
    breaks: `| Overwrite stage without history | Forecast lies; disputes |\n| No assignment lock | Two reps call same lead |\n| Activity in siloed tools | Incomplete customer view |\n| Forecast query on raw events | Timeouts on quarter close |`,
    need: '**Event-sourced opportunity stages**, **distributed assignment lock**, **CQRS forecast projections**, **timeline aggregation**, and **RBAC by territory**.',
    mermaid: `flowchart TD
    Rep["Sales Rep / Mobile"]
    CRM["CRM API"]
    Lead["Lead Service"]
    Opp["Opportunity Service<br/>(event sourced stages)"]
    Activity["Activity Timeline"]
    Assign["Assignment Engine"]
    Forecast["Forecast Projection<br/>(CQRS)"]
    Mgr["Manager Dashboard"]

    Rep --> CRM
    CRM --> Lead --> Assign
    CRM --> Opp --> Activity
    Opp --> Forecast --> Mgr`,
    patterns: `| Pipeline | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md), [State Machine](../Data_domain_patterns/) | Stage transitions |
| Assignment | [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md) | One owner per lead |
| Reads | [CQRS](../Scalability_patterns/06-cqrs.md), [Materialized View](../Data_domain_patterns/16-materialized-view.md) | Forecast dashboard |
| Security | [RBAC](../Security_patterns/), [ABAC](../Security_patterns/03-abac.md) | Territory access |
| Integrations | [Adapter](../Structural%20Patterns/Adapter.md) | Email/calendar sync |`,
    flow: `1. Web lead arrives → **assignment engine** picks rep by territory rule + lock.\n2. Rep qualifies → converts to **opportunity** at stage \`Discovery\`.\n3. Each stage change appends event → **forecast projection** recalculates.\n4. Manager views weighted pipeline by region.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Rep leaves mid-deal | Reassign saga; preserve history |\n| Duplicate lead import | Dedup on email + company domain |\n| Offline mobile edit | Conflict merge on sync; event ordering |\n| Forecast stale | Rebuild projection from event log |`,
    ts: `async function advanceStage(oppId: string, toStage: string, repId: string) {
  return lock.with(\`opp:\${oppId}\`, async () => {
    const opp = await opps.get(oppId);
    if (opp.ownerId !== repId) throw new ForbiddenError();
    await opps.appendEvent(oppId, { type: 'STAGE_CHANGED', from: opp.stage, to: toStage });
    await forecast.onStageChange(oppId, toStage, opp.amount);
  });
}`,
    links: '[Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [CQRS](../Scalability_patterns/06-cqrs.md) · [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md) · [Materialized View](../Data_domain_patterns/16-materialized-view.md) · [RBAC](../Security_patterns/)',
  },
  {
    file: '48-customer-support-helpdesk.md',
    title: 'Problem 48: Customer Support Helpdesk (Zendesk-Style)',
    porter: 'Service',
    business: `Support teams handle **tickets** from email, chat, and phone. Agents need context, **SLA timers**, escalation paths, and a **knowledge base**. Customers expect first response within minutes on premium tiers.`,
    requirements: `- **SLA clock** per ticket (first response, resolution).\n- Smart **routing** by skill, language, load.\n- Agent collision detection — two agents same ticket.\n- KB search **< 300 ms** while typing.\n- 100k tickets/day with burst on outages.`,
    breaks: `| Shared inbox email | Duplicate tickets; no SLA |\n| Round-robin only | Wrong skill agent assigned |\n| SLA checked by cron hourly | Breaches before anyone notices |\n| KB in same DB as tickets | Search slows ticket writes |`,
    need: '**Ticket state machine**, **priority queue routing**, **SLA scheduler**, **CQRS for KB search**, and **Pub/Sub for real-time agent UI**.',
    mermaid: `flowchart TD
    Customer["Customer<br/>(email, chat, web)"]
    Ingest["Ticket Ingest"]
    Ticket["Ticket Service<br/>(state machine)"]
    Router["Routing Engine<br/>(skill + load)"]
    SLA["SLA Timer Service"]
    Agent["Agent Workspace"]
    KB["Knowledge Base Search"]
    Escalate["Escalation Worker"]

    Customer --> Ingest --> Ticket
    Ticket --> Router --> Agent
    Ticket --> SLA
    SLA -->|breach| Escalate
    Agent --> KB`,
    patterns: `| Tickets | [State Machine](../Data_domain_patterns/), [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Open → pending → solved |
| Routing | [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md), [Priority Queue](../Concurrency_patterns/) | Skill queues |
| SLA | [Job Scheduler](./36-job-scheduler.md), [Event Notification](../Messaging_Integration_patterns/10-event-notification.md) | Deadline alerts |
| KB | [CQRS](../Scalability_patterns/06-cqrs.md), full-text index | Search separate from writes |
| Real-time | [Pub/Sub](../Messaging_Integration_patterns/08-pub-sub.md) | Agent sees new reply live |
| Collision | [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md) | One active editor |`,
    flow: `1. Customer email → **ingest** dedupes thread → ticket created, SLA clock starts.\n2. **Router** assigns to \`billing-en\` queue → agent with capacity picks up.\n3. Agent replies → first response SLA met → state \`PENDING\`.\n4. Customer replies → SLA resolution timer resets → notify assigned agent.`,
    failures: `| Failure | Response |\n| --- | --- |\n| SLA breach imminent | Escalate to senior queue + manager ping |\n| Agent disconnect mid-reply | Draft saved; lock released on TTL |\n| Outage spike | Load shed low-priority tiers; template auto-reply |\n| Duplicate ticket from email | Merge by Message-ID thread key |`,
    ts: `async function assignTicket(ticketId: string) {
  const ticket = await tickets.get(ticketId);
  const queue = await router.resolveQueue(ticket.tags, ticket.language);
  const agentId = await queue.nextAvailableAgent();
  await tickets.assign(ticketId, agentId);
  await sla.startResolutionTimer(ticketId, ticket.priority);
  await notify.push(agentId, { type: 'NEW_TICKET', ticketId });
}`,
    links: '[State Machine](../Data_domain_patterns/) · [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md) · [Job Scheduler](./36-job-scheduler.md) · [CQRS](../Scalability_patterns/06-cqrs.md) · [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md)',
  },
  {
    file: '49-returns-reverse-logistics.md',
    title: 'Problem 49: Returns & Reverse Logistics (RMA Platform)',
    porter: 'Margin (cross-value chain)',
    business: `E-commerce **returns** flow: customer requests RMA → ships item back → warehouse inspects → **refund or exchange** → restock or scrap. Fraud (wardrobing, empty box) and inventory accuracy must be controlled.`,
    requirements: `- **Refund saga** ties return receipt to original payment.\n- Serial / SKU validation against original order.\n- Restock only if resellable grade.\n- Return label generation and tracking.\n- Finance reconciliation for partial refunds.`,
    breaks: `| Refund before item received | Wardrobing fraud |\n| Restock without inspection | Damaged goods resold |\n| No link to original order | Wrong amount refunded |\n| Returns DB separate from inventory | Oversell returned stock |`,
    need: '**RMA state machine**, **refund saga**, **event-sourced inventory**, **fraud scoring**, and **Outbox to payment provider**.',
    mermaid: `flowchart TD
    Customer["Customer Portal"]
    RMA["RMA Service<br/>(state machine)"]
    Label["Return Label API"]
    WH["Warehouse Receive & Inspect"]
    Fraud["Return Fraud Scorer"]
    Refund["Refund Saga"]
    Pay["Payment Provider"]
    Inv["Inventory Adjust"]

    Customer --> RMA --> Label
    RMA --> WH
    WH --> Fraud
    WH -->|resellable| Inv
    WH --> Refund --> Pay`,
    patterns: `| Lifecycle | [Saga](../Distributed_system_patterns/10-saga.md), [State Machine](../Data_domain_patterns/) | Request → receive → refund |
| Payments | [Idempotency](../Distributed_system_patterns/20-idempotency.md), [Outbox](../Distributed_system_patterns/11-outbox-pattern.md) | Exactly-once refund |
| Inventory | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Restock events |
| Fraud | [Pipeline](../Concurrency_patterns/07-pipeline.md) | Risk score on receive |
| Link | See [Global Inventory Sync](./10-global-inventory-sync.md) | Cross-channel stock |`,
    flow: `1. Customer requests return for order line → **RMA** approved if within policy window.\n2. Return label issued → customer ships.\n3. Warehouse scans receipt → **inspect grade** A/B/scrap.\n4. Grade A → restock event + **refund saga** to original payment method.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Empty box received | Fraud flag; deny refund; customer notify |\n| Refund API fails | Outbox retry; RMA stays REFUND_PENDING |\n| Wrong item returned | Reject; RMA closed no refund |\n| Partial bundle return | Prorated refund calculation in saga |`,
    ts: `async function completeInspection(rmaId: string, grade: 'A' | 'B' | 'SCRAP') {
  const rma = await rmas.get(rmaId);
  if (grade === 'A') await inventory.restock(rma.sku, rma.qty, rma.warehouseId);
  const amount = grade === 'SCRAP' ? 0 : rma.refundAmount;
  if (amount > 0) {
    await refundSaga.start({ rmaId, paymentId: rma.paymentId, amount, idempotencyKey: rmaId });
  }
  await rmas.setStatus(rmaId, amount > 0 ? 'REFUNDED' : 'CLOSED');
}`,
    links: '[Saga](../Distributed_system_patterns/10-saga.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md) · [Outbox](../Distributed_system_patterns/11-outbox-pattern.md) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Pipeline](../Concurrency_patterns/07-pipeline.md)',
  },

  // ── FRANCHISE MODEL (50–62) ───────────────────────────────────────────────
  {
    file: '50-franchise-royalty-fee-engine.md',
    title: 'Problem 50: Franchise Royalty & Fee Engine',
    franchise: 'Revenue streams — royalties, initial fee, marketing fund',
    business: `The **franchisor** collects **initial franchise fees**, weekly **royalties** (% of gross sales), and **marketing fund** contributions from each **franchisee location**. Calculations must be auditable; franchisees dispute if POS totals don't match remittance.`,
    requirements: `- Royalty = **% of gross sales** per location per week.\n- Support **fee tiers** by agreement vintage.\n- **Idempotent** weekly billing per location + period.\n- Master franchise **split** (sub-franchise overrides).\n- Dispute workflow with POS reconciliation.`,
    breaks: `| Manual spreadsheet royalties | Errors; franchisee lawsuits |\n| Bill before POS ingest completes | Overcharge |\n| One rate for all locations | Wrong contract terms |\n| No audit trail | Can't defend in arbitration |`,
    need: '**Event-sourced sales ingest**, **materialized royalty projection**, **saga remittance**, **idempotent billing period**, and **hierarchical org tree**.',
    mermaid: `flowchart TD
    POS["Franchisee POS Sales Events"]
    Ingest["Sales Ingest<br/>(Anti-Corruption Layer)"]
    Calc["Royalty Calculator<br/>(per location contract)"]
    Ledger["Franchise Ledger<br/>(Event Sourced)"]
    Invoice["Weekly Remittance Invoice"]
    Pay["ACH / Payment Collection"]
    Dispute["Dispute Workflow"]

    POS --> Ingest --> Calc --> Ledger
    Ledger --> Invoice --> Pay
    Invoice --> Dispute`,
    patterns: `| Sales | [Event Streaming](../Messaging_Integration_patterns/), [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) | Normalize POS feeds |
| Billing | [Idempotency](../Distributed_system_patterns/20-idempotency.md), [Materialized View](../Data_domain_patterns/16-materialized-view.md) | One bill per period |
| Money | [Saga](../Distributed_system_patterns/10-saga.md), [Outbox](../Distributed_system_patterns/11-outbox-pattern.md) | Collect remittance |
| Hierarchy | [Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md) | Franchisor → franchisee → unit |
| Audit | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | See also [#6 Billing](./06-multi-tenant-saas-usage-billing.md) |`,
    flow: `1. Daily POS closes → sales events stream to **ingest** normalized by \`locationId\`.\n2. Weekly job aggregates gross per location → applies contract royalty % + ad fund %.\n3. **Remittance invoice** generated (idempotent \`locationId:week\`).\n4. ACH collected → ledger event → franchisee portal updated.`,
    failures: `| Failure | Response |\n| --- | --- |\n| POS feed delayed | Bill only after cutoff + grace window |\n| Franchisee dispute | Freeze collection; show line-level POS tie-out |\n| Master franchise split | Two ledger entries per collection |\n| Duplicate POS event | Idempotent on \`posTxnId\` |`,
    ts: `async function calculateWeeklyRoyalty(locationId: string, week: string) {
  const key = \`\${locationId}:\${week}\`;
  if (await idempotency.exists(key)) return idempotency.result(key);
  const contract = await contracts.get(locationId);
  const gross = await sales.sumGross(locationId, week);
  const royalty = gross * contract.royaltyRate;
  const adFund = gross * contract.adFundRate;
  const invoice = await ledger.createRemittance({ locationId, week, royalty, adFund, gross });
  await idempotency.save(key, invoice);
  return invoice;
}`,
    links: '[Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md) · [Saga](../Distributed_system_patterns/10-saga.md) · [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) · [Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md)',
  },
  {
    file: '51-brand-compliance-audit-platform.md',
    title: 'Problem 51: Brand Compliance & Audit Platform',
    franchise: 'Key activities — compliance, performance reporting',
    business: `Franchisors enforce **brand standards** via scheduled audits (mystery shop, field visit, photo checklist). Franchisees below threshold enter **corrective action**; repeat failures risk termination. Evidence (photos, scores) must be immutable.`,
    requirements: `- Audit **schedules** per location (quarterly, random).\n- Scoring rubric versioned by brand policy.\n- Photo/video evidence with timestamp + geo.\n- Corrective action workflow with deadlines.\n- HQ dashboard: compliance rate by region.`,
    breaks: `| Paper checklists | Lost evidence; no trends |\n| Score editable after submission | Franchisee disputes unfair |\n| No corrective action tracking | Repeat violations |\n| All audits sync on submit | App fails offline in store |`,
    need: '**Audit state machine**, **versioned rubrics**, **media pipeline**, **CQRS compliance dashboard**, and **Event Notification for deadlines**.',
    mermaid: `flowchart TD
    HQ["Franchisor HQ"]
    Schedule["Audit Scheduler"]
    Auditor["Auditor App<br/>(offline-capable)"]
    Score["Scoring Engine<br/>(versioned rubric)"]
    Media["Media Store + CDN"]
    CAP["Corrective Action Workflow"]
    Dash["Compliance Dashboard<br/>(CQRS)"]

    HQ --> Schedule --> Auditor
    Auditor --> Score --> Media
    Score -->|fail threshold| CAP
    Score --> Dash`,
    patterns: `| Workflow | [State Machine](../Data_domain_patterns/), [Saga](../Distributed_system_patterns/10-saga.md) | Audit → CAP → verify |
| Rubrics | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Policy version pinned per audit |
| Media | [Pipeline](../Concurrency_patterns/07-pipeline.md), [CDN](../Scalability_patterns/05-cdn.md) | Upload photos async |
| Offline | [Store-and-Forward](../Messaging_Integration_patterns/) | Submit when connected |
| Reporting | [CQRS](../Scalability_patterns/06-cqrs.md), [Materialized View](../Data_domain_patterns/16-materialized-view.md) | Regional roll-up |`,
    flow: `1. **Scheduler** assigns audit to location #4521 → auditor app downloads rubric v3.\n2. Auditor completes checklist offline → photos uploaded → **score** computed.\n3. Score < 80 → **corrective action** opened with 30-day deadline.\n4. Re-audit verifies fix → dashboard updates franchisee rating.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Photo upload fails | Queue locally; retry with idempotency |\n| Rubric updated mid-audit | Pin version at audit start |\n| Missed CAP deadline | Escalate to franchise consultant |\n| GPS mismatch | Flag audit for manual review |`,
    ts: `async function submitAudit(auditId: string, answers: Answer[], photos: string[]) {
  const audit = await audits.get(auditId);
  const rubric = await rubrics.getVersion(audit.rubricVersion);
  const score = rubric.score(answers);
  await audits.complete(auditId, { score, answers, photoIds: photos });
  if (score < rubric.passThreshold) {
    await cap.open({ locationId: audit.locationId, auditId, dueDays: 30 });
  }
  await complianceProjection.onAuditComplete(audit.locationId, score);
}`,
    links: '[State Machine](../Data_domain_patterns/) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [CQRS](../Scalability_patterns/06-cqrs.md) · [Pipeline](../Concurrency_patterns/07-pipeline.md) · [Saga](../Distributed_system_patterns/10-saga.md)',
  },
  {
    file: '52-franchise-training-certification-lms.md',
    title: 'Problem 52: Franchise Training & Certification LMS',
    franchise: 'Key resources — training, systems',
    business: `Franchisors publish **required training** (food safety, brand standards). Franchisee employees must **certify** before gaining POS or ops system access. Certs **expire** and require renewal.`,
    requirements: `- Course catalog controlled by HQ; localized content.\n- **Cert gating** — no POS login without valid cert.\n- Expiration reminders 30/7/1 days before.\n- Track completion by location and role.\n- Quiz anti-cheat basic (time limits, question pools).`,
    breaks: `| PDF emailed once | No proof of completion |\n| POS access not tied to cert | Uncertified staff operate register |\n| One global due date | Ignores hire date per employee |\n| Sync quiz submit | Timeout loses attempt |`,
    need: '**LMS progress state machine**, **Job Scheduler for expiry**, **RBAC integration with POS**, **Outbox notifications**, and **idempotent quiz submission**.',
    mermaid: `flowchart TD
    HQ["Franchisor LMS Admin"]
    Catalog["Course Catalog"]
    Learner["Franchisee Employee App"]
    Progress["Progress & Quiz Service"]
    Cert["Certification Registry"]
    RBAC["Access Gate<br/>(POS / ops systems)"]
    Notify["Reminder Worker"]

    HQ --> Catalog --> Learner --> Progress
    Progress --> Cert --> RBAC
    Cert --> Notify`,
    patterns: `| Progress | [State Machine](../Data_domain_patterns/) | Not started → passed → expired |
| Access | [RBAC](../Security_patterns/), [ABAC](../Security_patterns/03-abac.md) | Cert as attribute |
| Reminders | [Job Scheduler](./36-job-scheduler.md), [Event Notification](../Messaging_Integration_patterns/10-event-notification.md) | Expiry nudges |
| Submit | [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Quiz retry-safe |
| Content | [CDN](../Scalability_patterns/05-cdn.md) | Video modules |`,
    flow: `1. New hire at location → assigned **Food Safety 101** based on role.\n2. Employee completes modules + passes quiz → **cert** issued with expiry.\n3. **RBAC gate** enables POS login when cert valid.\n4. **Scheduler** sends renewal reminders before expiry.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Cert expires mid-shift | Grace read-only mode; manager override logged |\n| Quiz timeout | Idempotent resume from last question |\n| Course updated | Grandfather in-progress; new hires get v2 |\n| Fraudulent completion | Proctor flag; random spot checks |`,
    ts: `async function checkPosAccess(employeeId: string): Promise<boolean> {
  const required = await roles.requiredCerts(employeeId);
  const held = await certs.activeFor(employeeId);
  return required.every(r => held.some(c => c.courseId === r && c.expiresAt > Date.now()));
}`,
    links: '[State Machine](../Data_domain_patterns/) · [RBAC](../Security_patterns/) · [Job Scheduler](./36-job-scheduler.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md) · [Event Notification](../Messaging_Integration_patterns/10-event-notification.md)',
  },
  {
    file: '53-marketing-coop-fund-allocation.md',
    title: 'Problem 53: Marketing Co-op Fund Allocation',
    franchise: 'Revenue — marketing contributions; Channels — franchisor networks',
    business: `Franchisees contribute a **% of sales** to a national **advertising fund**. HQ plans campaigns (TV, digital, local co-op), allocates budget by region, and must prove **spend vs contribution** balance to franchisee council.`,
    requirements: `- Track **contributions** per location (linked to royalty engine).\n- Campaign budget allocation by DMA/region.\n- **Approve** local co-op spend requests from franchisees.\n- Prevent overspend vs allocated pool.\n- Transparency report per franchisee.`,
    breaks: `| Contributions tracked separately from spend | Fund insolvency |\n| Local co-op without approval | Brand inconsistency |\n| Manual Excel allocation | Franchisee trust issues |\n| No regional roll-up | Wrong market gets budget |`,
    need: '**Double-entry fund ledger**, **approval workflow**, **CQRS transparency reports**, **saga spend commit**, and **link to royalty ingest**.',
    mermaid: `flowchart TD
    Sales["POS Sales Events"]
    Contrib["Contribution Calculator"]
    Fund["Co-op Fund Ledger<br/>(double-entry)"]
    Plan["Campaign Planner"]
    Local["Local Co-op Request<br/>(franchisee)"]
    Approval["Approval Workflow"]
    Spend["Media Buy / Agency Adapter"]
    Report["Transparency Report<br/>(CQRS)"]

    Sales --> Contrib --> Fund
    Plan --> Fund
    Local --> Approval --> Spend --> Fund
    Fund --> Report`,
    patterns: `| Contributions | [Event Streaming](../Messaging_Integration_patterns/), link [#50 Royalties](./50-franchise-royalty-fee-engine.md) | Same sales feed |
| Ledger | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Contribute vs spend |
| Approval | [State Machine](../Data_domain_patterns/), [Saga](../Distributed_system_patterns/10-saga.md) | Request → approve → pay |
| Reports | [CQRS](../Scalability_patterns/06-cqrs.md), [Materialized View](../Data_domain_patterns/16-materialized-view.md) | Per-franchisee PDF |
| Integrations | [Adapter](../Structural%20Patterns/Adapter.md) | Agency invoices |`,
    flow: `1. Weekly sales → **ad fund contribution** credited to regional pool.\n2. HQ plans national TV buy → **debit** national pool with approval chain.\n3. Franchisee requests local billboard → regional manager **approves** → spend committed.\n4. Quarterly **transparency report** shows contribute vs benefit by DMA.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Pool insufficient | Reject spend; queue for next period |\n| Agency invoice mismatch | Hold payment; manual reconcile |\n| Duplicate contribution event | Idempotent on sales txn id |\n| Campaign cancelled | Credit back to pool via compensating entry |`,
    ts: `async function approveLocalSpend(requestId: string, approverId: string) {
  const req = await requests.get(requestId);
  const pool = await fund.balance(req.regionId);
  if (req.amount > pool.available) throw new InsufficientFundError();
  await fund.reserve(req.regionId, req.amount, requestId);
  await spendSaga.start({ requestId, amount: req.amount, vendorId: req.vendorId });
}`,
    links: '[Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Saga](../Distributed_system_patterns/10-saga.md) · [CQRS](../Scalability_patterns/06-cqrs.md) · [State Machine](../Data_domain_patterns/) · [Event Streaming](../Messaging_Integration_patterns/)',
  },
  {
    file: '54-hq-menu-pricing-promo-control.md',
    title: 'Problem 54: HQ Menu, Pricing & Promo Control',
    franchise: 'Value proposition — proven processes; franchisor → franchisee ops',
    business: `Franchisor **HQ controls the menu**, base prices, and national promos. Changes **push to all POS systems** with staged rollout (pilot regions first). Franchisees cannot override **restricted items** or pricing on core products.`,
    requirements: `- Menu version **immutable** once published.\n- Staged rollout: pilot → region → national.\n- **Rollback** within minutes if POS sync errors spike.\n- Promo windows with automatic start/end.\n- 10k locations; heterogeneous POS vendors.`,
    breaks: `| Email PDF menu update | Locations run old prices for weeks |\n| Big-bang national push | One bad price crashes brand |\n| Franchisee edits core SKU price | Channel conflict; margin loss |\n| Sync blocking POS checkout | Store can't sell during update |`,
    need: '**Versioned menu catalog**, **Pub/Sub staged rollout**, **Anti-Corruption Layer per POS**, **feature-flag-style rollback**, and **Event Sourcing menu history**.',
    mermaid: `flowchart TD
    HQ["Franchisor Menu Admin"]
    Catalog["Menu Catalog<br/>(versioned)"]
    Rollout["Rollout Controller<br/>(pilot → region → national)"]
    Hub["Sync Hub"]
    POSA["POS Adapter A"]
    POSB["POS Adapter B"]
    Monitor["Sync Error Monitor"]
    Rollback["Rollback Trigger"]

    HQ --> Catalog --> Rollout --> Hub
    Hub --> POSA
    Hub --> POSB
    POSA --> Monitor
    POSB --> Monitor
    Monitor -->|error spike| Rollback --> Catalog`,
    patterns: `| Versioning | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Menu history |
| Rollout | [Pub/Sub](../Messaging_Integration_patterns/08-pub-sub.md), staged flags | Pilot first |
| POS | [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md), [Adapter](../Structural%20Patterns/Adapter.md) | Vendor-specific sync |
| Safety | [Circuit Breaker](../Resilience_Pattern/01-circuit-breaker.md), [Rollback](../DevOps_Delivery_patterns/) | Auto revert |
| Promo | [Job Scheduler](./36-job-scheduler.md) | Timed start/end |`,
    flow: `1. HQ publishes **Menu v2025.06** with new combo price → pilot 50 locations.\n2. **Sync hub** pushes via POS adapters → ack per location.\n3. Error rate OK → expand to **Southeast region**.\n4. National rollout → promo **$5 box** auto-starts Monday 00:00 local.`,
    failures: `| Failure | Response |\n| --- | --- |\n| POS adapter timeout | Retry; location stays on previous version |\n| Error spike > 5% | **Rollback** to v2025.05 nationally |\n| Franchisee unauthorized edit | POS rejects; alert compliance |\n| Promo end missed | Scheduler force-end; audit log |`,
    ts: `async function publishMenu(version: MenuVersion, stage: 'PILOT' | 'REGION' | 'NATIONAL') {
  await catalog.publish(version);
  const locations = await rollout.resolveLocations(stage, version.pilotRegions);
  await hub.pushBatch(locations, version, { rollbackOnErrorRate: 0.05 });
}`,
    links: '[Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Pub/Sub](../Messaging_Integration_patterns/08-pub-sub.md) · [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) · [Circuit Breaker](../Resilience_Pattern/01-circuit-breaker.md) · [Job Scheduler](./36-job-scheduler.md)',
  },
  {
    file: '55-multi-unit-franchisee-dashboard.md',
    title: 'Problem 55: Multi-Unit Franchisee Dashboard',
    franchise: 'Structure — multi-unit development',
    business: `A **multi-unit franchisee** owns 40 locations. They need roll-up **sales, labor, food cost**, and compliance scores — plus ability to delegate access to **regional managers** per group of stores.`,
    requirements: `- Org tree: owner → regional mgr → location.\n- **Roll-up metrics** near real-time (hourly sales).\n- Compare units: same-store sales vs peer average.\n- RBAC: manager sees only their locations.\n- Export for lender / investor reporting.`,
    breaks: `| Flat location list | Can't delegate regional access |\n| Query all locations on every page load | Slow dashboard |\n| POS data not normalized | Apples-to-oranges comparison |\n| No materialized roll-ups | Timeout on 40-location P&L |`,
    need: '**Hierarchical multi-tenancy**, **CQRS roll-up projections**, **sharding by org subtree**, **POS normalization**, and **cache per org level**.',
    mermaid: `flowchart TD
    Owner["Multi-Unit Owner"]
    Portal["Franchisee Portal"]
    Org["Org Tree Service<br/>(owner → region → unit)"]
    POSIn["POS Ingest"]
    Proj["Roll-up Projections<br/>(hourly/daily)"]
    Compare["Unit Comparison Engine"]
    RBAC["RBAC / ABAC"]

    Owner --> Portal
    Portal --> RBAC --> Org
    POSIn --> Proj --> Compare
    Org --> Proj
    Portal --> Compare`,
    patterns: `| Hierarchy | [Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md), org tree sharding | Delegate access |
| Metrics | [CQRS](../Scalability_patterns/06-cqrs.md), [Materialized View](../Data_domain_patterns/16-materialized-view.md) | Pre-aggregated roll-ups |
| Ingest | [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) | Normalize POS |
| Security | [ABAC](../Security_patterns/03-abac.md) | Location-scoped roles |
| Speed | [Cache-Aside](../Scalability_patterns/04-cache-aside.md) | Hot dashboard queries |`,
    flow: `1. Owner logs in → **RBAC** resolves visible location set (all 40).\n2. **Projection** serves hourly sales roll-up from stream aggregates.\n3. Regional manager sees 12 locations → compares labor % vs brand benchmark.\n4. Owner exports QTD pack for lender — materialized view query.`,
    failures: `| Failure | Response |\n| --- | --- |\n| One location POS offline | Show stale badge; exclude from live total option |\n| Wrong org assignment | ABAC deny; audit admin change |\n| Projection lag | Display as-of timestamp |\n| Peer benchmark stale | Nightly recompute job |`,
    ts: `async function getRollup(orgNodeId: string, userId: string, metric: string, period: string) {
  const allowed = await rbac.locationsForUser(userId);
  const subtree = await org.subtree(orgNodeId).filter(id => allowed.includes(id));
  return projections.sum(metric, subtree, period);
}`,
    links: '[CQRS](../Scalability_patterns/06-cqrs.md) · [Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md) · [Materialized View](../Data_domain_patterns/16-materialized-view.md) · [ABAC](../Security_patterns/03-abac.md) · [Cache-Aside](../Scalability_patterns/04-cache-aside.md)',
  },
  {
    file: '56-territory-area-development.md',
    title: 'Problem 56: Territory & Area Development Manager',
    franchise: 'Structure — area development agreement',
    business: `Franchisor grants **exclusive territory** rights: franchisee must open **N locations by deadline** in a geographic area. System tracks **development schedule**, penalties, cannibalization rules, and competing territory overlap disputes.`,
    requirements: `- Territory defined by **polygon / zip list**.\n- Development schedule milestones with deadlines.\n- **Cannibalization check** on new site proposals.\n- Penalty calculation if under-developed.\n- Map view for franchisor development team.`,
    breaks: `| Handshake territory on map | Overlap disputes |\n| No milestone tracking | Missed openings undetected |\n| Approve site without geo check | Cannibalize existing franchisee |\n| Penalty calc manual | Inconsistent enforcement |`,
    need: '**Geospatial territory index**, **milestone state machine**, **overlap detection**, **Job Scheduler for deadline alerts**, and **audit trail**.',
    mermaid: `flowchart TD
    Dev["Area Developer Franchisee"]
    Proposal["Site Proposal"]
    Geo["Geospatial Territory Service"]
    Overlap["Overlap / Cannibalization Check"]
    Milestone["Development Milestone Tracker"]
    Penalty["Penalty Calculator"]
    Map["Franchisor Map Dashboard"]

    Dev --> Proposal --> Geo --> Overlap
    Proposal --> Milestone
    Milestone -->|missed deadline| Penalty
    Geo --> Map
    Milestone --> Map`,
    patterns: `| Territory | [Geospatial indexing](../Scalability_patterns/), [Partitioning](../Scalability_patterns/02-partitioning.md) | Polygons / zips |
| Milestones | [State Machine](../Data_domain_patterns/), [Job Scheduler](./36-job-scheduler.md) | Open-by dates |
| Overlap | [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md) | One exclusive claim |
| Disputes | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Territory grant history |
| Alerts | [Event Notification](../Messaging_Integration_patterns/10-event-notification.md) | Deadline warnings |`,
    flow: `1. Developer signs **area agreement** → territory polygon stored exclusive.\n2. Proposes site → **overlap check** vs existing locations + other territories.\n3. Approved site → **milestone** marked complete when store opens.\n4. Missed deadline → **penalty** invoice per contract formula.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Border zip dispute | Event-sourced grant; legal flag |\n| Store opens late 1 day | Grace per contract; auto vs manual penalty |\n| Territory resize | Migration saga; notify affected franchisees |\n| Duplicate proposal | Idempotent on address hash |`,
    ts: `async function checkSiteProposal(territoryId: string, lat: number, lng: number) {
  const conflicts = await geo.findConflicts(territoryId, lat, lng, { minDistanceKm: 3 });
  if (conflicts.length) return { approved: false, reason: 'CANNIBALIZATION', conflicts };
  return { approved: true };
}`,
    links: '[Partitioning](../Scalability_patterns/02-partitioning.md) · [State Machine](../Data_domain_patterns/) · [Job Scheduler](./36-job-scheduler.md) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Event Notification](../Messaging_Integration_patterns/10-event-notification.md)',
  },
  {
    file: '57-master-franchise-sub-franchising.md',
    title: 'Problem 57: Master Franchise Sub-Franchising Platform',
    franchise: 'Structure — master franchise (country/region)',
    business: `A **master franchisee** holds rights to a **country or region** and sells **sub-franchises**. Money flows split three ways: sub-franchisee → master → franchisor. Reporting, compliance, and fee rules differ per level.`,
    requirements: `- **Three-level hierarchy**: franchisor → master → sub-franchisee → unit.\n- Fee split rules per master agreement.\n- Master can onboard sub-franchisees with franchisor approval.\n- Consolidated reporting at each level.\n- Localized tax/compliance fields by country.`,
    breaks: `| Flat tenant model | Can't express master split |\n| Sub-franchisee pays franchisor direct | Breaks master economics |\n| One reporting schema globally | EU vs US field mismatch |\n| Approval bypass | Unauthorized sub-franchisees |`,
    need: '**Hierarchical tenancy**, **cascade fee saga**, **Anti-Corruption Layer for localization**, **delegated RBAC**, and **rollup CQRS at each tier**.',
    mermaid: `flowchart TD
    Franchisor["Global Franchisor HQ"]
    Master["Master Franchisee<br/>(country/region)"]
    Sub["Sub-Franchisee"]
    Unit["Operating Units"]
    Fee["Cascade Fee Engine"]
    Approval["Sub-Franchise Approval Workflow"]
    Report["Multi-Level Reporting<br/>(CQRS)"]

    Franchisor --> Master --> Sub --> Unit
    Unit --> Fee
    Fee --> Sub
    Fee --> Master
    Fee --> Franchisor
    Sub --> Approval --> Franchisor
    Unit --> Report
    Master --> Report
    Franchisor --> Report`,
    patterns: `| Hierarchy | [Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md) | 3-level tree |
| Fees | [Saga](../Distributed_system_patterns/10-saga.md), link [#50 Royalties](./50-franchise-royalty-fee-engine.md) | Split remittance |
| Localization | [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) | Country-specific fields |
| Governance | [State Machine](../Data_domain_patterns/), [RBAC](../Security_patterns/) | Approval chain |
| Reporting | [CQRS](../Scalability_patterns/06-cqrs.md), [Materialized View](../Data_domain_patterns/16-materialized-view.md) | Roll-up per tier |`,
    flow: `1. Master franchisee recruits sub-franchisee → **approval workflow** to franchisor.\n2. Sub-franchisee opens units → sales feed **fee engine**.\n3. Weekly: sub pays master share + franchisor royalty (single ACH **saga** splits).\n4. Each tier sees **dashboard** scoped to their subtree.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Split calculation dispute | Event-sourced fee breakdown per unit |\n| Master insolvency | Franchisor escrow policy per contract |\n| Cross-border payment fail | Compensating saga; retry local rail |\n| Unauthorized sub-franchise | Freeze unit; compliance review |`,
    ts: `async function splitWeeklyFees(unitId: string, week: string, gross: number) {
  const chain = await org.chainToRoot(unitId); // unit → sub → master → franchisor
  const rules = await contracts.feeChain(chain);
  return {
    subShare: gross * rules.subRate,
    masterShare: gross * rules.masterRate,
    franchisorShare: gross * rules.franchisorRate,
  };
}`,
    links: '[Multi-Tenant Partitioning](../Data_domain_patterns/21-multi-tenant-partitioning.md) · [Saga](../Distributed_system_patterns/10-saga.md) · [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) · [CQRS](../Scalability_patterns/06-cqrs.md) · [State Machine](../Data_domain_patterns/)',
  },
  {
    file: '58-franchise-site-selection-pipeline.md',
    title: 'Problem 58: Franchise Site Selection & Approval Pipeline',
    franchise: 'Key actions — site selection',
    business: `Prospective and existing franchisees propose **new locations**. Franchisor evaluates **demographics, traffic, competition**, lease terms, and brand fit before approving. Pipeline tracks from candidate site → LOI → lease signed → store opening.`,
    requirements: `- Site candidate with map pin + demographic report.\n- **Scoring model** (traffic, income, competition density).\n- Multi-step franchisor approval (dev → legal → final).\n- Milestone dates: LOI, lease, construction, grand opening.\n- Pipeline CRM for franchisor development reps.`,
    breaks: `| Email PDF site packages | Lost history; no scoring consistency |\n| Approve without demographic data | Bad locations fail |\n| No milestone tracking | Opening dates slip silently |\n| Franchisee sees other candidates' sites | Data leak |`,
    need: '**Pipeline state machine**, **geo demographic integration**, **scoring pipeline**, **RBAC per candidate**, and **Event Notification on stage change**.',
    mermaid: `flowchart TD
    Franchisee["Franchisee / Developer"]
    Submit["Site Candidate Submit"]
    Demo["Demographics API<br/>(traffic, income)"]
    Score["Site Scoring Engine"]
    Pipeline["Approval Pipeline<br/>(dev → legal → final)"]
    Milestone["Milestone Tracker<br/>(LOI → lease → open)"]
    CRM["Franchisor Dev CRM"]

    Franchisee --> Submit --> Demo --> Score --> Pipeline
    Pipeline --> Milestone --> CRM`,
    patterns: `| Pipeline | [State Machine](../Data_domain_patterns/), [Saga](../Distributed_system_patterns/10-saga.md) | Site lifecycle |
| Geo | [Adapter](../Structural%20Patterns/Adapter.md), geospatial | Demographics provider |
| Scoring | [Pipeline](../Concurrency_patterns/07-pipeline.md) | Weighted factors |
| Security | [ABAC](../Security_patterns/03-abac.md) | Candidate visibility |
| CRM | [CQRS](../Scalability_patterns/06-cqrs.md) | Rep pipeline views |
| Notify | [Event Notification](../Messaging_Integration_patterns/10-event-notification.md) | Stage change alerts |`,
    flow: `1. Franchisee submits candidate address → **demographics API** enriches traffic and income data.\n2. **Scoring engine** ranks site vs brand thresholds.\n3. Passes → **approval pipeline** (development → legal → COO).\n4. Approved → milestones tracked until **grand opening** links to location record.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Demographics API down | Queue scoring; manual override path |\n| Lease falls through | Return to pipeline \`SEARCHING\` state |\n| Score model update | Re-score open candidates optionally |\n| Duplicate address submit | Dedup hash; merge threads |`,
    ts: `async function scoreSite(candidateId: string) {
  const c = await candidates.get(candidateId);
  const demo = await demographics.enrich(c.lat, c.lng, c.radiusM);
  const score = scorer.evaluate({ ...c, ...demo });
  await candidates.update(candidateId, { score, demoSnapshot: demo });
  if (score >= scorer.threshold) await pipeline.advance(candidateId, 'DEV_REVIEW');
  return score;
}`,
    links: '[State Machine](../Data_domain_patterns/) · [Pipeline](../Concurrency_patterns/07-pipeline.md) · [Saga](../Distributed_system_patterns/10-saga.md) · [ABAC](../Security_patterns/03-abac.md) · [Event Notification](../Messaging_Integration_patterns/10-event-notification.md)',
  },
  {
    file: '59-approved-supplier-purchasing-portal.md',
    title: 'Problem 59: Approved Supplier & Franchisee Purchasing Portal',
    franchise: 'Key partners; Cost structure — approved vendors',
    business: `Franchisees must purchase ingredients and supplies from **approved suppliers** at **negotiated prices**. HQ may earn **rebates** on volume. Orders deliver to unit; off-contract purchasing triggers **compliance flags**.`,
    requirements: `- Catalog per brand with contract pricing tiers.\n- **Block** checkout with non-approved SKUs.\n- Volume rebate accrual to franchisor.\n- Delivery scheduling to franchisee location.\n- Integration with unit inventory (optional).`,
    breaks: `| Franchisee buys from local cash-and-carry | Brand inconsistency; lost rebates |\n| Static price PDF | Wrong prices; manual updates |\n| No compliance tracking | Food safety traceability gap |\n| Order without delivery slot | Stockout at unit |`,
    need: '**Approved catalog ACL**, **order saga**, **rebate accrual stream**, **supplier Adapter**, and **compliance event log**.',
    mermaid: `flowchart TD
    Franchisee["Franchisee Unit Manager"]
    Catalog["Approved Supplier Catalog"]
    Cart["Order Service"]
    Compliance["Contract Compliance Gate"]
    Supplier["Supplier Adapter<br/>(EDI/API)"]
    Rebate["Rebate Accrual Engine"]
    Delivery["Delivery Schedule"]
    Inv["Unit Inventory Optional"]

    Franchisee --> Catalog --> Cart --> Compliance
    Compliance --> Supplier --> Delivery
    Cart --> Rebate
    Delivery --> Inv`,
    patterns: `| Catalog | [RBAC](../Security_patterns/), approved SKU list | Block off-contract |
| Orders | [Saga](../Distributed_system_patterns/10-saga.md), [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Order → confirm → deliver |
| Suppliers | [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md), [Adapter](../Structural%20Patterns/Adapter.md) | EDI/API normalize |
| Rebates | [Event Streaming](../Messaging_Integration_patterns/) | Volume accrual |
| Inventory | Link [#10 Inventory Sync](./10-global-inventory-sync.md) | Receive at unit |`,
    flow: `1. Unit manager orders weekly produce from **approved catalog** at contract price.\n2. **Compliance gate** rejects any non-listed SKU.\n3. Order → **supplier adapter** → delivery slot confirmed.\n4. Receive goods → rebate accrual event to franchisor volume pool.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Supplier out of stock | Substitute SKU rules or partial ship saga |\n| Off-contract attempt | Block + compliance notification to franchisor |\n| Price mismatch vs contract | Hold order; use contracted price authority |\n| Delivery miss | Reschedule; SLA credit per policy |`,
    ts: `async function submitOrder(locationId: string, lines: OrderLine[]) {
  for (const line of lines) {
    if (!(await catalog.isApproved(line.sku))) throw new ComplianceError(line.sku);
  }
  const price = await catalog.contractPrice(locationId, lines);
  return orderSaga.start({ locationId, lines, price, idempotencyKey: hash(lines) });
}`,
    links: '[Saga](../Distributed_system_patterns/10-saga.md) · [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md) · [Event Streaming](../Messaging_Integration_patterns/) · [RBAC](../Security_patterns/)',
  },
  {
    file: '60-franchise-pos-aggregation-comp-sales.md',
    title: 'Problem 60: Franchise POS Aggregation & Same-Store Sales',
    franchise: 'Operations; performance reporting',
    business: `Franchisor HQ ingests **POS data from heterogeneous vendors** at 10k locations. Normalize SKU and compute **same-store sales (comp)** YoY for investor reporting and franchisee benchmarking.`,
    requirements: `- Ingest batch + near-real-time POS feeds.\n- **Normalize** SKU mapping across vendors.\n- Comp sales = locations open > 12 months.\n- HQ dashboard updated hourly.\n- Handle late-arriving POS files.`,
    breaks: `| Each POS custom report | Incomparable metrics |\n| Raw insert only | Comp calc wrong on calendar shift |\n| Sync nightly only | CEO sees stale numbers |\n| No late data handling | Restatements manual |`,
    need: '**Anti-Corruption Layer per POS**, **event stream ingest**, **materialized comp projections**, **idempotent file processing**, and **CQRS investor dashboard**.',
    mermaid: `flowchart TD
    POSA["POS Vendor A"]
    POSB["POS Vendor B"]
    Ingest["Ingest Hub<br/>(Anti-Corruption Layer)"]
    Stream["Sales Event Stream"]
    SKU["SKU Normalization Map"]
    Proj["Comp Sales Projection<br/>(CQRS)"]
    HQ["HQ Investor Dashboard"]
    Franchisee["Franchisee Benchmark View"]

    POSA --> Ingest
    POSB --> Ingest
    Ingest --> Stream --> SKU --> Proj
    Proj --> HQ
    Proj --> Franchisee`,
    patterns: `| Ingest | [Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md), [Pipeline](../Concurrency_patterns/07-pipeline.md) | Vendor formats |
| Stream | [Event Streaming](../Messaging_Integration_patterns/), [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Late file dedup |
| Normalize | [Adapter](../Structural%20Patterns/Adapter.md), SKU map versioning | Comparable metrics |
| Analytics | [CQRS](../Scalability_patterns/06-cqrs.md), [Materialized View](../Data_domain_patterns/16-materialized-view.md) | Comp sales roll-up |
| Link | [#50 Royalties](./50-franchise-royalty-fee-engine.md) | Same sales feed |`,
    flow: `1. Location closes day → POS vendor sends sales file → **ingest hub** normalizes.\n2. Events append to stream with \`locationId\`, \`normalizedSku\`, \`gross\`.\n3. **Projection** updates hourly comp: open > 12 mo vs prior year same calendar week.\n4. HQ investor dashboard and franchisee benchmark refreshed.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Late file for prior week | Idempotent restatement job |
| SKU map breaking change | Version map; dual-write period |
| Duplicate file delivery | Idempotent on file hash |
| New location grand opening | Comp eligibility starts month 13 |`,
    ts: `async function onNormalizedSale(event: NormalizedSaleEvent) {
  await stream.append(event);
  await compProjection.apply(event);
  if (event.isRestatement) await compProjection.rebuildWeek(event.locationId, event.week);
}`,
    links: '[Anti-Corruption Layer](../Distributed_system_patterns/15-anti-corruption-layer.md) · [Event Streaming](../Messaging_Integration_patterns/) · [CQRS](../Scalability_patterns/06-cqrs.md) · [Materialized View](../Data_domain_patterns/16-materialized-view.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md)',
  },
  {
    file: '61-franchise-consumer-app-loyalty.md',
    title: 'Problem 61: Franchise Consumer App & Cross-Location Loyalty',
    franchise: 'Channels — physical + online; Customer segments',
    business: `One **brand consumer app** finds nearest franchisee location, supports **mobile order**, and **loyalty points** earned/redeemed at **any participating unit**. Revenue must **attribute** to correct franchisee for royalty calculation.`,
    requirements: `- **Geo find nearest** open location.\n- Loyalty wallet works cross-location.\n- Order revenue **attributed** to fulfilling unit.\n- Promo national + local (with franchisor approval).\n- 10M users; peak lunch rush ordering.`,
    breaks: `| Loyalty siloed per store | Poor UX; low repeat visits |\n| National app without revenue attribution | Royalty disputes |\n| Mobile order overloads one unit API | Wrong store gets orders |\n| Points race on double-submit | Free food fraud |`,
    need: '**Geo discovery**, **loyalty saga**, **order routing to unit**, **idempotent checkout**, and **sales attribution stream** to royalty engine.',
    mermaid: `flowchart TD
    Consumer["Consumer App"]
    Geo["Find Nearest Unit<br/>(geo + open hours)"]
    Order["Mobile Order Service"]
    Unit["Franchisee Unit POS/Kitchen"]
    Loyalty["Loyalty Wallet Service"]
    Attr["Revenue Attribution Stream"]
    Royalty["Royalty Engine<br/>(#50)"]

    Consumer --> Geo --> Order --> Unit
    Consumer --> Loyalty
    Order --> Loyalty
    Order --> Attr --> Royalty`,
    patterns: `| Discovery | [Geospatial](../Scalability_patterns/), [Cache-Aside](../Scalability_patterns/04-cache-aside.md) | Nearest open unit |
| Orders | [Saga](../Distributed_system_patterns/10-saga.md), [Idempotency](../Distributed_system_patterns/20-idempotency.md) | Pay → fulfill → attribute |
| Loyalty | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | Points ledger |
| Peak | [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md) | Lunch rush |
| Link | [#54 Menu Control](./54-hq-menu-pricing-promo-control.md) | Prices from HQ |`,
    flow: `1. User opens app → **geo** finds nearest open unit with wait time estimate.\n2. Mobile order placed → routed to **unit kitchen queue** → payment captured.\n3. **Loyalty points** earned → wallet updated (valid at any unit).\n4. **Attribution event** → unit \`locationId\` → feeds royalty calc.`,
    failures: `| Failure | Response |\n| --- | --- |\n| Unit offline for mobile order | Route to next nearest; notify user |\n| Points double earn | Idempotent on orderId |\n| Wrong attribution | Saga reconcile with POS ticket id |\n| National promo + local override | [#54](./54-hq-menu-pricing-promo-control.md) price authority |`,
    ts: `async function placeMobileOrder(userId: string, locationId: string, cart: Cart, idempotencyKey: string) {
  if (await idempotency.exists(idempotencyKey)) return idempotency.result(idempotencyKey);
  const order = await orderSaga.start({ userId, locationId, cart });
  await loyalty.earn(userId, order.points, { idempotencyKey: order.id });
  await attribution.emit({ locationId, orderId: order.id, gross: order.total });
  await idempotency.save(idempotencyKey, order);
  return order;
}`,
    links: '[Saga](../Distributed_system_patterns/10-saga.md) · [Idempotency](../Distributed_system_patterns/20-idempotency.md) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Queue-Based Load Leveling](../Scalability_patterns/09-queue-based-load-leveling.md) · [Cache-Aside](../Scalability_patterns/04-cache-aside.md)',
  },
  {
    file: '62-franchise-sales-fdd-pipeline.md',
    title: 'Problem 62: Franchise Sales & FDD Pipeline',
    franchise: 'Key activities — scale the franchise network',
    business: `Franchisor **development team** converts leads into signed franchisees. Pipeline: lead → discovery day → **FDD** delivery → signing → **opening timeline**. CRM tracks candidates, territories reserved, and conversion metrics.`,
    requirements: `- Lead capture from web, brokers, events.\n- **FDD** (Franchise Disclosure Document) delivery tracked legally.\n- Territory **soft hold** during due diligence.\n- Pipeline stages with forecasted signings.\n- Handoff to operations when store opens.`,
    breaks: `| Spreadsheet pipeline | Lost leads; no FDD audit trail |\n| No territory hold | Two candidates same market |\n| FDD sent without tracking | Legal exposure |\n| Sales and ops disconnected | Signed deal but no opening plan |`,
    need: '**CRM state machine**, **document delivery audit**, **territory soft lock**, **handoff saga to ops**, and **CQRS sales forecast**.',
    mermaid: `flowchart TD
    Lead["Lead Sources<br/>(web, broker, event)"]
    CRM["Franchise Sales CRM"]
    Discovery["Discovery Day Scheduler"]
    FDD["FDD Delivery & Acknowledgment"]
    Territory["Territory Soft Hold"]
    Sign["Signing Workflow"]
    Handoff["Opening Handoff Saga"]
    Ops["Operations / [#58 Site Pipeline](./58-franchise-site-selection-pipeline.md)"]

    Lead --> CRM --> Discovery --> FDD --> Sign
    CRM --> Territory
    Sign --> Handoff --> Ops`,
    patterns: `| Pipeline | [State Machine](../Data_domain_patterns/), link [#47 CRM](./47-crm-sales-pipeline.md) | Candidate stages |
| Legal | [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) | FDD delivery proof |
| Territory | [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md), link [#56 Territory](./56-territory-area-development.md) | Soft hold |
| Handoff | [Saga](../Distributed_system_patterns/10-saga.md) | Sales → ops |
| Forecast | [CQRS](../Scalability_patterns/06-cqrs.md) | Weighted pipeline |`,
    flow: `1. Lead enters CRM → assigned franchise development rep.\n2. Qualified → **discovery day** → **FDD** sent with read receipt tracked.\n3. **Territory soft hold** placed during due diligence window.\n4. Signed → **handoff saga** creates franchisee record + kicks **site selection** pipeline.`,
    failures: `| Failure | Response |\n| --- | --- |\n| FDD not acknowledged | Block signing stage transition |\n| Territory hold expires | Notify rep; release or renew |
| Candidate drops | Release hold; archive with reason |
| Duplicate lead | Merge by email; preserve activity history |`,
    ts: `async function advanceCandidate(candidateId: string, toStage: string) {
  const c = await crm.get(candidateId);
  if (toStage === 'SIGNED' && !c.fddAcknowledgedAt) throw new LegalGateError('FDD_NOT_ACK');
  if (toStage === 'DILIGENCE') await territory.softHold(c.territoryId, candidateId, { days: 90 });
  await crm.appendStage(candidateId, toStage);
  if (toStage === 'SIGNED') await handoffSaga.start({ candidateId });
}`,
    links: '[State Machine](../Data_domain_patterns/) · [Event Sourcing](../Data_domain_patterns/15-event-sourcing.md) · [Saga](../Distributed_system_patterns/10-saga.md) · [Distributed Lock](../Distributed_system_patterns/21-distributed-lock.md) · [CQRS](../Scalability_patterns/06-cqrs.md)',
  },
];

function render(p) {
  const tag = p.porter ? `\n> **Porter Value Chain:** ${p.porter}\n` : p.franchise ? `\n> **Franchise Model:** ${p.franchise}\n` : '';
  return `# ${p.title}
${tag}
## Business Problem
${p.business}

## Hard Requirements
${p.requirements}

## Why One Pattern Is Not Enough
| If you only use… | What breaks |
| --- | --- |
${p.breaks}

You need ${p.need}

## Architecture Overview
\`\`\`mermaid
${p.mermaid}
\`\`\`

## Pattern Mix
| Concern | Patterns | Role |
| --- | --- | --- |
${p.patterns}

## Happy-Path Flow
${p.flow}

## Failure Scenarios
${p.failures}

## TypeScript Sketch
\`\`\`typescript
${p.ts}
\`\`\`

## Patterns Used (quick links)
${p.links}
`;
}

for (const p of problems) {
  const filePath = path.join(outDir, p.file);
  fs.writeFileSync(filePath, render(p));
  console.log('Created:', p.file);
}
console.log(`Done. ${problems.length} files.`);
