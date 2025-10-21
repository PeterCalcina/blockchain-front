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
      console.log("👤 [useCreateUser] Enviando datos de usuario:", data);
      const response = await create(data);
      console.log("👤 [useCreateUser] Respuesta completa del backend:", response);
      return response;
    },
    onSuccess: (response) => {
      console.log("👤 [useCreateUser] Respuesta en onSuccess:", response);
      
      // Extract message from response - handle both string and object formats
      let message = "Usuario creado exitosamente";
      
      if (typeof response.content === 'string') {
        message = response.content;
      } else if (typeof response.content === 'object' && response.content !== null) {
        // If content is an object, look for message property
        if ('message' in response.content && typeof response.content.message === 'string') {
          message = response.content.message;
        } else if ('data' in response.content && typeof response.content.data === 'string') {
          message = response.content.data;
        }
      }
      
      addToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("👤 [useCreateUser] Error en la creación:", error);
      const message = error instanceof Error ? error.message : "Error al crear el usuario";
      addToast("error", message);
    },
  });
};
