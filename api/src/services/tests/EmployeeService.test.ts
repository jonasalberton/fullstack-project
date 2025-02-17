import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmployeeService } from '../EmployeeService';
import { NotFoundError } from '../../utils/errors/not-found';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../../models/Employee';

describe('EmployeeService', () => {
  const mockEmployee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    departmentId: 1,
    hireDate: new Date('2023-01-01'),
    isActive: true,
    phone: '1234567890',
    address: '123 Street'
  };

  const mockDepartment = {
    id: 1,
    name: 'IT',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockEmployeeRepo = {
    create: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  };

  const mockDepartmentRepo = {
    getById: vi.fn(),
    getAll: vi.fn()
  };

  const mockHistoryRepo = {
    getAll: vi.fn()
  };

  const service = new EmployeeService(
    mockEmployeeRepo,
    mockDepartmentRepo,
    mockHistoryRepo
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    const createDTO: CreateEmployeeDTO = {
      firstName: 'John',
      lastName: 'Doe',
      departmentId: 1,
      hireDate: new Date('2023-01-01'),
      phone: '1234567890',
      address: '123 Street'
    };

    it('should successfully create an employee', async () => {
      mockDepartmentRepo.getById.mockResolvedValue(mockDepartment);
      mockEmployeeRepo.create.mockResolvedValue(mockEmployee);

      const result = await service.create(createDTO);

      expect(mockDepartmentRepo.getById).toHaveBeenCalledWith(createDTO.departmentId);
      expect(mockEmployeeRepo.create).toHaveBeenCalledWith(createDTO);
      expect(result).toEqual(mockEmployee);
    });

    it('should throw NotFoundError if department does not exist', async () => {
      mockDepartmentRepo.getById.mockResolvedValue(null);

      await expect(service.create(createDTO)).rejects.toThrow(
        new NotFoundError(`Department id ${createDTO.departmentId} does not exist`)
      );
      expect(mockEmployeeRepo.create).not.toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('should return all employees', async () => {
      const mockEmployees = [mockEmployee];
      mockEmployeeRepo.getAll.mockResolvedValue(mockEmployees);

      const result = await service.getAll();

      expect(mockEmployeeRepo.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockEmployees);
    });
  });

  describe('getById', () => {
    it('should return employee by id', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(mockEmployee);

      const result = await service.getById(1);

      expect(mockEmployeeRepo.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEmployee);
    });

    it('should throw NotFoundError if employee does not exist', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(null);

      await expect(service.getById(999)).rejects.toThrow(
        new NotFoundError('Employee id 999 does not exist')
      );
    });
  });

  describe('update', () => {
    const updateDTO: UpdateEmployeeDTO = {
      firstName: 'Jane',
      departmentId: 2
    };

    it('should successfully update an employee', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(mockEmployee);
      mockDepartmentRepo.getById.mockResolvedValue({ ...mockDepartment, id: 2 });
      mockEmployeeRepo.update.mockResolvedValue({ ...mockEmployee, ...updateDTO });

      const result = await service.update(1, updateDTO);

      expect(mockEmployeeRepo.getById).toHaveBeenCalledWith(1);
      expect(mockDepartmentRepo.getById).toHaveBeenCalledWith(updateDTO.departmentId);
      expect(mockEmployeeRepo.update).toHaveBeenCalledWith(1, updateDTO);
      expect(result).toEqual({ ...mockEmployee, ...updateDTO });
    });

    it('should throw NotFoundError if employee does not exist', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(null);

      await expect(service.update(999, updateDTO)).rejects.toThrow(
        new NotFoundError('Employee id 999 does not exist')
      );
      expect(mockEmployeeRepo.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if new department does not exist', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(mockEmployee);
      mockDepartmentRepo.getById.mockResolvedValue(null);

      await expect(service.update(1, updateDTO)).rejects.toThrow(
        new NotFoundError(`Department id ${updateDTO.departmentId} does not exist`)
      );
      expect(mockEmployeeRepo.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should successfully remove an employee', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(mockEmployee);
      mockEmployeeRepo.remove.mockResolvedValue(mockEmployee);

      await service.remove(1);

      expect(mockEmployeeRepo.getById).toHaveBeenCalledWith(1);
      expect(mockEmployeeRepo.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundError if employee does not exist', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(
        new NotFoundError('Employee id 999 does not exist')
      );
      expect(mockEmployeeRepo.remove).not.toHaveBeenCalled();
    });
  });

  describe('getHistory', () => {
    const mockHistory = [
      { id: 1, employeeId: 1, departmentId: 1, createdAt: new Date() }
    ];

    it('should return employee history', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(mockEmployee);
      mockHistoryRepo.getAll.mockResolvedValue(mockHistory);

      const result = await service.getHistory(1);

      expect(mockEmployeeRepo.getById).toHaveBeenCalledWith(1);
      expect(mockHistoryRepo.getAll).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockHistory);
    });

    it('should throw NotFoundError if employee does not exist', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(null);

      await expect(service.getHistory(999)).rejects.toThrow(
        new NotFoundError('Employee id 999 does not exist')
      );
      expect(mockHistoryRepo.getAll).not.toHaveBeenCalled();
    });

    it('should return empty array if no history exists', async () => {
      mockEmployeeRepo.getById.mockResolvedValue(mockEmployee);
      mockHistoryRepo.getAll.mockResolvedValue(null);

      const result = await service.getHistory(1);

      expect(result).toEqual([]);
    });
  });
}); 