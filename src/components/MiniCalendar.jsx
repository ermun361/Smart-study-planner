import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MiniCalendar = ({ size = "small" }) => (
  <div className={`bg-white rounded-[2rem] shadow-sm p-4 ${size === 'large' ? 'p-8 max-w-sm mx-auto' : ''}`}>
    <div className="flex items-center justify-between mb-4 px-2">
      <ChevronLeft size={size === 'large' ? 24 : 14} className="text-slate-400" />
      <span className="font-bold">February 2026</span>
      <ChevronRight size={size === 'large' ? 24 : 14} className="text-slate-400" />
    </div>
  </div>
);

export default MiniCalendar;