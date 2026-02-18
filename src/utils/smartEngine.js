import { addDays, differenceInDays, startOfDay, format, parseISO } from 'date-fns';

// src/utils/smartEngine.js

export const generateSmartTasks = (subjects) => {
  let allTasks = [];
  const today = startOfDay(new Date());
  const difficultyMap = { 'Hard': 6, 'Medium': 4, 'Easy': 2 };

  subjects.forEach((subject) => {
    const examDate = startOfDay(parseISO(subject.examDate));
    const daysUntil = differenceInDays(examDate, today);
    const sessionsNeeded = difficultyMap[subject.difficulty] || 3;

    // We use this set to keep track of dates we already used for THIS subject
    const usedDates = new Set();

    for (let i = 0; i < sessionsNeeded; i++) {
      let dayOffset = Math.floor((daysUntil / sessionsNeeded) * i);
      
      // --- THE "ANTI-REPEAT" LOGIC ---
      // If this date is already taken for this subject, try the next day
      let scheduledDate = addDays(today, dayOffset);
      let dateStr = format(scheduledDate, 'yyyy-MM-dd');

      while (usedDates.has(dateStr) && dayOffset < daysUntil) {
        dayOffset++;
        scheduledDate = addDays(today, dayOffset);
        dateStr = format(scheduledDate, 'yyyy-MM-dd');
      }

      if (dayOffset < daysUntil && dayOffset >= 0) {
        allTasks.push({
          id: `task-${subject.id}-${i}`,
          subjectId: subject.id,
          title: `Review: ${subject.name}`, // You could add `(Part ${i+1})` if you want
          date: dateStr,
          completed: false,
          difficulty: subject.difficulty,
          color: subject.color || '#6366f1'
        });
        usedDates.add(dateStr); // Mark this date as "taken"
      }
    }

    // Add the Exam (Exams can happen on the same day as a final review)
    allTasks.push({
      id: `exam-${subject.id}`,
      subjectId: subject.id,
      title: `🚩 ${subject.name} EXAM`,
      date: subject.examDate,
      completed: false,
      isExam: true
    });
  });

  return allTasks;
};