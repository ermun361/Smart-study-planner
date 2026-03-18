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

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 1. Handle Dark Mode class on <html> tag
  useEffect(() => {
    if (user?.user_metadata?.dark_mode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user]);

  // 2. Handle Authentication Initialization & Listener
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        useAuthStore.setState({ user: session.user, isAuthenticated: true });
      }
      setIsCheckingAuth(false);
    };

    initAuth();

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

  if (isCheckingAuth) {
    return <div className="min-h-screen bg-slate-200 flex items-center justify-center font-bold">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/" replace />}>
          <Route path="/dashboard" element={<Dashboard onAddClick={() => setIsModalOpen(true)} />} />
          <Route path="/subjects" element={<SubjectsPage onAddClick={() => setIsModalOpen(true)} />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isModalOpen && <AddSubjectModal onClose={() => setIsModalOpen(false)} />}
    </BrowserRouter>
  );
}

export default App;