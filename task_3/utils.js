const asyncFs = require('fs').promises;
const stream = require('stream');

const transformEventsToCsv = (events) => {
  const lineSeparator = '\n';
  const headers = 'id,title,location,date,hour';
  const data = events.map(item => `${item.id},${item.title},${item.location},${item.date},${item.hour}`);
  return `${headers}${lineSeparator}${data.join(lineSeparator)}`
}

const convertCSV = (csv) => {
  const lines = csv.toString().split('\n')
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue
    const obj = {}
    const currentLine = lines[i].split(',')

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j]
    }
    result.push(obj)
  }

  return result
};

const toJSON = async (file) => {
  const result = await asyncFs.readFile(file);

  return convertCSV(result)
};

const saveEvent = async (filePath, oldEvents, event) => {
  const events = [...oldEvents, event]
  await asyncFs.writeFile(filePath, transformEventsToCsv(events));

  return events;
};

const updateEvents = async (filePath, events, event, eventId) => {
  const updatedEvents = events.map((item) => {
    return item.id === eventId ? event : item;
  })
  await asyncFs.writeFile(filePath, transformEventsToCsv(updatedEvents));

  return updatedEvents;
};

const deleteEvent = async (filePath, events, eventId) => {
  const updatedEvents = events.filter(({id}) => id !== eventId);
  await asyncFs.writeFile(filePath, transformEventsToCsv(updatedEvents));

  return updatedEvents;
}

const createStream = async (events) => {
  return stream.Readable.from(JSON.stringify(events))
}

module.exports = {
  toJSON,
  transformEventsToCsv,
  saveEvent,
  updateEvents,
  deleteEvent,
  createStream,
}