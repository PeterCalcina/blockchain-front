export interface Document {
  doc_name: string; // Este será el nombre para la blockchain
  file: File;
}

export interface DocumentHistory {
  id: string;
  doc_name: string;
  signed_at: string;
  file_hash?: string;
  blockchain_hash?: string;
  signed_by: string;
}

export interface DocumentSignResponse {
  message: string;
  data: any;
}