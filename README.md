## Description

Simple API using [Nest](https://github.com/nestjs/nest) framework to manage a blog-like API.

## Installation

```bash
$ yarn install
```

## Running the app
- Create a postgreSQL database (suggested name `blogwars`)
- Copy environment variables and fill them accordingly

```bash
$ cp .env.sample .env
```

ENCRYPTION_IV, ENCRYPTION_PASSWORD and ENCRYPTION_SALT are all used for encrypting the data stored in `blogPost` and `comment` tables as I decided to explore encryption for fun while making this project

JWT_SECRET is used for JWT authentication strategy

For these vars you can use any type of random generated strings, or your own. It's up to you

- Run migrations

```bash
$ yarn build
$ yarn typeorm:migration:run
```

- Run seed to populate db with mock data
```bash
$ node dist/scripts/seed.js 
```

- Start up the project

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Stay in touch
- Author - [ffmcgee](https://github.com/jc992)