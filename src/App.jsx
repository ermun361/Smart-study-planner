import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuthStore } from './store/useAuthStore';
import { useAuthStore } from './store/useSupabaseAuthStore';
import { supabase } from './store/supabaseClient';


// LAYOUT & PAGES
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/Subjects'; 
// import AddSubjectModal from './components/AddSubjectModal';
import AddSubjectModal from './components/SupabaseAddSubjectModal';
import ProgressPage from './pages/ProgressPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';

// const SettingsPage = () => <div className="p-8 text-2xl font-bold italic text-gray-400">Preferences (later)</div>;

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 3. Added a "checking" state so the app doesn't jump to the landing page 
  // while it's still checking if you're logged in.
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // 4. "The Hotel Check": See if the user already has a key in their browser
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // If a session exists, manually update our Zustand store
        useAuthStore.setState({ user: session.user, isAuthenticated: true });
      }
      setIsCheckingAuth(false);
    };

    initAuth();

    // 5. "The Security Guard": Listen for any changes (like session expiring or logging out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        useAuthStore.setState({ user: session.user, isAuthenticated: true });
      } else {
        useAuthStore.setState({ user: null, isAuthenticated: false });
      }
      setIsCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 6. Show nothing (or a spinner) until we know for sure if the user is logged in
  if (isCheckingAuth) {
    return <div className="min-h-screen bg-[#cbd5e1] flex items-center justify-center font-bold">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 7. PRIVATE ROUTES */}
        {/* If not authenticated, we send them to Landing Page "/" */}
        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/" replace />}>
          <Route 
            path="/dashboard" 
            element={<Dashboard onAddClick={() => setIsModalOpen(true)} />} 
          />
          <Route 
            path="/subjects" 
            element={<SubjectsPage onAddClick={() => setIsModalOpen(true)} />} 
          />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isModalOpen && (
        <AddSubjectModal onClose={() => setIsModalOpen(false)} />
      )}
    </BrowserRouter>
  );
}

export default App;