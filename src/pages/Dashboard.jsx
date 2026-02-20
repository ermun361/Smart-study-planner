import React, { useState } from 'react';
import { useSubjectStore } from '../store/useSubjectStore';
import SmartCalendar from '../components/dashboard/Calendar';
import { CheckCircle2, Circle, Forward } from 'lucide-react';
import { format } from 'date-fns'; // We use this to match calendar dates to task dates

const Dashboard = ({ onAddClick }) => {
  const { tasks, toggleTask,skipTask } = useSubjectStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 1. Convert the calendar's selectedDate into a "YYYY-MM-DD" string
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');

  // 2. Filter tasks so we ONLY show ones for the date clicked on the calendar
  const filteredTasks = tasks.filter((task) => task.date === selectedDateStr);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Friendly Quote */}
      <div className="w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
          "Success is the sum of small efforts, repeated day in and day out"
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE: Calendar */}
        <div className="lg:col-span-8">
          <SmartCalendar
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
        </div>

        {/* RIGHT SIDE: Interactive Study Plan */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 min-h-[500px] flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">Study Plan</h3>
              <p className="text-xs font-bold text-brandPurple uppercase tracking-wider mt-1">
                {format(selectedDate, 'MMMM dd, yyyy')}
              </p>
            </div>

            <div className="flex-1 space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <Circle className="text-gray-200" size={24} />
                  </div>
                  <p className="text-gray-400 italic text-sm px-4">
                    No study sessions scheduled for this date.
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border group
                      ${task.completed 
                        ? 'bg-gray-50 border-transparent opacity-60' 
                        : 'bg-white border-gray-50 shadow-sm hover:border-brandPurple/30'}`}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="text-green-500" size={20} />
                    ) : (
                      <Circle className="text-gray-300 group-hover:text-brandPurple" size={20} />
                    )}
                    
                    <div className="overflow-hidden flex-1">
                      <p className={`text-sm font-bold truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task.title}
                      </p>
                      {task.isExam && (
                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-black uppercase">
                          Exam Day
                        </span>
                      )}
                    </div>

                    {/* 2. THE SKIP OPTION */}
                    {/* Only show if not an exam and not completed */}
                    {!task.completed && !task.isExam && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents toggleTask from firing
                          skipTask(task.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 text-brandPurple text-[10px] font-bold uppercase transition-all hover:bg-brandPurple hover:text-white"
                        title="Move to tomorrow"
                      >
                        <Forward size={12} />
                        Skip
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Progress shortcut */}
            {filteredTasks.length > 0 && (
               <p className="mt-4 text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest">
                  Tap to complete • Hover to skip
               </p>
            )}
          </div>
          
          <button 
            onClick={onAddClick} 
            className="w-full bg-brandPurple hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold shadow-lg shadow-brandPurple/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            + Add Subject
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;