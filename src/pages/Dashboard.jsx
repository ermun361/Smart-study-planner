import React, { useState, useEffect } from 'react';
import { useSubjectStore } from '../store/useSupabaseSubjectStore';
import SmartCalendar from '../components/dashboard/Calendar';
import { fetchMotivation, getLocalQuote } from '../utils/motivationApi';
import { CheckCircle2, Circle, Forward, Quote } from 'lucide-react';
import { format } from 'date-fns'; 

const Dashboard = ({ onAddClick }) => {
  const { tasks, subjects, toggleTask, skipTask, fetchInitialData } = useSubjectStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Initialize quote with the text property correctly
  const [quote, setQuote] = useState(getLocalQuote() || { text: "Keep pushing forward!", author: "Planner" });

  useEffect(() => {
    if (subjects.length === 0) {
      fetchInitialData();
    }
  }, []);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const dailyQuote = await fetchMotivation();
        if (dailyQuote) setQuote(dailyQuote);
      } catch (err) {
        console.log("Using backup quote");
      }
    };
    getQuote();
  }, []);

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const filteredTasks = tasks.filter((task) => task.date === selectedDateStr);

 return (
    <div className="max-w-7xl mx-auto">
      
      {/* --- HERO QUOTE SECTION --- */}
      <div className="w-full bg-gradient-to-br from-brandPurple to-indigo-600 p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-indigo-100 text-center mb-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:scale-150 duration-700"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <Quote className="text-white/20 mb-4" size={40} />
          {/* FIX: Render quote.text instead of the whole object */}
          <h2 className="animate-fade-in text-xl lg:text-3xl font-black text-white leading-tight italic max-w-4xl">
            "{quote.text}" 
          </h2>
          <p className="text-white/60 mt-2 font-medium">— {quote.author}</p>
          <div className="h-1 w-20 bg-white/30 rounded-full mt-6 mb-2"></div>
          <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
            Daily Academic Fuel
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <SmartCalendar
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
        </div>

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
                      {/* FIX: Use task.name instead of task.title */}
                      <p className={`text-sm font-bold truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task.name} 
                      </p>
                      {task.isExam && (
                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-black uppercase">
                          Exam Day
                        </span>
                      )}
                    </div>

                    {!task.completed && !task.isExam && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          skipTask(task.id);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-brandPurple text-[10px] font-bold uppercase transition-all hover:bg-brandPurple hover:text-white"
                      >
                        <Forward size={12} />
                        Skip
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
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