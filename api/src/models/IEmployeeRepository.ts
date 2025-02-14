import { Employee } from "@prisma/client";
import { CreateEmployeeDTO } from "./Employee";

export interface IEmployeeRepository {
  create(data: CreateEmployeeDTO): Promise<Employee>;
  getById(id: number): Promise<Employee | null>;
  getAll(): Promise<Employee[]>;
}
