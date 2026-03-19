import React, { useState, useEffect } from 'react';
import { useSubjectStore } from '../store/useSupabaseSubjectStore';
import SmartCalendar from '../components/dashboard/Calendar';
import { fetchMotivation, getLocalQuote } from '../utils/motivationApi';
import { CheckCircle2, Circle, Forward, Quote } from 'lucide-react';
import { format } from 'date-fns'; 

const Dashboard = ({ onAddClick }) => {
  const { tasks, subjects, toggleTask, skipTask, fetchInitialData } = useSubjectStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Use a fallback object so quote.text never fails
  const [quote, setQuote] = useState(getLocalQuote() || { text: "Plan your work and work your plan.", author: "Success" });

  useEffect(() => {
    if (subjects.length === 0) {
      fetchInitialData();
    }
  }, []);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const dailyQuote = await fetchMotivation();
        // Handle both object {text, author} or just a string
        if (typeof dailyQuote === 'string') {
          setQuote({ text: dailyQuote, author: "Daily Fuel" });
        } else if (dailyQuote) {
          setQuote(dailyQuote);
        }
      } catch (err) {
        console.log("Using backup quote");
      }
    };
    getQuote();
  }, []);

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const filteredTasks = tasks.filter((task) => task.date === selectedDateStr);

return (
  <div className="max-w-7xl mx-auto transition-colors duration-300">
    
    {/* --- HERO QUOTE SECTION --- */}
    {/* Adjusted shadow for dark mode: dark:shadow-none (shadows don't look good on black) */}
    <div className="w-full bg-gradient-to-br from-brandPurple to-indigo-600 p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-indigo-100 dark:shadow-none text-center mb-10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:scale-150 duration-700"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <Quote className="text-white/20 mb-4" size={40} />
        <h2 className="animate-fade-in text-xl lg:text-3xl font-black text-white leading-tight italic max-w-4xl">
          "{quote?.text || quote}" 
        </h2>
        <p className="text-white/60 mt-4 font-bold uppercase tracking-widest text-xs">
          — {quote?.author || "Inspiration"}
        </p>
        <div className="h-1 w-20 bg-white/30 rounded-full mt-6 mb-2"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* CALENDAR - Note: You may need to add dark: classes inside the SmartCalendar component too! */}
      <div className="lg:col-span-8">
        <SmartCalendar
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>

      {/* STUDY PLAN */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[500px] flex flex-col transition-colors">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Study Plan</h3>
            <p className="text-xs font-bold text-brandPurple dark:text-indigo-400 uppercase tracking-wider mt-1">
              {format(selectedDate, 'MMMM dd, yyyy')}
            </p>
          </div>

          <div className="flex-1 space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Circle className="text-gray-100 dark:text-gray-700 mb-3" size={48} />
                <p className="text-gray-400 dark:text-gray-500 italic text-sm">No sessions for this date.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border
                    ${task.completed 
                      ? 'bg-gray-50 dark:bg-gray-900/40 border-transparent opacity-60' 
                      : 'bg-white dark:bg-gray-700 shadow-sm border-gray-50 dark:border-gray-600 hover:border-brandPurple'}`}
                >
                  {task.completed 
                    ? <CheckCircle2 className="text-green-500" size={20} /> 
                    : <Circle className="text-gray-300 dark:text-gray-500" size={20} />}
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${
                      task.completed 
                        ? 'line-through text-gray-400 dark:text-gray-500' 
                        : 'text-gray-700 dark:text-gray-200'
                    }`}>
                      {task.name}
                    </p>
                    {task.isExam && (
                      <span className="text-[9px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-black uppercase inline-block mt-1">
                        🚩 Exam Day
                      </span>
                    )}
                  </div>

                  {!task.completed && !task.isExam && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); skipTask(task.id); }} 
                      className="p-2 text-brandPurple dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-brandPurple hover:text-white transition-colors"
                    >
                      <Forward size={14}/>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* ADD SUBJECT BUTTON */}
        <button 
          onClick={onAddClick} 
          className="w-full bg-brandPurple hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
        >
          + Add Subject
        </button>
      </div>
    </div>
  </div>
);
};

export default Dashboard;