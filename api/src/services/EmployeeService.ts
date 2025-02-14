import { CreateEmployeeDTO } from "../models/Employee";
import { IEmployeeRepository } from "../models/IEmployeeRepository";
import { IDepartmentRepository } from "../models/IDepartmentRepository";
import { NotFoundError } from "../utils/errors/not-found";

export class EmployeeService {
  constructor(
    private employeeRepository: IEmployeeRepository,
    private departmentRepository: IDepartmentRepository
  ) {}

  async create(employee: CreateEmployeeDTO) {
    try {
      const department = await this.departmentRepository.getById(employee.departmentId);
      if (!department) throw new NotFoundError(`Department id ${employee.departmentId} does not exist`);

      return await this.employeeRepository.create(employee);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return await this.employeeRepository.getAll();
  }
}
