import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { useAuthFetcher } from "../client/fetcher";
import { createDocumentService } from "../services/document.service";

export const useValidateByCsv = () => {
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();
  const { validateByCsv } = createDocumentService(fetcher);

  return useMutation({
    mutationFn: async (csvCode: string) => {
      console.log("✅ [useValidateByCsv] Enviando código CSV para validar:", csvCode);
      const response = await validateByCsv(csvCode);
      console.log("✅ [useValidateByCsv] Respuesta completa del backend:", response);
      return response;
    },
    onSuccess: (response: any) => {
      console.log("✅ [useValidateByCsv] Respuesta en onSuccess:", response);
      const signed_at = new Date(response.data.firmado).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      const message = `Documento validado - Firmado el: ${signed_at}`;
      addToast("success", message);
    },
    onError: (error) => {
      console.error("✅ [useValidateByCsv] Error en la validación por CSV:", error);
      const message = error instanceof Error ? error.message : "Error al validar el documento por CSV";
      addToast("error", message);
    },
  });
};