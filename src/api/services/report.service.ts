import { API_ENDPOINTS } from "../endpoints";
import type { useAuthFetcher } from "../client/fetcher";
import type { GetReportSchemaDto } from "@/shared/schemas/report.schema";

export const getReportService = (
  fetcher: ReturnType<typeof useAuthFetcher>
) => ({
  getReport: () =>
    fetcher<GetReportSchemaDto>(API_ENDPOINTS.report.getReport, {
      method: "GET",
    }).then(response => response.content),
  getPdf: () =>
    fetcher<Blob>(API_ENDPOINTS.report.pdf, {
      method: "GET",
    }).then(response => response),
});
