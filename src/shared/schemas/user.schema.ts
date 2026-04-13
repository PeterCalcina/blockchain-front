import * as z from "zod";

const BaseUserSchema = z.object({
  email: z.email("El correo electrónico no es válido"),
  name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().min(1, "El apellido es requerido"),
  second_last_name: z.string().min(1, "El segundo apellido es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  role: z.string().min(1, "El rol es requerido"),
});

export const CreateUserSchema = BaseUserSchema.partial();
export type CreateUserSchemaDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = BaseUserSchema.partial();
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;

export const GetUserSchema = BaseUserSchema.extend({
  id: z.string().min(1, "El ID es requerido"),
});
export type GetUserSchemaDto = z.infer<typeof GetUserSchema>;