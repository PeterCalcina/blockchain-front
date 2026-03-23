import * as z from "zod";

export const DocumentSchema = z.object({
  doc_name: z.string().min(1, "El nombre para la blockchain es requerido"),
  file: z.instanceof(File, { message: "Debe ser un archivo válido" }),
});

export type CreateDocumentSchemaDto = z.infer<typeof DocumentSchema>;

export const GetDocumentHistorySchema = z.object({
  id: z.string(),
  doc_name: z.string(),
  verification_url: z.string(),
  created_at: z.string(),
  state: z.number(),
  person_name: z.string(),
  person_last_name: z.string(),
  person_second_last_name: z.string(),
  person_email: z.string(),
});
export type GetDocumentHistorySchemaDto = z.infer<typeof GetDocumentHistorySchema>;
