# File Metadata Microservice

This is a File Metadata Microservice project for the [FCC Back-End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/). This microservice allows users to upload a file and receive its metadata.

### API Usage

#### Endpoint: `/api/fileanalyse`

- **Method**: `POST`
- **Body**: A file (use `form-data` to upload the file).
- **Response**: The server will respond with a JSON object containing the file's metadata.

#### Example Request:

To upload a file, use a tool like Postman or cURL.

- **cURL Example**:

  ```bash
  curl -X POST -F "upfile=@/path/to/your/file" http://localhost:3000/api/fileanalyse
  ```

#### Example Response:

The response will contain a JSON object with the file's metadata:

```json
{
  "name": "example.png",
  "type": "image/png",
  "size": 12345
}
```

- `name`: The name of the file.
- `type`: The MIME type of the file.
- `size`: The size of the file in bytes.

## Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

The server will be available at `http://localhost:3000`.
