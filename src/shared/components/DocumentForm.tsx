import type React from "react";
import { useState, useCallback } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  FileUp,
  Upload,
  X,
  FileText,
  Sparkles,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface DocumentFormProps {
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: React.ComponentType<{ className?: string }>;
  onDocumentSubmit: (file: File, docName?: string) => void;
  isLoading?: boolean;
  showDocNameInput?: boolean;
  docNameLabel?: string;
  docNamePlaceholder?: string;
  docNameValue?: string;
  onDocNameChange?: (value: string) => void;
  docNameError?: string;
}

export function DocumentForm({
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  onDocumentSubmit,
  isLoading = false,
  showDocNameInput = false,
  docNameLabel = "Nombre para la Blockchain",
  docNamePlaceholder = "Ej: Contrato_Servicios_2024",
  docNameValue = "",
  onDocNameChange,
  docNameError,
}: DocumentFormProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    if (file.type !== "application/pdf") {
      return;
    }

    const url = URL.createObjectURL(file);
    setUploadedFile(file);
    setPdfUrl(url);
    
    if (onDocNameChange) {
      onDocNameChange(file.name.replace('.pdf', ''));
    }
  }, [onDocNameChange]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    if (onDocNameChange) {
      onDocNameChange("");
    }
  };

  const handleSubmit = () => {
    if (uploadedFile) {
      onDocumentSubmit(uploadedFile, showDocNameInput ? docNameValue : undefined);
    }
  };

  const canSubmit = uploadedFile && (!showDocNameInput || docNameValue.trim());

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <header className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--navy-700)] to-teal-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <Sparkles className="h-5 w-5 text-amber-500 ml-2" />
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {!uploadedFile && (
            <Card.Root className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <Card.Header className="bg-gradient-to-r from-teal-50 to-[var(--navy-50)] rounded-t-lg">
                <Card.Title className="flex items-center gap-3 text-[var(--navy-700)]">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-[var(--navy-600)]">
                    <FileUp className="h-5 w-5 text-white" />
                  </div>
                  {title}
                </Card.Title>
                <Card.Description className="text-gray-600">
                  {description}
                </Card.Description>
              </Card.Header>
              <Card.Content className="p-8">
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    isDragOver
                      ? "border-teal-400 bg-gradient-to-br from-teal-50 to-[var(--navy-50)] scale-[1.02]"
                      : "border-gray-300 hover:border-teal-300 hover:bg-gradient-to-br hover:from-teal-50/50 hover:to-[var(--navy-50)]/50"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="space-y-6">
                    <div className="relative">
                      <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-[var(--navy-700)] mb-2">
                        Haz clic aquí para subir tu documento
                      </p>
                      <p className="text-gray-600">
                        o arrastra y suéltalo para procesar
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      asChild
                      className="bg-gradient-to-r from-teal-600 to-[var(--navy-600)] hover:from-teal-700 hover:to-[var(--navy-700)] text-white font-medium px-8 py-3 shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Seleccionar Archivo
                      </label>
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          )}

          {uploadedFile && (
            <Card.Root className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <Card.Header className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
                <Card.Title className="flex items-center justify-between">
                  <span className="flex items-center gap-3 text-[var(--navy-700)]">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    Documento Cargado
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removeFile}
                    className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 bg-transparent"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </Card.Title>
              </Card.Header>
              <Card.Content className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-teal-50 rounded-xl border border-gray-200">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 shadow-md">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--navy-700)] text-lg">
                        {uploadedFile.name}
                      </p>
                      <p className="text-gray-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-emerald-600 font-medium">
                          Listo para procesar
                        </span>
                      </div>
                    </div>
                  </div>

                  {pdfUrl && (
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-gradient-to-r from-[var(--navy-600)] to-teal-600 px-6 py-3 border-b">
                          <p className="text-sm font-semibold text-white">
                            Vista previa - Primera página
                          </p>
                        </div>
                        <div className="p-6 bg-gray-50">
                          <iframe
                            src={`${pdfUrl}#page=1`}
                            className="w-full h-96 border border-gray-200 rounded-lg shadow-inner bg-white"
                            title="PDF Preview"
                          />
                        </div>
                      </div>

                      {showDocNameInput && (
                        <div className="bg-gradient-to-r from-[var(--navy-50)] to-teal-50 p-6 rounded-xl border border-gray-200">
                          <div className="space-y-3">
                            <label
                              htmlFor="docName"
                              className="block text-sm font-semibold text-[var(--navy-700)]"
                            >
                              {docNameLabel}
                            </label>
                            <input
                              id="docName"
                              type="text"
                              placeholder={docNamePlaceholder}
                              value={docNameValue}
                              onChange={(e) => onDocNameChange?.(e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-[var(--navy-700)] placeholder-gray-400 transition-colors duration-200 ${
                                docNameError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
                              }`}
                            />
                            {docNameError && (
                              <p className="text-red-500 text-sm flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {docNameError}
                              </p>
                            )}
                            <p className="text-xs text-gray-600">
                              Este nombre se utilizará para identificar el documento en la blockchain
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-center pt-2">
                        <Button
                          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-4 text-lg shadow-xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          disabled={!canSubmit || isLoading}
                          onClick={handleSubmit}
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              Procesando...
                            </div>
                          ) : (
                            <>
                              <ButtonIcon className="h-5 w-5 mr-2" />
                              {buttonText}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card.Content>
            </Card.Root>
          )}
        </div>
      </main>
    </div>
  );
}
