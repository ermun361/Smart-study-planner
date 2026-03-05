import { addDays, differenceInDays, startOfDay, format, parseISO } from 'date-fns';

export const generateSmartTasks = (subjects) => {
  let allTasks = [];
  const today = startOfDay(new Date());

  subjects.forEach((subject) => {
    const examDate = startOfDay(parseISO(subject.examDate));
    const daysUntil = differenceInDays(examDate, today);

    // --- 1. 4-2-1 INTENSITY LOGIC ---
    let sessionsPerDay = 1;
    let interval = 1; // By default, study every day

    if (subject.difficulty === 'Hard') {
      sessionsPerDay = 4; // 4 Sessions every day
    } else if (subject.difficulty === 'Medium') {
      sessionsPerDay = 2; // 2 Sessions every day
    } else {
      sessionsPerDay = 1; // 1 Session every day
      interval = 2;       
    }

    // --- 2. GENERATE TASKS ---
    for (let dayOffset = 0; dayOffset < daysUntil; dayOffset++) {
      if (dayOffset % interval === 0) {
        for (let i = 0; i < sessionsPerDay; i++) {
          const scheduledDate = addDays(today, dayOffset);
          const dateStr = format(scheduledDate, 'yyyy-MM-dd');

          allTasks.push({
            id: `task-${subject.id}-${dayOffset}-${i}`,
            subjectId: subject.id,
            subjectName: subject.name,
            title: `Review: ${subject.name} (${i + 1}/ ${sessionsPerDay})`,
            date: dateStr,
            completed: false,
            difficulty: subject.difficulty,
            color: subject.color || '#6366f1'
          });
        }
      }
    }

    allTasks.push({
      id: `exam-${subject.id}`,
      subjectId: subject.id,
      title: `🚩 ${subject.name} EXAM`,
      date: subject.examDate,
      completed: false,
      isExam: true
    });
  });

  return allTasks.sort((a, b) => a.date.localeCompare(b.date));
};