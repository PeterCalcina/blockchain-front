import { useAuthFetcher } from "../client/fetcher";
import { API_ENDPOINTS } from "../endpoints";
import type { LoginCredentials } from "@/shared/types/Auth";

export const authService = (fetcher: ReturnType<typeof useAuthFetcher>) => ({
  login: (credentials: LoginCredentials) =>
    fetcher<{ access_token: string; refresh_token: string; user_id: string }>(API_ENDPOINTS.auth.login, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
        "apiKey": import.meta.env.VITE_API_KEY,
      },
    }),
});
