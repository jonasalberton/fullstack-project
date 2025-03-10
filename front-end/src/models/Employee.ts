import { Department } from "./Department";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: Date;
  departmentId: number;
  isActive: boolean;
  phone?: string;
  address?: string;
};

export type FullEmployee = Employee & { department: Department };

export type CreateEmployeeDTO = Pick<
  Employee,
  "firstName" | "lastName" | "address" | "departmentId" | "hireDate" | "phone"
>;

export type EmployeeHistoryDTO = {
  id: number;
  createdAt: Date;
  employeeId: number;
  department: Department;
};
