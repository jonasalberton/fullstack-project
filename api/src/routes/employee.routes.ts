import { FastifyInstance } from "fastify";
import { create, getAll, getById } from "../controllers/EmployeeController";
import { CreateEmployeeSchema } from "../models/Employee";
import { z } from "zod";

export async function employeeRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/employees",
    { schema: { body: CreateEmployeeSchema } },
    create
  );

  fastify.get("/employees", getAll);
  fastify.get("/employees/:id", getById);
}
