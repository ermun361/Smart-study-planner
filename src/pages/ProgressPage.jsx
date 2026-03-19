import React from 'react';
// import { useSubjectStore } from '../store/useSubjectStore';
import { useSubjectStore } from '../store/useSupabaseSubjectStore';
import { TrendingUp, CheckCircle2, Award, BookOpen, PlusCircle } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import SubjectProgressBar from '../components/SubjectProgressBar';

const ProgressPage = () => {
  const { subjects, getStats, getSubjectProgress } = useSubjectStore();
  const stats = getStats();

 return (
  <div className="max-w-6xl mx-auto pb-20 px-4 transition-colors">
    
    {/* 1. PAGE HEADER */}
    <div className="mb-10 pt-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
        Your Progress
      </h1>
      <p className="text-gray-500 dark:text-gray-400 font-medium">
        Real-time weighted analytics of your study performance.
      </p>
    </div>

    {/* 2. STATS OVERVIEW */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <StatsCard
        title="Weighted Progress" 
        value={`${stats.percent}%`}
        icon={<TrendingUp size={32} />}
        // If StatsCard supports custom classes, add dark:bg-indigo-900/20
        bgColor="bg-indigo-50 dark:bg-indigo-900/20"
        iconColor="text-brandPurple dark:text-indigo-400"
      />
      <StatsCard
        title="Tasks Done"
        value={stats.completed}
        icon={<CheckCircle2 size={32} />}
        bgColor="bg-green-50 dark:bg-green-900/20"
        iconColor="text-green-500 dark:text-green-400"
      />
      <StatsCard
        title="Study Streak"
        value="2 Days"
        icon={<Award size={32} />}
        bgColor="bg-orange-50 dark:bg-orange-900/20"
        iconColor="text-orange-500 dark:text-orange-400"
      />
    </div>

    {/* 3. SUBJECT BREAKDOWN CONTAINER  */}
    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg text-brandPurple dark:text-indigo-300">
          <BookOpen size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
          Subject Completion
        </h3>
      </div>

      <div className="space-y-10">
        {subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-gray-700">
            <PlusCircle className="text-gray-300 dark:text-gray-600 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xs uppercase text-[10px] tracking-widest font-black">
              No subjects found.
            </p>
          </div>
        ) : (
          subjects.map(subject => (
            <SubjectProgressBar
              key={subject.id}
              name={subject.name}
              difficulty={subject.difficulty}
              progress={getSubjectProgress(subject.id)}
              // Ensure SubjectProgressBar has internal dark:text-white logic!
            />
          ))
        )}
      </div>
    </div>
  </div>
);
};

export default ProgressPage;