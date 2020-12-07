const jwt = require('jsonwebtoken');

module.exports = (token) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.REFRESH_TOKEN_SECRET;
  return jwt.verify(token, secret);
}