import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generateSmartTasks } from '../utils/smartEngine';
import { addDays, format, parseISO } from 'date-fns';

export const useSubjectStore = create(
  persist(
    (set, get) => ({
      subjects: [],
      tasks: [],

      addSubject: (newSubject) => {
        const updatedSubjects = [...get().subjects, newSubject];
        set({
          subjects: updatedSubjects,
          tasks: generateSmartTasks(updatedSubjects)
        });
      },

      deleteSubject: (id) => {
        const updatedSubjects = get().subjects.filter((s) => s.id !== id);
        set({
          subjects: updatedSubjects,
          tasks: generateSmartTasks(updatedSubjects)
        });
      },

      // --- FIXED: updateSubject now has closing brace and correct variable name ---
      updateSubject: (id, updateData) => {
        const updatedSubjects = get().subjects.map((s) =>
          s.id === id ? { ...s, ...updateData } : s
        );
        // Regenerate tasks because data changed
        set({ subjects: updatedSubjects, tasks: generateSmartTasks(updatedSubjects) });
      }, // <--- This was missing!

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

      toggleTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        }));
      },

      // --- FIXED: Cleaned up formatting ---
      getStats: () => {
        const { tasks } = get();
        if (tasks.length === 0) return { total: 0, completed: 0, percent: 0 };

        const completed = tasks.filter((t) => t.completed).length;
        const total = tasks.length;
        const percent = Math.round((completed / total) * 100);

        return { total, completed, percent };
      },
    }),
    {
      name: 'smart-planner-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);