# Watchdog

## Core Idea
Watchdog monitors a process, task, or system and triggers recovery if it becomes unhealthy or unresponsive.

## Problem It Solves
- Processes can hang, deadlock, or stop making progress while still appearing to run.

## Main Diagram
```text
Monitored Process -> Watchdog -> Heartbeat / Progress Signal -> Restart / Alert / Recover
```

## 3 Concrete Examples
1. **Process Watchdog:** A supervisor restarts a service if it stops responding to health probes.
2. **Embedded System Watchdog:** A device reboots if firmware fails to reset the watchdog timer.
3. **Job Progress Watchdog:** A long-running job is cancelled and retried if progress heartbeat stops.

## TypeScript Example
```typescript
const watchdog = setInterval(() => {
  if (Date.now() - lastHeartbeat > 5000) process.exit(1);
}, 1000);
function heartbeat() { lastHeartbeat = Date.now(); }
// Process Watchdog:
heartbeat();
```

## Architecture Questions
- What does healthy progress look like?
- What signal does the watchdog monitor?
- What timeout indicates failure?
- What recovery action is safe?
- How do we avoid false positives?
- How are watchdog actions audited?

## When to Use
- Processes can hang or stop making progress.
- Health/progress signals are available.
- Automatic recovery is safe.

## When NOT to Use
- The watchdog cannot distinguish slow from stuck.
- Recovery action can corrupt state.
- False positives are worse than the hang.
