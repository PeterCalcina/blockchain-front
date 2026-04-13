import { API_ENDPOINTS } from "../endpoints";
import type { useAuthFetcher } from "../client/fetcher";
import type { GetReportSchemaDto, GetDashboardDataSchemaDto } from "@/shared/schemas/report.schema";

export const getReportService = (
  fetcher: ReturnType<typeof useAuthFetcher>
) => ({
  getReport: () =>
    fetcher<GetReportSchemaDto>(API_ENDPOINTS.report.getReport, {
      method: "GET",
    }).then(response => response.content),
  getPdf: async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(API_ENDPOINTS.report.pdf, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return response;
  },
  getDashboardData: async (startDate: string, endDate: string, status: string, search: string) =>
    fetcher<GetDashboardDataSchemaDto[]>(API_ENDPOINTS.report.dashboardData, {
      method: "GET",
      params: {
        start_date: startDate,
        end_date: endDate,
        status: status,
        search: search
      },
    }).then(response => response.content),
});
