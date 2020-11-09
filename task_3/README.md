# Node.js Homework 3

```
$ npm i && cd task_3
```

- Generate csv file with events data (id, title, location, date, hour, etc)
```
$ node writeFile.js
```

## Start server before send requests
```
$ node server.js
```
- Create GET /events?location=lviv endpoint which returns events from csv file in json format. It should support possible filtering events by location (passed as query parameter).
```
$ curl 'localhost:3000/events?location=lviv'
```
- Create GET /events/:eventId endpoint for getting some specific event by id.
```
$ curl 'localhost:3000/events/2'
```
- Create DELETE /events/:eventId endpoint for deleting some specific event by id.
```
$ curl --request DELETE 'localhost:3000/events/1'
```
- Create POST /events endpoint for saving new event to the csv file.
```
$ curl --request POST 'localhost:3000/events' --header 'Content-Type: application/json' --data-raw '{"id":4,"title":"New Event","location":"Odessa","date":"12.12.2021","hour":"14:00"'
```
- Create PUT /events/:eventId endpoint for replacing specific event data in csv file.
```
$ curl --request PUT 'localhost:3000/events/4' --header 'Content-Type: application/json' --data-raw '{"title":"New Event","location":"Odessa","date":"13.12.2021","hour":"14:00"'
```
- Create GET /events-batch endpoint which returns all events in json format via streaming directly from csv file.
```
$ curl 'localhost:3000/events-batch'
```