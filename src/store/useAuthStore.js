import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // STATE
      user: null,
      token: null,

      // DERIVED STATE
      isAuthenticated: false,

      // ACTIONS
      login: (userData, authToken) => {
        set({
          user: userData,
          token: authToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (newData) => {
        set((state) => ({
          user: { ...state.user, ...newData },
        }));
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);