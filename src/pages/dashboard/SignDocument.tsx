import { useState } from "react";
import { DocumentForm } from "@/shared/components/DocumentForm";
import { useSignDocument } from "@/api/hooks/useSignDocument";
import type { Document } from "@/shared/types/Document";
import { Shield } from "lucide-react";

export default function SignDocument() {
  const [docName, setDocName] = useState("");
  const [docNameError, setDocNameError] = useState("");

  const { signDocument } = useSignDocument();

  const handleDocumentSign = async (file: File, docName?: string) => {
    if (!docName?.trim()) {
      setDocNameError("El nombre para la blockchain es requerido");
      return;
    }

    try {
      const document: Document = {
        doc_name: docName,
        file: file,
      };

      await signDocument.mutateAsync(document);
      
      // Reset form after successful signing
      setDocName("");
      setDocNameError("");
    } catch (error) {
      console.error("Error signing document:", error);
    }
  };

  return (
    <DocumentForm
      title="Firmar Documento"
      description="Sube tu documento PDF para firmarlo digitalmente en la blockchain de forma segura"
      buttonText="Firmar Documento en la Blockchain"
      buttonIcon={Shield}
      onDocumentSubmit={handleDocumentSign}
      isLoading={signDocument.isPending}
      showDocNameInput={true}
      docNameLabel="Nombre para la Blockchain"
      docNamePlaceholder="Ej: Contrato_Servicios_2024"
      docNameValue={docName}
      onDocNameChange={setDocName}
      docNameError={docNameError}
    />
  );
}
