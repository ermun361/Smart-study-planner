import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Sidebar (Desktop always visible, Mobile slides in) */}
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. Mobile Header (Only shows on small screens) */}
        <header className="lg:hidden bg-brandPurple text-white p-4 flex items-center justify-between">
          <span className="font-bold tracking-tight uppercase">Smart Planner</span>
          <button onClick={toggleMenu} className="p-2 hover:bg-white/10 rounded-lg">
            <Menu size={24} />
          </button>
        </header>

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* This is where your Pages (Dashboard, Subjects, etc.) will render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;