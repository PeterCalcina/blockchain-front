import { useQuery } from "@tanstack/react-query";
import { useAuthFetcher } from "../client/fetcher";
import { getReportService } from "../services/report.service";

export const useGetDashboardData = (
  startDate: string,
  endDate: string,
  status: string,
  search: string
) => {
  const fetcher = useAuthFetcher();
  const { getDashboardData } = getReportService(fetcher);

  return useQuery({
    queryKey: ["dashboardData", startDate, endDate, status, search],
    queryFn: async () => {
      console.log("📊 [useGetDashboardData] Solicitando datos del dashboard:", {
        startDate,
        endDate,
        status,
        search
      });
      const response = await getDashboardData(startDate, endDate, status, search);
      console.log("📊 [useGetDashboardData] Respuesta completa del backend:", response);
      return response;
    },
    enabled: !!startDate && !!endDate, // Only run if dates are provided
  });
};