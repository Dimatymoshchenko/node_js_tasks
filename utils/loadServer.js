const http = require('http');
const { PORT } = require('../config')
const { log } = require('../logger');
const REQUESTS_AMOUNT = 100;

for (let i = 0; i < REQUESTS_AMOUNT; i++) {
  http.get(`http://localhost:${PORT}`, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
      log(data)
    });
  })
}