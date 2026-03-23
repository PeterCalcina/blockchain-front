import { useQuery } from "@tanstack/react-query";
import { useAuthFetcher } from "@/api/client/fetcher";
import { getReportService } from "../services/report.service";

export const useGetReports = () => {
  const fetcher = useAuthFetcher();
  const { getReport } = getReportService(fetcher);

  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => await getReport(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
