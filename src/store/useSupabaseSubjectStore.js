import { create } from 'zustand';
import { supabase } from './supabaseClient'; 
import { generateSmartTasks } from '../utils/smartEngine'; 
import { addDays, format, parseISO } from 'date-fns';

const DIFFICULTY_WEIGHTS = {
  Hard: 3,
  Medium: 2,
  Easy: 1
};

export const useSubjectStore = create((set, get) => ({
  subjects: [],
  tasks: [],
  loading: false,

  fetchInitialData: async () => {
    set({ loading: true });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return set({ loading: false });

    const [subRes, taskRes] = await Promise.all([
      supabase.from('subjects').select('*').order('created_at', { ascending: false }),
      supabase.from('tasks').select('*').order('date', { ascending: true })
    ]);

    const mappedSubjects = (subRes.data || []).map(s => ({
      ...s,
      examDate: s.exam_date,
      // FORCE ID TO STRING
      id: String(s.id) 
    }));

    const mappedTasks = (taskRes.data || []).map(t => ({
      ...t,
      date: t.date,
      isExam: t.is_exam, 
      id: t.id.toString(),
      subjectId: String(t.subject_id), 
      name: t.name || t.title 
    }));

    set({ subjects: mappedSubjects, tasks: mappedTasks, loading: false });
  },

  addSubject: async (newSubjectData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: savedSubject, error: subError } = await supabase
      .from('subjects')
      .insert([{ 
        name: newSubjectData.name,
        difficulty: newSubjectData.difficulty,
        exam_date: newSubjectData.examDate, 
        color: newSubjectData.color || '#5e5ce6',
        user_id: user.id 
      }])
      .select().single();

    if (subError) throw subError;

    // Translation for the Smart Engine
    const subjectForEngine = { 
        ...savedSubject, 
        examDate: savedSubject.exam_date, 
        id: String(savedSubject.id) 
    };
    
    const newTasks = generateSmartTasks([subjectForEngine]);

    const { data: savedTasks, error: taskError } = await supabase
      .from('tasks')
      .insert(newTasks.map(t => ({
        name: t.name || t.title || "Study Session",
        date: t.date,
        is_exam: t.isExam || false,
        subject_id: savedSubject.id,
        user_id: user.id
      })))
      .select();

    if (taskError) throw taskError;

    const finalSubject = { ...savedSubject, examDate: savedSubject.exam_date, id: String(savedSubject.id) };
    const finalTasks = (savedTasks || []).map(t => ({ 
        ...t, 
        subjectId: String(t.subject_id), 
        isExam: t.is_exam,
        name: t.name || t.title,
        id: String(t.id)
    }));

    set((state) => ({
      subjects: [finalSubject, ...state.subjects],
      tasks: [...state.tasks, ...finalTasks]
    }));
  },


  // --- 3. DAILY ACTIONS ---
  toggleTask: async (taskId) => {
    const task = get().tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', taskId);

    if (!error) {
      set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      }));
    }
  },

   updateSubject: async (id, updateData) => {
    const { error } = await supabase
      .from('subjects')
      .update({
        name: updateData.name,
        exam_date: updateData.examDate,
        difficulty: updateData.difficulty
      })
      .eq('id', id);

    if (!error) {
      set((state) => ({
        subjects: state.subjects.map(s => s.id === id ? { ...s, ...updateData } : s)
      }));
    } else {
      alert("Update failed: " + error.message);
    }
  },

  skipTask: async (taskId) => {
    const task = get().tasks.find(t => t.id === taskId);
    if (!task) return;

    const nextDay = addDays(parseISO(task.date), 1);
    const formattedDate = format(nextDay, 'yyyy-MM-dd');

    const { error } = await supabase
      .from('tasks')
      .update({ date: formattedDate, completed: false })
      .eq('id', taskId);

    if (!error) {
      set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, date: formattedDate, completed: false } : t)
      }));
    }
  },

  deleteSubject: async (id) => {
    const { error } = await supabase.from('subjects').delete().eq('id', id);
    if (!error) {
      set((state) => ({
        subjects: state.subjects.filter(s => s.id !== id),
        tasks: state.tasks.filter(t => t.subjectId !== id && t.subject_id !== id)
      }));
    }
  },

  // --- 4. ANALYTICS (Logic for your Progress Charts & Points) ---
  getSubjectProgress: (subjectId) => {
    const { tasks } = get();
    const subjectTasks = tasks.filter((t) => (t.subjectId === subjectId || t.subject_id === subjectId) && !t.isExam);
    if (subjectTasks.length === 0) return 0;
    const completed = subjectTasks.filter((t) => t.completed).length;
    return Math.round((completed / subjectTasks.length) * 100);
  },

  getStats: () => {
    const { tasks, subjects } = get();
    const studyTasks = tasks.filter(t => !t.isExam);
    if (studyTasks.length === 0) return { total: 0, completed: 0, percent: 0, streak: 0 };

    let totalPoints = 0;
    let earnedPoints = 0;

    studyTasks.forEach((task) => {
      const parent = subjects.find((s) => s.id === task.subjectId || s.id === task.subject_id);
      if (parent) {
        const weight = DIFFICULTY_WEIGHTS[parent.difficulty] || 1;
        totalPoints += weight;
        if (task.completed) earnedPoints += weight;
      }
    });


    return {
      total: studyTasks.length,
      completed: studyTasks.filter(t => t.completed).length,
      percent: totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0,
      streak: [...new Set(tasks.filter(t => t.completed).map(t => t.date))].length
    };
  }
}));