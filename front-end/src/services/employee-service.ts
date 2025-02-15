import { FullEmployee } from "@/models/Employee";
import { axios } from "./config/axios";

export function getAllEmployees(): Promise<FullEmployee[]> {
  return axios.get("/employees");
}

export function deleteEmployeeById(id: number) {
  return axios.delete(`/employees/${id}`);
}
