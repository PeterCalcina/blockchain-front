import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { updateUserService } from "../services/user.service";
import { useAuthFetcher } from "../client/fetcher";
import type { UpdateUserSchema } from "@/shared/schemas/user.schema";

interface UpdateUserParams {
  id: string;
  data: UpdateUserSchema;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();
  const { update } = updateUserService(fetcher);

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserParams) => {
      console.log("✏️ [useUpdateUser] Actualizando usuario:", { id, data });
      const response = await update(id, data);
      console.log("✏️ [useUpdateUser] Respuesta completa del backend:", response);
      return response;
    },
    onSuccess: (response) => {
      console.log("✏️ [useUpdateUser] Respuesta en onSuccess:", response);
      addToast("success", "Usuario actualizado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("✏️ [useUpdateUser] Error en la actualización:", error);
      const message = error instanceof Error ? error.message : "Error al actualizar el usuario";
      addToast("error", message);
    },
  });
};

