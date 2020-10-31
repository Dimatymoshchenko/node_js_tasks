const http = require('http');
const { PORT } = require('../config');
const { log } = require('../logger');
const { blockedLoop } = require('../utils');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const start = new Date();
  setTimeout(() => log(`Was blocked ${new Date() - start}, setTimeout`), 0)
  process.nextTick(() => log(`Was blocked ${new Date() - start}, nextTick`))
  blockedLoop(500)
  res.end(JSON.stringify({ timeDelayBlocked: new Date() - start }));
}).listen(PORT, () => log(`Listening on port ${PORT}...`));