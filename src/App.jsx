import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search,
  Book,
  Menu,
  X
} from 'lucide-react';

function App() {
  /**  
  * STATE LOGIC FOR MOBILE SIDEBAR
  * 'isMenuOpen' is a boolean (true/false).
  * When 'isMenuOpen' is true, the sidebar is visible on mobile.
  * When 'isMenuOpen' is false, the sidebar is hidden on mobile. 
  * The 'toggleMenu' function toggles the value of 'isMenuOpen' between true and false.
  */
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 // Function to toggle the mobile menu
 const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  return (
    /**
     * MAIN WRAPPER: A flex container that takes the full height of the screen, with a light background and sans-serif font.
     * 'overflow-hidden' prevents the page from "shaking" or scrolling when the mobile menu is toggled open or closed. This ensures a smooth user experience on mobile devices.
     */

    <div className="flex h-screen bg-[#F9F9FB] font-sans relative overflow-hidden">

      {/*  1. MOBILE BACKDROP (The "Dimmer" effect)
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
      
      {/* 
       2. THE SIDEBAR
        - 'transition-transform': makes the slide smooth instead of a "jump."
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

      {/* 
        3. MAIN CONTENT AREA
          - 'flex-1': This box "greedily" takes all the remaining width.
          - 'flex-col': Stacks the Header on top of the Content.
      */}

      <div className="flex-1 flex flex-col w-full">
        
        {/* TOP HEADER */}
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

        {/* 
          4.SCROLLABLE DASHBOARD CONTENT
        - 'overflow-y-auto': only the dashboard scrolls, NOT the sidebar or header.
        */}

        <main className="flex-1 overflow-y-auto P-4 LG:p-8 ">
          
          {/* Quote Card */}
          <div className="w-full bg-white p-6 lg:p-10  rounded-3xl shadow-sm border border-gray-100 text-center mb-8">

            <h2 className="text-xl lg:text-2xl font-bold text-gray-800  leading-relaxed">
              "Success is the sum of small efforts, repeated day in and day out"
            </h2>

          </div>

          {/* ---  GRID APPROACH --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. CALENDAR */}
            <div className="lg:col-span-8 h-80 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
              Calendar Component (8 Columns Wide)
            </div>

            {/* 2. TODAY'S TASKS + ADD SUBJECT BUTTON  */}

            <div className="lg:col-span-4 lg:row-span-2 flex flex-col gap-8">
              <div className="h-[500px] bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
                Today's Tasks (Spanning 2 Rows)
              </div>
              
              <button className="w-full bg-brandPurple hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-brandPurple/20 transition-all active:scale-[0.98]">
                + Add Subject
              </button>
            </div>

            {/* 3. UPCOMING EXAMS */}
            <div className="lg:col-span-8 h-64 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
              Upcoming Exams (Under Calendar, Left Side)
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}

export default App;