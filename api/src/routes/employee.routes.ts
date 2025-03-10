import { FastifyInstance } from "fastify";
import { create, getAll, getById, update, remove, getHistory } from "../controllers/EmployeeController";
import { CreateEmployeeSchema, UpdateEmployeeSchema } from "../models/Employee";

export async function employeeRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/employees",
    { schema: { body: CreateEmployeeSchema } },
    create
  );
  fastify.get("/employees", getAll);
  fastify.get("/employees/:id", getById);
  fastify.patch(
    "/employees/:id",
    { schema: { body: UpdateEmployeeSchema } },
    update
  );
  fastify.delete("/employees/:id", remove);
  fastify.get("/employees/:id/history", getHistory);
}
