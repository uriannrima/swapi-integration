# Star Wars API Integration

API REST with it's own data and integration with [Star Wars API](https://swapi.co).

### Prerequisites

You'll need a .env with configurations to your MongoDB insntance, and with these parameters

```
MONGODB_URL=URL:PORT
MONGODB_USER=
MONGODB_PASSWORD=
```

Without it the application won't work.

### Installing

Simple execute one of the commands bellow:

```
yarn install
npm install
```

## Running the tests

Tests were created using Mocha/Chai and Supertest to simulate requests.
To execute all of the tests, run:

```
yarn test:all
npm run test:all
```

Or, if you want to execute for a specific folder:

```
yarn test models/**/*.spec.js
npm run test models/**/*.spec.js
```

### Linting

Execute the command bellow to find erros:

```
yarn lint
npm run lint
```

To find and automatically fix, execute:

```
yarn lint:fix
npm run lint:fix
```

## Deployment

To run the API, execute:

```
yarn dev
npm run dev
```

## REST API

## Routes available:
- Planets: 
  - Used to create, list and delete planets.
  - URL: /planet
  - Verbs:
    - POST: Create a new planet.
    - GET: List all planets.
      - /ID: Get specific planet.
      - ?name=: Get planet filtered by name.
    - DELETE/ID: Deletes a planet by id.
