const fsAsync = require('fs').promises;
const path = require('path');
const { log } = require('../logger');
const { transformEventsToCsv } = require('./utils');

const filePath = path.join('.', 'files', 'events.csv');
const events = [
  {
    id: 1,
    title: 'Event 1',
    location: 'Lviv',
    date: '02.02.2021',
    hour: '16:00',
  },
  {
    id: 2,
    title: 'Event 2',
    location: 'Odessa',
    date: '05.02.2021',
    hour: '17:00',
  },
  {
    id: 3,
    title: 'Event 3',
    location: 'Lviv',
    date: '02.03.2021',
    hour: '18:00',
  },
];

(async () => {
  await fsAsync.writeFile(filePath, transformEventsToCsv(events))
  log('CSV was generated');
})();