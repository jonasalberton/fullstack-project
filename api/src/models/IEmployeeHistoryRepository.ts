import { EmployeeHistoryDTO } from "./Employee";

export interface IEmployeeHistoryRepository {
  getAll(employeeId: number): Promise<EmployeeHistoryDTO[]>;
}
