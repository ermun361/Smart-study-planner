import React from "react";
import { Menu, Search, BookOpen } from "lucide-react";


const Header = ({ toggleMenu }) => {
    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            {/* 
              HAMBURGER BUTTON:
               - 'lg:hidden': only shows on mobile/tablet. 
               - Triggers 'toggleMenu' to open the sidebar.
            
            */}

            <button 
              onClick={toggleMenu} 
              className="p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden">
              <Menu size={24} />
            </button>

            <div className='flex items-center gap-3 text-gray-800 font-semibold text-lg lg:text-xl'>
              <BookOpen className="text-brandPurple hidden sm:block" size={24} />
              Dashboard
            </div>   
          </div>
          
          <div className="flex items-center gap-2 lg:gap-6">
            {/* Professional Search Bar: 'hidden md:block' -> hide on phones, show on tablets/laptops */}
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-2.5 text-gray-400 " size={18} />

              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-gray-100 pl-10 pr-4 py-2 rounded-full text-sm w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-brandPurple/20  transition-all"
              />
            </div>

            
            {/* USER PROFILE AVATAR*/}
            <div className="w-10 h-10 bg-orange-500 rounded-full border-2 border-white shadow-md ring-1 ring-gray-200 overflow-hidden">
               <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="avatar"
               />
            </div>
          </div>
        </header>     
    );
};

export default Header;

