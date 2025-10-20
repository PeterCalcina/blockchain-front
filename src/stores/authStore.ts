import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { queryClient } from '@/api/client/queryClient'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string, refreshToken?: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken) => set({ 
        user, 
        accessToken, 
        refreshToken: refreshToken || null, 
        isAuthenticated: true 
      }),
      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
        localStorage.removeItem("auth");
        queryClient.clear();
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);