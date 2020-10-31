const crypto = require('crypto');
const start = Date.now();
const REPEAT_NUMBER = 5;

const logHashTime = (n) => {
  crypto.pbkdf2('a', 'b', 10000, 512, 'sha512', () => {
    console.log(`Hash ${n}:`, Date.now() - start);
  })
}

process.env.UV_THREADPOOL_SIZE = 5;

for(let i = REPEAT_NUMBER; i > 0; i--) {
  logHashTime(i);
}