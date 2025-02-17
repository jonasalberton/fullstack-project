# fullstack-assessment

![DB ERD](./api//ERD.png)

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
---
### API Setup and Run

To set up the API, navigate to the `api` folder and run the following command to install all dependencies:
```console
npm install
```

Once the dependencies are installed, you can start the API project locally using the following command:
```console
npm run dev
```
---
### Front-end Setup and Run
To set up the Front-end, navigate to the `front-end` folder and run the following command to install all dependencies:
```console
npm install
```

Once the dependencies are installed, you can start the front-end project locally using the following command:
```console
npm run dev
````

