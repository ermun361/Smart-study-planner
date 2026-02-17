import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
// Import or create placeholders for the other pages
const SubjectsPage = () => <div className="p-8 text-2xl font-bold">Subjects Page Coming Next!</div>;
const ProgressPage = () => <div className="p-8 text-2xl font-bold italic text-gray-400">Progress Tracking (Week 3)</div>;
const SettingsPage = () => <div className="p-8 text-2xl font-bold italic text-gray-400">Preferences (Week 3)</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Everything inside this Route will share the Sidebar layout */}
        <Route element={<MainLayout />}>
          {/* Default redirect to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;