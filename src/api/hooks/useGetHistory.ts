import { useQuery } from "@tanstack/react-query";
import { getDocumentHistoryService } from "../services/document.service";
import { useAuthFetcher } from "../client/fetcher";

export const useGetHistory = () => {
  const fetcher = useAuthFetcher();
  const { getHistory } = getDocumentHistoryService(fetcher);

  return useQuery({
    queryKey: ["documentHistory"],
    queryFn: getHistory,
  });
};

