import { Department } from "@prisma/client";

export interface IDepartmentRepository {
  getById(id: number): Promise<Department | null>;
  getAll(): Promise<Department[]>;
}
