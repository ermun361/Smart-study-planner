import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export const useSubjectStore = create((set, get) => ({
  // THE BRAIN'S MEMORY: Start with empty lists
  subjects: [],
  tasks: [],
  loading: false,

  // THE ACTION: "Go fetch my stuff from the cloud"
  fetchInitialData: async () => {
    // 1. TELL THE UI: "Hang on, I'm headed to the warehouse now."
    set({ loading: true });
    
    // 2. MULTITASK: Instead of going to the warehouse twice, 
    // we ask for both 'Subjects' and 'Tasks' at the same exact time.
    const [subjectResponse, taskResponse] = await Promise.all([
      supabase.from('subjects').select('*').order('created_at', { ascending: false }),
      supabase.from('tasks').select('*').order('date', { ascending: true })
    ]);

    // 3. CHECK THE BOXES: Did we get our data? If not, use an empty list.
    const freshSubjects = subjectResponse.data || [];
    const freshTasks = taskResponse.data || [];

    // 4. UNPACK: Take that data and put it into the brain's memory (the state).
    set({ 
      subjects: freshSubjects, 
      tasks: freshTasks, 
      
      // 5. FINISHED: "I'm back! You can stop showing the loading spinner now."
      loading: false 
    });
  },
}));