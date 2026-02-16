import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSubjectStore = create(
  persist(
    (set) => ({
      subjects: [],

      addSubject: (newSubject) => 
        set((state) => ({ 
          subjects: [...state.subjects, newSubject] 
        })),

      deleteSubject: (id) => 
        set((state) => ({ 
          subjects: state.subjects.filter((s) => s.id !== id) 
        })),
    }),
    {
      name: 'smart-planner-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);