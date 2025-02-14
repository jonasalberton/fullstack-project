import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../models/Employee";
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

  async getById(employeeId: number) {
    try {
      const employee = await this.employeeRepository.getById(employeeId);
      if (!employee) throw new NotFoundError(`Employee id ${employeeId} does not exist`);    
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, employee: UpdateEmployeeDTO) {
    try {
      const savedEmployee = await this.employeeRepository.getById(id);
      if (!savedEmployee) throw new NotFoundError(`Employee id ${id} does not exist`);

     if (employee.departmentId) {
      const department = await this.departmentRepository.getById(employee.departmentId);
      if (!department) throw new NotFoundError(`Department id ${employee.departmentId} does not exist`);
     }

    return await this.employeeRepository.update(id, employee);
    } catch (error) {
      throw error;
    }
  }
}
