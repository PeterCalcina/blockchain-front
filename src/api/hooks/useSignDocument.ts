import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { documentService } from "../services/document.service";
import type { Document } from "@/shared/types/Document";

export const useSignDocument = () => {
  const { addToast } = useToastStore();
  const { signDocument: sign } = documentService();

  const signDocumentMutation = useMutation({
    mutationFn: async (document: Document) => {
      return await sign(document);
    },
    onSuccess: ({ data }) => {
      addToast("success", data?.message || "Documento firmado exitosamente en la blockchain");
    },
    onError: ({ message }) => {
      addToast("error", message);
    },
  });

  return {
    signDocument: signDocumentMutation,
  };
};
