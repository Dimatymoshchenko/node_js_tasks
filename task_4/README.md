# Node.js Homework 4

## Create server1.js with couple of routes (use different http methods, implement extract of the request body)

- Run
```
$ node server.js
```

- Use for GET request
```
$ curl localhost:3000/users
```

- Use for POST request
```
curl --request POST 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{"id": 3, "title": "Event 3", "location": "IF", "date": "2021-01-01", "hour": "12:00"}'
```