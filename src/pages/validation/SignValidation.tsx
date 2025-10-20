import { DocumentForm } from "@/shared/components/DocumentForm";
import { useValidateDocument } from "@/api/hooks/useValidateDocument";
import { CheckCircle } from "lucide-react";

export default function SignValidation() {
  const validateDocument = useValidateDocument();

  const handleDocumentValidation = async (file: File) => {
    try {
      await validateDocument.mutateAsync(file);
    } catch (error) {
      console.error("Error validating document:", error);
    }
  };

  return (
    <DocumentForm
      title="Validar Documento"
      description="Sube tu documento PDF para validar su autenticidad y verificar su integridad en la blockchain"
      buttonText="Validar Documento"
      buttonIcon={CheckCircle}
      onDocumentSubmit={handleDocumentValidation}
      isLoading={validateDocument.isPending}
      showDocNameInput={false}
    />
  );
}
