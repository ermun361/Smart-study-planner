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

  // Add this inside the store from Stage 1
  addSubject: async (newSubjectData) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // 1. Tell the Database: "Hey, save this new subject for me."
    const { data: savedSubject, error: subError } = await supabase
      .from('subjects')
      .insert([{ ...newSubjectData, user_id: user.id }])
      .select().single();

    if (subError) throw subError;

    // 2. Tell the Smart Engine: "Now that we have a real subject, plan some tasks for it."
    const newTasks = generateSmartTasks([savedSubject]);

    // 3. Tell the Database: "Now save all those planned tasks too."
    const { data: savedTasks, error: taskError } = await supabase
      .from('tasks')
      .insert(newTasks.map(t => ({ ...t, user_id: user.id, subject_id: savedSubject.id })))
      .select();

    if (taskError) throw taskError;

    // 4. Update the App: "Everything is saved in the cloud, show it on the screen now."
    set((state) => ({
      subjects: [savedSubject, ...state.subjects],
      tasks: [...state.tasks, ...savedTasks]
    }));
  },
 
}));
