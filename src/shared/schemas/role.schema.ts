import * as z from "zod";

const BaseRoleSchema = z.object({
  name: z.string().min(1, "El nombre del rol es requerido"),
});

export const CreateRoleSchema = BaseRoleSchema.partial();
export type CreateRoleSchemaDto = z.infer<typeof CreateRoleSchema>;

export const UpdateRoleSchema = BaseRoleSchema.partial();
export type UpdateRoleSchema = z.infer<typeof UpdateRoleSchema>;

export const GetRoleSchema = BaseRoleSchema.extend({
  id: z.string().min(1, "El ID es requerido"),
});
export type GetRoleSchemaDto = z.infer<typeof GetRoleSchema>;