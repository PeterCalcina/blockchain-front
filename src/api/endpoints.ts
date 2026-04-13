const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    createUser: `${BASE_URL}/person/register`,
    listUsers: `${BASE_URL}/person/list`,
    updateUser: (id: string) => `${BASE_URL}/person/update/${id}`,
    deleteUser: (id: string) => `${BASE_URL}/person/delete/${id}`,
    forgotPassword: `${BASE_URL}/auth/forgot-password`,
    resetPassword: `${BASE_URL}/auth/reset-password`,
  },
  documents: {
    signDocument: `${BASE_URL}/document/sign`,
    getHistory: `${BASE_URL}/document/record`,
    validateDocument: `${BASE_URL}/document/validate`,
    verifyByCsv: `${BASE_URL}/document/verify-by-csv`,
  },
  report: {
    getReport: `${BASE_URL}/report/dashboard`,
    pdf: `${BASE_URL}/report/report-pdf`,
    dashboardData: `${BASE_URL}/report/dashboard-data`,
  }
}