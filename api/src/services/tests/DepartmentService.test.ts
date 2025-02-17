import { describe, it, expect, vi, beforeEach } from "vitest";
import { DepartmentService } from "../DepartmentService";
import { NotFoundError } from "../../utils/errors/not-found";

describe("DepartmentService", () => {
  const mockDepartment = {
    id: 1,
    name: "IT",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDepartmentRepo = {
    getAll: vi.fn(),
    getById: vi.fn(),
  };

  const service = new DepartmentService(mockDepartmentRepo);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return all departments", async () => {
      const mockDepartments = [mockDepartment];
      mockDepartmentRepo.getAll.mockResolvedValue(mockDepartments);

      const result = await service.getAll();

      expect(mockDepartmentRepo.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockDepartments);
    });

    it("should return empty array if no departments exist", async () => {
      mockDepartmentRepo.getAll.mockResolvedValue([]);

      const result = await service.getAll();

      expect(mockDepartmentRepo.getAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Database error");
      mockDepartmentRepo.getAll.mockRejectedValue(error);

      await expect(service.getAll()).rejects.toThrow(error);
    });
  });
});
