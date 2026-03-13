import { create } from 'zustand';
import { supabase } from '../store/supabaseClient';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null, 

  // REAL SIGN UP
  signUp: async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { full_name: name } 
      }
    });
    if (error) throw error;
    return data;
  },

  // REAL LOGIN
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    set({ user: data.user, isAuthenticated: true });
  },

  // REAL LOGOUT
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error.message);
    set({ user: null, isAuthenticated: false });
  }, 

  // UPDATE PROFILE
  updateProfile: async (updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { 
          full_name: updates.fullName,
        }
      });

      if (error) throw error;

      // Update the local zustand state so the UI refreshes
      set({ user: data.user, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { success: false, error: error.message };
    }
  },
}));