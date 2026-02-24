import React from 'react';
import { useSubjectStore } from '../store/useSubjectStore';
import { TrendingUp, CheckCircle2, Award, BookOpen, PlusCircle } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import SubjectProgressBar from '../components/SubjectProgressBar';

const ProgressPage = () => {
  // 1. Pull logic from the store
  const { subjects, getStats, getSubjectProgress } = useSubjectStore();
  
  // 2. Get the weighted stats
  const stats = getStats();

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      
      {/* --- PAGE HEADER --- */}
      <div className="mb-10 pt-4">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Your Progress
        </h1>
        <p className="text-gray-500 font-medium">
          Real-time weighted analytics of your study performance.
        </p>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatsCard
          title="Weighted Progress" 
          value={`${stats.percent}%`}
          icon={<TrendingUp size={32} />}
          bgColor="bg-indigo-50"
          iconColor="text-brandPurple"
        />
        <StatsCard
          title="Tasks Done"
          value={stats.completed}
          icon={<CheckCircle2 size={32} />}
          bgColor="bg-green-50"
          iconColor="text-green-500"
        />
        <StatsCard
          title="Study Streak"
          value="4 Days" // This could be dynamic later
          icon={<Award size={32} />}
          bgColor="bg-orange-50"
          iconColor="text-orange-500"
        />
      </div>

      {/* --- SUBJECT BREAKDOWN CONTAINER --- */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-sm border border-gray-100">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-indigo-100 rounded-lg text-brandPurple">
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            Subject Completion
          </h3>
        </div>

        {/* --- SUBJECT LIST --- */}
        <div className="space-y-10">
          {subjects.length === 0 ? (
            // Empty State (Matches the vibe of SubjectsPage)
            <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
              <PlusCircle className="text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-medium max-w-xs">
                No subjects found. Add a subject in the "My Subjects" tab to start tracking progress.
              </p>
            </div>
          ) : (
            // List of Progress Bars
            subjects.map(subject => (
              <SubjectProgressBar
                key={subject.id}
                name={subject.name}
                difficulty={subject.difficulty}
                // Call the store function directly for each ID
                progress={getSubjectProgress(subject.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;