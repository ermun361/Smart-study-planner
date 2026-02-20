import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  Book,
  X
} from 'lucide-react';

const Sidebar = ({ isMenuOpen, toggleMenu }) => {
  
  // A helper to handle the link styling and keep the code clean
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 p-3 rounded-xl transition-all ${
      isActive 
      ? 'bg-white/20 text-white shadow-inner font-bold' // Active Style
      : 'text-white/70 hover:bg-white/10 hover:text-white' // Inactive Style
    }`;

  return (
    <> 
      {/* 1. MOBILE BACKDROP */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={toggleMenu} 
        />
      )}

      {/* 2. THE SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-brandPurple text-white flex flex-col justify-between shadow-xl
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:inset-0
      `}>

        <div>
          {/* Brand Logo Area */}
          <div className="p-6 flex items-center justify-between text-xl font-bold border-b border-white/10">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 fill-white/20" />
              <span className="tracking-tight text-white uppercase text-lg">Smart Planner</span>
            </div>
            
            {/* Close Button for Mobile */}
            <button onClick={toggleMenu} className="lg:hidden text-white/70 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 mt-6 space-y-1">
            <NavLink to="/dashboard" onClick={isMenuOpen ? toggleMenu : null} className={navLinkClass}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink to="/subjects" onClick={isMenuOpen ? toggleMenu : null} className={navLinkClass}>
              <BookOpen size={20} />
              <span>Subjects</span>
            </NavLink>

            <NavLink to="/progress" onClick={isMenuOpen ? toggleMenu : null} className={navLinkClass}>
              <BarChart3 size={20} />
              <span>Progress</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="px-4 mb-6 space-y-1">
          <NavLink to="/settings" onClick={isMenuOpen ? toggleMenu : null} className={navLinkClass}>
            <Settings size={20} />
            <span>Preferences</span>
          </NavLink>
          
          <button className="w-full flex items-center gap-3 p-3 text-white/50 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all mt-4">
            <LogOut size={20} />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;