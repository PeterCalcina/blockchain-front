/**
 * Mock data for reports endpoints
 */

import type { ReportsData } from "@/shared/types/Reports";

export const reportsMockData: ReportsData = {
  stats: {
    signedDocuments: {
      title: "Documentos Firmados",
      value: 156,
      change: 12,
      changeType: "increase",
      suffix: "",
      description: "desde la semana pasada",
      icon: "doc"
    },
    userSignatures: {
      title: "Usuarios que firmaron",
      value: 52,
      change: 11.0,
      changeType: "increase",
      suffix: "%",
      description: "incremento",
      icon: "check"
    },
    dailySignatures: {
      title: "Firmas del día",
      value: 14,
      change: 9.0,
      changeType: "decrease",
      suffix: "%",
      description: "que el día anterior",
      icon: "x"
    }
  },
  dailyStats: [
    { day: "Lun", count: 12 },
    { day: "Mar", count: 19 },
    { day: "Mié", count: 8 },
    { day: "Jue", count: 15 },
    { day: "Vie", count: 23 },
    { day: "Sáb", count: 6 },
    { day: "Dom", count: 5 }
  ],
  signatureStatus: [
    {
      name: "Exitosas",
      value: 78,
      percentage: 78,
      type: "success"
    },
    {
      name: "Fallidas",
      value: 22,
      percentage: 22,
      type: "failed"
    }
  ]
};

export const getReportsResponse = () => ({
  content: reportsMockData,
  status_code: 200
});
