const http = require('http');
const { PORT, ENV } = require('./config');
const { log, debug, warn, error } = require('./logger');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello world!' }));
}).listen(PORT, () => log(`Listening on port ${PORT}...`));