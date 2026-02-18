import React, { useState } from 'react'; // 1. Added useState
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/Subjects'; 
import AddSubjectModal from './components/AddSubjectModal';

// Placeholders for pages NOT yet built (Keep these)
const ProgressPage = () => <div className="p-8 text-2xl font-bold italic text-gray-400">Progress Tracking (Week 3)</div>;
const SettingsPage = () => <div className="p-8 text-2xl font-bold italic text-gray-400">Preferences (Week 3)</div>;

function App() {
  // 3. Define the Modal state here so it can be opened from any page
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 4. Pass the onAddClick prop to both Dashboard and Subjects */}
          <Route path="/dashboard" element={<Dashboard onAddClick={() => setIsModalOpen(true)} />} />
          <Route 
              path="/subjects" 
              element={<SubjectsPage onAddClick={() => setIsModalOpen(true)} />} 
            />
          
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      {/* 5. Render the Modal here so it shows up regardless of which page you are on */}
      {isModalOpen && (
        <AddSubjectModal onClose={() => setIsModalOpen(false)} />
      )}
    </BrowserRouter>
  );
}

export default App;