import { buildApp } from "./app";

const app = buildApp();
const port = process.env.PORT || 3333;

app.listen({ port: Number(port), host: "localhost" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  
  console.log(`App running at http://localhost:${port}`);
});
