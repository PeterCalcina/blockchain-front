import { useState, useMemo } from "react";
import { Card } from "@/shared/components/ui/card";
import { Table } from "@/shared/components/ui/table";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { useGetHistory } from "@/api/hooks/useGetHistory";
import { Loader } from "@/shared/components/ui/loader";
import { FileText, Calendar, User, Search, Filter, X } from "lucide-react";
import type { GetDocumentHistorySchemaDto } from "@/shared/schemas/document.schema";

type FilterPeriod = "today" | "7days" | "30days" | "all";

export default function HistoryPage() {
  const { data: history, isLoading } = useGetHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getDateRange = (period: FilterPeriod) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (period) {
      case "today":
        return { start: today, end: now };
      case "7days":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return { start: weekAgo, end: now };
      case "30days":
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        return { start: monthAgo, end: now };
      default:
        return null;
    }
  };

  const filteredHistory = useMemo(() => {
    if (!history) return [];

    let filtered = history.filter((doc: GetDocumentHistorySchemaDto) => {
      // Filtro por nombre del documento
      if (searchTerm && !doc.doc_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      const docDate = new Date(doc.signed_at);

      // Filtro por período seleccionado
      if (selectedPeriod !== "all") {
        const range = getDateRange(selectedPeriod);
        if (range && (docDate < range.start || docDate > range.end)) {
          return false;
        }
      }

      // Filtro por rango de fechas personalizado
      if (showDateRange && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Incluir todo el día final
        if (docDate < start || docDate > end) {
          return false;
        }
      }

      return true;
    });

    // Ordenar por fecha más reciente
    return filtered.sort((a, b) => new Date(b.signed_at).getTime() - new Date(a.signed_at).getTime());
  }, [history, searchTerm, selectedPeriod, startDate, endDate, showDateRange]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPeriod("all");
    setStartDate("");
    setEndDate("");
    setShowDateRange(false);
  };

  const hasActiveFilters = searchTerm || selectedPeriod !== "all" || showDateRange;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--navy-700)] to-teal-600 bg-clip-text text-transparent mb-2">
          Historial de Documentos
        </h1>
        <p className="text-gray-600">
          Consulta todos los documentos que has firmado en la blockchain
        </p>
      </div>

      {/* Filtros */}
      <Card.Root className="mb-6">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-[var(--navy-700)]" />
            <h3 className="text-lg font-semibold text-[var(--navy-700)]">Filtros</h3>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar filtros
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Buscador por nombre */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Buscar por nombre</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nombre del documento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filtro por período */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Período</label>
              <Select.Root value={selectedPeriod} onValueChange={(value: FilterPeriod) => setSelectedPeriod(value)}>
                <Select.Trigger>
                  <Select.Value placeholder="Seleccionar período" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">Todos</Select.Item>
                  <Select.Item value="today">Hoy</Select.Item>
                  <Select.Item value="7days">Últimos 7 días</Select.Item>
                  <Select.Item value="30days">Últimos 30 días</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>

            {/* Botón para filtros de fecha personalizada */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rango personalizado</label>
              <Button
                variant={showDateRange ? "default" : "outline"}
                onClick={() => setShowDateRange(!showDateRange)}
                className="w-full"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Rango de fechas
              </Button>
            </div>

            {/* Contador de resultados */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Resultados</label>
              <div className="flex items-center h-10 px-3 bg-gray-50 rounded-md border">
                <span className="text-sm text-gray-600">
                  {filteredHistory.length} de {history?.length || 0} documentos
                </span>
              </div>
            </div>
          </div>

          {/* Filtros de fecha personalizada */}
          {showDateRange && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fecha de inicio</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fecha de fin</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Card.Root>

      <Card.Root className="overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-teal-50 to-[var(--navy-50)] p-4 border-b">
          <div className="flex items-center gap-2 text-[var(--navy-700)]">
            <FileText className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Documentos Firmados</h2>
          </div>
        </div>

        <div className="p-6">
          {!history || history.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No hay documentos firmados aún</p>
              <p className="text-gray-400 text-sm mt-2">
                Los documentos que firmes aparecerán aquí
              </p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No se encontraron documentos</p>
              <p className="text-gray-400 text-sm mt-2">
                Intenta ajustar los filtros de búsqueda
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Limpiar filtros
                </Button>
              )}
            </div>
          ) : (
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head className="text-left">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Nombre del Documento
                    </div>
                  </Table.Head>
                  <Table.Head>
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Fecha de Firma
                    </div>
                  </Table.Head>
                  <Table.Head>
                    <div className="flex items-center justify-center gap-2">
                      <User className="h-4 w-4" />
                      Quien lo firmó
                    </div>
                  </Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredHistory.map((doc) => (
                  <Table.Row key={doc.id}>
                    <Table.Cell className="text-left font-medium text-[var(--navy-700)]">
                      {doc.doc_name}
                    </Table.Cell>
                    <Table.Cell className="text-gray-600">
                      {formatDate(doc.signed_at)}
                    </Table.Cell>
                    <Table.Cell className="text-gray-600">
                      {doc.signed_by}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </div>
      </Card.Root>

      {/* Sección de Reportes */}
      {history && history.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Reporte de Firmas Válidas */}
          <Card.Root>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Firmas Válidas</h3>
                  <p className="text-sm text-gray-600">Documentos verificados</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {history.length}
              </div>
              <p className="text-sm text-gray-600">
                Todos los documentos firmados están verificados en blockchain
              </p>
            </div>
          </Card.Root>

          {/* Reporte de Documentos por Período */}
          <Card.Root>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Este Mes</h3>
                  <p className="text-sm text-gray-600">Últimos 30 días</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {history.filter(doc => {
                  const docDate = new Date(doc.signed_at);
                  const monthAgo = new Date();
                  monthAgo.setDate(monthAgo.getDate() - 30);
                  return docDate >= monthAgo;
                }).length}
              </div>
              <p className="text-sm text-gray-600">
                Documentos firmados en el último mes
              </p>
            </div>
          </Card.Root>

          {/* Reporte de Actividad Total */}
          <Card.Root>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total Firmas</h3>
                  <p className="text-sm text-gray-600">Historial completo</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {history.length}
              </div>
              <p className="text-sm text-gray-600">
                Documentos firmados desde el inicio
              </p>
            </div>
          </Card.Root>
        </div>
      )}
    </div>
  );
}

