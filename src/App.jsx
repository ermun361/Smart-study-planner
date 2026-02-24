import React, { useState } from 'react'; // 1. Added useState
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from './store/useAuthStore';

// LAYOUT & PAGES
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/Subjects'; 
import AddSubjectModal from './components/AddSubjectModal';
import ProgressPage from './pages/ProgressPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Placeholders for pages NOT yet built 
const SettingsPage = () => <div className="p-8 text-2xl font-bold italic text-gray-400">Preferences (Week 3)</div>;

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
        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}>
          {/* We remove the Navigate from "/" so it doesn't skip the Landing Page */}
          
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
        {/* If a user goes to a page that doesn't exist, send them home */}
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