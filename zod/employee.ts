import { z } from "zod";

export const EmployeeSchema = z.object({
  name: z.string().nonempty({ message: "Please enter the employee name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .nonempty({ message: "Please enter the employee password" }),
  salary: z.string().nonempty({ message: "Please enter the employee salary" }),
  joiningDate: z.string().nonempty({ message: "Please enter the join date" }),
  designation: z
    .string()
    .nonempty({ message: "Please enter the employee designation" }),
});

export type TEmployeeSchema = z.infer<typeof EmployeeSchema>;
