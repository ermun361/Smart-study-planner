import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generateSmartTasks } from '../utils/smartEngine';

export const useSubjectStore = create(
  persist(
    (set, get) => ({
      subjects: [],
      tasks: [],

      addSubject: (newSubject) => {
        const updatedSubjects = [...get().subjects, newSubject];
        const updatedTasks = generateSmartTasks(updatedSubjects); // Use the imported function
        set({ 
          subjects: updatedSubjects,
           tasks: updatedTasks 
          });
      },

      deleteSubject: (id) => {
        const updatedSubjects = get().subjects.filter((s) => s.id !== id);
        const updatedTasks = generateSmartTasks(updatedSubjects); // Use the imported function
        set({ 
          subjects: updatedSubjects,
           tasks: updatedTasks 
          });
      },

      toggleTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map(t => 
            t.id === taskId ? { ...t, completed: !t.completed }
             : t
          )
        }));
      },

      // Inside your useSubjectStore.js actions:
      skipTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map(t => {
            if (t.id === taskId) {
              // Add 1 day to the existing task date
              const currentDate = new Date(t.date);
              const nextDay = new Date(currentDate);
              nextDay.setDate(currentDate.getDate() + 1);
              
              return { 
                ...t, 
                date: nextDay.toISOString().split('T')[0],
                isSkipped: true // Optional: track if it was skipped
              };
            }
            return t;
          })
        }));
      },
    }),
    {
      name: 'smart-planner-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);