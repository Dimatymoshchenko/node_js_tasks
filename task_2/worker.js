const { fibonacci } = require('../utils')

const { parentPort, workerData } = require('worker_threads');

parentPort.postMessage(fibonacci(workerData));