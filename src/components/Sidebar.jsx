import React from 'react';
import {
    LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search,
  Book,
  X
} from 'lucide-react';

 const Sidebar = ({ isMenuOpen, toggleMenu }) => {
    return (
        <> 

            {/* 1. MOBILE BACKDROP (The "Dimmer" effect)
            - 'fixed inset-0': covers the entire screen.
            - 'bg-black/50': semi-transparent black.
            - 'z-40': sits above content but BELOW the sidebar (z-50).
            - 'lg:hidden': this overlay is NEVER needed on desktop. */}
            {isMenuOpen && (
                <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
                onClick={toggleMenu} // Clicking the backdrop will close the menu
                />
            )}

            {/* 2. THE SIDEBAR
            - 'transition-transform': makes the slide smooth instead of a "jump."- 'transition-transform': makes the slide smooth instead of a "jump."
            - 'duration-300': the slide takes 0.3 seconds.
            - '${isMenuOpen ? ...}': This is the Javascript "If/Else" for the CSS.
            - If open: 'translate-x-0' (bring into view).
            - If closed: '-translate-x-full' (hide off-screen to the left).
            - 'lg:translate-x-0': On desktop (lg), ALWAYS be in view.
            - 'lg:static': On desktop, don't float; take up real space on the left.
            */}
            <aside className= {`
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
                <span className="tracking-tight text-white">Smart Planner</span>
                </div>
                {/* Close Button: Hidden on desktop, shows on mobile to close the menu */}

                <button onClick={toggleMenu} className="lg:hidden text-white/70 hover:text-white transition-colors">
                <X size={24} />
                </button>

            </div>

            <nav className="px-4 mt-6 space-y-1">
                {/* Active Link */}
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl cursor-pointer transition-all">
                <LayoutDashboard size={20} />
                <span className="font-medium text-white">Dashboard</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100">
                <BookOpen size={20} />
                <span className="font-medium text-white ">Subjects</span>
                </div>

                <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100">
                <BarChart3 size={20} />
                <span className="font-medium text-white">Progress</span>
                </div>
            </nav>
            </div>

            {/* Bottom Section */}
            <div className="px-4 mb-6 space-y-1">
            <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100">
                <Settings size={20} />
                <span className="font-medium text-white">Preferences</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100">
                <LogOut size={20} />
                <span className="font-medium text-white">Log out</span>
            </div>
            </div>
            </aside>
        
        </>
    );
 };

export default Sidebar;


 /**  
  * STATE LOGIC FOR MOBILE SIDEBAR
  * 'isMenuOpen' is a boolean (true/false).
  * When 'isMenuOpen' is true, the sidebar is visible on mobile.
  * When 'isMenuOpen' is false, the sidebar is hidden on mobile. 
  * The 'toggleMenu' function toggles the value of 'isMenuOpen' between true and false.
  */