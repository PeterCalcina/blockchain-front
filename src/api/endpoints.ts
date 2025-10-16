const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    createUser: `${BASE_URL}/person/register`,
    listUsers: `${BASE_URL}/person/list`,
  },
  documents: {
    signDocument: `${BASE_URL}/document/sign`,
    getHistory: `${BASE_URL}/document/record`,
  }
}