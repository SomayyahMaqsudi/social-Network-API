# Social Network API

This is a social network API that allows you to manage users, thoughts, reactions, and friendships. You can perform various CRUD (Create, Read, Update, Delete) operations on users, thoughts, reactions, and friendships using this API.

## User Story: 
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria: 
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list


### Installation:

1. Clone the repository:

   git clone https://github.com/SomayyahMaqsudi/social-Network-API

2. Install the dependencies:

   npm install

3. Configure the MongoDB connection URL:
   - Open the `.env` file in the project root directory.
   - Set the `MONGODB_URI` variable to your MongoDB connection URL.

4. Start the application:

   npm start

5. The server will start, and the Mongoose models will be synced to the MongoDB database.



## API Usage:

### Users

- **GET** `/api/users`: Retrieve all users.
- **GET** `/api/users/:userId`: Retrieve a single user by ID.
- **POST** `/api/users`: Create a new user.
- **PUT** `/api/users/:userId`: Update a user by ID.
- **DELETE** `/api/users/:userId`: Delete a user by ID.
- **POST** `/api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
- **DELETE** `/api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

### Thoughts

- **GET** `/api/thoughts`: Retrieve all thoughts.
- **GET** `/api/thoughts/:thoughtId`: Retrieve a single thought by ID.
- **POST** `/api/thoughts`: Create a new thought.
- **PUT** `/api/thoughts/:thoughtId`: Update a thought by ID.
- **DELETE** `/api/thoughts/:thoughtId`: Delete a thought by ID.

### Reactions

- **POST** `/api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.


## Example Requests

- Retrieve all users: GET /api/users

- Create a new user: 

POST /api/users
  Body: {
    "username": "somayyah",
    "email": "somayyah@example.com"
  }

- Retrieve a single thought by ID: GET /api/thoughts/:thoughtId

- Add a reaction to a thought:

  POST /api/thoughts/:thoughtId/reactions
  Body: {
    "reactionBody": "I agree!",
    "username": "somayyah"
  }


## Example Responses

<!-- Retrieve all users:
  ```json
  [
    {
      "_id": "60ab3e8d8a6f4d001fd1d9a1",
      "username": "somayyah",
      "email": "somayyah@example.com",
      "createdAt": "2022-05-25T10:30:00.000Z",
      "friends": [],
      "thoughts": []
    },
    {
      "_id": "60ab3e8 -->