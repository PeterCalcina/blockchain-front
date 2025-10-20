import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { useAuthFetcher } from "../client/fetcher";
import { API_ENDPOINTS } from "../endpoints";

export const useForgotPassword = () => {
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();

  return useMutation({
    mutationFn: async (email: string) => {
      return await fetcher(API_ENDPOINTS.auth.forgotPassword, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      addToast("success", "Se ha enviado un enlace de recuperación a tu correo electrónico");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Error al enviar el enlace de recuperación";
      addToast("error", message);
    },
  });
};
