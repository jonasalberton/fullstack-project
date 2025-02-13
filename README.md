# fullstack-assessment

### Getting started

First, you need to set up the database provided by the `docker-compose.yml` file in the root of the repository.
To do this, run the following command to start a PostgreSQL Docker image in detached mode:

```console
docker-compose up -d
```

After setting up the database, you need to run the db migration to create the initial structure.

```console
npx prisma migrate dev
```

### Database Seeding

Now that your database is up and running, you can seed it with some initial data by running the following command:

```console
npm run seed
```
