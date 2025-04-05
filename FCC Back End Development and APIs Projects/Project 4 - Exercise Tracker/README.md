# Exercise Tracker

This is an Exercise Tracker project for the [FCC Back-End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/). The Exercise Tracker allows users to log their exercises, track their progress, and retrieve exercise logs.

## Features

- Create a new user.
- Add exercises for a user, including a description, duration, and date.
- Retrieve a user's exercise log with optional filters (e.g., date range, limit).

## API Endpoints

### 1. **Create a user**

- **Endpoint**: `POST /api/users`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "john_doe"
  }
  ```
- **Response**:

  ```json
  {
    "username": "exampleUser",
    "_id": "uniqueUserId"
  }
  ```

### 2. **Get all users**

- **Endpoint**: `GET /api/users`
- **Response**:
  ```json
  [
    {
      "username": "exampleUser",
      "_id": "uniqueUserId"
    },
    {
      "username": "exampleUser2",
      "_id": "uniqueUserId2"
    }
  ]
  ```

### 3. **Add an exercise**

- **Endpoint**: `POST /api/users/:_id/exercises`
- **Description**: Logs a new exercise for a user.
- **Request Body**:

  ```json
  {
    "description": "Running",
    "duration": 30,
    "date": "2023-01-01" // Optional, defaults to the current date
  }
  ```

- **Response**:
  ```json
  {
    "_id": "uniqueUserId",
    "username": "exampleUser",
    "description": "Running",
    "duration": 30,
    "date": "Sat Apr 05 2025"
  }
  ```

### 4. **Get user logs**

- **Endpoint**: `GET /api/users/:id/logs`
- **Description**: Retrieves a user's exercise log.
- **Query Parameters**:

  - `from` (optional) - Start date (yyyy-mm-dd)
  - `to` (optional) - End date (yyyy-mm-dd)
  - `limit` (optional) - Number of exercises to return

- **Response**:
  ```json
  {
    "_id": "uniqueUserId",
    "username": "exampleUser",
    "count": 2,
    "log": [
      {
        "description": "Running",
        "duration": 30,
        "date": "Mon Jan 01 2023"
      },
      {
        "description": "Cycling",
        "duration": 45,
        "date": "Tue Jan 02 2023"
      }
    ]
  }
  ```

## Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Access the API at `http://localhost:3000`.
