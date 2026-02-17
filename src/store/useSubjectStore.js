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
        set({ subjects: updatedSubjects, tasks: updatedTasks });
      },

      deleteSubject: (id) => {
        const updatedSubjects = get().subjects.filter((s) => s.id !== id);
        const updatedTasks = generateSmartTasks(updatedSubjects); // Use the imported function
        set({ subjects: updatedSubjects, tasks: updatedTasks });
      },

      toggleTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map(t => 
            t.id === taskId ? { ...t, completed: !t.completed } : t
          )
        }));
      }
    }),
    {
      name: 'smart-planner-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);