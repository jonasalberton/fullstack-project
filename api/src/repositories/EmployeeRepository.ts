import prisma from "../lib/prisma";
import { CreateEmployeeDTO } from "../models/Employee";
import { IEmployeeRepository } from "../models/IEmployeeRepository";

export class EmployeeRepository implements IEmployeeRepository {
  async create(employee: CreateEmployeeDTO) {
    return prisma.employee.create({
      data: employee,
      include: {
        department: true,
      },
    });
  }

  async getById(id: number) {
    return prisma.employee.findUnique({
      where: { id },
      include: { department: true },
    });
  }
}
