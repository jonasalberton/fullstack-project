import prisma from "../lib/prisma";
import { IEmployeeHistoryRepository } from "../models/IEmployeeHistoryRepository";

export class EmployeeHistoryRepository implements IEmployeeHistoryRepository {
  async getAll(employeeId: number) {
    return prisma.employeeHistory.findMany({
      select: {
        createdAt: true,
        id: true,
        employeeId: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        employeeId,
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }
}
