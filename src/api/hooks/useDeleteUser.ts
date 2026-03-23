import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { deleteUserService } from "../services/user.service";
import { useAuthFetcher } from "../client/fetcher";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();
  const { delete: deleteUser } = deleteUserService(fetcher);

  return useMutation({
    mutationFn: async (id: string) => {
      console.log("🗑️ [useDeleteUser] Eliminando usuario:", id);
      await deleteUser(id);
      console.log("🗑️ [useDeleteUser] Usuario eliminado exitosamente");
    },
    onSuccess: () => {
      addToast("success", "Usuario eliminado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("🗑️ [useDeleteUser] Error en la eliminación:", error);
      const message = error instanceof Error ? error.message : "Error al eliminar el usuario";
      addToast("error", message);
    },
  });
};

