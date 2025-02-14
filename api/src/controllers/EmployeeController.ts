import { FastifyReply, FastifyRequest } from "fastify";
import { created } from "../utils/http/index";
import { CreateEmployeeDTO } from "../models/Employee";
import { handleError } from "../utils/errors/handle-erros";
import { EmployeeService } from "../services/EmployeeService";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { DepartmentRepository } from "../repositories/DepartmentRepository";

const employeeService = new EmployeeService(
  new EmployeeRepository(),
  new DepartmentRepository()
);

export const create = async (
  request: FastifyRequest<{ Body: CreateEmployeeDTO }>,
  reply: FastifyReply
) => {
  try {
    const employee = await employeeService.create(request.body);
    return created(reply, employee);
  } catch (error) {
    handleError(reply, error);
  }
};
