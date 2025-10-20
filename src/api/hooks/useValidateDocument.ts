import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { useAuthFetcher } from "../client/fetcher";
import { createDocumentService } from "../services/document.service";

export const useValidateDocument = () => {
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();
  const { validate } = createDocumentService(fetcher);
  
  return useMutation({
    mutationFn: async (file: File) => await validate(file),
    onSuccess: ({ content }) => {
      const message = content as string || "Documento validado exitosamente";
      addToast("success", message);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Error al validar el documento";
      addToast("error", message);
    },
  });
};
