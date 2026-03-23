/**
 * Mock data for document endpoints
 */

export interface MockDocumentHistory {
  id: string;
  doc_name: string;
  verification_url: string;
  created_at: string;
  state: number; // 0: pending, 1: signed, 2: validated, 3: rejected
  person_name: string;
  person_last_name: string;
  person_second_last_name: string;
  person_email: string;
  file_hash?: string;
  blockchain_hash?: string;
}

const mockDocumentHistory: MockDocumentHistory[] = [
  {
    id: "doc_660000000000000000000001",
    doc_name: "Contrato_Servicios_2024.pdf",
    verification_url: "https://blockchain.example.com/verify/0x1a2b3c4d5e6f7g8h9i0j",
    created_at: "2024-03-15T10:30:00Z",
    state: 2,
    person_name: "Juan",
    person_last_name: "Pérez",
    person_second_last_name: "García",
    person_email: "juan.perez@example.com",
    file_hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    blockchain_hash: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
  },
  {
    id: "doc_660000000000000000000002",
    doc_name: "Poder_Notarial.pdf",
    verification_url: "https://blockchain.example.com/verify/0x2b3c4d5e6f7g8h9i0j1k",
    created_at: "2024-03-14T14:22:00Z",
    state: 2,
    person_name: "María",
    person_last_name: "López",
    person_second_last_name: "Rodríguez",
    person_email: "maria.lopez@example.com",
    file_hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q",
    blockchain_hash: "0xb2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7"
  },
  {
    id: "doc_660000000000000000000003",
    doc_name: "Certificado_Autenticidad.pdf",
    verification_url: "https://blockchain.example.com/verify/0x3c4d5e6f7g8h9i0j1k2l",
    created_at: "2024-03-13T09:15:00Z",
    state: 1,
    person_name: "Carlos",
    person_last_name: "Martínez",
    person_second_last_name: "Fernández",
    person_email: "carlos.martinez@example.com",
    file_hash: "0x3c4d5e6f7g8h9i0j1k2l2m3n4o5p6q7r",
    blockchain_hash: "0xc3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8"
  },
  {
    id: "doc_660000000000000000000004",
    doc_name: "Documento_Identidad.pdf",
    verification_url: "https://blockchain.example.com/verify/0x4d5e6f7g8h9i0j1k2l3m",
    created_at: "2024-03-12T11:45:00Z",
    state: 2,
    person_name: "Ana",
    person_last_name: "Sánchez",
    person_second_last_name: "Moreno",
    person_email: "ana.sanchez@example.com",
    file_hash: "0x4d5e6f7g8h9i0j1k2l3m3m4n5o6p7q8s",
    blockchain_hash: "0xd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9"
  },
  {
    id: "doc_660000000000000000000005",
    doc_name: "Contrato_Compraventa.pdf",
    verification_url: "https://blockchain.example.com/verify/0x5e6f7g8h9i0j1k2l3m4n",
    created_at: "2024-03-11T16:20:00Z",
    state: 0,
    person_name: "Diego",
    person_last_name: "Torres",
    person_second_last_name: "Jiménez",
    person_email: "diego.torres@example.com",
    file_hash: "0x5e6f7g8h9i0j1k2l3m4n4m5n6o7p8q9t",
    blockchain_hash: "0xe5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t10"
  }
];

export const documentsMockData = {
  // Sign document response
  signDocumentResponse: {
    content: {
      message: "Documento firmado correctamente",
      id: "doc_660000000000000000000006",
      doc_name: "Nuevo_Documento.pdf",
      file_hash: "0x6f7g8h9i0j1k2l3m4n5o5n6o7p8q9r0u",
      blockchain_hash: "0xf6g7h8i9j0k1l2m3n4o5p6q7r8s9t10u1",
      verification_url: "https://blockchain.example.com/verify/0x6f7g8h9i0j1k2l3m4n5o",
      signed_at: "2024-03-17T15:00:00Z"
    },
    status_code: 201
  },

  // Get document history response
  getHistoryResponse: {
    content: mockDocumentHistory,
    status_code: 200
  },

  // Get single document from history
  getDocumentResponse: (id: string) => ({
    content: mockDocumentHistory.find(d => d.id === id) || mockDocumentHistory[0],
    status_code: 200
  }),

  // Validate document response
  validateDocumentResponse: {
    content: {
      message: "Documento validado correctamente",
      is_valid: true,
      file_hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
      blockchain_hash: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      verification_url: "https://blockchain.example.com/verify/0x1a2b3c4d5e6f7g8h9i0j"
    },
    status_code: 200
  },

  // Invalid document validation
  invalidDocumentResponse: {
    content: {
      message: "El documento no es válido",
      is_valid: false
    },
    status_code: 400
  },

  // Document not found
  documentNotFoundResponse: {
    content: {
      message: "El documento no fue encontrado"
    },
    status_code: 404
  },

  // Error uploading document
  uploadErrorResponse: {
    content: {
      message: "Error al procesar el documento"
    },
    status_code: 500
  }
};
