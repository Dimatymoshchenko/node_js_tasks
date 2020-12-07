const logger = require('../logger');
const { createJwtToken, verifyToken } = require('../utils');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { url, body, headers } = req;
  const { refresh_token, access_token } = body;
  const { authorization } = headers;

  switch (url) {
    case '/check_access':
      if (!authorization) return res.status(403).json({ error: 'Forbidden' });
      return res.send('ok');
    case '/refresh':
      if (!authorization) return res.status(403).json({ error: 'Forbidden' });

      const data = await verifyToken(authorization);
      const user = await Users.findById({ id: data.id });

      res.clearCookie('refresh_token');
      res.clearCookie('access_token');

      const accessToken = await createJwtToken({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
      const refreshToken = await createJwtToken({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);

      res.send({
        accessToken, refreshToken,
      });
  }
}