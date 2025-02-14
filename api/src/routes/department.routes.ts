import { FastifyInstance } from "fastify";
import { getAll } from "../controllers/DepartmentController";

export async function departmentRoutes(fastify: FastifyInstance) {
  fastify.get("/departments", getAll);
}
