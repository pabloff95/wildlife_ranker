## Set up application

Initialise your `.env` file to store the API key: `cp ./.env.dist ./.env `. Then add your api key from [api-ninjas](https://api-ninjas.com/).

If you have docker installed, you just need to execute: `docker compose up --build`. Then navigate to the port [4200](http://localhost:4200/).

If you do not have docker installed, follow these steps:

```
nvm use 20
npm install
npm run start
```

Then navigate to the port [4200](http://localhost:4200/).

## Run the ESLint

To run the linter: `npm run lint`

## Run the tests

To run the test: `npm test`
