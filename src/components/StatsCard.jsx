import React from 'react';
const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
        case "Hard": 
        return "text-red-500";
        case "Medium":
        return "text-orange-500";
        case "Easy":
        return "text-green-500";
    }
};

const SubjectProgressBar = ({
  name = "Untitled Subject",
  difficulty = "Medium",
  progress = 0,
}) => {
    const safeProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="group space-y-2">
      {/* Header Section */}
      <div className="flex justify-between items-end px-1">
        <div>
          <h4 className="font-bold text-gray-800 uppercase text-sm tracking-tight transition-colors group-hover:text-brandPurple">
            {name}
          </h4>

          <p
            className={`text-[10px] font-bold uppercase tracking-widest ${getDifficultyColor(
              difficulty
            )}`}
          >
            {difficulty} Priority
          </p>
        </div>

        <span className="text-sm font-black text-brandPurple">
          {safeProgress}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner border border-gray-50">
        <div
          className="h-full bg-gradient-to-r from-brandPurple to-indigo-400 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default SubjectProgressBar;