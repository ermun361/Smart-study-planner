import { create } from 'zustand';
import { supabase } from '../store/supabaseClient';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

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
  }
}));