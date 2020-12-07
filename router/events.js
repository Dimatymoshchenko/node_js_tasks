const express = require('express');
const router = express.Router();
const { Events } = require('../models')

router
  .get('/', (req, res, next) => {
    try {
      Events.find({}, (events) => {
        res.send(events || []);
      })
    } catch (e) {
      next(e)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await Events.findById(id);
      res.send(event);
    } catch (e) {
      next(e)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newEvent = new Events(req.body);
      await newEvent.save();
      res.send(newEvent)
    } catch (e) {
      next(e)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await Events.findOneAndDelete(id);
      if (!event) {
        throw new Error('Event is not found');
      }
      res.send({ message: 'success' });
    } catch (e) {
      next(e)
    }
  });

module.exports = router;