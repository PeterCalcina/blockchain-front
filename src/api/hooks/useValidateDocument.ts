import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { useAuthFetcher } from "../client/fetcher";
import { createDocumentService } from "../services/document.service";

export const useValidateDocument = () => {
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();
  const { validate } = createDocumentService(fetcher);
  
  return useMutation({
    mutationFn: async (file: File) => {
      console.log("✅ [useValidateDocument] Enviando documento para validar:", {
        file_name: file.name,
        file_size: file.size,
        file_type: file.type
      });
      const response = await validate(file);
      console.log("✅ [useValidateDocument] Respuesta completa del backend:", response);
      return response;
    },
    onSuccess: (response) => {
      console.log("✅ [useValidateDocument] Respuesta en onSuccess:", response);
      const message = response.content as string || "Documento validado exitosamente";
      addToast("success", message);
    },
    onError: (error) => {
      console.error("✅ [useValidateDocument] Error en la validación:", error);
      const message = error instanceof Error ? error.message : "Error al validar el documento";
      addToast("error", message);
    },
  });
};
