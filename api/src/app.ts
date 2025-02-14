import fastify from "fastify";
import { employeeRoutes } from "./routes/employee.routes";
import cors from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";

export function buildApp() {
  const app = fastify({
    logger: true,
  });

  app.register(cors, { origin: "*" });
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(employeeRoutes);

  return app;
}
