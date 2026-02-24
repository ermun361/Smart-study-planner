import React from 'react';

const StatsCard = ({ title, value, icon, bgColor, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02]">
      {/* Icon Circle */}
      <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
      
      {/* Text Content */}
      <div>
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-800">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatsCard;