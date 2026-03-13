import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { useAuthStore } from '../store/useAuthStore'; 
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
  // 3. Initialize hooks
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  
  // 4. Logout Handler
  const handleLogout = () => {
  logout(); 
  // Use 'replace: true' so the user can't hit the "Back" button to return to the dashboard
  navigate('/', { replace: true }); 
  // Redirect back to Landing Page
      if (isMenuOpen) toggleMenu(); // Close mobile menu if it was open
    };

  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 p-3 rounded-xl transition-all ${
      isActive 
      ? 'bg-white/20 text-white shadow-inner font-bold' 
      : 'text-white/70 hover:bg-white/10 hover:text-white' 
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
          <div className="p-6 flex items-center justify-between text-xl font-bold border-b border-white/10">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 fill-white/20" />
              <span className="tracking-tight text-white uppercase text-lg">Smart Planner</span>
            </div>
            
            <button onClick={toggleMenu} className="lg:hidden text-white/70 hover:text-white">
              <X size={24} />
            </button>
          </div>

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
          
          {/* 5. LOGOUT BUTTON */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-white/50 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all mt-4 group"
          >
            <LogOut size={20} className="group-hover:stroke-red-400" />
            <span className="font-medium group-hover:text-red-400">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;