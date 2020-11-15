const http = require('http');
const url = require('url');
const { Worker } = require('worker_threads');
const { PORT } = require('../config');
const { log, error } = require('../logger');

http.createServer((req, res) => {
  const { number } = url.parse(req.url, true).query;
  const worker = new Worker('./worker.js', {
    workerData: parseInt(number)
  });

  log(`Calculating Fibonacci number for ${number}`);

  worker.on('message', (result) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    log(`Calculated Fibonacci number for ${number} = ${result}`);
    res.end();
  });
  worker.on('error', (errorMessage) => {
    error(errorMessage);
    res.writeHead(400)
    res.end();
  });
  worker.on('exit', (code) => {
    if (code !== 0) {
      log(`Worker stopped with exit code ${code}`)
      res.writeHead(400);
      res.end();
    }
  });
}).listen(PORT, () => log(`Listening on port ${PORT}...`))
