import React, { useState } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuthStore } from './store/useAuthStore';
import { useAuthStore } from '../src/store/useSupabaseAuthStore';

// LAYOUT & PAGES
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/Subjects'; 
// import AddSubjectModal from './components/AddSubjectModal';
import AddSubjectModal from './components/SupabaseAddSubjectModal';
import ProgressPage from './pages/ProgressPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const SettingsPage = () => <div className="p-8 text-2xl font-bold italic text-gray-400">Preferences (later)</div>;

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // The Modal state 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* --- 1. PUBLIC ROUTE  --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- 2. PRIVATE APP ROUTES */}
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

        {/* --- 3. CATCH-ALL REDIRECT --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 4. GLOBAL MODAL */}
      {isModalOpen && (
        <AddSubjectModal onClose={() => setIsModalOpen(false)} />
      )}
    </BrowserRouter>
  );
}

export default App;