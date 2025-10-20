import { useAuthStore } from "@/stores/authStore";
import type { Response } from "@/shared/types/Response";

type SearchParams = Record<string, string | number | boolean | undefined>;

interface FetcherOptions extends RequestInit {
  params?: SearchParams;
}

export const useAuthFetcher = () => {
  const fetcher = async <T>(
    url: string,
    options: FetcherOptions = {}
  ): Promise<Response<T>> => {
    const currentToken = useAuthStore.getState().accessToken;

    const method = options.method?.toUpperCase() || 'GET';
    let fullUrl = url;
    let requestBody: BodyInit | undefined;

    if (options.params && (method === 'GET' || method === 'HEAD')) {
      const queryString = toQueryString(options.params);
      fullUrl = `${url}?${queryString}`;
    }
    else if (options.body && (method !== 'GET' && method !== 'HEAD')) {
      requestBody = options.body;
      if (typeof options.body === 'object' && !('forEach' in options.body) && !(options.body instanceof FormData)) {
         requestBody = JSON.stringify(options.body);
      }
    }

    const res = await fetch(fullUrl, {
      ...options,
      method: method,
      headers: {
        ...(requestBody && typeof requestBody === 'string' ? { "Content-Type": "application/json" } : {}),
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
        ...(options.headers || {}),
      },
      body: requestBody,
    });

    if (!res.ok) {
      const errorResponse: Response<T> | null = await res
        .json()
        .catch(() => null);

      let errorMessage = "Error desconocido al obtener los datos.";

      if (errorResponse?.content as string) {
        errorMessage = errorResponse?.content as string;
      } else if (res.statusText) {
        errorMessage = res.statusText;
      }

      if (res.status === 401) {
        useAuthStore.getState().logout();
        errorMessage =
          errorResponse?.content as string || "Sesión expirada, inicia sesión otra vez.";
      }

      throw new Error(errorMessage);
    }

    const jsonResponse: Response<T> = await res.json();

    if (jsonResponse.content === undefined && res.status !== 204) {
      throw new Error("La respuesta exitosa no contiene datos esperados.");
    }

    return jsonResponse;
  };

  return fetcher;
};

const toQueryString = (params: SearchParams) =>
  new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([k, v]) => [k, String(v)])
  ).toString();
