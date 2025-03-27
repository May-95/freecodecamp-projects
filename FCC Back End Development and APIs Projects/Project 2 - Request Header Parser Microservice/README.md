# Request Header Parser Microservice

This is a Request Header Parser Microservice project for the [FCC Back-End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/), which will parse the header information from incoming requests and return the data in a structured format.

## API Endpoints

### `/api/whoami`

- **Response**: Returns a JSON object with the following properties:
  - `ipaddress`: Your IP address.
  - `language`: Your preferred language.
  - `software`: The software your browser is using.

#### Example

- **Input**: `/api/whoami`
- **Output**:
  ```json
  {
    "ipaddress": "124.23.190.99",
    "language": "en-GB,en;q=0.9",
    "software": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15"
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
