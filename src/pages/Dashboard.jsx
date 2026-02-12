import React from "react";

const Dashboard = () => {
    return (
        <>
        {/* Quote Card */}
          <div className="w-full bg-white p-6 lg:p-10  rounded-3xl shadow-sm border border-gray-100 text-center mb-8">

            <h2 className="text-xl lg:text-2xl font-bold text-gray-800  leading-relaxed">
              "Success is the sum of small efforts, repeated day in and day out"
            </h2>

          </div>

          {/* ---  GRID APPROACH --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. CALENDAR */}
            <div className="lg:col-span-8 h-80 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
              Calendar Component (8 Columns Wide)
            </div>

            {/* 2. TODAY'S TASKS + ADD SUBJECT BUTTON  */}

            <div className="lg:col-span-4 lg:row-span-2 flex flex-col gap-8">
              <div className="h-[500px] bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
                Today's Tasks (Spanning 2 Rows)
              </div>
              
              <button className="w-full bg-brandPurple hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-brandPurple/20 transition-all active:scale-[0.98]">
                + Add Subject
              </button>
            </div>

            {/* 3. UPCOMING EXAMS */}
            <div className="lg:col-span-8 h-64 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-center text-gray-300 font-medium italic">
              Upcoming Exams (Under Calendar, Left Side)
            </div>

          </div>

        
        
        </>
    );
}

export default Dashboard;