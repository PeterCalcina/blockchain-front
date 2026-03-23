import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { useAuthFetcher } from "../client/fetcher";
import { API_ENDPOINTS } from "../endpoints";

interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const useResetPassword = () => {
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();

  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      console.log("🔑 [useResetPassword] Reseteando contraseña");
      const response = await fetcher(API_ENDPOINTS.auth.resetPassword, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("🔑 [useResetPassword] Respuesta completa del backend:", response);
      return response;
    },
    onSuccess: (response) => {
      console.log("🔑 [useResetPassword] Respuesta en onSuccess:", response);
      addToast("success", "Contraseña restablecida exitosamente");
    },
    onError: (error) => {
      console.error("🔑 [useResetPassword] Error en el reset:", error);
      const message = error instanceof Error ? error.message : "Error al restablecer la contraseña";
      addToast("error", message);
    },
  });
};

