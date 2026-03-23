/**
 * Mock data central export
 * Use this to access all mock data for development and testing
 */

export * from "./auth.mock";
export * from "./users.mock";
export * from "./documents.mock";
export * from "./reports.mock";

// Re-export as mockDB object for easier access
import { authMockData } from "./auth.mock";
import { usersMockData } from "./users.mock";
import { documentsMockData } from "./documents.mock";
import { getReportsResponse } from "./reports.mock";

export const mockDB = {
  auth: authMockData,
  users: usersMockData,
  documents: documentsMockData,
  reports: getReportsResponse()
};
