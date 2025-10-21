import type {
  CreateDocumentSchemaDto,
  GetDocumentHistorySchemaDto,
} from "@/shared/schemas/document.schema";
import { useAuthFetcher } from "../client/fetcher";
import { useAuthStore } from "@/stores/authStore";
import { API_ENDPOINTS } from "../endpoints";

export const createDocumentService = (
  fetcher: ReturnType<typeof useAuthFetcher>
) => ({
  create: async (documentToSign: CreateDocumentSchemaDto) => {
    const formData = new FormData();
    formData.append("file", documentToSign.file);
    formData.append("doc_name", documentToSign.doc_name);

    console.log("📄 [DocumentService] Enviando documento para firmar:", {
      doc_name: documentToSign.doc_name,
      file_name: documentToSign.file.name,
      file_size: documentToSign.file.size,
    });

    const accessToken = useAuthStore.getState().accessToken;

    const response = await fetch(API_ENDPOINTS.documents.signDocument, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al firmar documento: ${response.statusText}`);
    }

    console.log("📄 [DocumentService] Descargando PDF firmado...");

    // Crear blob y descargar el PDF
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentToSign.doc_name}_firmado.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    console.log("📄 [DocumentService] PDF descargado exitosamente");

    return {
      success: true,
      message: "Documento firmado y descargado exitosamente",
      file_name: `${documentToSign.doc_name}_firmado.pdf`
    };
  },

  validate: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetcher(API_ENDPOINTS.documents.validateDocument, {
      method: "POST",
      body: formData,
    });
  },
});

export const getDocumentHistoryService = (
  fetcher: ReturnType<typeof useAuthFetcher>
) => ({
  getHistory: () =>
    fetcher<GetDocumentHistorySchemaDto[]>(API_ENDPOINTS.documents.getHistory, {
      method: "GET",
    }).then((response) => response.content),
});
