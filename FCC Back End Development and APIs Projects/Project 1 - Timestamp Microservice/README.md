# Timestamp Microservice

This is a Timestamp Microservice project for the [FCC Back-End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/) that provides an API to convert date strings into Unix timestamps and UTC-formatted dates. It can handle both valid date strings and invalid ones, providing appropriate responses.

## API Endpoints

### `/api/:date`

- **Params**: `date` (String) - A Unix timestamp or a natural language date string (e.g., "December 25, 1995" or "1450137594").
- **Response**: Returns a JSON object with the following properties:
  - `unix` (Number) - The Unix timestamp.
  - `utc` (String) - The natural language date (e.g., "December 25, 1995").

#### Example

- **Input**: `/api/1450137594`
- **Output**:
  ```json
  {
    "unix": 1450137594,
    "utc": "Sat, 17 Jan 1970 18:48:57 GMT"
  }
  ```

- **Input**: `/api/December%2025,%201995`
- **Output**:
  ```json
  {
    "unix": 819849600000,
    "utc": "Mon, 25 Dec 1995 00:00:00 GMT"
  }
  ```

### Error Handling

If the `date` is invalid (e.g., an incorrectly formatted date or a non-existent timestamp), the API will return an error response in the following format:

#### Example

- **Input**: `/api/invalid_date`
- **Output**:
  ```json
  {
    "error": "Invalid Date"
  }
  ```

If no `date` is provided, the API will default to returning the current date and time, in both Unix timestamp and UTC format.

#### Example

- **Input**: `/api/`
- **Output**:
  ```json
  { 
    "unix": 1743037032898, 
    "utc": "Thu, 27 Mar 2025 00:57:12 GMT" 
  }
  ```

## Installation

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   npm start
   ```
4. Open your browser and visit `http://localhost:3000` to test the API.
