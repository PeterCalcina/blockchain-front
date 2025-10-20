import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { useAuthStore } from "@/stores/authStore";
import type { LoginCredentials } from "@/shared/types/Auth";
import { useAuthFetcher } from "../client/fetcher";
import { authService } from "../services/auth.service";

export const useLogin = () => {
  const { addToast } = useToastStore();
  const { setAuth } = useAuthStore();
  const fetcher = useAuthFetcher();
  const { login } = authService(fetcher);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await login(credentials);
      if (!response.content) {
        throw new Error("No se recibieron datos del usuario");
      }
      return response.content;
    },

    onSuccess: (responseData: { access_token: string; refresh_token: string; user_id: string }) => {
      const user: any = {
        id: responseData.user_id,
      };
      
      setAuth(user, responseData.access_token);
      addToast("success", "¡Bienvenido! Has iniciado sesión correctamente.");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Error al iniciar sesión";
      addToast("error", message);
    },
  });
};
