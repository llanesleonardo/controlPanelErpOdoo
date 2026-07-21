# Concurrency Patterns — Three Examples Each

> Concrete examples for every pattern in [Concurrency Patterns INDEX](../Concurrency_patterns/INDEX.md). Learning doc — not official vendor architecture.

## How to read this table

Start with **risk** — what breaks if you ignore it — then match the **pattern** and read three examples to recognize it in real systems. Same style as [risk-driven-patterns.md](../risk-driven-patterns.md).

| Risk | Pattern | Examples (short) |
| ---- | ------- | ------------------ |
| Fast producers overwhelm slow consumers or block | **Producer-Consumer** | **1.** Web server threads produce log lines; background thread writes disk. **2.** Image upload produces resize jobs; worker pool consumes. **3.** Crawler fetches URLs (producer); parser workers consume HTML. |
| Unbounded thread creation exhausts memory and context-switches | **Thread Pool** | **1.** Java `ExecutorService` with 50 threads serves HTTP requests. **2.** .NET thread pool handles async callbacks. **3.** Node worker_threads pool for CPU-heavy image transforms. |
| Synchronous work blocks request threads under load | **Worker Queue** | **1.** Redis list of email jobs consumed by mailer workers. **2.** SQS queue of video transcode tasks. **3.** Sidekiq queue for Rails background jobs. |
| One thread per connection does not scale | **Reactor** | **1.** Nginx waits for socket readable, dispatches to handler. **2.** Redis single-threaded reactor processes commands. **3.** Java NIO selector loop for chat server. |
| Blocking IO stalls the whole request path | **Proactor** | **1.** Windows IOCP completes disk read then callbacks handler. **2.** Async file write on Node: operation completes → callback. **3.** Boost.Asio async accept → proactor style completion. |
| Sequential work leaves CPU cores idle | **Fork-Join** | **1.** Merge sort forks halves recursively then joins sorted arrays. **2.** Parallel image filter splits rows across CPU cores. **3.** Java `ForkJoinPool` for recursive directory size calc. |
| Stages cannot scale or evolve independently | **Pipeline** | **1.** Video: demux → decode → filter → encode stages connected. **2.** Fraud check pipeline: rules → ML → manual review queue. **3.** CI: lint → test → build → deploy pipeline stages. |
| Callback hell and error handling spaghetti | **Futures and Promises** | **1.** `fetchUser()` promise chained to `fetchOrders(userId)`. **2.** Java `CompletableFuture` combines payment + inventory checks. **3.** Python `asyncio.gather` awaits parallel API calls. |
| Blocking calls stall thread pools in async code | **Async/Await** | **1.** Express handler `await db.query()` without blocking thread pool wrongly. **2.** C# `await HttpClient.GetAsync` in ASP.NET controller. **3.** Rust `async fn` for concurrent downloads. |
| Reader sees torn or partial writes during updates | **Double Buffer** | **1.** Game renders to back buffer while front buffer displays. **2.** Audio fills one buffer while other plays. **3.** Graphics swap buffers each frame to avoid tear. |
| Writers starve readers or readers block writers unfairly | **Readers-Writers Lock** | **1.** Config cache: many readers of feature flags; rare writer on deploy. **2.** In-memory catalog many concurrent reads; single writer on price update. **3.** `RwLock` protecting shared routing table. |
| Parallel workers proceed before peers are ready | **Barrier** | **1.** Parallel simulation threads wait at timestep barrier before next tick. **2.** MapReduce workers barrier before reduce phase. **3.** Multi-threaded unit test setup waits all threads ready. |
| Unbounded concurrent access exhausts shared resources | **Semaphore** | **1.** DB connection pool: max 20 permits for concurrent queries. **2.** API rate limiter semaphore allows N in-flight requests. **3.** Parking lot semaphore models limited spaces. |
| Shared locks serialize what should be independent work | **Actor Model** | **1.** Akka actor per order processes messages sequentially. **2.** Erlang process per telephony call session. **3.** Orleans grain per game player state. |
| Work piles up without fair or timely dispatch | **Scheduler** | **1.** OS scheduler picks next runnable thread on CPU core. **2.** Kubernetes schedules pods onto nodes by resources. **3.** Cron scheduler fires nightly batch jobs. |
| Some threads idle while others hoard long task queues | **Work Stealing** | **1.** Java ForkJoinPool idle thread steals tasks from busy deque. **2.** Go scheduler work stealing across processors. **3.** Ray task scheduler steals from neighbor worker queues. |
| Blocking handlers freeze the entire process | **Event Loop** | **1.** Node.js processes timers, I/O callbacks, microtasks in loop. **2.** Browser event loop handles clicks, fetch, rendering. **3.** Python asyncio loop drives coroutine scheduling. |

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
