/**
 * Mock Mode Utilities
 * Herramientas para gestionar el modo mock en tiempo de ejecución
 */

import { toggleMockMode, isMockModeActive, MOCK_CONFIG } from '@/api/client/fetcher.mock';

/**
 * Obtener el estado actual del modo mock
 */
export const getMockModeStatus = (): { 
  enabled: boolean; 
  delay: number; 
  envEnabled: boolean 
} => {
  return {
    enabled: isMockModeActive(),
    delay: MOCK_CONFIG.delay,
    envEnabled: import.meta.env.VITE_USE_MOCK_DATA === 'true'
  };
};

/**
 * Cambiar el delay de simulated network
 */
export const setMockNetworkDelay = (delayMs: number): void => {
  MOCK_CONFIG.delay = delayMs;
  console.log(`🌐 Mock network delay set to ${delayMs}ms`);
};

/**
 * Toggle rápido entre mock y real
 */
export const toggleMockData = (): boolean => {
  const newState = !isMockModeActive();
  toggleMockMode(newState);
  return newState;
};

/**
 * Obtener resumen legible del estado actual
 */
export const getMockModeSummary = (): string => {
  const status = getMockModeStatus();
  return `
🔧 Mock Mode Status:
  • Enabled: ${status.enabled ? '✅' : '❌'}
  • Env Configured: ${status.envEnabled ? '✅' : '❌'}
  • Network Delay: ${status.delay}ms
  
💡 To toggle: window.__toggleMockData()
  `;
};

/**
 * Exponer herramientas en window para fácil acceso desde consola
 */
export const setupMockDevTools = (): void => {
  if (typeof window !== 'undefined') {
    (window as any).__mockInfo = getMockModeStatus;
    (window as any).__toggleMockData = toggleMockData;
    (window as any).__setMockDelay = setMockNetworkDelay;
    (window as any).__mockSummary = getMockModeSummary;
    
    console.log('%c🧪 Mock Dev Tools available:', 'font-weight: bold; color: #4CAF50;');
    console.log('  • __mockInfo() - Get current status');
    console.log('  • __toggleMockData() - Toggle mock mode');
    console.log('  • __setMockDelay(ms) - Set network delay');
    console.log('  • __mockSummary() - Print summary');
  }
};
