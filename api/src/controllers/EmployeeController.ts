import { FastifyReply, FastifyRequest } from "fastify";
import { created, ok } from "../utils/http/index";
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

export const getAll = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const employees = await employeeService.getAll();
    return ok(reply, employees);
  } catch (error) {
    handleError(reply, error);
  }
};

export const getById = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  try {
    const employeeId = Number(request.params.id);    
    const employees = await employeeService.getById(employeeId);
    return ok(reply, employees);
  } catch (error) {
    handleError(reply, error);
  }
};
