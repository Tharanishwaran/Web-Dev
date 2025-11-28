# Event-driven vs event handler — quick notes

Event-driven = architecture; event handler = function you write for a specific event. In Node.js, an event loop dispatches events (like “request arrived”, “file read finished”), and your registered handlers run in response, enabling non-blocking I/O and high concurrency.[1][2][8]

## Core definitions
- Event-driven: Program flow is driven by events rather than a fixed sequence; Node’s single-threaded event loop routes events to handlers asynchronously.[8][1]
- Event: A named signal that something happened, often with an attached payload (data).[2][1]
- Event handler (listener): The callback function that runs when a specific event is emitted.[1][2]
- Event emitter: An object that can emit events and let you register handlers (Node’s EventEmitter).[2][1]

## Why Node uses it
- Efficient I/O: I/O is delegated to the OS; Node doesn’t block while waiting, it processes other work and runs the handler when the event completes.[8][2]
- Scalability: One thread can manage many concurrent connections thanks to the event loop pattern.[2][8]

## Minimal example
```js
const EventEmitter = require('events');
const bus = new EventEmitter();

// event handler (listener)
bus.on('order:created', (order) => {
  console.log('Processing order', order.id);
});

// emit event (triggers handler)
bus.emit('order:created', { id: 101, items: 3 });
```
- Event-driven: emitting and reacting to ‘order:created’ drives flow.[1][2]
- Handler: the function passed to `.on('order:created', ...)`.[1][2]

## Where you already use handlers
- HTTP: `http.createServer((req, res) => { ... })` reacts to “request” events.[8][2]
- Streams: ‘data’, ‘end’, ‘error’ events pattern with listeners.[2][1]

## Event loop quick order
- Sync code runs first → microtasks (promises) → timers/I-O callbacks → other phases; handlers run when their event reaches the loop.[8][2]

## Pitfalls and tips
- Don’t block the loop: avoid heavy CPU on main thread; use async I/O or offload to workers.[2][8]
- Prefer promises/async–await over deeply nested callbacks for readability.[1][2]

## One-minute practice
Predict output order before running:
```js
const EventEmitter = require('events');
const bus = new EventEmitter();

bus.on('ping', () => console.log('ping handler'));

console.log('A');
setTimeout(() => bus.emit('ping'), 0);
Promise.resolve().then(() => console.log('microtask'));
console.log('Z');
```
Expected: A, Z, microtask, ping handler (sync → microtasks → timer emits → handler).[8][2]

If you want, the next note can map these ideas to Express (requests as events) and WebSocket chat (message events) with short code blocks.[2][8]

[1](https://www.geeksforgeeks.org/node-js/explain-event-driven-programming-in-node-js/)
[2](https://www.geeksforgeeks.org/node-js/explain-the-event-driven-architecture-of-node-js/)
[3](https://dev.to/iserioton/event-driven-programming-in-nodejs-975)
[4](https://www.freecodecamp.org/news/understanding-node-js-event-driven-architecture-223292fcbc2d/)
[5](https://www.linkedin.com/pulse/nodejs-guide-20-event-driven-programming-mastering-lahiru-sandaruwan-m3d2c)
[6](https://dev.to/learn-to-earn/event-driven-architecture-in-nodejs-1o98)
[7](https://eedgetechnology.com/blog/understanding-event-driven-architecture-in-node-js/)
[8](https://nodejs.org/en/about)