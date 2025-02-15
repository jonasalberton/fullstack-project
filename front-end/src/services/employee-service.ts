import { CreateEmployeeDTO, Employee, FullEmployee } from "@/models/Employee";
import { axios } from "./config/axios";

export function getAllEmployees(): Promise<FullEmployee[]> {
  return axios.get("/employees");
}

export function deleteEmployeeById(id: number) {
  return axios.delete(`/employees/${id}`);
}

export function createEmployee(employee: CreateEmployeeDTO): Promise<FullEmployee> {
  return axios.post("/employees", employee);
}

export function getEmployeeById(id: number): Promise<FullEmployee> {
  return axios.get(`/employees/${id}`);
}

export function updateEmployee(id: number, employee: Partial<Employee>): Promise<FullEmployee> {
  return axios.put(`/employees/${id}`, employee);
}
