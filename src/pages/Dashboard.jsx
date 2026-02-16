import React from 'react';
import { useSubjectStore } from '../store/useSubjectStore'; 
import { BookOpen, Trash2 } from 'lucide-react'; 

const Dashboard = ({ onAddClick }) => {
  // Grab the subjects and the delete function from the store
  const { subjects, deleteSubject } = useSubjectStore();

  return (
    <>
      <div className="w-full bg-white p-6 lg:p-10 rounded-3xl shadow-sm border border-gray-100 text-center mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 leading-relaxed">
          "Success is the sum of small efforts, repeated day in and day out"
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Calendar & Subjects */}
        <div className="lg:col-span-8 space-y-8">
          <div className="h-80 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
            Calendar Component Coming in Week 2...
          </div>

          {/* --- SUBJECT CARDS DISPLAY --- */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Your Subjects</h3>
            
            {subjects.length === 0 ? (
              <div className="p-10 border-2 border-dashed border-gray-200 rounded-3xl text-center text-gray-400">
                No subjects added yet. Start by clicking "+ Add Subject"
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-gray-800 uppercase tracking-tight">{subject.name}</h4>
                      <p className="text-sm text-gray-500">Exam: {subject.examDate}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase
                        ${subject.difficulty === 'Hard' ? 'bg-red-100 text-red-600' : 
                          subject.difficulty === 'Medium' ? 'bg-orange-100 text-orange-600' : 
                          'bg-green-100 text-green-600'}`}>
                        {subject.difficulty}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteSubject(subject.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Tasks & Add Button */}
        <div className="lg:col-span-4 lg:row-span-2 flex flex-col gap-8">
          <div className="h-[500px] bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic text-center">
            Task Generation Logic <br/> Coming in Week 2...
          </div>
          
          <button 
            onClick={onAddClick}
            className="w-full bg-brandPurple hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-brandPurple/20 transition-all active:scale-[0.98]"
          >
            + Add Subject
          </button>
        </div>

      </div>
    </>
  );
}

export default Dashboard;