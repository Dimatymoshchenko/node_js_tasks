const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const { createJwtToken } = require('../utils');


router
  .post('/', async (req, res, next) => {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'id is missing' });

      const user = await Users.findById(id);
      if (!user) return res.status(400).json({ error: 'user not found' });

      const accessToken = await createJwtToken({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
      const refreshToken = await createJwtToken({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);

      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);

      res.send({
        accessToken, refreshToken,
      });
    } catch (e) {
      next(e)
    }
  });

module.exports = router;