import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    /* Added dark:bg-black and transition classes here */
    <div className="flex min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300">
      
      {/* 1. Sidebar */}
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* 2. Mobile Header - Added dark:bg-slate-950 */}
        <header className="lg:hidden bg-brandPurple dark:bg-slate-950 text-white p-4 flex items-center justify-between transition-colors duration-300">
          <span className="font-bold tracking-tight uppercase">Smart Planner</span>
          <button onClick={toggleMenu} className="p-2 hover:bg-white/10 rounded-lg">
            <Menu size={24} />
          </button>
        </header>

        {/* 3. Main Content Area - Added dark:bg-gray-900 */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 dark:bg-gray-900 transition-colors duration-300">
          {/* This Outlet renders your Dashboard, Subjects, etc. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;