import React from 'react';
// 1. Import the icons we need
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search,
  Book
} from 'lucide-react';

function App() {
  return (
    <div className="flex h-screen bg-[#F9F9FB] font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-brandPurple text-white flex flex-col justify-between shadow-xl">
        <div>
          {/* Brand Logo with Book Icon */}
          <div className="p-6 flex items-center gap-3 text-xl font-bold border-b border-white/10">
            <Book className="w-8 h-8 fill-white/20" />
            <span className="tracking-tight">Smart Planner</span>
          </div>

          <nav className="px-4 mt-6 space-y-1">
            {/* Active Link logic: bg-white/10 makes it look "posh" */}
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl cursor-pointer transition-all">
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100">
              <BookOpen size={20} />
              <span className="font-medium">Subjects</span>
            </div>

            <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100">
              <BarChart3 size={20} />
              <span className="font-medium">Progress</span>
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="px-4 mb-6 space-y-1">
          <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100">
            <Settings size={20} />
            <span className="font-medium">Preferences</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100">
            <LogOut size={20} />
            <span className="font-medium">Log out</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <div className="flex-1 flex flex-col">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div className="flex items-center gap-3 text-gray-800 font-semibold text-xl">
             <BookOpen className="text-brandPurple" size={24} />
             Dashboard
          </div>
          
          <div className="flex items-center gap-6">
            {/* Professional Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-brandPurple transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-gray-100 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brandPurple/20 w-64 transition-all"
              />
            </div>
            
            {/* Avatar with Ring */}
            <div className="w-10 h-10 bg-orange-500 rounded-full border-2 border-white shadow-md ring-1 ring-gray-200 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* Quote Card: Centered and Clean */}
          <div className="w-full bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 max-w-2xl mx-auto leading-relaxed">
              "Success is the sum of small efforts, repeated day in and day out"
            </h2>
          </div>

          {/* Grid Layout matches Figma columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="h-80 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
                Calendar Component Coming in Week 2...
              </div>
              <div className="h-64 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
                Upcoming Exams Component...
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-8">
              <div className="h-[500px] bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
                Today's Tasks Component...
              </div>
              <button className="w-full bg-brandPurple hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-brandPurple/20 transition-all active:scale-[0.98]">
                + Add Subject
              </button>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}

export default App;