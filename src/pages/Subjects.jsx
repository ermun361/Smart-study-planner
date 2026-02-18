import React from 'react';
import { useSubjectStore } from '../store/useSubjectStore';
import { Search, Edit3, Book, Plus } from 'lucide-react';

const SubjectsPage = ({ onAddClick }) => {
  const { subjects } = useSubjectStore();

  return (
    <div className="flex flex-col h-full">
      {/* --- TOP HEADER BAR --- */}
      <div className="flex items-center justify-between mb-8 bg-gray-100/50 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg text-brandPurple">
            <Book size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">My Subjects</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brandPurple/20 w-64"
            />
          </div>
          {/* Profile Placeholder */}
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden text-white border-2 border-white rounded-full shadow-sm bg-brandPurple">
  <span className="text-xs font-black uppercase tracking-tighter">JD</span>
</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">My Subjects</h2>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1">
        {subjects.length === 0 ? (
          /* --- EMPTY STATE (Matches your first screenshot) --- */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Clipboard Illustration Placeholder */}
            <div className="relative mb-8">
              <div className="w-48 h-60 bg-gray-100 rounded-[2rem] flex flex-col items-center p-6 shadow-sm">
                <div className="w-16 h-6 bg-purple-300 rounded-full mb-8" />
                <div className="w-full h-2 bg-gray-200 rounded-full mb-3" />
                <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-3 self-start" />
                <div className="w-full h-2 bg-gray-200 rounded-full mb-3" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-400 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                   <Plus size={40} strokeWidth={3} />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No subject added yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm">
              Start by adding your first subject to begin planning your studies
            </p>
            <button 
              onClick={onAddClick}
              className="bg-brandPurple hover:bg-indigo-700 text-white px-12 py-4 rounded-2xl font-bold shadow-lg transition-transform active:scale-95 text-lg"
            >
              + Add Subject
            </button>
          </div>
        ) : (
          /* --- ACTIVE STATE (Matches your second screenshot) --- */
          <div className="space-y-4 max-w-4xl">
            {subjects.map((s) => (
              <div 
                key={s.id} 
                className="bg-gray-200/80 p-5 rounded-[2rem] flex items-center justify-between group hover:bg-gray-200 transition-colors"
              >
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-gray-800">{s.name}</h4>
                  <p className="text-sm text-gray-500">{s.examDate}</p>
                </div>

                <div className="flex items-center gap-6">
                  {/* Topic Pill */}
                  <span className="px-6 py-1.5 bg-indigo-100/50 text-brandPurple rounded-full text-sm font-medium">
                    {s.difficulty} 
                  </span>
                  
                  {/* Edit Button */}
                  <button className="p-2 text-gray-600 hover:text-brandPurple transition-colors">
                    <Edit3 size={20} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Floating Add Button for list view */}
            <div className="flex justify-center mt-10">
                <button 
                onClick={onAddClick}
                className="bg-brandPurple hover:bg-indigo-700 text-white px-12 py-4 rounded-3xl font-bold shadow-xl transition-all active:scale-95"
                >
                + Add Subject
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectsPage;