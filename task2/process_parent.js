const http = require('http');
const url = require('url');
const { PORT } = require('../config');
const { log } = require('../logger');
const cp = require('child_process')

http.createServer((req, res) => {
  const { number } = url.parse(req.url, true).query;
  const childProcess = cp.fork('./process_child.js');

  log(`Calculating Fibonacci number for ${number}`);

  childProcess.on('message', (result) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    log(`Calculated Fibonacci number for ${number} = ${result}`);
    res.end();
  });
  childProcess.send(number);
}).listen(PORT, () => log(`Listening on port ${PORT}...`))
