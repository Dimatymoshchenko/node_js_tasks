# Node.js Homework


### Copy .env.example to .env with your credentials

### To run app:
```
$ PORT=8080 node app.js
```

### To check app:
```
$ curl localhost:8080
```

### To create user
```
$ curl -d '{"email":"user@mail.com", "firstName":"testName", "lastName":"lastNameTest"}' -H "Content-Type: application/json" -X POST http://localhost:8080/users
```

### To delete user
```
$ curl -X "DELETE" 'localhost:8080/users/<user_id>'
```

### To create event
```
$ curl -d '{"participantsIds":"[<user_id>,...]","title":"new Event", location: "Odessa"}' -H "Content-Type: application/json" -X POST http://localhost:8080/events
```

### If user will delete, database will also delete events with user