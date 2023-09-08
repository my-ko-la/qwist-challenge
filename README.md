# Qwist Coding Challenge

## How to run the project

Clone the repository to your directory of choice.

Then, run the following commands:

`npm i`

`npm start`

Endpoint:

- GET /transactions[?source]

Note: `source` query parameter only supports fetching transactions from 1 specified bank.

## Stack

- `NestJS` - Backend Framework
- `Axios` - data fetching (NestJS wrapped)
- `nock` - API mocking
- `jest` - testing framework
- `zod` - validation library

## Personal Observations

- For having not used NestJS for over a year I found the challenge to be very refreshing, as I have mainly worked with "vanilla" Express.

- I opted to go for OOP-lite approach. Given a bank / data source, one service is responsible for fetching the data and serving the transformed data to the caller. The transformation is done through a Builder/Strategy class, injected into the Fetcher, which, potentially, decouples the responsibilities.

- Given more time the first thing I would focus on is a more thorough test suite and custom error handling.

- Data provided in the Revolut JSON (line 115) was not valid JSON, missing a comma.
