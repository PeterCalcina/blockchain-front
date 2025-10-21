import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { useAuthFetcher } from "../client/fetcher";
import { API_ENDPOINTS } from "../endpoints";

export const useForgotPassword = () => {
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();

  return useMutation({
    mutationFn: async (email: string) => {
      console.log("🔑 [useForgotPassword] Enviando email para recuperación:", email);
      const response = await fetcher(API_ENDPOINTS.auth.forgotPassword, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("🔑 [useForgotPassword] Respuesta completa del backend:", response);
      return response;
    },
    onSuccess: (response) => {
      console.log("🔑 [useForgotPassword] Respuesta en onSuccess:", response);
      addToast("success", "Se ha enviado un enlace de recuperación a tu correo electrónico");
    },
    onError: (error) => {
      console.error("🔑 [useForgotPassword] Error en la recuperación:", error);
      const message = error instanceof Error ? error.message : "Error al enviar el enlace de recuperación";
      addToast("error", message);
    },
  });
};
