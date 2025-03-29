# URL Shortener Microservice

This is a URL Shortener Microservice project for the [FCC Back-End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/).

## Features

- Shorten a given URL and return the shortened version.
- Retrieve the original URL by accessing the shortened version.
- Redirect to the original URL when the shortened URL is accessed.
- Simple REST API with the following endpoints:
  - `POST /api/shorturl` – Shorten a URL.
  - `GET /api/shorturl/:short_url` – Redirect to the original URL.

## Requirements

- Node.js
- MongoDB
- Express.js
- Mongoose

## Installation

1. Clone this repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your MongoDB database.

4. Set your MongoDB URI in `.env` (create this file if it doesn’t exist):
   ```bash
   MONGO_URI=your_mongodb_connection_string
   ```
5. Run the application:
   ```bash
   npm start
   ```
6. The app will now be running on `http://localhost:3000`.

## Usage

### Shorten a URL

Send a POST request to `/api/shorturl` with the following JSON body:

```json
{
  "url": "http://www.example.com"
}
```

Example response:

```json
{
  "original_url": "http://www.example.com",
  "short_url": "http://localhost:3000/abcd1234"
}
```

### Redirect to Original URL

Access the shortened URL (e.g., `http://localhost:3000/abcd1234`), and the server will redirect you to the original URL.
