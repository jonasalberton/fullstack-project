import { z } from "zod";

const CreateEmployeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  departmentId: z
    .number()
    .int()
    .positive("Department ID must be a positive integer"),
  hireDate: z.string().transform((dateString) => new Date(dateString)),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const UpdateEmployeeSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  departmentId: z
    .number()
    .int()
    .positive("Department ID must be a positive integer")
    .optional(),
  hireDate: z
    .string()
    .transform((dateString) => new Date(dateString))
    .optional(),
  phone: z.string().optional(),
  isActive: z.boolean().optional(),
  address: z.string().optional(),
});

type CreateEmployeeDTO = z.infer<typeof CreateEmployeeSchema>;

type UpdateEmployeeDTO = z.infer<typeof UpdateEmployeeSchema>;

export {
  CreateEmployeeDTO,
  CreateEmployeeSchema,
  UpdateEmployeeDTO,
  UpdateEmployeeSchema,
};

export type EmployeeHistoryDTO = {
  id: number;
  createdAt: Date;
  employeeId: number;
  department: {
    id: number;
    name: string;
  };
};
