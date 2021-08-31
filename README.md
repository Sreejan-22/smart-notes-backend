# smart-notes-backend

The application is deployed here: https://smart-notes-backend.herokuapp.com/

Tech Stack

- Express.js
- Mongoose + MongoDB

## Routes

| Route   | Request Method | description                 |
| ------- | -------------- | --------------------------- |
| /singup | POST           | create a new user in db     |
| /login  | POST           | authenticate a current user |
| /notes  | GET            | get all notes of a user     |
| /notes  | POST           | create a new note           |
| /notes  | PUT            | update a note               |
| /notes  | DELETE         | delete a note               |

Authentication has been implemented using JSON Web Token.
