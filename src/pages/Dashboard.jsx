import React, { useState} from 'react';
import { useSubjectStore } from '../store/useSubjectStore';
import SmartCalendar from '../components/dashboard/Calendar';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
 
const Dashboard = ({ onAddClick }) => {
  // Pull data from our store
  const { subjects, deleteSubject, tasks, toggleTask } = useSubjectStore();
  const today = new Date().toISOString().split('T')[0];

  // local state for calendar selection
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Friendly Quote */}
      <div className="w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">
          "Success is the sum of small efforts, repeated day in and day out"
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDE: Calendar & Subjects */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Calendar Placeholder (We build this next!) */}
          <SmartCalendar
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />

          {/* List of Subjects */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Your Subjects</h3>
            
            {subjects.length === 0 ? (
              <div className="p-10 border-2 border-dashed border-gray-200 rounded-3xl text-center text-gray-400">
                Click "+ Add Subject" to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((s) => (
                  <div key={s.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-gray-800 uppercase tracking-tight">{s.name}</h4>
                      <p className="text-sm text-gray-500">Exam Date: {s.examDate}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase 
                        ${s.difficulty === 'Hard' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {s.difficulty}
                      </span>
                    </div>
                    <button onClick={() => deleteSubject(s.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Smart Tasks */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 min-h-[450px]">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Study Plan</h3>
            
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-gray-400 italic text-center pt-20">Your schedule will appear here.</p>
              ) : (
                tasks.slice(0, 8).map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all border border-transparent hover:border-gray-100"
                  >
                    {task.completed ? 
                      <CheckCircle2 className="text-green-500" size={20} /> : 
                      <Circle className="text-gray-300" size={20} />
                    }
                    <div className="overflow-hidden">
                      <p className={`text-sm font-bold truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task.title}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        {task.date === today ? "Today" : task.date}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <button 
            onClick={onAddClick}
            className="w-full bg-brandPurple hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95"
          >
            + Add Subject
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;