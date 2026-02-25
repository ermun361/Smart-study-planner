import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generateSmartTasks } from '../utils/smartEngine';
import { addDays, format, parseISO, subDays, differenceInDays } from 'date-fns';


const DIFFICULTY_WEIGHTS = {
  Hard: 3,   // 1 task in a Hard subject = 3 points
  Medium: 2, // 1 task in a Medium subject = 2 points
  Easy: 1    // 1 task in an Easy subject = 1 point
};

export const useSubjectStore = create(
  persist(
    (set, get) => ({
      subjects: [],
      tasks: [],
      // --- ADD SUBJECT ---
      addSubject: (newSubject) => {
        const updatedSubjects = [...get().subjects, newSubject];
        set({
          subjects: updatedSubjects,
          tasks: generateSmartTasks(updatedSubjects)
        });
      },
       // --- DELETE SUBJECT ---
      deleteSubject: (id) => {
        const updatedSubjects = get().subjects.filter((s) => s.id !== id);
        set({
          subjects: updatedSubjects,
          tasks: generateSmartTasks(updatedSubjects)
        });
      },

      // --- UPDATE SUBJECT (e.g., Change Name or Difficulty) ---
      updateSubject: (id, updateData) => {
        const updatedSubjects = get().subjects.map((s) =>
          s.id === id ? { ...s, ...updateData } : s
        );
        // Regenerate tasks because data changed
        set({ subjects: updatedSubjects, tasks: generateSmartTasks(updatedSubjects) });
      },
      // --- SKIP TASK (Moves it to the next day) ---
      skipTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id === taskId) {
              const nextDay = addDays(parseISO(t.date), 1);
              return { ...t, date: format(nextDay, 'yyyy-MM-dd') };
            }
            return t;
          }),
        }));
      },
      // --- TOGGLE TASK (Mark as Done / Not Done) ---
      toggleTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        }));
      },

      getSubjectProgress: (subjectId) => {
        const { tasks } = get();
        
        // 1. FILTER: Only count study sessions, ignore the 'Exam' marker
        const subjectTasks = tasks.filter((t) => t.subjectId === subjectId && !t.isExam);
        
        if (subjectTasks.length === 0) return 0;

        // 2. MATH: How many of these STUDY tasks are done?
        const completed = subjectTasks.filter((t) => t.completed).length;
        
        return Math.round((completed / subjectTasks.length) * 100);
      },

      
      /**
       * UPDATED: GET TOTAL STATS (WEIGHTED)
       * Used for the main stats cards at the top of the Progress Page.
       */
      getStats: () => {
  const { tasks, subjects } = get();
  
  // 1. Filter out the Exam markers. We only care about study sessions for progress.
  const studyTasks = tasks.filter(t => !t.isExam);
  
  if (studyTasks.length === 0) {
    return { total: 0, completed: 0, percent: 0, streak: 0 };
  }

  let totalWeightedPoints = 0;
  let earnedWeightedPoints = 0;

  studyTasks.forEach((task) => {
    const parentSubject = subjects.find((s) => s.id === task.subjectId);
    
    // If the subject exists, get its weight. Otherwise, skip this task.
    if (parentSubject) {
      const weight = DIFFICULTY_WEIGHTS[parentSubject.difficulty] || 1;
      totalWeightedPoints += weight;

      if (task.completed) {
        earnedWeightedPoints += weight;
      }
    }
  });

  // Prevent division by zero
  const percent = totalWeightedPoints > 0 
    ? Math.round((earnedWeightedPoints / totalWeightedPoints) * 100) 
    : 0;

  // --- STREAK LOGIC (Keep your existing streak code here) ---
  const completedDates = [...new Set(
    tasks.filter(t => t.completed).map(t => t.date)
  )].sort((a, b) => b.localeCompare(a));
  
  let streak = 0;
  // ... (rest of your streak logic)

  return {
    total: studyTasks.length,
    completed: studyTasks.filter((t) => t.completed).length,
    percent: percent,
    streak: streak
  };
},
    }),
    {
      name: 'smart-planner-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);