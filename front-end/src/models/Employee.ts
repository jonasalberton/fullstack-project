import { Department } from "./Department";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: Date;
  departmentId: number;
  phone?: string;
  address?: string;
};

export type FullEmployee = Employee & { department: Department };

export type CreateEmployeeDTO = Omit<Employee, "id">;
