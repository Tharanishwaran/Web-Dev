# Non-blocking I/O — quick study notes
Clear, actionable notes with tiny checks so you can apply them in Node.js right away.

## Core idea
- Non-blocking I/O starts an I/O task (disk, network, DB) and immediately returns control to the event loop so other work can run; when the I/O finishes, its callback/promise runs later via the event loop.[1][6][8]
- Because JavaScript in Node runs on one main thread by default, freeing that thread while I/O is in progress increases concurrency and throughput for many simultaneous requests.[6][1]

## Why it’s faster for I/O-bound apps
- Example intuition: If each request needs 50 ms, with 45 ms being DB I/O, using non-blocking frees that 45 ms to serve other requests, boosting capacity without more threads.[1]

## How Node implements it
- Event loop orchestrates phases and runs callbacks/microtasks when results are ready.[6]
- I/O operations are offloaded to the OS or libuv; when done, events are queued and the corresponding JS handlers run on the main thread.[4][6]

## Blocking vs non-blocking (at a glance)
- Blocking: Code waits for I/O to finish before continuing; ties up the main thread and reduces concurrency.
- Non-blocking: Code initiates I/O and continues; the event loop later invokes the registered handler (callback/promise) when results arrive.[2][3]

## Best practices
- Prefer async APIs (fs, http, net) over sync ones to avoid blocking the event loop.[2]
- Don’t mix sync and async on the same path; chain async operations to preserve order without blocking.[1]
- Offload CPU-heavy work (compression, hashing, big loops) to worker threads or separate services to keep the loop responsive.[2]

## Tiny code patterns
- Async read then unlink (non-blocking and ordered):
```js
const fs = require('fs');
fs.readFile('file.md', (err, data) => {
  if (err) throw err;
  // process data...
  fs.unlink('file.md', (err2) => {
    if (err2) throw err2;
  });
});
```
- Avoid: calling fs.unlinkSync while an async read is in flight; sync call may run first and delete the file prematurely.[1]

## Quick checks (do these mentally or in a REPL)
1) Promise vs timer order: Promises (microtasks) run before timers, so a resolved promise callback executes before setTimeout(..., 0).[6]
2) Many concurrent reads: Starting multiple fs.readFile calls doesn’t need multiple JS threads; completions are dispatched as events when ready.[6]

## When non-blocking shines
- High-concurrency APIs, real-time apps, proxies, and any workload that spends most time waiting on I/O rather than computing.[3][6]

## One-sentence takeaway
Use async, non-blocking I/O so the event loop keeps serving other work while the OS handles waiting; when I/O completes, your callback/promise runs and finishes the job.[1][6]

If you share your current Node goal (e.g., REST API with DB, file uploader, WebSocket chat), I’ll tailor examples and a 10–15 minute practice plan.

# Node.js event loop — quick notes
Clear, exam-ready notes that build on non-blocking I/O. If you want, I can turn this into a 5‑question quiz next.

## Big picture
- The event loop is Node’s scheduler that decides when callbacks run. It enables the event‑driven, non‑blocking I/O model by letting the OS handle waiting and invoking your handlers when results are ready.[1]
- JavaScript runs on a single main thread; the loop coordinates phases and queues (microtasks like Promises and nextTick) to keep the app responsive under many concurrent I/O operations.[6][1]

## Core phases (in order)
1) Timers: run callbacks from `setTimeout`/`setInterval` whose delay has elapsed.[2][1]
2) Pending callbacks: run some deferred I/O callbacks from the previous cycle.[1][2]
3) Idle/prepare: internal use.[2][1]
4) Poll: retrieve new I/O events and execute I/O callbacks; may block waiting for I/O if nothing else is scheduled.[4][1]
5) Check: run `setImmediate` callbacks.[1][2]
6) Close callbacks: run close events like `socket.on('close')`.[2][1]

Microtasks run between phases:
- `process.nextTick` queue runs to completion before moving to the next phase (even before Promise microtasks).[1][2]
- Promise microtasks (`.then/.catch`) run after `nextTick` and before the next phase.[6][1]

## Practical ordering (common cases)
- Synchronous code runs first.
- Then microtasks: `process.nextTick` → Promise callbacks.
- Then timers (`setTimeout/Interval`), later `setImmediate` (in Check phase). Exact `timeout` vs `immediate` order can vary depending on where they are scheduled (e.g., inside an I/O callback, `setImmediate` tends to fire before `setTimeout(...,0)`).[5][1]

## Why this makes Node fast for I/O
- Starting many I/O tasks doesn’t block the thread; the loop just runs handlers as results arrive, allowing thousands of concurrent connections on one main thread.[3][1]

## Tiny reference examples
- Microtasks before timers:
  - Code: `Promise.resolve().then(()=>console.log('promise')); setTimeout(()=>console.log('timeout'),0);`
  - Order: promise → timeout (after sync logs).[3][1]
- `nextTick` before Promises:
  - Code: `process.nextTick(()=>console.log('tick')); Promise.resolve().then(()=>console.log('promise'));`
  - Order: tick → promise.[6][2]
- `setImmediate` vs `setTimeout(0)` nuance:
  - In an I/O callback, `setImmediate` typically fires before `setTimeout(0)` because `setImmediate` is queued for the Check phase following Poll.[5][1]

## When you feel “blocked”
- Long CPU tasks or synchronous I/O block the loop and delay all handlers. Offload CPU to `worker_threads`/child processes; always prefer async I/O in hot paths.

## Quick mental model
- Phases are like stations; each has a FIFO queue of callbacks. The loop visits stations in order, draining queues; between stations, it runs microtasks (`nextTick` then Promises). Repeat until no work remains, then the process exits.[4][1]

If you want, I can give you a 10‑minute lab: run 5 tiny scripts to observe each phase and microtask ordering, with predicted vs actual output.

[1](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
[2](https://www.geeksforgeeks.org/node-js/node-js-event-loop/)
[3](https://www.w3schools.com/nodejs/nodejs_event_loop.asp)
[4](https://dev.to/nodedoctors/animated-nodejs-event-loop-phases-1mcp)
[5](https://heynode.com/tutorial/how-event-loop-works-nodejs/)
[6](https://www.freecodecamp.org/news/a-guide-to-the-node-js-event-loop/)
[7](https://blog.logrocket.com/complete-guide-node-js-event-loop/)
[8](https://javascript.plainenglish.io/event-loop-explained-visually-what-really-happens-behind-await-ae769506ccfa)