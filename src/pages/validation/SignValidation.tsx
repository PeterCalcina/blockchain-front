import { DocumentForm } from "@/shared/components/DocumentForm";
import { CheckCircle } from "lucide-react";
import { useToastStore } from "@/stores/toastStore";

export default function SignValidation() {
  const { addToast } = useToastStore();

  const handleDocumentValidation = async (file: File) => {
    try {
      // Simular validación del documento
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      addToast("success", `Documento "${file.name}" validado exitosamente`);
    } catch (error) {
      console.error("Error validating document:", error);
      addToast("error", "Error al validar el documento");
    }
  };

  return (
    <DocumentForm
      title="Validar Documento"
      description="Sube tu documento PDF para validar su autenticidad y verificar su integridad en la blockchain"
      buttonText="Validar Documento"
      buttonIcon={CheckCircle}
      onDocumentSubmit={handleDocumentValidation}
      showDocNameInput={false}
    />
  );
}
