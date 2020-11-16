const http = require('http');
const { PORT } = require('../config');
const { log } = require('../logger');
const cluster = require('cluster');
const WORKERS = 6;
const calculatedWorkers = {}

if (cluster.isMaster) {
  log(`Master ${process.pid} is running...`);
  for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    log(`worker ${worker.process.pid} died`);
  });
} else {
  calculatedWorkers[process.pid] = 0;
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    calculatedWorkers[process.pid]++;
    res.end(`Worker ${process.pid} handle ${calculatedWorkers[process.pid]} requests`);
  }).listen(PORT, () => log(`Worker ${process.pid} started`))
}