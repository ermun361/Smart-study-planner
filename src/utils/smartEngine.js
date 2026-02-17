import { addDays, differenceInDays, startOfDay, format, parseISO } from 'date-fns';

export const generateSmartTasks = (subjects) => {
  let allTasks = [];
  const today = startOfDay(new Date());
  const difficultyMap = { 'Hard': 6, 'Medium': 4, 'Easy': 2 };

  subjects.forEach((subject) => {
    const examDate = startOfDay(parseISO(subject.examDate));
    const daysUntil = differenceInDays(examDate, today);
    const sessionsNeeded = difficultyMap[subject.difficulty] || 3;

    for (let i = 0; i < sessionsNeeded; i++) {
      const dayOffset = Math.floor((daysUntil / sessionsNeeded) * i);
      if (dayOffset < daysUntil && dayOffset >= 0) {
        allTasks.push({
          id: `task-${subject.id}-${i}`,
          subjectId: subject.id,
          title: `Review: ${subject.name}`,
          date: format(addDays(today, dayOffset), 'yyyy-MM-dd'),
          completed: false,
          difficulty: subject.difficulty,
          color: subject.color || '#6366f1'
        });
      }
    }
    // Add the Exam here
    allTasks.push({
      id: `exam-${subject.id}`,
      subjectId: subject.id,
      title: ` ${subject.name} EXAM`,
      date: subject.examDate,
      completed: false,
      isExam: true
    });
  });

  return allTasks;
};