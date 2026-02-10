import React from 'react';
// Note: We will add real icons tomorrow. For today, we use placeholders [ ]
function App() {
  return (
    <div className="flex h-screen bg-white">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-brandPurple text-white flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <div className="p-6 flex items-center gap-3 text-xl font-bold">
            <div className="w-8 h-8 bg-white/20 rounded-lg"></div> {/* Logo Placeholder */}
            Smart Planner
          </div>

          <nav className="px-4 mt-4 space-y-2">
            {/* Active Link: Notice the darker purple 'bg-indigo-800/40' */}
            <div className="flex items-center gap-3 p-3 bg-indigo-800/40 rounded-lg cursor-pointer">
              <span className="w-5 h-5 bg-white/20 rounded"></span> Dashboard
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer opacity-80">
              <span className="w-5 h-5 bg-white/20 rounded"></span> Subjects
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer opacity-80">
              <span className="w-5 h-5 bg-white/20 rounded"></span> Progress
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="px-4 mb-6 space-y-2">
          <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer opacity-80">
            <span className="w-5 h-5 bg-white/20 rounded"></span> Preferences
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer opacity-80">
            <span className="w-5 h-5 bg-white/20 rounded"></span> Log out
          </div>
        </div>
      </aside>

      {/* --- MAIN AREA WRAPPER --- */}
      <div className="flex-1 flex flex-col">
        
        {/* --- TOP HEADER --- */}
        <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 font-semibold text-lg text-gray-700">
             <div className="w-6 h-6 bg-brandPurple/20 rounded"></div> Dashboard
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Bar Placeholder */}
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-400 w-48">
              Search...
            </div>
            {/* Avatar Placeholder */}
            <div className="w-10 h-10 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <main className="flex-1 overflow-y-auto bg-[#F9F9FB] p-8">
          
          {/* Success Quote Card */}
          <div className="w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              Success is the sum of small efforts, repeated day in and day out
            </h2>
          </div>

          {/* Grid for Calendar and Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-64 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">Calendar Area</div>
              <div className="h-64 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">Upcoming Exams</div>
            </div>
            
            <div className="space-y-8">
              <div className="h-[500px] bg-white rounded-2xl shadow-sm border border-gray-100 p-6">Today's Tasks</div>
              <button className="w-full bg-brandPurple text-white py-3 rounded-xl font-medium">
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