import { FastifyReply, FastifyRequest } from "fastify";
import { ok } from "../utils/http/index";
import { handleError } from "../utils/errors/handle-erros";
import { DepartmentRepository } from "../repositories/DepartmentRepository";
import { DepartmentService } from "../services/DepartmentService";

const departmentService = new DepartmentService(new DepartmentRepository());

export const getAll = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const departments = await departmentService.getAll();
    return ok(reply, departments);
  } catch (error) {
    handleError(reply, error);
  }
};
