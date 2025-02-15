import { axios } from "./config/axios";
import { Department } from "@/models/Department";

export function getAllDepartments(): Promise<Department[]> {
  return axios.get("/departments");
}
