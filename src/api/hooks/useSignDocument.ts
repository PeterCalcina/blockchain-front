import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { createDocumentService } from "../services/document.service";
import type { Document, DocumentSignResponse } from "@/shared/types/Document";
import { useAuthFetcher } from "../client/fetcher";

export const useSignDocument = () => {
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();
  const { create } = createDocumentService(fetcher);

  const signDocumentMutation = useMutation({
    mutationFn: async (document: Document) => {
      console.log("📄 [useSignDocument] Enviando documento para firmar:", {
        doc_name: document.doc_name,
        file_name: document.file.name,
        file_size: document.file.size
      });
      const response = await create(document);
      console.log("📄 [useSignDocument] Respuesta completa del backend:", response);
      return response;
    },
    onSuccess: (response: DocumentSignResponse | any) => {
      console.log("📄 [useSignDocument] Respuesta en onSuccess:", response);
      
      // El servicio ahora retorna directamente el objeto con success, message, file_name
      let message = "Documento firmado exitosamente en la blockchain";
      
      if (response && typeof response === 'object') {
        if (response.message && typeof response.message === 'string') {
          message = response.message;
        }
      }
      
      addToast("success", message);
    },
    onError: (error) => {
      console.error("📄 [useSignDocument] Error en la firma:", error);
      const message = error instanceof Error ? error.message : "Error al firmar el documento";
      addToast("error", message);
    },
  });

  return {
    signDocument: signDocumentMutation,
  };
};
