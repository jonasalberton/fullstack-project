import prisma from "../lib/prisma";
import { IDepartmentRepository } from "../models/IDepartmentRepository";

export class DepartmentRepository implements IDepartmentRepository {
  async getById(id: number) {
    return prisma.department.findUnique({ where: { id } });
  }
}
