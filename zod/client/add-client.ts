import z from 'zod';

export const AddClientSchema = z.object({
  name: z.string().nonempty({ message: "Please enter the client name" }),
  email: z.email(),
  phone: z.string().nonempty({ message: "Please enter the client phone number" }),
  password: z.string().min(8, { message: "password must be atleast 8 characters long." }),
  sendMail: z.boolean().optional()
})

export type TAddClientSchema = z.infer<typeof AddClientSchema>;
