import React, { useState, useEffect } from 'react';
// import { useSubjectStore } from '../store/useSubjectStore';
import { useSubjectStore } from '../store/useSupabaseSubjectStore';
import { Search, Edit3, Trash2, Book, Plus } from 'lucide-react';
// import AddSubjectModal from '../components/AddSubjectModal';
import AddSubjectModal from '../components/SupabaseAddSubjectModal';
import { useAuthStore } from '../store/useSupabaseAuthStore';

const SubjectsPage = ({ onAddClick }) => {
  // Pull the subjects and the delete function from the store
  const { subjects, deleteSubject } = useSubjectStore();

   const { user } = useAuthStore();

  // local state to handle which subject to edit
  const [ editingSubject, setEditingSubject ] = useState(null);

   const [searchTerm, setSearchTerm] = useState('');

   const filteredSubjects = subjects.filter((subject) =>
  subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


return (
  <div className="flex flex-col h-full transition-colors duration-300">
    {/* --- TOP HEADER BAR --- */}
    <div className="flex items-center justify-between mb-8 bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-transparent dark:border-gray-700/50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-brandPurple dark:text-indigo-400">
          <Book size={24} />
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">My Subjects</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="pl-10 pr-4 py-2 bg-gray-200 dark:bg-gray-900 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brandPurple/20 w-64 dark:text-white dark:border dark:border-gray-700"
          />
        </div>
        <div className="w-10 h-10 rounded-full bg-brandPurple flex items-center justify-center text-white shadow-sm border-2 border-white dark:border-gray-800 font-bold text-xs overflow-hidden">
          {user?.user_metadata?.avatar_url ? (
            <img 
              src={user.user_metadata.avatar_url} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            user?.user_metadata?.full_name 
              ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').toUpperCase() 
              : "U"
          )}
        </div>
      </div>
    </div>

    {/* --- CONTENT AREA --- */}
    <div className="flex-1 px-2">
      {subjects.length === 0 ? (
        /* 1. STATE: Database is completely empty */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-8">
            {/* The "Paper" illustration */}
            <div className="w-48 h-60 bg-gray-100 dark:bg-gray-800 rounded-[2rem] flex flex-col items-center p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-6 bg-purple-300 dark:bg-purple-900/50 rounded-full mb-8" />
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3" />
              <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 self-start" />
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brandPurple rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-gray-900">
                 <Plus size={32} strokeWidth={3} />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No subject added yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
            Start by adding your first subject to begin planning your studies
          </p>
          <button 
            onClick={onAddClick}
            className="bg-brandPurple hover:bg-indigo-700 text-white px-12 py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 text-lg"
          >
            + Add Subject
          </button>
        </div>

      ) : (
        /* 2. STATE: User has subjects (showing search results) */
        <div className="flex flex-col items-center">
           <div className="space-y-4 w-full max-w-4xl">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((s) => (
                  <div 
                      key={s.id} 
                      className="bg-gray-200/80 dark:bg-gray-800 p-5 rounded-[2rem] flex items-center justify-between group hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors border border-transparent dark:border-gray-700/50"
                  >
                      <div className="flex flex-col">
                        <h4 className="text-lg font-bold text-gray-800 dark:text-white">{s.name}</h4>
                        <p className="text-sm text-gray-400 dark:text-gray-500">{s.examDate}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="px-6 py-1.5 bg-indigo-100/50 dark:bg-indigo-900/30 text-brandPurple dark:text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {s.difficulty}
                        </span>
                        
                        <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setEditingSubject(s)} 
                              className="p-2 text-gray-400 dark:text-gray-500 hover:text-brandPurple dark:hover:text-indigo-400 transition-colors"
                            >
                                <Edit3 size={18} />
                            </button>
                            
                            <button 
                                onClick={() => deleteSubject(s.id)}
                                className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                      </div>
                  </div>
                ))
              ) : (
                /* 3. STATE: Search term doesn't match anything */
                <div className="flex flex-col items-center py-16 bg-gray-50 dark:bg-gray-800/40 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No results for "{searchTerm}"</p>
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="text-brandPurple dark:text-indigo-400 font-bold mt-2 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
          </div>

          <button 
              onClick={onAddClick}
              className="mt-10 bg-brandPurple hover:bg-indigo-700 text-white px-12 py-4 rounded-3xl font-bold shadow-xl transition-all active:scale-95"
          >
              + Add Subject
          </button>
        </div>
      )}
    </div>

    {/* EDIT MODAL  */}
    {editingSubject && (
      <AddSubjectModal 
        editingSubject={editingSubject} 
        onClose={() => setEditingSubject(null)} 
      />
    )}
  </div>
);
};

export default SubjectsPage;