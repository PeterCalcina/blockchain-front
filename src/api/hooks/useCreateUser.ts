import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { createUserService } from "../services/user.service";
import { useAuthFetcher } from "../client/fetcher";
import type { CreateUserSchemaDto } from "@/shared/schemas/user.schema";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();
  const { create } = createUserService(fetcher);

  return useMutation({
    mutationFn: async (data: CreateUserSchemaDto) => {
      return await create(data);
    },
    onSuccess: ({ message }) => {
      addToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: ({ message }) => {
      addToast("error", message);
    },
  });
};
