const logger = require('../logger')
const { AsyncLocalStorage, executionAsyncId } = require('async_hooks');
const storage = new AsyncLocalStorage();

const get = () => {
  return storage.getStore();
}
const set = (userId, cb) => {
  storage.run({ userId }, cb)
}

module.exports = (req, res, next) => {
  set(executionAsyncId(), () => {
    try {
      logger.info(get())
    } catch (error) {
      logger.error(error)
    }
    next();
  })
}