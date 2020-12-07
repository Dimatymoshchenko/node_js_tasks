require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { asyncHooks, errorHandler, authHandler } = require('./middlewares');
const { PORT, ENV } = require('./config');
const logger = require('./logger');
const { usersRouter, eventsRouter, loginRouter } = require('./router');
const db = require('./db');
const cookieParser = require('cookie-parser')

db.start();

app
  .use(cookieParser())
  .use(bodyParser.json())
  // .use(asyncHooks)
  .get('/', async (req, res) => {
    try {
      res.json();
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .use('/users', usersRouter)
  .use('/events', eventsRouter)
  .use('/login', loginRouter)
  .use(authHandler)
  .use(errorHandler)
  .listen(PORT, () => logger.info(`Server listening at ${PORT} port...`))