import { useMemo } from "react";
import { Card } from "@/shared/components/ui/card";
import { Loader } from "@/shared/components/ui/loader";
import { FileText, CheckCircle, XCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetReports } from "@/api/hooks/useGetReports";
import type { GetReportSchemaDto } from "@/shared/schemas/report.schema";

/**
 * Reports Page - Dashboard with statistics and charts
 */
export default function ReportsPage() {
  const { data: reportsData, isLoading } = useGetReports();
  
  // Fallback data if needed
  const data: GetReportSchemaDto = reportsData || {
    summary: {
      total_documents: 0,
      verified: 0,
      failed: 0,
    },
    weekly: {
      Lun: 0,
      Mar: 0,
      Mie: 0,
      Jue: 0,
      Vie: 0,
      Sab: 0,
      Dom: 0,
    },
    status: {
      verified: 0,
      failed: 0,
    },
  };

  const stats = useMemo(() => {
    if (!data) return [];
    return [
      {
        title: "Documentos Totales",
        value: data.summary.total_documents,
        color: "from-blue-400 to-blue-600",
        bgColor: "bg-linear-to-br from-teal-500 to-(--navy-600)",
        textColor: "text-white",
        icon: FileText,
      },
      {
        title: "Firmas Verificadas",
        value: data.summary.verified,
        color: "from-emerald-400 to-emerald-600",
        bgColor: "bg-linear-to-br from-emerald-500 to-(--teal-600)",
        textColor: "text-white",
        icon: CheckCircle,
      },
      {
        title: "Firmas Fallidas",
        value: data.summary.failed,
        color: "from-rose-400 to-rose-600",
        bgColor: "bg-linear-to-br from-rose-500 to-(--rose-600)",
        textColor: "text-white",
        icon: XCircle,
      },
    ];
  }, [data]);

  const chartColors = {
    success: "#14b8a6",
    failed: "#f43f5e",
    bar: "#3b82f6",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          No se pudieron cargar los reportes
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reportes y Estadísticas
          </h1>
          <p className="text-muted-foreground mt-2">
            Visión general del estado de las firmas digitales
          </p>
        </div>
        <div className="text-3xl">✨</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <Card.Root
              key={index}
              className="overflow-hidden border-0 shadow-md"
            >
              {/* Top colored bar */}
              <div className={`h-2 bg-linear-to-r ${stat.color}`} />

              <Card.Content className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-muted-foreground mb-2">
                      {stat.title}
                    </p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-bold text-foreground">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-md ${stat.bgColor}`}
                  >
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Daily Documents */}
        <Card.Root className="overflow-hidden border-0 shadow-lg">
          <Card.Header className="bg-linear-to-r from-teal-300/50 to-(--navy-400)/50">
            <Card.Title className="text-lg">
              Documentos Firmados - Última Semana
            </Card.Title>
            <Card.Description>
              Distribución diaria de documentos firmados digitalmente
            </Card.Description>
          </Card.Header>
          <Card.Content className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(data.weekly).map(([day, count]) => ({
                  day,
                  count,
                }))}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                />
                <Bar
                  dataKey="count"
                  fill={chartColors.bar}
                  radius={[8, 8, 0, 0]}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card.Root>

        {/* Pie Chart - Signature Status */}
        <Card.Root className="overflow-hidden border-0 shadow-lg">
          <Card.Header className="bg-linear-to-r from-teal-300/50 to-(--navy-400)/50">
            <Card.Title className="text-lg">
              Estado de Firmas Digitales
            </Card.Title>
            <Card.Description>
              Proporción de firmas verificadas vs fallidas en blockchain
            </Card.Description>
          </Card.Header>
          <Card.Content className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[data.status.verified, data.status.failed].map(
                    (value, index) => ({
                      name: index === 0 ? "Verificadas" : "Fallidas",
                      value,
                      type: index === 0 ? "success" : "failed",
                    }),
                  )}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={500}
                >
                  {[data.status.verified, data.status.failed].map(
                    (_value, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0 ? chartColors.success : chartColors.failed
                        }
                      />
                    ),
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value: any) => `${value}%`}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  );
}
