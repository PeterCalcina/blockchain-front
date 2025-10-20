import type { CreateDocumentSchemaDto, GetDocumentHistorySchemaDto } from '@/shared/schemas/document.schema';
import { useAuthFetcher } from '../client/fetcher';
import { API_ENDPOINTS } from '../endpoints';

export const createDocumentService = (fetcher: ReturnType<typeof useAuthFetcher>) => ({
    create: (document: CreateDocumentSchemaDto) => {
      const formData = new FormData();
      formData.append('file', document.file);
      formData.append('doc_name', document.doc_name);

      return fetcher(API_ENDPOINTS.documents.signDocument, {
        method: 'POST',
        body: formData,
      });
    },

    validate: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      return fetcher(API_ENDPOINTS.documents.validateDocument, {
        method: 'POST',
        body: formData,
      });
    }
});

export const getDocumentHistoryService = (fetcher: ReturnType<typeof useAuthFetcher>) => ({
    getHistory: () => fetcher<GetDocumentHistorySchemaDto[]>(API_ENDPOINTS.documents.getHistory, {
      method: 'GET',
    }).then(response => response.content),
});