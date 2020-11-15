const http = require('http');
const { PORT } = require('../config');
const { log } = require('../logger');
const { blockedLoop } = require('../utils');
const { Worker, isMainThread } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: new Date()
  });
  worker.on('message', (res) => {
    setTimeout(() => {
      log(`Worker received message`)
    }, 0)
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const start = new Date();
    blockedLoop(1000);
    res.end(JSON.stringify({ timeDelayBlocked: new Date() - start }));
  }).listen(PORT, () => log(`Listening on port ${PORT}...`));
}
