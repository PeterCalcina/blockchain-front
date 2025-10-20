import * as z from "zod";

export const DocumentSchema = z.object({
  doc_name: z.string().min(1, "El nombre para la blockchain es requerido"),
  file: z.instanceof(File, { message: "Debe ser un archivo válido" }),
});

export type CreateDocumentSchemaDto = z.infer<typeof DocumentSchema>;

export const GetDocumentHistorySchema = z.object({
  id: z.string(),
  doc_name: z.string(),
  signed_at: z.string(),
  file_hash: z.string(),
  blockchain_hash: z.string(),
  signed_by: z.string(),
});
export type GetDocumentHistorySchemaDto = z.infer<typeof GetDocumentHistorySchema>;

