const { Worker } = require('worker_threads');
const { performance } = require('perf_hooks');

let workerDone = false;
const startTime = performance.now();

const worker = new Worker(`
    const { parentPort } = require('worker_threads');
    setTimeout(() => parentPort.postMessage('DONE'), 100);
`, { eval: true });

worker.on('message', () => {
    workerDone = true;
});

// Check every 10ms - shows worker finishes during loop
const checker = setInterval(() => {
    if (workerDone) {
        console.log(`Worker finished at ${performance.now() - startTime}ms (during loop!)`);
        clearInterval(checker);
    }
}, 10);

// Long sync loop
console.log('Starting long loop...');
for (let i = 0; i < 10000; i++) {
    // Heavy work
}
console.log(`Loop finished at ${performance.now() - startTime}ms`);

setTimeout(() => clearInterval(checker), 1000);
