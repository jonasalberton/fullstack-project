import { CreateEmployeeDTO, EmployeeHistoryDTO, UpdateEmployeeDTO } from "../models/Employee";
import { IEmployeeRepository } from "../models/IEmployeeRepository";
import { IDepartmentRepository } from "../models/IDepartmentRepository";
import { NotFoundError } from "../utils/errors/not-found";
import { IEmployeeHistoryRepository } from "../models/IEmployeeHistoryRepository";

export class EmployeeService {
  constructor(
    private employeeRepository: IEmployeeRepository,
    private departmentRepository: IDepartmentRepository,
    private employeeHistoryRepository: IEmployeeHistoryRepository
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

  async remove(employeeId: number) {
    try {
      const employeeExists = await this.employeeRepository.getById(employeeId);
      if (!employeeExists) throw new NotFoundError(`Employee id ${employeeId} does not exist`);
      
     return await this.employeeRepository.remove(employeeId);
    } catch (error) {
      throw error;
    }
  }

  async getHistory(employeeId: number): Promise<EmployeeHistoryDTO[]> {
    try {
      const employee = await this.employeeRepository.getById(employeeId);
      if (!employee) throw new NotFoundError(`Employee id ${employeeId} does not exist`);    
      
      const history = await this.employeeHistoryRepository.getAll(employeeId);
      return history ?? [];
    } catch (error) {
      throw error;
    }
  }
}
