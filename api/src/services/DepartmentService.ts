import { IDepartmentRepository } from "../models/IDepartmentRepository";

export class DepartmentService {
  constructor(private departmentRepository: IDepartmentRepository) {}

  async getAll() {
    return await this.departmentRepository.getAll();
  }
}
