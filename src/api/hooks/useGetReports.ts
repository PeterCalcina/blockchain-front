import { useQuery } from "@tanstack/react-query";
import { useAuthFetcher } from "@/api/client/fetcher";
import type { ReportsData } from "@/shared/types/Reports";

/**
 * Hook to fetch reports data
 */
export const useGetReports = () => {
  const fetcher = useAuthFetcher();

  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      try {
        const response = await fetcher<ReportsData>(
          `${import.meta.env.VITE_API_URL}/reports`
        );
        return response.content;
      } catch (error) {
        console.error("Error fetching reports:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
