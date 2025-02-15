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

  async getAll() {
    return prisma.employee.findMany({
      include: {
        department: true,
      },
      orderBy: {
        updatedAt: "desc"
      }
    });
  }

  async update(id: number, employee: CreateEmployeeDTO) {
    return prisma.employee.update({
      where: { id },
      data: employee,
      include: {
        department: true
      }
    });
  }

  async remove(id: number) {
    return prisma.employee.delete({
      where: { id },
    });
  }
}
