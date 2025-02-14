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

type CreateEmployeeDTO = z.infer<typeof CreateEmployeeSchema>;

export { CreateEmployeeDTO, CreateEmployeeSchema };
