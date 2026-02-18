import React, { useState} from 'react';
import { useSubjectStore } from '../store/useSubjectStore';
import SmartCalendar from '../components/dashboard/Calendar';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
 
const Dashboard = ({ onAddClick }) => {
  const { tasks, toggleTask } = useSubjectStore();
  const today = new Date().toISOString().split('T')[0];
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
        {/* LEFT SIDE: Calendar Only */}
        <div className="lg:col-span-8">
          <SmartCalendar
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
        </div>

        {/* RIGHT SIDE: Smart Tasks & Add Button */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Study Plan</h3>
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-gray-400 italic text-center pt-20">Your schedule will appear here.</p>
              ) : (
                tasks.slice(0, 10).map((task) => (
                  <div key={task.id} onClick={() => toggleTask(task.id)} className="...">
                     {/* ... task rendering ... */}
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
};

export default Dashboard;