# Metric-Imperial Converter

This is the Metric-Imperial Converter project for the [FreeCodeCamp Quality Assurance certification](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter). A Node.js web application that converts between metric and imperial units. 

## Features

- Convert between metric and imperial units:
- Input validation and error handling
- RESTful API endpoint
- Test suite

## API Usage

**GET** `/api/convert?input={number}{unit}`

Example: `/api/convert?input=10L`

Response:
```json
{
  "initNum": 10,
  "initUnit": "L",
  "returnNum": 2.64172,
  "returnUnit": "gal",
  "string": "10 liters converts to 2.64172 gallons"
}
```

## Supported Units

- **gal** (gallons) ↔ **L** (liters)
- **lbs** (pounds) ↔ **kg** (kilograms)
- **mi** (miles) ↔ **km** (kilometers)

## Installation

```bash
npm install
npm start
```

## Testing

```bash
npm test
```

## Project Requirements

This project fulfills the FreeCodeCamp Quality Assurance requirements:
- Unit conversion logic
- Input parsing and validation
- API endpoint implementation
- Functional and unit tests

## Preview
![screenshot](https://github.com/May-95/freecodecamp-projects/blob/main/FCC%20Quality%20Assurance%20Projects/Project%201%20-%20Metric-Imperial%20Converter/Metric-Imperial%20Converter.png)
