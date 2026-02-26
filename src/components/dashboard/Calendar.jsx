import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../Calendar.css";
import { format } from 'date-fns';
import { useSubjectStore } from "../../store/useSubjectStore";

const SmartCalendar = ({ onDateChange, selectedDate }) => {
  const { tasks } = useSubjectStore();

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      const hasExam = tasks.some((t) => t.date === dateStr && t.isExam);
      return hasExam ? 'exam-day-tile' : null;
    }
    return null;
  };

  
  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayTasks = tasks.filter((t) => t.date === dateStr);
      
      // Filter for study sessions only (exclude exams)
      const studySessions = dayTasks.filter((t) => !t.isExam);

      if (studySessions.length === 0) return null;

      return (
        <div className="flex flex-wrap justify-center gap-0.5 mt-1 max-w-[20px] mx-auto">
          {studySessions.map((_, index) => (
            <div 
              key={index} 
              className={`w-1 h-1 rounded-full ${
                studySessions.length >= 4 ? 'bg-red-400' : 
                studySessions.length >= 2 ? 'bg-orange-400' : 
                'bg-green-400'
              }`}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-4 lg:p-6 overflow-hidden">
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileClassName={getTileClassName} 
        tileContent={getTileContent}    
        className="mx-auto border-none w-full"
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
};

export default SmartCalendar;