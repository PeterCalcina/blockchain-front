import * as z from "zod";

const SummarySchema = z.object({
  total_documents: z.number(),
  verified: z.number(),
  failed: z.number(),
});

const WeeklySchema = z.object({
  Lun: z.number(),
  Mar: z.number(),
  Mie: z.number(),
  Jue: z.number(),
  Vie: z.number(),
  Sab: z.number(),
  Dom: z.number(),
});

const StatusSchema = z.object({
  verified: z.number(),
  failed: z.number(),
});

const BaseReportSchema = z.object({
  summary: SummarySchema,
  weekly: WeeklySchema,
  status: StatusSchema,
});

export const GetReportSchema = BaseReportSchema;

export type GetReportSchemaDto = z.infer<typeof GetReportSchema>;