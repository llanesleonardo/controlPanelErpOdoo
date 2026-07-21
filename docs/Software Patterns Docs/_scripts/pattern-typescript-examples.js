'use strict';

const PATTERN_TS_EXAMPLES = {
  '01-api-gateway.md': `app.use('/api/*', async (req, res) => {
  const token = req.headers.authorization;
  if (!auth.verify(token)) return res.status(401).end();
  return proxy.web(req, res, { target: serviceFor(req.path) });
});
// Mobile App Gateway:`,
  '01-ci-cd-pipeline.md': `const stages = ['checkout', 'install', 'test', 'build', 'deploy'] as const;
for (const stage of stages) {
  const ok = await runStage(stage);
  if (!ok) throw new Error(\`Pipeline failed at \${stage}\`);
}`,
  '01-circuit-breaker.md': `let failures = 0;
async function callRemote() {
  if (failures >= 5) throw new Error('Open');
  try { return await rpc(); } catch (e) { failures++; throw e; }
}
// Payment Provider Outage:`,
  '01-client-server.md': `// Client
const client = { async getOrders() { return fetch('/api/orders').then(r => r.json()); } };
// Server
app.get('/api/orders', (_req, res) => res.json(db.orders.findAll()));
// Client-Server Architecture
app.listen(3000);`,
  '01-conway-s-law-alignment.md': `// Team boundaries mirror service boundaries
const teams = {
  'cell-testing': ['telemetry-svc', 'daq-svc'],
  'billing': ['invoice-svc', 'payments-svc'],
};
// Checkout Team Owns Checkout Boundary:`,
  '01-mvc.md': `class TodoController {
  constructor(private model: TodoModel) {}
  add(text: string) { this.model.add(text); return this.model.all(); }
}
const view = { render(todos: string[]) { todos.forEach(t => console.log(t)); } };
// Server-Rendered Web App:`,
  '01-producer-consumer.md': `const queue: Task[] = [];
function producer(task: Task) { queue.push(task); }
async function consumer() {
  while (queue.length) await process(queue.shift()!);
}
producer({ id: 1 }); consumer();`,
  '01-publish-subscribe.md': `const bus = new EventEmitter();
bus.on('order.placed', notifyWarehouse);
bus.on('order.placed', sendReceiptEmail);
bus.emit('order.placed', { orderId: '99' });
// Order Events:
// subscribers handle the event independently`,
  '01-rag-retrieval-augmented-generation.md': `async function answer(question: string, docs: string[]) {
  const chunks = docs.flatMap(d => d.split('. '));
  const hits = chunks.filter(c => question.split(' ').some(w => c.includes(w)));
  const context = hits.slice(0, 3).join(' ');
  return fetch('/llm', { method: 'POST', body: JSON.stringify({ question, context }) });
}`,
  '01-repository.md': `interface OrderRepository { findById(id: string): Promise<Order | null>; save(o: Order): Promise<void>; }
class SqlOrderRepo implements OrderRepository {
  findById(id) { return db.query('SELECT * FROM orders WHERE id=\$1', [id]); }
  save(o) { return db.query('INSERT INTO orders VALUES (\$1)', [o]); }
}
const repo: OrderRepository = new SqlOrderRepo();
await repo.save({ id: 'O-42', status: 'draft' });`,
  '01-stateless-services.md': `class OrderApi {
  // No local session state — any replica can serve any request
  async create(req: Request) {
    const order = { ...req.body, id: crypto.randomUUID() };
    await db.orders.insert(order);
    return order;
  }
}`,
  '01-zero-trust.md': `app.use(async (req, res, next) => {
  const identity = await verifyToken(req);
  const device = await attestDevice(req);
  if (!identity || !device.trusted) return res.status(403).end();
  next();
});`,
  '02-bounded-context.md': `// Shipping context vs Billing context — separate models
namespace Shipping { export class Order { trackingId: string; } }
namespace Billing { export class Order { invoiceId: string; } }
// Customer in Sales vs Billing:
const order = new Order();
// Bounded Context defines a boundary where a domain model, language, an...`,
  '02-circuit-breaker.md': `class CircuitBreaker {
  state: 'closed' | 'open' = 'closed';
  async call<T>(fn: () => Promise<T>) {
    if (this.state === 'open') throw new Error('Circuit open');
    try { return await fn(); } catch { this.state = 'open'; throw; }
  }
}`,
  '02-gitops.md': `// Desired state in git; controller reconciles cluster
const desired = yaml.parse(fs.readFileSync('k8s/deployment.yaml'));
const actual = await k8s.get('Deployment', 'api');
if (!deepEqual(desired, actual)) await k8s.apply(desired);
// Kubernetes Deployment:
// GitOps uses Git as the source of truth for desired system state, with...`,
  '02-immutable-infrastructure.md': `// Never patch running servers — replace entire image
const deployment = {
  image: 'api:v1.2.3',
  replace: (newImage: string) => ({ ...deployment, image: newImage, instances: rollout(newImage) }),
};
// Golden VM Image:`,
  '02-microservices.md': `const orderSvc = 'http://orders:3001';
const inventorySvc = 'http://inventory:3002';
async function placeOrder(item: string) {
  const stock = await fetch(\`\${inventorySvc}/check?item=\${item}\`);
  if (!stock.ok) throw new Error('Out of stock');
  return fetch(\`\${orderSvc}/orders\`, { method: 'POST', body: JSON.stringify({ item }) });
}`,
  '02-multi-agent-orchestration.md': `type Agent = { role: string; run: (task: string) => Promise<string> };
const agents: Agent[] = [
  { role: 'researcher', run: async t => search(t) },
  { role: 'writer', run: async t => draft(t) },
];
const brief = await agents[0].run('battery degradation');
const report = await agents[1].run(brief);`,
  '02-mvvm.md': `class SearchViewModel {
  query = '';
  get results() { return catalog.filter(p => p.name.includes(this.query)); }
  setQuery(q: string) { this.query = q; notify('results'); }
}
// Form Screen:`,
  '02-partitioning.md': `const partitions = { east: dbEast, west: dbWest };
function partitionFor(customerId: string) {
  return customerId.startsWith('E') ? partitions.east : partitions.west;
}
await partitionFor('E-1001').orders.insert({ id: 'O-1', total: 99 });`,
  '02-queue.md': `const queue = new Queue('jobs');
await queue.send({ type: 'export', userId: 'u1' });
const msg = await queue.receive();
await process(msg); await queue.ack(msg);
// Email Queue:
// A Queue stores messages until consumers are ready to process them, us...`,
  '02-rbac.md': `const roles = { admin: ['read', 'write', 'delete'], viewer: ['read'] };
function authorize(user: User, action: string) {
  return roles[user.role]?.includes(action) ?? false;
}
// Admin Dashboard:
authorize();`,
  '02-retry.md': `for (let attempt = 1; attempt <= 3; attempt++) {
  try { return await upload(chunk); }
  catch (e) { if (attempt === 3) throw e; }
}
// Database Deadlock:
// Retry repeats a failed operation when the failure is likely temporary.`,
  '02-thread-pool.md': `class ThreadPool {
  private queue: (() => Promise<void>)[] = [];
  constructor(private size: number) { for (let i = 0; i < size; i++) this.worker(); }
  submit(job: () => Promise<void>) { this.queue.push(job); }
  private async worker() { while (true) { const job = await this.dequeue(); await job(); } }
}`,
  '02-unit-of-work.md': `class UnitOfWork {
  private newOrders: Order[] = [];
  registerNew(o: Order) { this.newOrders.push(o); }
  async commit() { await db.transaction(async tx => { for (const o of this.newOrders) await tx.insert(o); }); }
}
// Order Checkout:`,
  '03-abac.md': `function canAccess(user: User, resource: Resource) {
  return user.dept === resource.ownerDept && user.clearance >= resource.classification;
}
// Document Access:
canAccess();
// Attribute-Based Access Control makes authorization decisions using at...`,
  '03-aggregate.md': `class Order { // aggregate root
  private lines: LineItem[] = [];
  addLine(item: LineItem) { if (this.status !== 'draft') throw new Error('Locked'); this.lines.push(item); }
  total() { return this.lines.reduce((s, l) => s + l.price, 0); }
}
// Order Aggregate:`,
  '03-auto-scaling.md': `function evaluate(metrics: Metrics) {
  if (metrics.cpu > 70) return { action: 'scale-out', desired: metrics.instances + 2 };
  if (metrics.cpu < 30) return { action: 'scale-in', desired: Math.max(1, metrics.instances - 1) };
  return { action: 'noop', desired: metrics.instances };
}
// CPU-Based Scaling:`,
  '03-mvp.md': `class ProfilePresenter {
  constructor(private view: ProfileView) {}
  load() { this.view.show(this.api.fetchProfile()); }
  save(data: Profile) { this.api.update(data).then(() => this.view.toast('Saved')); }
}
// Legacy Web Form:`,
  '03-producer-consumer.md': `const channel = new MessageChannel<{ cellId: string; voltage: number }>();
channel.subscribe('telemetry', async (reading) => await persist(reading));
channel.publish('telemetry', { cellId: 'C-1', voltage: 3.7 });`,
  '03-retry.md': `async function withRetry<T>(fn: () => Promise<T>, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); } catch (e) { if (i === attempts - 1) throw e; }
  }
  throw new Error('unreachable');
}`,
  '03-sharding.md': `const shards = [db0, db1, db2];
const shard = (userId: string) => shards[parseInt(userId.slice(-2), 16) % shards.length];
await shard('user-7f3a').insert('events', { type: 'page_view' });`,
  '03-soa.md': `interface OrderService { create(dto: OrderDto): Promise<OrderId>; }
interface BillingService { invoice(orderId: OrderId): Promise<void>; }
class OrderFacade {
  constructor(private orders: OrderService, private billing: BillingService) {}
  async checkout(dto: OrderDto) { const id = await this.orders.create(dto); await this.billing.invoice(id); }
}`,
  '03-team-topologies.md': `const topology = {
  streamAligned: ['product-team'],
  platform: ['k8s-team'],
  enabling: ['security-coaches'],
  complicatedSubsystems: ['ml-team'],
};`,
  '03-timeout.md': `const result = await Promise.race([
  fetch('/api/data'),
  sleep(3000).then(() => { throw new Error('Timeout'); }),
]);
// HTTP Client Timeout:
// Timeout limits how long a caller waits for an operation before treati...`,
  '03-tool-calling.md': `const tools = { getWeather: (city: string) => fetch(\`/weather?city=\${city}\`) };
async function agent(prompt: string) {
  const plan = await llm(prompt, { tools: Object.keys(tools) });
  if (plan.tool) return tools[plan.tool](...plan.args);
  return plan.text;
}`,
  '03-trunk-based-development.md': `// Short-lived branches merge to main daily
git checkout main && git pull;
git checkout -b feat/small-change;
// ... commit ...
git push && gh pr create --merge-when-ready;
// Small Daily Commits:`,
  '03-worker-queue.md': `const { Worker } = require('worker_threads');
const workers = Array.from({ length: 4 }, () => new Worker('./parse.js'));
function enqueue(buffer: Buffer) {
  const w = workers[jobCount++ % workers.length];
  w.postMessage(buffer);
}`,
  '04-blue-green-deployment.md': `const blue = { version: 'v1', traffic: 0 };
const green = { version: 'v2', traffic: 100 };
function switchTraffic() {
  blue.traffic = 100; green.traffic = 0; // instant cutover after green is verified
}
// Web App Release:`,
  '04-branch-by-abstraction.md': `interface Storage { save(data: Blob): Promise<void>; }
let storage: Storage = new LocalDiskStorage(); // swap to S3Storage behind interface
async function archive(data: Blob) { await storage.save(data); }
// Payment Provider Replacement:
await archive();
// concrete adapter implements the port at the boundary`,
  '04-bulkhead.md': `const critical = pLimit(20);
const batch = pLimit(5);
await critical(() => paymentSvc.charge(order));
await batch(() => reportSvc.generate(order));
// Separate Thread Pools:
// Bulkhead isolates resources so one failing or overloaded area does no...`,
  '04-entity.md': `class Cell {
  constructor(public readonly id: string, private serial: string) {}
  equals(other: Cell) { return this.id === other.id; } // identity by id, not attributes
}
// Customer Entity:
const cell = new Cell();`,
  '04-event-driven-architecture.md': `eventBus.on('OrderPlaced', async (e) => await inventory.reserve(e.items));
eventBus.on('OrderPlaced', async (e) => await shipping.schedule(e.address));
eventBus.emit('OrderPlaced', { orderId: 'O-1', items: ['cell-pack'], address: 'Lab A' });
// Event-Driven Architecture
// subscribers handle the event independently
// Event-Driven Architecture uses events to notify parts of the system t...`,
  '04-flux.md': `const dispatcher = createDispatcher();
const store = createStore(reducer, { todos: [] });
dispatcher.register(store.handleAction);
dispatcher.dispatch({ type: 'ADD_TODO', text: 'Calibrate DAQ' });
render(<TodoList todos={store.getState().todos} />);`,
  '04-oauth2.md': `const authUrl = \`\${issuer}/authorize?client_id=\${clientId}&redirect_uri=\${redirectUri}&response_type=code&scope=calendar.read\`;
const { code } = await getCallbackCode(authUrl);
const { access_token } = await exchangeCodeForToken(code);
const events = await fetch('https://calendar/api/events', {
  headers: { Authorization: \`Bearer \${access_token}\` },
});`,
  '04-planner-executor.md': `async function run(goal: string) {
  const steps = await planner.decompose(goal); // ['fetch data', 'analyze', 'summarize']
  let state = {};
  for (const step of steps) state = await executor.run(step, state);
  return state.summary;
}`,
  '04-platform-teams.md': `const platform = {
  deploy: (svc: string) => ci.deploy(svc),
  observe: (svc: string) => grafana.dashboard(svc),
};
await platform.deploy('orders-api');
await platform.observe('orders-api');`,
  '04-reactor.md': `const reactor = new EventEmitter();
const handlers = new Map<number, (data: Buffer) => void>();
reactor.on('readable', (fd) => handlers.get(fd)?.(read(fd)));
function register(fd: number, handler: (data: Buffer) => void) { handlers.set(fd, handler); }`,
  '04-replication.md': `await primary.write(record);
for (const replica of replicas) replica.replicate(record);
const record = { id: 'r-1', payload: data };
const view = await replicas[0].read(record.id);`,
  '04-request-reply.md': `const reply = await bus.request<{ available: boolean }>('inventory.check', { sku: 'CELL-18650' }, { timeout: 5000 });
if (!reply.available) throw new Error('Out of stock');
await orders.reserve({ sku: 'CELL-18650', qty: 1 });`,
  '04-retry-with-backoff.md': `async function retryBackoff<T>(fn: () => Promise<T>) {
  for (let i = 0; i < 5; i++) {
    try { return await fn(); }
    catch (e) { await sleep(2 ** i * 100); if (i === 4) throw e; }
  }
}`,
  '05-bulkhead.md': `const paymentPool = pLimit(10);
const searchPool = pLimit(50);
await paymentPool(() => paymentSvc.charge(order));
await searchPool(() => searchSvc.query(order.customerId));`,
  '05-canary-deployment.md': `const routes = [
  { version: 'v2', weight: 10 },
  { version: 'v1', weight: 90 },
];
function pickVersion() {
  return Math.random() < 0.1 ? 'v2' : 'v1';
}`,
  '05-cdn.md': `const assetUrl = (file: string) => \`https://cdn.example.com/assets/\${hash(file)}.js\`;
res.set('CDN-Cache-Control', 'max-age=86400');
res.redirect(302, assetUrl('bundle.js'));`,
  '05-fail-fast.md': `function withdraw(account: Account, amount: number) {
  if (account.balance < amount) throw new InsufficientFundsError();
  account.balance -= amount;
}
// Startup Dependency Check:
withdraw();`,
  '05-hexagonal-architecture.md': `interface OrderRepo { save(o: Order): Promise<void>; }
class PlaceOrder {
  constructor(private repo: OrderRepo) {}
  async execute(cmd: PlaceOrderCmd) { await this.repo.save(new Order(cmd)); }
}
// Adapter implements OrderRepo with Postgres`,
  '05-infrastructure-as-code.md': `import * as aws from '@pulumi/aws';
const bucket = new aws.s3.Bucket('app-logs', { versioning: { enabled: true } });
export const bucketName = bucket.id;`,
  '05-message-broker.md': `await broker.connect();
await broker.publish('orders', Buffer.from(JSON.stringify({ orderId: '42' })));
await broker.consume('orders', async (msg) => { await handleOrder(msg); broker.ack(msg); });`,
  '05-openid-connect.md': `const claims = await verifyIdToken(idToken, { audience: clientId, issuer });
const session = { userId: claims.sub, email: claims.email as string };
req.session.user = session;`,
  '05-proactor.md': `async function proactorRead(socket: Socket) {
  const buf = await socket.read(); // OS completes I/O, then completion handler runs
  await handleRequest(buf);
  proactorRead(socket); // re-arm
}
// Async File I/O:`,
  '05-redux.md': `const store = createStore(cartReducer);
store.dispatch({ type: 'cart/add', payload: { sku: 'CELL-18650', qty: 2 } });
const items = store.getState().cart.items;`,
  '05-reflection-pattern.md': `async function solve(task: string) {
  let answer = await agent(task);
  const critique = await agent(\`Review: \${answer}. List flaws.\`);
  if (critique.includes('flaw')) answer = await agent(\`Fix: \${critique}\`);
  return answer;
}`,
  '05-shared-services.md': `const shared = { auth: identitySvc, logging: logSvc };
orders.init({ auth: shared.auth, log: shared.logging });
billing.init({ auth: shared.auth, log: shared.logging });`,
  '05-value-object.md': `class Voltage {
  constructor(private readonly millivolts: number) {
    if (millivolts < 0) throw new Error('Invalid');
  }
  equals(other: Voltage) { return this.millivolts === other.millivolts; }
}`,
  '06-capability-based-architecture.md': `const capabilities = {
  'capture-telemetry': ['daq-ingest', 'signal-processing'],
  'reporting': ['report-builder', 'export'],
};
// Map business capabilities to systems, not org charts
// Commerce Capabilities:`,
  '06-clean-architecture.md': `// Domain — no framework imports
class Transfer { constructor(public from: string, public amount: number) {} }
// Use case
class TransferFunds {
  constructor(private accounts: AccountGateway) {}
  execute(t: Transfer) { return this.accounts.move(t.from, t.amount); }
}`,
  '06-component-based-architecture.md': `function Dashboard({ user }: { user: User }) {
  return (
  <>
    <Header user={user} />
    <MetricsPanel />
    <AlertsList />
  </>
  );
}`,
  '06-cqrs.md': `await commandBus.send(new PlaceOrder({ customerId: 'C-1', total: 99 }));
const summary = await queryBus.ask(new GetOrderSummary('O-42'));`,
  '06-domain-service.md': `class CycleCalculator {
  // Stateless domain logic that doesn't belong on Entity or VO
  estimateLife(cycles: Cycle[], chemistry: Chemistry): number {
    return chemistry.baseLife - cycles.filter(c => c.depth > 80).length * 10;
  }
}`,
  '06-federated-identity.md': `const profile = await saml.validate(assertion);
const user = await directory.provisionOrUpdate({ id: profile.nameId, email: profile.email });
req.user = user;`,
  '06-fork-join.md': `async function analyze(channels: number[]) {
  const parts = await Promise.all(channels.map(ch => forkCompute(ch)));
  return parts.reduce((sum, v) => sum + v, 0); // join
}
// Parallel Array Sum:
await analyze();`,
  '06-graceful-degradation.md': `async function getRecommendations(userId: string) {
  try { return await mlSvc.recommend(userId); }
  catch { return staticFallback.for(userId); }
}
// Product Page Without Recommendations:
await getRecommendations();`,
  '06-memory-augmented-agent.md': `class AgentMemory {
  private store = new Map<string, string>();
  recall(key: string) { return this.store.get(key); }
  remember(key: string, value: string) { this.store.set(key, value); }
}
const mem = new AgentMemory();
mem.remember('user-pref', 'metric units');
const reply = await agent(query, mem.recall('user-pref'));`,
  '06-message-bus.md': `bus.registerHandler('CreateInvoice', billing.handle);
bus.registerHandler('CreateInvoice', analytics.track);
bus.send({ type: 'CreateInvoice', orderId: '42' });`,
  '06-observability.md': `const span = tracer.startSpan('placeOrder');
try { await orderSvc.create(dto); span.setStatus({ code: 'OK' }); }
catch (e) { span.recordException(e); throw e; }
finally { span.end(); }
// API Latency Diagnosis:
// Observability makes system behavior understandable from external sign...`,
  '06-rolling-deployment.md': `async function rollingUpdate(instances: Instance[], newImage: string) {
  for (const inst of instances) {
    await inst.replace(newImage);
    await healthCheck(inst);
  }
}`,
  '06-sidecar.md': `const sidecar = { log: (r: Request) => shipToCollector(r), encrypt: (b: Buffer) => tls.wrap(b) };
app.use((req, _res, next) => { sidecar.log(req); next(); });`,
  '07-api-token-gateway.md': `app.use('/api', (req, res, next) => {
  const token = req.headers['x-api-key'];
  if (!tokens.validate(token)) return res.status(401).end();
  req.scopes = tokens.scopes(token);
  next();
});`,
  '07-centralized-logging.md': `logger.info({ service: 'orders', traceId, orderId: 'O-42', msg: 'created' });
// shipped to ELK/Datadog — query all services by traceId`,
  '07-dead-letter-queue.md': `try { await process(msg); await queue.ack(msg); }
catch (e) { await dlq.send({ original: msg, error: String(e), attempts: msg.attempts + 1 }); }`,
  '07-domain-driven-design.md': `class Cycle extends AggregateRoot {
  complete() {
    if (this.status !== 'running') throw new DomainError('Not running');
    this.apply(new CycleCompleted(this.id));
  }
}`,
  '07-event-driven-agents.md': `const bus = new EventEmitter();
bus.on('ticket.created', async (e) => await triageAgent.handle(e));
bus.on('ticket.escalated', async (e) => await supervisorAgent.handle(e));
bus.emit('ticket.created', { id: 'T-42', body: 'Cell voltage drift' });
// Incident Triage Agent:
// subscribers handle the event independently`,
  '07-fallback.md': `async function getRate(pair: string) {
  try { return await primaryFx.get(pair); }
  catch { return await cache.get(pair) ?? defaultRate(pair); }
}
// Cached Response:
await getRate();`,
  '07-feature-flags.md': `const flags = { newDashboard: process.env.FF_NEW_DASHBOARD === 'true' };
function renderHome(user: User) {
  return flags.newDashboard ? newDashboard(user) : legacyDashboard(user);
}
// Gradual Feature Rollout:
renderHome();`,
  '07-micro-frontends.md': `const shell = { mount(el: HTMLElement) {
  import('orders/App').then(m => m.mount(el.querySelector('#orders')!));
  import('billing/App').then(m => m.mount(el.querySelector('#billing')!));
}};
// E-Commerce Frontend:
// Micro Frontends split a frontend into independently owned and deploya...`,
  '07-onion-architecture.md': `// Core
interface DomainEvent { type: string; }
// Application
class ApplyCycleStart {
  constructor(private repo: CycleRepo, private events: EventPublisher) {}
  async run(id: string) { const c = await this.repo.get(id); c.start(); await this.events.publish(c.events); }
}`,
  '07-pipeline.md': `function pipeline<T>(input: T[], ...stages: Array<(v: T) => T>) {
  return stages.reduce((data, stage) => data.map(stage), input);
}
const rows = pipeline(rawCsv, parseRow, validate, normalize);
for (const batch of chunk(rows, 100)) await db.insert(batch);`,
  '07-read-replica.md': `const writes = db.primary();
const reads = db.replica();
const uid = 'user-42';
await writes.insert({ userId: uid, total: 199 });
const list = await reads.query('SELECT * FROM orders WHERE user_id=\$1', [uid]);
// reads hit replica; writes go to primary`,
  '07-service-discovery.md': `const registry = new Consul();
async function call(service: string) {
  const instances = await registry.resolve(service);
  const target = loadBalance(instances);
  return fetch(\`http://\${target.host}:\${target.port}/\`);
}`,
  '07-specification.md': `class HighTempSpec implements Spec<BatteryReading> {
  isSatisfiedBy(r: BatteryReading) { return r.tempC > 45; }
}
const alerts = readings.filter(r => new HighTempSpec().isSatisfiedBy(r));
// EligibleForDiscount:
// Specification encapsulates a business rule or query predicate so it c...`,
  '08-agent-supervisor.md': `class Supervisor {
  constructor(private workers: Worker[]) {}
  async delegate(task: string) {
    const worker = this.workers.find(w => w.canHandle(task))!;
    const result = await worker.run(task);
    if (!result.ok) return this.delegate(task); // re-route
    return result;
  }
}`,
  '08-competing-consumers.md': `const consumers = Array.from({ length: 4 }, () => worker(async () => {
  const msg = await queue.pop();
  if (msg) await handle(msg);
}));
// Email Workers:
// Competing Consumers use multiple consumers reading from the same queu...`,
  '08-distributed-cache.md': `let product = await memcached.get('product:42');
if (!product) { product = await db.products.load('42'); await memcached.set('product:42', product, 600); }`,
  '08-distributed-tracing.md': `const parent = trace.getActiveSpan();
const child = tracer.startSpan('inventory.check', { parent });
child.setAttribute('sku', sku);
await inventory.check(sku);
child.end();
// Checkout Trace:`,
  '08-event-storming.md': `const board = { events: ['TestStarted', 'VoltageRecorded', 'AnomalyDetected', 'TestCompleted'] };
const commands = [{ name: 'StartTest', triggers: 'TestStarted' }];
const policies = [{ when: 'AnomalyDetected', then: 'NotifyEngineer' }];`,
  '08-futures-and-promises.md': `const price = fetchQuote('AAPL');
const rate = fetchFx('USD', 'EUR');
const [p, r] = await Promise.all([price, rate]);
console.log(p * r);
// Async HTTP Request:
// A Future represents a result that will be available later; a Promise ...`,
  '08-identity-map.md': `class IdentityMap {
  private cache = new Map<string, Entity>();
  get(id: string, loader: () => Entity) { return this.cache.get(id) ?? this.cache.set(id, loader()).get(id)!; }
}
// Customer Session Cache:
const identityMap = new IdentityMap();`,
  '08-infrastructure-as-code.md': `const cluster = new K8sCluster('prod', { nodes: 3, region: 'us-east-1' });
new Deployment('api', { image: 'api:1.0', replicas: 3, cluster });`,
  '08-jwt.md': `const token = jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn: '1h' });
const payload = jwt.verify(token, secret) as { sub: string; role: string };
if (payload.role !== 'admin') throw new Error('Forbidden');`,
  '08-leader-election.md': `async function campaign(nodeId: string) {
  const lease = await etcd.grant(5);
  const ok = await etcd.put('/leader', nodeId, { lease });
  if (ok) runAsLeader(); else runAsFollower();
}
// Scheduled Job Coordinator:`,
  '08-load-shedding.md': `app.use((req, res, next) => {
  if (load.avg > 0.9) return res.status(503).send('Overloaded');
  next();
});
// Reject Low-Priority Requests:
// Load Shedding intentionally rejects or drops some work when the syste...`,
  '08-observer.md': `class Observable<T> {
  private subs = new Set<(v: T) => void>();
  subscribe(fn: (v: T) => void) { this.subs.add(fn); return () => this.subs.delete(fn); }
  next(v: T) { this.subs.forEach(fn => fn(v)); }
}
// Form Field Updates:`,
  '08-pipe-and-filter.md': `const pipeline = [parseCsv, validateRows, normalizeUnits, insertDb];
function run(data: string) {
  return pipeline.reduce((acc, filter) => filter(acc), data);
}
run(rawTelemetryExport);
// Pipe and Filter Architecture`,
  '09-anti-corruption-layer.md': `class ErpAcl {
  importCustomer(raw: ErpRow): Customer {
    return Customer.create(raw.CUST_NAME, mapRegion(raw.REGION_CD));
  }
}
// ERP Integration:`,
  '09-async-await.md': `async function loadDashboard(userId: string) {
  const user = await db.users.find(userId);
  const orders = await db.orders.byUser(userId);
  return { user, orders };
}
// API Call Flow:`,
  '09-backpressure.md': `async function* produce() { while (true) yield await readSensor(); }
for await (const reading of produce()) {
  if (!consumer.ready) await sleep(10); // slow producer when consumer lags
  await consumer.send(reading);
}
// Streaming Pipeline:`,
  '09-broker-architecture.md': `class MessageBroker {
  private subs = new Map<string, Handler[]>();
  subscribe(topic: string, h: Handler) { (this.subs.get(topic) ??= []).push(h); }
  publish(topic: string, msg: unknown) { this.subs.get(topic)?.forEach(h => h(msg)); }
}
// Broker Architecture`,
  '09-consensus.md': `function raftVote(term: number, candidate: string) {
  if (term > currentTerm) { currentTerm = term; votedFor = candidate; return true; }
  return false;
}
// Distributed Database Replication:
raftVote();`,
  '09-defense-in-depth.md': `// Layered controls: WAF + auth + input validation + encryption
const safe = validator.sanitize(input);
if (!authz(user, action)) throw forbidden();
await db.encryptedInsert(safe);
// Web Application Security:
// Defense in Depth uses multiple independent security layers so one con...`,
  '09-event-streaming.md': `const stream = kafka.consumer('telemetry');
for await (const event of stream) {
  await projector.apply(event);
}
// Clickstream Analytics:
// Event Streaming stores ordered streams of events that consumers can r...`,
  '09-health-checks.md': `app.get('/health', async (_req, res) => {
  const dbOk = await db.ping();
  const status = dbOk ? 200 : 503;
  res.status(status).json({ status: dbOk ? 'ok' : 'degraded', checks: { db: dbOk } });
});
// Liveness Probe:`,
  '09-human-in-the-loop.md': `async function approveAction(action: Action) {
  if (action.risk === 'high') {
    const approved = await ui.prompt(\`Approve \${action.type}?\`);
    if (!approved) throw new Error('Rejected by human');
  }
  return execute(action);
}`,
  '09-lazy-loading.md': `class Order {
  private _lines?: LineItem[];
  get lines() { return this._lines ??= db.loadLines(this.id); } // loaded on first access
}
// Customer Orders:
const order = new Order();`,
  '09-queue-based-load-leveling.md': `app.post('/jobs', (req, res) => { queue.push(req.body); res.status(202).end(); });
setInterval(() => workers.drain(queue, 10), 1000);`,
  '09-sidecar.md': `// Pod: app container + logging sidecar shares volume
const pod = {
  containers: [
    { name: 'api', image: 'api:latest' },
    { name: 'log-shipper', image: 'fluent-bit', mounts: ['/var/log'] },
  ],
};`,
  '09-state-container.md': `const store = createContainer({ count: 0 });
store.setState((s) => ({ count: s.count + 1 }));
const Count = () => <span>{store.useState().count}</span>;`,
  '10-bastion-host.md': `// SSH only through bastion — private subnet not reachable directly
const cmd = \`ssh -J bastion.prod.internal app-server.internal\`;
exec(cmd);`,
  '10-chain-of-thought-pipelines.md': `async function reason(problem: string) {
  const steps: string[] = [];
  let thought = problem;
  for (let i = 0; i < 3; i++) {
    thought = await llm(\`Step \${i + 1}: \${thought}\`);
    steps.push(thought);
  }
  return llm(\`Given \${steps.join(' -> ')}, final answer:\`);
}`,
  '10-data-mapper.md': `class OrderMapper {
  toDomain(row: OrderRow): Order { return new Order(row.id, row.status); }
  toPersistence(o: Order): OrderRow { return { id: o.id, status: o.status }; }
}
// Order Mapper:
const orderMapper = new OrderMapper();`,
  '10-double-buffer.md': `let front: Frame = renderA();
let back: Frame = renderB();
function swap() { [front, back] = [back, front]; display(front); }
requestAnimationFrame(() => { back = computeNext(back); swap(); });
// Graphics Rendering:
// Double Buffer uses two buffers so one can be read/displayed while the...`,
  '10-elastic-scaling.md': `autoscaler.on('metrics', m => {
  if (m.cpu > 75) k8s.scale('api', m.replicas + 1);
  if (m.cpu < 25) k8s.scale('api', Math.max(2, m.replicas - 1));
});
// CPU-Based API Scaling:
// Elastic Scaling automatically adds or removes capacity based on demand.`,
  '10-event-notification.md': `bus.publish('CustomerRegistered', { customerId: 'c1' });
bus.on('CustomerRegistered', (e) => crm.sync(e.customerId));`,
  '10-peer-to-peer.md': `class Peer {
  private peers = new Set<Peer>();
  broadcast(msg: Message) { for (const p of this.peers) p.receive(msg); }
  receive(msg: Message) { if (!this.seen.has(msg.id)) { this.seen.add(msg.id); this.broadcast(msg); } }
}
// Peer-to-Peer Architecture`,
  '10-saga.md': `async function orderSaga(order: Order) {
  try { await payment.charge(order); await inventory.reserve(order); await shipping.book(order); }
  catch { await payment.refund(order); await inventory.release(order); }
}
// Order Checkout:
await orderSaga();`,
  '10-self-healing-systems.md': `watch(pods, (pod) => {
  if (pod.restarts > 3) k8s.replace(pod);
  if (!pod.ready) k8s.restart(pod);
});
// Container Restart:
// Self-Healing Systems automatically detect failure and take corrective...`,
  '10-service-mesh.md': `mesh.configure('payments', { trafficPolicy: { retries: 3, timeout: '2s' }, security: { mtls: 'STRICT' } });
const response = await mesh.call('payments', '/charge', { amount: 99 });`,
  '10-virtual-dom.md': `const vdom = h('ul', {}, items.map(i => h('li', { key: i.id }, i.label)));
const patches = diff(oldVdom, vdom);
patch(domNode, patches);`,
  '10-watchdog.md': `const watchdog = setInterval(() => {
  if (Date.now() - lastHeartbeat > 5000) process.exit(1);
}, 1000);
function heartbeat() { lastHeartbeat = Date.now(); }
// Process Watchdog:
heartbeat();`,
  '11-active-record.md': `class User extends ActiveRecord {
  static table = 'users';
  async save() { return db.upsert(User.table, this); }
  static find(id: string) { return db.get(User.table, id); }
}
// User Active Record:`,
  '11-chaos-testing.md': `describe('resilience', () => {
  it('survives pod kill', async () => {
    await k8s.killRandomPod('orders');
    await expect.poll(() => api.health()).toBe('ok');
  });
});`,
  '11-checkpointing.md': `let offset = await store.get('offset') ?? 0;
for (const batch of stream.from(offset)) {
  await process(batch);
  offset += batch.length;
  await store.set('offset', offset);
}`,
  '11-cqrs.md': `// Command side
async function createOrder(cmd: CreateOrder) { await writeDb.insert(cmd); await eventStore.append(cmd); }
// Query side
async function getOrderView(id: string) { return readDb.orders.find(id); }
// CQRS - Command Query Responsibility Segregation
await createOrder();`,
  '11-dmz.md': `// Public DMZ hosts reverse proxy; app tier in private network
const nginxDMZ = { proxy: (path: string, target: string) => ({ path, upstream: target }) };
nginxDMZ.proxy('/api', 'http://internal-api:8080');
// only DMZ subnet accepts inbound traffic from the internet
const appTier = 'http://internal-api:8080'; // private — not routable publicly
// Public Web Tier:`,
  '11-event-carried-state-transfer.md': `bus.publish('OrderUpdated', { orderId: '42', status: 'shipped', lines: [{ sku: 'X', qty: 1 }], total: 199.99 });`,
  '11-multi-level-cache.md': `async function get(key: string) {
  return l1.get(key) ?? (await l2.get(key)) ?? (await db.fetch(key));
}`,
  '11-multi-region-deployment.md': `const regions = ['us-east-1', 'eu-west-1', 'ap-south-1'];
function route(user: User) {
  const nearest = geo.nearest(user.lat, user.lng, regions);
  return endpoints[nearest];
}
// Active-Passive DR:`,
  '11-outbox-pattern.md': `async function createOrder(o: Order) {
  await db.transaction(async tx => {
    await tx.insert('orders', o);
    await tx.insert('outbox', { type: 'OrderCreated', payload: o });
  });
}
// Relay publishes outbox rows to message bus`,
  '11-readers-writers-lock.md': `class RwLock {
  private readers = 0; private writer = false;
  async read<T>(fn: () => T) { this.readers++; try { return fn(); } finally { this.readers--; } }
  async write<T>(fn: () => T) { await this.acquireWrite(); try { return fn(); } finally { this.writer = false; } }
}
// Configuration Store:`,
  '11-vector-search-architecture.md': `async function semanticSearch(query: string, index: VectorIndex) {
  const embedding = await embed(query);
  const neighbors = await index.query(embedding, { topK: 5 });
  return neighbors.map(n => ({ text: n.metadata.text, score: n.score }));
}
// Document Q&A:`,
  '12-barrier.md': `const barrier = new Barrier(3);
async function worker(id: number) {
  await compute(id);
  await barrier.await(); // all 3 workers meet here
  await finalize(id);
}`,
  '12-cdn.md': `app.get('/static/*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=31536000');
  res.sendFile(path.join(cdnOrigin, req.path));
});
// Static Asset Delivery:
app.listen(3000);`,
  '12-content-based-router.md': `function route(msg: Message) {
  if (msg.headers.type === 'urgent') return urgentQueue;
  if (msg.body.region === 'EU') return euQueue;
  return defaultQueue;
}
// Order Region Routing:`,
  '12-data-locality.md': `function route(request: Request) {
  const region = request.headers['x-region'];
  return datacenters[region] ?? nearestDatacenter(request.geo);
}
// Regional Processing:
route();`,
  '12-event-sourcing.md': `const events: DomainEvent[] = [];
function apply(cmd: Command) { events.push({ type: cmd.type, payload: cmd }); }
function rebuild(id: string) {
  return events.filter(e => e.payload.id === id).reduce((state, e) => project(state, e), {});
}
// Event Sourcing`,
  '12-heartbeat.md': `setInterval(() => ws.send(JSON.stringify({ type: 'ping', ts: Date.now() })), 3000);
ws.on('message', (m) => { if (JSON.parse(String(m)).type === 'pong') lastSeen = Date.now(); });`,
  '12-inbox-pattern.md': `async function handleMessage(msg: Message) {
  if (await inbox.exists(msg.id)) return; // already processed
  await process(msg);
  await inbox.markProcessed(msg.id);
}
// Payment Event Consumer:`,
  '12-progressive-delivery.md': `const rollout = { stable: 90, canary: 10 };
async function route(req: Request) {
  return Math.random() * 100 < rollout.canary ? canary.handle(req) : stable.handle(req);
}
// Canary Release:
await route();`,
  '12-secrets-vault.md': `const dbPassword = await vault.read('secret/data/db');
const conn = connect({ password: dbPassword });
await conn.ping();
// credentials never live in source control or env files
await ordersRepo.query(conn);
vault.rotate('secret/data/db');`,
  '12-semantic-routing.md': `const routes = [
  { intent: 'billing', handler: billingAgent },
  { intent: 'technical', handler: supportAgent },
];
async function route(message: string) {
  const intent = await classifyIntent(message);
  return routes.find(r => r.intent === intent)!.handler.run(message);
}`,
  '12-transaction-script.md': `async function transferFunds(from: string, to: string, amount: number) {
  await db.begin();
  try { await db.debit(from, amount); await db.credit(to, amount); await db.commit(); }
  catch (e) { await db.rollback(); throw e; }
}
// Create Invoice Script:`,
  '13-edge-computing.md': `addEventListener('fetch', (event) => {
  const cache = caches.default;
  event.respondWith(cache.match(event.request).then(hit => hit ?? fetch(event.request)));
});
// Edge Authentication:
// Edge Computing moves computation closer to users, devices, or data so...`,
  '13-envelope-encryption.md': `const dek = crypto.randomBytes(32);
const encrypted = encrypt(data, dek);
const wrappedDek = kms.encrypt(dek);
store({ ciphertext: encrypted, wrappedKey: wrappedDek });
// Object Storage Encryption:
// Envelope Encryption encrypts data with a data encryption key, then en...`,
  '13-failover.md': `const primary = 'db-primary';
const secondary = 'db-secondary';
async function query(sql: string) {
  try { return await db[primary].query(sql); }
  catch { return await db[secondary].query(sql); }
}`,
  '13-message-filter.md': `const highValue = stream.filter(m => m.type === 'OrderCreated' && m.payload.total > 1000);
highValue.forEach(m => priorityQueue.send(m));`,
  '13-semaphore.md': `const sem = new Semaphore(5); // max 5 concurrent DB connections
async function query(sql: string) {
  await sem.acquire();
  try { return await db.query(sql); } finally { sem.release(); }
}
// Database Connections:`,
  '13-serverless-architecture.md': `export const handler = async (event: S3Event) => {
  for (const record of event.Records) {
    const data = await s3.getObject(record.s3.object.key);
    await dynamo.put({ id: record.s3.object.key, parsed: parse(data) });
  }
};`,
  '13-strangler-fig.md': `function route(req: Request) {
  if (req.path.startsWith('/legacy')) return legacy.handle(req);
  if (req.path.startsWith('/v2')) return modern.handle(req);
  return legacy.handle(req); // gradually shift routes to modern
}
// Legacy Monolith Migration:`,
  '13-table-module.md': `const Orders = {
  table: 'orders',
  findByCustomer(custId: string) { return db.query(\`SELECT * FROM \${this.table} WHERE customer_id=\$1\`, [custId]); },
};
const rows = await Orders.findByCustomer('cust-9');
// one module per table — logic grouped by table, not entity`,
  '14-active-active.md': `const nodes = ['dc-a', 'dc-b'];
async function write(key: string, value: string) {
  await Promise.all(nodes.map(n => replicas[n].put(key, value)));
}
// Multi-Region Active-Active API:
await write();`,
  '14-actor-model.md': `class InboxActor {
  private messages: Mail[] = [];
  async receive(msg: Mail) { this.messages.push(msg); await this.processNext(); }
  private async processNext() { const m = this.messages.shift(); if (m) await handle(m); }
}
// Chat Room Actor:`,
  '14-aggregator.md': `const pending = new Map<string, Partial<Order>>();
function onFragment(msg: Fragment) {
  const agg = { ...pending.get(msg.correlationId), ...msg.data };
  if (agg.complete) deliver(agg);
  else pending.set(msg.correlationId, agg);
}`,
  '14-ambassador-pattern.md': `class LoggingAmbassador {
  constructor(private remote: RemoteService) {}
  async call(req: Request) {
    logger.info('outbound', req);
    return this.remote.invoke(req);
  }
}`,
  '14-cell-based-architecture.md': `const cells = { 'cell-us': usCluster, 'cell-eu': euCluster };
function assignTenant(tenantId: string) {
  const cell = hash(tenantId) % 2 === 0 ? 'cell-us' : 'cell-eu';
  return cells[cell];
}
// Tenant Cells:`,
  '14-domain-model.md': `class Shipment {
  ship() {
    if (this.weight.exceeds(this.carrier.limit)) throw new Error('Too heavy');
    this.status = 'shipped';
    this.events.push(new ShipmentDispatched(this.id));
  }
}`,
  '14-secure-gateway.md': `gateway.use(rateLimit, waf, oauth);
gateway.route('/payments', { target: paymentsSvc, mtls: true });
const response = await gateway.forward(inboundRequest);
// single ingress enforces auth, WAF, and mTLS before backend
return response;
audit.log({ gateway: 'secure-ingress', path: inboundRequest.path });`,
  '14-space-based-architecture.md': `class ProcessingUnit {
  private grid = new Map<string, Order>();
  process(order: Order) { this.grid.set(order.id, order); this.replicate(order); }
  replicate(order: Order) { peers.forEach(p => p.grid.set(order.id, order)); }
}
// Space-Based Architecture`,
  '15-active-passive.md': `let active: 'primary' | 'standby' = 'primary';
async function serve(req: Request) {
  const node = active === 'primary' ? primary : standby;
  if (!node.healthy) { active = 'standby'; return standby.handle(req); }
  return node.handle(req);
}`,
  '15-anti-corruption-layer.md': `class LegacyBillingAcl {
  toDomain(raw: LegacyInvoice): Invoice {
    return { id: raw.INV_NO, amount: parseFloat(raw.AMT_USD) };
  }
}
// Legacy CRM Integration:`,
  '15-availability-zones.md': `const azs = ['az-a', 'az-b', 'az-c'];
const replicas = azs.map(az => deploy({ zone: az, replicas: 2 }));
loadBalancer.route(replicas);`,
  '15-event-sourcing.md': `type Event = { type: string; payload: unknown };
const stream: Event[] = [];
function fold(events: Event[]) { return events.reduce(applyEvent, initialState()); }
const state = fold(stream.filter(e => e.payload.id === orderId));
// Bank Ledger:
// Event Sourcing stores state changes as a sequence of events and recon...`,
  '15-mutual-tls.md': `const agent = new https.Agent({
  cert: fs.readFileSync('client.crt'),
  key: fs.readFileSync('client.key'),
  ca: fs.readFileSync('ca.crt'),
});
fetch('https://api.internal/secure', { agent });`,
  '15-reactive-architecture.md': `const alerts$ = sensorReadings$.pipe(
  filter(r => r.voltage > 2.5),
  map(r => ({ ...r, alert: r.tempC > 60 })),
);
alerts$.subscribe(reading => alertBus.publish(reading));`,
  '15-scheduler.md': `class Scheduler {
  private heap: Job[] = [];
  tick() { const job = this.heap.pop(); if (job && job.runAt <= Date.now()) job.run(); }
  schedule(job: Job) { this.heap.push(job); this.heap.sort((a, b) => b.runAt - a.runAt); }
}
// Job Scheduler:`,
  '15-splitter.md': `function split(batch: OrderBatch) {
  return batch.items.map(item => ({ type: 'ProcessItem', payload: item }));
}
split(batch).forEach(msg => queue.send(msg));
// Order Line Items:
// A Splitter breaks one complex message into multiple smaller messages ...`,
  '16-actor-model.md': `class CellActor {
  private state = { cycles: 0 };
  receive(msg: Message) {
    if (msg.type === 'CYCLE_COMPLETE') this.state.cycles++;
    if (msg.type === 'GET_STATE') msg.reply(this.state);
  }
}
mailbox.send(cellActor, { type: 'CYCLE_COMPLETE' });`,
  '16-chaos-engineering.md': `async function chaosTest() {
  const target = pickRandomInstance();
  await target.kill();
  const healthy = await waitForRecovery(30_000);
  if (!healthy) throw new Error('System did not recover');
}`,
  '16-materialized-view.md': `async function refreshDailySales() {
  await db.query(\`
    INSERT INTO daily_sales_mv SELECT date, SUM(amount) FROM orders GROUP BY date
    ON CONFLICT (date) DO UPDATE SET total = EXCLUDED.total\`);
}
// Sales Dashboard View:`,
  '16-policy-enforcement-point.md': `app.use(async (req, res, next) => {
  const decision = await policyEngine.evaluate(req.user, req.path, req.method);
  if (!decision.allow) return res.status(403).json({ reason: decision.reason });
  next();
});
// API Gateway PEP:`,
  '16-resequencer.md': `class Resequencer {
  private buffer = new Map<number, Message>();
  emit(seq: number, msg: Message) {
    this.buffer.set(seq, msg);
    while (this.buffer.has(this.next)) { deliver(this.buffer.get(this.next++)!); }
  }
  private next = 1;
}`,
  '16-service-mesh.md': `mesh.configure('payments', {
  trafficPolicy: { retries: 3, timeout: '2s' },
  security: { mtls: 'STRICT' },
});
// mTLS Between Services:
// A Service Mesh moves network concerns such as mTLS, retries, routing,...`,
  '16-work-stealing.md': `class Worker {
  private deque: Task[] = [];
  run() { const task = this.deque.pop() ?? this.stealFromNeighbor(); if (task) execute(task); }
  stealFromNeighbor() { return neighbor.deque.shift(); }
}
// Fork-Join Pool:`,
  '17-blackboard-architecture.md': `class Blackboard { facts = new Map<string, unknown>(); }
const board = new Blackboard();
hypothesisAgent.run(board); // writes candidate diagnosis
validationAgent.run(board); // reads hypothesis, adds evidence
// Blackboard Architecture
// Blackboard Architecture uses a shared knowledge base where independen...`,
  '17-event-loop.md': `queueMicrotask(() => console.log('micro'));
setTimeout(() => console.log('timer'), 0);
console.log('sync');
// Output: sync -> micro -> timer
// JavaScript Runtime:
// Event Loop repeatedly waits for events, dispatches handlers, and cont...`,
  '17-horizontal-scaling.md': `const pool = { instances: 3 };
function addCapacity() { pool.instances += 1; deployReplica(pool.instances); }
function handleLoad(rps: number) { if (rps > 1000) addCapacity(); }
// API Replicas:
handleLoad();
// Horizontal Scaling adds more service instances or nodes to handle mor...`,
  '17-message-translator.md': `function toCanonical(legacy: LegacyOrder): CanonicalOrder {
  return { id: legacy.ORD_ID, currency: legacy.CURR_CD, amount: legacy.AMT };
}
bus.publish('orders', toCanonical(legacyMsg));
// Legacy Customer Record:
// A Message Translator converts one message format, schema, or protocol...`,
  '17-read-replica.md': `const primary = connect('postgres-primary');
const replica = connect('postgres-replica');
async function getOrder(id: string) { return replica.query('SELECT * FROM orders WHERE id=\$1', [id]); }
async function createOrder(o: Order) { return primary.query('INSERT INTO orders ...', [o]); }
await createOrder({ id: 'O-1', total: 99 });
const view = await getOrder('O-1');`,
  '17-request-hedging.md': `async function hedgedFetch(url: string) {
  const primary = fetch(url);
  const backup = sleep(200).then(() => fetch(url));
  return Promise.race([primary, backup]);
}
// Search Query Hedging:`,
  '18-cache-aside.md': `async function getProduct(id: string) {
  const cached = await cache.get(id);
  if (cached) return cached;
  const product = await db.products.find(id);
  await cache.set(id, product, 300);
  return product;
}`,
  '18-canonical-data-model.md': `interface CanonicalCustomer { id: string; email: string; region: string; }
function fromLegacy(row: LegacyCustomer): CanonicalCustomer {
  return { id: row.CUST_ID, email: row.EMAIL_ADDR, region: row.REGION_CD };
}`,
  '18-mvc.md': `class OrderController {
  constructor(private model: OrderModel) {}
  list() { return this.model.getAll(); }
}
const view = { render(orders: Order[]) { return orders.map(o => o.id).join(', '); } };
view.render(controller.list());`,
  '18-rate-limiting.md': `const limiter = new RateLimiter({ tokensPerInterval: 100, interval: 'minute' });
app.use((req, res, next) => {
  if (!limiter.tryRemoveTokens(1)) return res.status(429).send('Rate limited');
  next();
});
// Public API Quotas:`,
  '18-vertical-scaling.md': `const server = { cpu: 4, memoryGb: 16 };
function upgrade() {
  server.cpu = 8; server.memoryGb = 32; // scale up single node
  restart(server);
}
// Database Scale-Up:`,
  '19-correlation-identifier.md': `const correlationId = crypto.randomUUID();
await bus.publish('Step1', { correlationId, orderId: '42' });
await bus.publish('Step2', { correlationId, orderId: '42' });`,
  '19-cqrs-read-model.md': `eventBus.on('OrderCreated', (e) => readModel.orders.upsert({ id: e.id, summary: e.summary }));
const view = await readModel.orders.get('O-42');`,
  '19-mvvm.md': `class CycleViewModel {
  cycles = 0;
  get label() { return \`\${this.cycles} cycles\`; }
  increment() { this.cycles++; }
}
// View binds to viewModel.label; button calls viewModel.increment()`,
  '19-throttling.md': `let inFlight = 0;
async function throttled<T>(fn: () => Promise<T>) {
  while (inFlight >= MAX) await sleep(10);
  inFlight++; try { return await fn(); } finally { inFlight--; }
}
// Background Job Throttling:`,
  '20-database-sharding.md': `function shardFor(tenantId: string) {
  const idx = hash(tenantId) % SHARDS.length;
  return SHARDS[idx];
}
async function query(tenantId: string, sql: string) { return shardFor(tenantId).query(sql); }
// Customer ID Sharding:`,
  '20-idempotency.md': `async function pay(idempotencyKey: string, amount: number) {
  const existing = await db.idempotency.get(idempotencyKey);
  if (existing) return existing.result;
  const result = await gateway.charge(amount);
  await db.idempotency.save(idempotencyKey, result);
  return result;
}`,
  '20-message-store.md': `await messageStore.append('orders', { type: 'OrderCreated', orderId: '42' });
const history = await messageStore.read('orders', { from: offset });`,
  '20-mvp.md': `class LoginPresenter {
  constructor(private view: LoginView) {}
  onSubmit(email: string) {
    if (!email.includes('@')) return this.view.showError('Invalid email');
    this.view.navigate('/dashboard');
  }
}`,
  '21-backend-for-frontend-bff.md': `// Mobile BFF aggregates multiple services into one payload
app.get('/mobile/home', async (_req, res) => {
  const [profile, orders, alerts] = await Promise.all([
    userSvc.profile(), orderSvc.recent(), notifySvc.unread(),
  ]);
  res.json({ profile, orders, alerts });
});`,
  '21-claim-check.md': `const ref = await blobStore.put(largePayload);
await queue.send({ type: 'ProcessReport', claimCheck: ref });
const payload = await blobStore.get(ref);`,
  '21-distributed-lock.md': `async function withLock(key: string, fn: () => Promise<void>) {
  const token = await redis.set(key, '1', 'NX', 'EX', 30);
  if (!token) throw new Error('Lock held');
  try { await fn(); } finally { await redis.del(key); }
}
// Single Job Runner:`,
  '21-multi-tenant-partitioning.md': `function tenantSchema(tenantId: string) { return \`tenant_\${tenantId}\`; }
async function listUsers(tenantId: string) {
  return db.query(\`SELECT * FROM \${tenantSchema(tenantId)}.users\`);
}
// Shared Table Tenant Column:
await listUsers();`,
  '22-pipes-and-filters.md': `const result = [validate, enrich, transform, route]
  .reduce((msg, filter) => filter(msg), inboundMessage);`,
  '22-soft-delete.md': `async function deleteUser(id: string) {
  await db.query('UPDATE users SET deleted_at = NOW() WHERE id = \$1', [id]);
}
async function listUsers() {
  return db.query('SELECT * FROM users WHERE deleted_at IS NULL');
}`,
  '22-token-bucket.md': `class TokenBucket {
  private tokens = 10;
  allow() { if (this.tokens > 0) { this.tokens--; return true; } return false; }
  refill() { this.tokens = Math.min(10, this.tokens + 1); }
}
// API Burst Control:`,
  '23-leaky-bucket.md': `class LeakyBucket {
  private queue: Request[] = [];
  tick() { const req = this.queue.shift(); if (req) process(req); }
  enqueue(req: Request) { if (this.queue.length < 100) this.queue.push(req); }
}
// Smooth API Calls to Downstream:`,
  '23-temporal-tables.md': `// Valid-time tracking with system-versioned rows
const id = 'cell-9';
await db.query(\`UPDATE cells SET voltage = \$1, valid_to = NOW() WHERE id = \$2 AND valid_to IS NULL\`, [3.7, id]);
await db.query(\`INSERT INTO cells_history SELECT * FROM cells WHERE id = \$1\`, [id]);
const history = await db.query('SELECT * FROM cells_history WHERE id=\$1', [id]);
// query any point in time via valid_from / valid_to columns`,
  '24-heartbeat.md': `setInterval(async () => {
  await registry.heartbeat(serviceId, { status: 'alive', ts: Date.now() });
}, 5000);`,
  '25-gossip-protocol.md': `function gossip(node: Node) {
  const peer = randomPeer(node.peers);
  peer.merge(node.state); // eventually all nodes converge
}
// Cluster Membership:
gossip();`,
  '26-quorum.md': `function write(key: string, value: string, replicas: Node[]) {
  const acks = replicas.filter(r => r.replicate(key, value));
  if (acks.length >= Math.floor(replicas.length / 2) + 1) return 'ok';
  throw new Error('Quorum not reached');
}
// Replicated Database Write:`,
  '27-sharding.md': `const shards = [db0, db1, db2, db3];
function shard(key: string) { return shards[hash(key) % shards.length]; }
const customerId = 'customer-42';
shard(customerId).query('SELECT * FROM orders WHERE customer_id=\$1', [customerId]);
// each shard owns a slice of keys — scale writes horizontally
const db = shard(customerId);`,
  '28-replication.md': `async function replicate(entry: LogEntry) {
  const results = await Promise.all(replicas.map(r => r.append(entry)));
  if (results.filter(Boolean).length >= quorum) commit(entry);
}
// Read Replicas:
await replicate();`,
  '29-distributed-cache.md': `const cache = new RedisCluster(['node-a', 'node-b', 'node-c']);
await cache.set('session:abc', sessionData, 'EX', 3600);
const hit = await cache.get('session:abc');`,
  '30-event-bus.md': `const bus = new EventBus('orders');
bus.subscribe('OrderPlaced', inventory.onOrder);
bus.publish('OrderPlaced', { orderId: '42' });`,
  '31-shared-database.md': `const ordersSvc = connect('shared-db');
const billingSvc = connect('shared-db');
// coupling risk: both services read/write the same schema directly`,
  '32-database-per-service.md': `const ordersDb = connect('orders-db');
const billingDb = connect('billing-db');
// integrate via API/events — never cross-query the other service DB`,
  'Abstract_Factory.md': `interface Button { render(): void; }
interface UIFactory { createButton(): Button; }
class WinFactory implements UIFactory {
  createButton() { return { render: () => console.log('Windows'); }; }
}
new App(new WinFactory()).run();`,
  'Adapter.md': `class LegacyXmlFeed { fetch(): string { return '<order id="1"/>'; } }
class OrderAdapter {
  constructor(private legacy: LegacyXmlFeed) {}
  getOrders(): Order[] { return parseXml(this.legacy.fetch()); }
}
const legacyXmlFeed = new LegacyXmlFeed();`,
  'Bridge.md': `class RemoteControl {
  constructor(protected device: Device) {}
  toggle() { this.device.togglePower(); }
}
class TV extends Device { togglePower() { this.on = !this.on; } }
// Bridge`,
  'Builder.md': `const report = new ReportBuilder()
  .title('Cycle Summary')
  .addSection('Metrics', metrics)
  .addChart('Voltage', chartData)
  .build();
// Separates **how** a complex object is constructed from the finished o...`,
  'Composite.md': `interface Component { render(): string; }
class Group implements Component {
  constructor(private children: Component[]) {}
  render() { return this.children.map(c => c.render()).join(''); }
}
// Composite`,
  'Decorator.md': `class LoggingOrderService implements OrderService {
  constructor(private inner: OrderService) {}
  async create(o: Order) {
    console.log('create', o.id);
    return this.inner.create(o);
  }
}`,
  'Facade.md': `class CheckoutFacade {
  constructor(private pay: Payment, private ship: Shipping, private inv: Inventory) {}
  async checkout(cart: Cart) {
    await this.inv.reserve(cart);
    await this.pay.charge(cart.total);
    return this.ship.dispatch(cart);
  }
}`,
  'Factory_Method.md': `abstract class ParserFactory { abstract create(): Parser; parse(raw: string) { return this.create().parse(raw); } }
class CsvFactory extends ParserFactory { create() { return new CsvParser(); } }
// Factory Method
const parserFactory = new ParserFactory();
const csvFactory = new CsvFactory();
// Delegates object creation to subclasses or creator classes. The clien...`,
  'FlyWeight.md': `const glyphCache = new Map<string, Glyph>();
function getGlyph(char: string, font: string) {
  const key = \`\${char}:\${font}\`;
  return glyphCache.get(key) ?? glyphCache.set(key, new Glyph(char, font)).get(key)!;
}
// Flyweight`,
  'Layered_architecture.md': `// Presentation -> Business -> Data
class OrderService { constructor(private repo: OrderRepo) {} place(o: Order) { return this.repo.save(o); } }
class OrderRepo { save(o: Order) { return db.insert('orders', o); } }
// Layered Architecture
const orderService = new OrderService();
const orderRepo = new OrderRepo();`,
  'Modular_Monolith.md': `// modules/billing and modules/inventory share one deployable
import { InvoiceModule } from './billing';
import { StockModule } from './inventory';
const app = createApp([InvoiceModule, StockModule]); // bounded modules, single process
// Modular Monolith Architecture
// A **Modular Monolith** is an architectural style where the system is ...`,
  'Monolith.md': `const app = express();
app.get('/orders', listOrders);
app.post('/orders', createOrder);
app.get('/inventory', listStock);
app.listen(3000); // all features in one codebase and deployment
// Monolith Architecture`,
  'Prototype.md': `class ReportTemplate implements Cloneable {
  constructor(public header: string, public sections: string[]) {}
  clone() { return new ReportTemplate(this.header, [...this.sections]); }
}
const draft = template.clone();
// Prototype`,
  'Rpoxy.md': `class SecureDocumentProxy implements Document {
  constructor(private real: Document, private user: User) {}
  view() {
    if (!this.user.canRead()) throw new Error('Denied');
    return this.real.view();
  }
}`,
  'Singleton.md': `class Config {
  private static instance: Config;
  private constructor() {}
  static getInstance() { return this.instance ??= new Config(); }
}
const cfg = Config.getInstance();`,
};

module.exports = { PATTERN_TS_EXAMPLES };
