const express = require('express');
const router = express.Router();
const { Users, Events } = require('../models')

router
  .get('/', (req, res, next) => {
    try {
      Users.find({}, (users) => {
        res.send(users || []);
      })
    } catch (e) {
      next(e)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await Users.findById(id);
      res.send(user);
    } catch (e) {
      next(e)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newUser = new Users(req.body);
      await newUser.save();
      res.send(newUser)
    } catch (e) {
      next(e)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await Users.findById(id);
      if (!user) {
        throw new Error('User is not found');
      }
      await Users.deleteOne({_id: user._id});
      await Events.deleteMany({
        creatorId: user._id
      });
      res.send({ message: 'success' });
    } catch (e) {
      next(e)
    }
  });

module.exports = router;