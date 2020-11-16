const { fibonacci } = require('../utils')

process.on('message', (res) => {
  process.send(fibonacci(res))
})