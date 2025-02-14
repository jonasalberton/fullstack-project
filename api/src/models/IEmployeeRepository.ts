import { Employee } from "@prisma/client";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "./Employee";

export interface IEmployeeRepository {
  create(data: CreateEmployeeDTO): Promise<Employee>;
  getById(id: number): Promise<Employee | null>;
  getAll(): Promise<Employee[]>;
  update(id: number, data: UpdateEmployeeDTO): Promise<Employee>;
  remove(id: number): Promise<Employee>;
}
