import { useMutation } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import { useAuthFetcher } from "../client/fetcher";
import { getReportService } from "../services/report.service";

export const useDownloadReport = () => {
  const { addToast } = useToastStore();
  const fetcher = useAuthFetcher();
  const { getPdf } = getReportService(fetcher);

  const downloadMutation = useMutation({
    mutationFn: async () => {
      const response = await getPdf();
      const blob = await response.blob();
      return blob;
    },
    onSuccess: (blob) => {
      try {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte.pdf');

        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);

        addToast("success", "Reporte descargado correctamente");
      } catch (err) {
        addToast("error", "Error al procesar el archivo PDF");
      }
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Error al descargar el reporte";
      addToast("error", message);
    },
  });

  return {
    downloadReport: downloadMutation,
  };
};