const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const {
  toJSON,
  saveEvent,
  updateEvents,
  createStream,
  deleteEvent,
} = require('./utils');
const { log } = require('../logger');

const FILE = 'events.csv';
const filePath = path.join('.', 'files', FILE);

app.use(bodyParser.json());

app.get('/events', async (req, res) => {
  try {
    const events = await toJSON(filePath);
    const reqLocation = req.query.location;

    if (reqLocation) {
      return res.json(events.filter(({ location }) => location.toLowerCase() === reqLocation.toLowerCase()));
    }

    res.json(events);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.get('/events/:id', async (req, res) => {
  try {
    const events = await toJSON(filePath);
    const eventId = req.params.id;
    const event = events.find(({ id }) => id === eventId);

    res.json(event)
  } catch (e) {
    res.sendStatus(400)
  }
});

app.delete('/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const events = await toJSON(filePath);
    const updatedEvents = await deleteEvent(filePath, events, eventId);

    res.json(updatedEvents)
  } catch (e) {
    res.sendStatus(400);
  }
});

app.post('/events', async (req, res) => {
  try {
    const { id, title, location, date, hour } = req.body;
    const events = await toJSON(filePath);
    const event = { id, title, location, date, hour };
    const isExist = events.find((item) => +item.id === id);

    if (isExist) {
      return res.status(400).send('Is already exist');
    }
    const updatedEvents = await saveEvent(filePath, events, event);

    res.json(updatedEvents)
  } catch (e) {
    res.sendStatus(400);
  }
});

app.put('/events/:id', async (req, res) => {
  try {
    const { title, location, date, hour } = req.body;
    const eventId = req.params.id;
    const events = await toJSON(filePath);
    const event = { id: eventId, title, location, date, hour };
    const updatedEvents = await updateEvents(filePath, events, event, eventId);

    res.json(updatedEvents)
  } catch (e) {
    res.sendStatus(400);
  }
});

app.get('/events-batch', async (req, res) => {
  try {
    const events = await toJSON(filePath);
    const stream = await createStream(events);
    stream.pipe(res.type('json'));
  } catch (e) {
    res.sendStatus(400);
  }
})

app.listen(3000, () => {
  log('Server listening at port 3000');
});