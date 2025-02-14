import { FastifyInstance } from "fastify";
import { create, getAll } from "../controllers/EmployeeController";
import { CreateEmployeeSchema } from "../models/Employee";

export async function employeeRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/employees",
    { schema: { body: CreateEmployeeSchema } },
    create
  );

  fastify.get("/employees", getAll);
}
