const log = (...args) => console.log(...args)
const debug = (...args) => console.debug(...args)
const error = (...args) => console.error(...args)
const warn = (...args) => console.warn(...args)

module.exports = {
  log,
  debug,
  error,
  warn,
}