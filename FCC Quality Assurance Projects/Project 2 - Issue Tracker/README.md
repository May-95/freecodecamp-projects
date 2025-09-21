# Issue Tracker

This is the Issue Tracker project for the [FreeCodeCamp Quality Assurance certification](https://www.freecodecamp.org/learn/quality-assurance/). A Node.js web application that allows users to create, read, update, and delete issues across different projects.

## Features

- Create, read, update, and delete issues
- Filter issues by project
- RESTful API endpoints

## API Endpoints

### GET `/api/issues/{project}`
Get all issues for a project with optional filtering:
- Query parameters: `_id`, `issue_title`, `issue_text`, `created_by`, `assigned_to`, `status_text`, `open`, `created_on`, `updated_on`

### POST `/api/issues/{project}`
Create a new issue:
- Required: `issue_title`, `issue_text`, `created_by`
- Optional: `assigned_to`, `status_text`

### PUT `/api/issues/{project}`
Update an existing issue:
- Required: `_id` and at least one field to update
- Optional fields: `issue_title`, `issue_text`, `created_by`, `assigned_to`, `status_text`, `open`

### DELETE `/api/issues/{project}`
Delete an issue:
- Required: `_id`

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

5. Visit `http://localhost:3000` to use the application.


## Testing

Run the functional tests:

```bash
npm test
```

## Preview
![screenshot](https://github.com/May-95/freecodecamp-projects/blob/main/FCC%20Quality%20Assurance%20Projects/Project%202%20-%20Issue%20Tracker/Issue%20Tracker.png)
