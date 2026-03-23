/**
 * Mock Fetcher Interceptor
 * Use this to intercept fetch calls and return mock data
 * Activate by setting VITE_USE_MOCK_DATA=true in your .env file
 */

import { mockDB } from "@/db";
import type { Response } from "@/shared/types/Response";

// Configuration
export const MOCK_CONFIG = {
  enabled: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  delay: 500, // Simulated network delay in ms
};

/**
 * Maps endpoints to mock data responses
 */
const mockEndpointMap: Record<string, (body?: any) => any> = {
  // Auth endpoints
  "/auth/login": (body) => {
    if (body?.email === "juan@example.com" && body?.password === "password123") {
      return mockDB.auth.loginResponse;
    }
    return mockDB.auth.invalidCredentialsResponse;
  },
  "/auth/forgot-password": () => mockDB.auth.forgotPasswordResponse,
  "/auth/reset-password": () => mockDB.auth.resetPasswordResponse,

  // User endpoints
  "/person/register": () => mockDB.users.createUserResponse,
  "/person/list": () => mockDB.users.listUsersResponse,

  // Document endpoints
  "/document/sign": () => mockDB.documents.signDocumentResponse,
  "/document/record": () => mockDB.documents.getHistoryResponse,
  "/document/validate": () => mockDB.documents.validateDocumentResponse,

  // Reports endpoints
  "/reports": () => mockDB.reports,
  "/reports/dashboard": () => mockDB.reports,
};

/**
 * Get mock response based on URL and method
 */
export const getMockResponse = (url: string, body?: any): any | null => {
  try {
    // Extract endpoint from URL (handle both full URLs and paths)
    let endpoint = '';
    
    if (url.includes('http')) {
      // Full URL - extract path and remove /api prefix
      const urlObj = new URL(url);
      endpoint = urlObj.pathname.replace(/^\/api/, '');
    } else {
      // Relative path - just use as is
      endpoint = url.replace(/^\/api/, '');
    }

    console.log(`[Mock Fetcher] Looking for mock endpoint: ${endpoint}`);

    // Try to find exact match
    if (mockEndpointMap[endpoint]) {
      return mockEndpointMap[endpoint](body);
    }

    // Try to match dynamic routes (like /person/:id)
    for (const [pattern, handler] of Object.entries(mockEndpointMap)) {
      if (matchDynamicRoute(pattern, endpoint)) {
        return handler(body);
      }
    }

    console.warn(`[Mock Fetcher] No mock found for: ${endpoint}`);
    return null;
  } catch (error) {
    console.error("[Mock Fetcher] Error getting mock response:", error);
    return null;
  }
};

/**
 * Check if a pattern matches a dynamic route (e.g., /person/{id})
 */
const matchDynamicRoute = (pattern: string, path: string): boolean => {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');

  if (patternParts.length !== pathParts.length) {
    return false;
  }

  return patternParts.every((part, index) => {
    return part === pathParts[index] || part.startsWith(':');
  });
};

/**
 * Wrapper to intercept fetch calls and inject mock data
 */
export const createMockFetcher = (originalFetcher: any) => {
  return async (url: string, options: any = {}): Promise<Response<any>> => {
    if (!MOCK_CONFIG.enabled) {
      // Use original fetcher
      return originalFetcher(url, options);
    }

    // Try to get mock data
    let body;
    if (options.body) {
      try {
        body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
      } catch {
        body = options.body;
      }
    }

    const mockResponse = getMockResponse(url, body);

    if (!mockResponse) {
      // Fall back to original fetcher if no mock found
      console.log(`[Mock Fetcher] No mock found, falling back to real API: ${options.method || 'GET'} ${url}`);
      return originalFetcher(url, options);
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, MOCK_CONFIG.delay));

    console.log(`✅ [Mock Fetcher] ${options.method || 'GET'} ${url}`, mockResponse);

    return mockResponse as Response<any>;
  };
};

/**
 * Toggle mock mode on/off at runtime
 */
export const toggleMockMode = (enabled: boolean) => {
  MOCK_CONFIG.enabled = enabled;
  console.log(`🔄 Mock mode ${enabled ? 'enabled' : 'disabled'}`);
};

/**
 * Check if mock mode is active
 */
export const isMockModeActive = (): boolean => {
  return MOCK_CONFIG.enabled;
};
