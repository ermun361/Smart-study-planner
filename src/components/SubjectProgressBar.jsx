import React from 'react';

const SubjectProgressBar = ({name, difficulty, progress}) => {
    return (
        <div className="group">
      <div className="flex justify-between items-end mb-3 px-1">
        <div>
          <h4 className="text-lg font-bold text-gray-800 group-hover:text-brandPurple transition-colors">
            {name}
          </h4>
          <p className={`text-[10px] font-black uppercase tracking-widest ${
            difficulty === 'Hard' ? 'text-red-500' :
            difficulty === 'Medium' ? 'text-orange-500' :
            'text-green-500'
          }`}>
            {difficulty} Priority
          </p>
        </div>

        <span className="text-sm font-black text-brandPurple">
          {progress}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner border border-gray-50">
        <div
          className="h-full bg-gradient-to-r from-brandPurple to-indigo-400 rounded-full transition-all duration-1000 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
   );
};

export default SubjectProgressBar;