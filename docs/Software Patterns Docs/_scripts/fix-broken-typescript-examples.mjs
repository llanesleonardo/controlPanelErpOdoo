import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapPath = path.join(__dirname, 'pattern-typescript-examples.js');

const FIXES = {
  '01-ci-cd-pipeline.md': `const stages = ['checkout', 'install', 'test', 'build', 'deploy'] as const;
for (const stage of stages) {
  const ok = await runStage(stage);
  if (!ok) throw new Error(\`Pipeline failed at \${stage}\`);
}`,
  '02-partitioning.md': `const partitions = { east: dbEast, west: dbWest };
function partitionFor(customerId: string) {
  return customerId.startsWith('E') ? partitions.east : partitions.west;
}
await partitionFor('E-1001').orders.insert({ id: 'O-1', total: 99 });`,
  '03-producer-consumer.md': `const channel = new MessageChannel<{ cellId: string; voltage: number }>();
channel.subscribe('telemetry', async (reading) => await persist(reading));
channel.publish('telemetry', { cellId: 'C-1', voltage: 3.7 });`,
  '03-sharding.md': `const shards = [db0, db1, db2];
const shard = (userId: string) => shards[parseInt(userId.slice(-2), 16) % shards.length];
await shard('user-7f3a').insert('events', { type: 'page_view' });`,
  '04-flux.md': `const dispatcher = createDispatcher();
const store = createStore(reducer, { todos: [] });
dispatcher.register(store.handleAction);
dispatcher.dispatch({ type: 'ADD_TODO', text: 'Calibrate DAQ' });
render(<TodoList todos={store.getState().todos} />);`,
  '04-oauth2.md': `const authUrl = \`\${issuer}/authorize?client_id=\${clientId}&redirect_uri=\${redirectUri}&response_type=code&scope=calendar.read\`;
const { code } = await getCallbackCode(authUrl);
const { access_token } = await exchangeCodeForToken(code);
const events = await fetch('https://calendar/api/events', { headers: { Authorization: \`Bearer \${access_token}\` } });`,
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
  '05-bulkhead.md': `const paymentPool = pLimit(10);
const searchPool = pLimit(50);
await paymentPool(() => paymentSvc.charge(order));
await searchPool(() => searchSvc.query(order.customerId));`,
  '05-cdn.md': `const assetUrl = (file: string) => \`https://cdn.example.com/assets/\${hash(file)}.js\`;
res.set('CDN-Cache-Control', 'max-age=86400');
res.redirect(302, assetUrl('bundle.js'));`,
  '05-infrastructure-as-code.md': `import * as aws from '@pulumi/aws';
const bucket = new aws.s3.Bucket('app-logs', { versioning: { enabled: true } });
export const bucketName = bucket.id;`,
  '05-message-broker.md': `await broker.connect();
await broker.publish('orders', Buffer.from(JSON.stringify({ orderId: '42' })));
await broker.consume('orders', async (msg) => { await handleOrder(msg); broker.ack(msg); });`,
  '05-openid-connect.md': `const claims = await verifyIdToken(idToken, { audience: clientId, issuer });
const session = { userId: claims.sub, email: claims.email as string };
req.session.user = session;`,
  '05-redux.md': `const store = createStore(cartReducer);
store.dispatch({ type: 'cart/add', payload: { sku: 'CELL-18650', qty: 2 } });
const items = store.getState().cart.items;`,
  '05-shared-services.md': `const shared = { auth: identitySvc, logging: logSvc };
orders.init({ auth: shared.auth, log: shared.logging });
billing.init({ auth: shared.auth, log: shared.logging });`,
  '06-cqrs.md': `await commandBus.send(new PlaceOrder({ customerId: 'C-1', total: 99 }));
const summary = await queryBus.ask(new GetOrderSummary('O-42'));`,
  '06-federated-identity.md': `const profile = await saml.validate(assertion);
const user = await directory.provisionOrUpdate({ id: profile.nameId, email: profile.email });
req.user = user;`,
  '06-message-bus.md': `bus.registerHandler('CreateInvoice', billing.handle);
bus.registerHandler('CreateInvoice', analytics.track);
bus.send({ type: 'CreateInvoice', orderId: '42' });`,
  '06-sidecar.md': `const sidecar = { log: (r: Request) => shipToCollector(r), encrypt: (b: Buffer) => tls.wrap(b) };
app.use((req, _res, next) => { sidecar.log(req); next(); });`,
  '07-centralized-logging.md': `logger.info({ service: 'orders', traceId, orderId: 'O-42', msg: 'created' });
// shipped to ELK/Datadog — query all services by traceId`,
  '07-dead-letter-queue.md': `try { await process(msg); await queue.ack(msg); }
catch (e) { await dlq.send({ original: msg, error: String(e), attempts: msg.attempts + 1 }); }`,
  '08-distributed-cache.md': `let product = await memcached.get('product:42');
if (!product) { product = await db.products.load('42'); await memcached.set('product:42', product, 600); }`,
  '08-event-storming.md': `const board = { events: ['TestStarted', 'VoltageRecorded', 'AnomalyDetected', 'TestCompleted'] };
const commands = [{ name: 'StartTest', triggers: 'TestStarted' }];
const policies = [{ when: 'AnomalyDetected', then: 'NotifyEngineer' }];`,
  '08-infrastructure-as-code.md': `const cluster = new K8sCluster('prod', { nodes: 3, region: 'us-east-1' });
new Deployment('api', { image: 'api:1.0', replicas: 3, cluster });`,
  '08-jwt.md': `const token = jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn: '1h' });
const payload = jwt.verify(token, secret) as { sub: string; role: string };
if (payload.role !== 'admin') throw new Error('Forbidden');`,
  '09-queue-based-load-leveling.md': `app.post('/jobs', (req, res) => { queue.push(req.body); res.status(202).end(); });
setInterval(() => workers.drain(queue, 10), 1000);`,
  '09-state-container.md': `const store = createContainer({ count: 0 });
store.setState((s) => ({ count: s.count + 1 }));
const Count = () => <span>{store.useState().count}</span>;`,
  '10-bastion-host.md': `// SSH only through bastion — private subnet not reachable directly
const cmd = \`ssh -J bastion.prod.internal app-server.internal\`;
exec(cmd);`,
  '10-event-notification.md': `bus.publish('CustomerRegistered', { customerId: 'c1' });
bus.on('CustomerRegistered', (e) => crm.sync(e.customerId));`,
  '10-service-mesh.md': `mesh.configure('payments', { trafficPolicy: { retries: 3, timeout: '2s' }, security: { mtls: 'STRICT' } });
const response = await mesh.call('payments', '/charge', { amount: 99 });`,
  '10-virtual-dom.md': `const vdom = h('ul', {}, items.map(i => h('li', { key: i.id }, i.label)));
const patches = diff(oldVdom, vdom);
patch(domNode, patches);`,
  '11-event-carried-state-transfer.md': `bus.publish('OrderUpdated', { orderId: '42', status: 'shipped', lines: [{ sku: 'X', qty: 1 }], total: 199.99 });`,
  '11-multi-level-cache.md': `async function get(key: string) {
  return l1.get(key) ?? (await l2.get(key)) ?? (await db.fetch(key));
}`,
  '12-heartbeat.md': `setInterval(() => ws.send(JSON.stringify({ type: 'ping', ts: Date.now() })), 3000);
ws.on('message', (m) => { if (JSON.parse(String(m)).type === 'pong') lastSeen = Date.now(); });`,
  '13-message-filter.md': `const highValue = stream.filter(m => m.type === 'OrderCreated' && m.payload.total > 1000);
highValue.forEach(m => priorityQueue.send(m));`,
  '15-availability-zones.md': `const azs = ['az-a', 'az-b', 'az-c'];
const replicas = azs.map(az => deploy({ zone: az, replicas: 2 }));
loadBalancer.route(replicas);`,
  '15-reactive-architecture.md': `const alerts$ = sensorReadings$.pipe(
  filter(r => r.voltage > 2.5),
  map(r => ({ ...r, alert: r.tempC > 60 })),
);
alerts$.subscribe(reading => alertBus.publish(reading));`,
  '18-canonical-data-model.md': `interface CanonicalCustomer { id: string; email: string; region: string; }
function fromLegacy(row: LegacyCustomer): CanonicalCustomer {
  return { id: row.CUST_ID, email: row.EMAIL_ADDR, region: row.REGION_CD };
}`,
  '19-correlation-identifier.md': `const correlationId = crypto.randomUUID();
await bus.publish('Step1', { correlationId, orderId: '42' });
await bus.publish('Step2', { correlationId, orderId: '42' });`,
  '19-cqrs-read-model.md': `eventBus.on('OrderCreated', (e) => readModel.orders.upsert({ id: e.id, summary: e.summary }));
const view = await readModel.orders.get('O-42');`,
  '20-message-store.md': `await messageStore.append('orders', { type: 'OrderCreated', orderId: '42' });
const history = await messageStore.read('orders', { from: offset });`,
  '21-claim-check.md': `const ref = await blobStore.put(largePayload);
await queue.send({ type: 'ProcessReport', claimCheck: ref });
const payload = await blobStore.get(ref);`,
  '22-pipes-and-filters.md': `const result = [validate, enrich, transform, route]
  .reduce((msg, filter) => filter(msg), inboundMessage);`,
  '24-heartbeat.md': `setInterval(async () => {
  await registry.heartbeat(serviceId, { status: 'alive', ts: Date.now() });
}, 5000);`,
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
};

let src = fs.readFileSync(mapPath, 'utf8');
for (const [file, example] of Object.entries(FIXES)) {
  const re = new RegExp(`'${file.replace('.', '\\.')}': \`[\\s\\S]*?\`,`, 'm');
  if (!re.test(src)) {
    console.warn('Missing key in map:', file);
    continue;
  }
  src = src.replace(re, `'${file}': \`${example.replace(/`/g, '\\`')}\`,`);
}
fs.writeFileSync(mapPath, src, 'utf8');
console.log(`Patched ${Object.keys(FIXES).length} examples`);

const require = createRequire(import.meta.url);
await import('./apply-typescript-examples.mjs');
