import React, { useState } from 'react';
import { useSubjectStore } from '../store/useSubjectStore';
import { Search, Edit3, Trash2, Book, Plus } from 'lucide-react';
import AddSubjectModal from '../components/AddSubjectModal';

const SubjectsPage = ({ onAddClick }) => {
  // Pull the subjects and the delete function from the store
  const { subjects, deleteSubject } = useSubjectStore();

  // local state to handle which subject to edit
  const [ editingSubject, setEditingSubject ] = useState(null);

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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brandPurple/20 w-64"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-brandPurple flex items-center justify-center text-white shadow-sm border-2 border-white font-bold text-xs">
            JD
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 px-2">
        {subjects.length === 0 ? (
          
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative mb-8">
              <div className="w-48 h-60 bg-gray-100 rounded-[2rem] flex flex-col items-center p-6 shadow-sm border border-gray-200">
                <div className="w-16 h-6 bg-purple-300 rounded-full mb-8" />
                <div className="w-full h-2 bg-gray-200 rounded-full mb-3" />
                <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-3 self-start" />
                <div className="w-full h-2 bg-gray-200 rounded-full mb-3" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brandPurple rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                   <Plus size={32} strokeWidth={3} />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No subject added yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm">
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

          <div className="flex flex-col items-center">
             <div className="space-y-4 w-full max-w-4xl">
                {subjects.map((s) => (
                <div 
                    key={s.id} 
                    className="bg-gray-200/80 p-5 rounded-[2rem] flex items-center justify-between group hover:bg-gray-200 transition-colors"
                >
                    <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-gray-800">{s.name}</h4>
                    <p className="text-sm text-gray-400">{s.examDate}</p>
                    </div>

                    <div className="flex items-center gap-4">
                    <span className="px-6 py-1.5 bg-indigo-100/50 text-brandPurple rounded-full text-[10px] font-black uppercase tracking-widest">
                        {s.difficulty}
                    </span>
                    
                    <div className="flex items-center gap-2">
                        {/* EDIT ICON - Now connected! */}
                        <button 
                          onClick={() => setEditingSubject(s)} 
                          className="p-2 text-gray-400 hover:text-brandPurple transition-colors"
                        >
                            <Edit3 size={18} />
                        </button>
                        
                        <button 
                            onClick={() => deleteSubject(s.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    </div>
                </div>
                ))}
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

      {/* EDIT MODAL - Shows up when editingSubject is not null */}
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