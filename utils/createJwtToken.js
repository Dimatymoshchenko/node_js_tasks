const jwt = require('jsonwebtoken');

module.exports = (payload, signKey, expiration = '10s') => {
  return jwt.sign(payload, signKey, {expiresIn: expiration});
}