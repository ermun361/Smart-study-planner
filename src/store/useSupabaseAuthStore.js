import { create } from 'zustand';
import { supabase } from '../store/supabaseClient';

export const useAuthStore = create((set, get) => ({
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
        data: { full_name: updates.fullName }
      });
      if (error) throw error;
      set({ user: data.user, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { success: false, error: error.message };
    }
  },
  toggleTheme: async () => {
    // Get the current state directly
    const currentState = useAuthStore.getState();
    const isCurrentlyDark = currentState.user?.user_metadata?.dark_mode || false;
    const newDarkMode = !isCurrentlyDark;

    // 1. Instant UI Change
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Update Supabase
    const { data, error } = await supabase.auth.updateUser({
      data: { dark_mode: newDarkMode }
    });

    if (!error) {
      set({ user: data.user });
    } else {
      console.error("Supabase Theme Update Error:", error);
    }
  },

  uploadAvatar: async (file) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = get();
      if (!user) throw new Error("No user found");

      const filePath = `${user.id}/avatar.png`;

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 3. Update User Metadata
      const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      set({ user: updatedUser.user, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { success: false, error: error.message };
    }
  }
}));