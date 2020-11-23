const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { asyncHooks, errorHandler } = require('./middlewares');

const { PORT, ENV } = require('./config');
const logger = require('./logger');

app
  .use(bodyParser.json())
  .use(asyncHooks)
  .get('/', async (req, res) => {
    try {

      res.json();
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .use(errorHandler)
  .listen(PORT, () => logger.info(`Server listening at ${PORT} port...`))