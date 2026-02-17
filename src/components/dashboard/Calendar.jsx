import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../Calendar.css";
import { format } from 'date-fns';
import { useSubjectStore } from "../../store/useSubjectStore";

const SmartCalendar = ({ onDateChange, selectedDate }) => {
  const { tasks } = useSubjectStore();

  // This function draws the dots on the tiles
  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      
      // Look for tasks or exams on this specific day
      const dayTasks = tasks.filter((t) => t.date === dateStr);
      const hasExam = dayTasks.some((t) => t.isExam);
      const hasStudySession = dayTasks.some((t) => !t.isExam);

      return (
        <div className="flex flex-col items-center justify-center h-1 mt-1">
          {hasExam && <div className="exam-dot" title="Exam Day" />}
          {hasStudySession && !hasExam && <div className="task-dot" title="Study Session" />}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 lg:p-6">
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileContent={getTileContent}
        className="mx-auto"
        next2Label={null} // Cleaner UI
        prev2Label={null} // Cleaner UI
      />
    </div>
  );
};

export default SmartCalendar;