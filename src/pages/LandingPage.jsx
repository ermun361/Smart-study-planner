import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Book, LayoutDashboard, BookOpen, BarChart3, 
  Settings, CheckCircle2, Circle, LogOut, Search, ChevronLeft, ChevronRight, Share2
} from 'lucide-react';

const LandingPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative font-sans selection:bg-indigo-100">
      
      {/*  BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-50/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none" />

      {/* --- NAVBAR --- */}
      <nav className="relative z-30 flex items-center justify-between px-6 lg:px-16 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6D69AC] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Book size={22} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 uppercase">
            Smart Planner
          </span>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="bg-white px-8 py-2 rounded-xl font-bold text-slate-700 border border-slate-200 shadow-sm hover:shadow-md transition-all"
        >
          Login
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-20 max-w-7xl mx-auto px-6 lg:px-16 pt-10 lg:pt-20 flex flex-col lg:flex-row items-center gap-16">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <h1 className="text-5xl lg:text-8xl font-black text-slate-950 leading-[1.1] tracking-tighter">
            Smart Study <br /> 
            <span className="text-[#6D69AC]">Planner</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-500 font-medium max-w-lg mx-auto lg:mx-0">
            Plan your studies intelligently, track your progress, and stay on track with ease.
          </p>
          <button 
            onClick={handleStartClick}
            className="bg-[#6D69AC] hover:bg-[#5a56a0] text-white text-xl font-bold px-12 py-5 rounded-2xl shadow-2xl shadow-indigo-300 transition-all hover:translate-y-[-4px] active:scale-95"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </button>
        </div>

        {/* THE MOCKUP  */}
        <div className="flex-1 w-full flex justify-center lg:justify-end perspective-1000 group">
          <div className="relative w-full max-w-[340px] md:max-w-[550px] lg:max-w-[800px] bg-white rounded-[2rem] lg:rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] border border-slate-100 flex h-[280px] md:h-[400px] lg:h-[520px] overflow-hidden transform lg:rotate-y-[-15deg] lg:rotate-x-[8deg] transition-all duration-700 hover:rotate-0 hover:scale-[1.02] cursor-pointer">
            
            {/* 1. SIDEBAR MOCKUP */}
            <div className="w-16 md:w-28 lg:w-48 bg-[#6D69AC] p-3 lg:p-7 flex flex-col justify-between shrink-0">
               <div className="space-y-4 lg:space-y-10">
                  <div className="flex items-center gap-2 mb-4 lg:mb-8">
                    <div className="w-6 h-6 lg:w-10 lg:h-10 bg-white/20 rounded-lg flex items-center justify-center text-white"><Book size={18}/></div>
                    <div className="hidden lg:block w-20 h-3 bg-white/20 rounded-full" />
                  </div>
                  <div className="space-y-3 lg:space-y-6">
                     <div className="flex items-center gap-3 text-white"><LayoutDashboard size={18} /> <span className="hidden lg:block text-[10px] font-black uppercase opacity-90 tracking-widest">Dashboard</span></div>
                     <div className="flex items-center gap-3 text-white/50"><BookOpen size={18} /> <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Subjects</span></div>
                     <div className="flex items-center gap-3 text-white/50"><BarChart3 size={18} /> <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Progress</span></div>
                  </div>
               </div>
               <div className="flex items-center gap-3 text-white/40"><LogOut size={18}/><span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Log out</span></div>
            </div>

            {/* 2. MAIN CONTENT MOCKUP */}
            <div className="flex-1 bg-[#fcfcfd] p-4 lg:p-10 flex flex-col overflow-hidden">
               {/* Top Bar */}
               <div className="flex justify-between items-center mb-6 lg:mb-10">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Dashboard</span>
                  <div className="flex items-center gap-3">
                     <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white shadow-sm border border-slate-100 rounded-full text-[10px] font-bold text-slate-400"><Share2 size={12}/> Progress</div>
                     <div className="w-8 h-8 lg:w-12 lg:h-12 bg-slate-200 rounded-full border-4 border-white shadow-sm overflow-hidden"><img src="https://i.pravatar.cc/100" alt="u"/></div>
                  </div>
               </div>

               {/* Mock Content Layout */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 flex-1">
                  <div className="lg:col-span-7 space-y-6">
                     {/* Real Quote Card */}
                     <div className="bg-white p-5 lg:p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                          <p className="text-[11px] lg:text-sm font-bold text-slate-800 italic leading-snug">
                            "Success is the sum of small efforts, repeated day in and day out."
                          </p>
                          <p className="text-[8px] lg:text-[10px] text-slate-400 font-bold uppercase mt-3 tracking-widest">— Daily Fuel</p>
                        </div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full blur-2xl -mr-12 -mt-12" />
                     </div>

                     {/* Real Calendar Mini */}
                     <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-6 px-1">
                           <div className="text-[10px] lg:text-xs font-black text-slate-800">April 2026</div>
                           <div className="flex gap-2 text-slate-300"> <ChevronLeft size={14}/> <ChevronRight size={14}/> </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 lg:gap-3 text-center">
                           {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-[8px] font-black text-slate-200">{d}</span>)}
                           {[...Array(28)].map((_, i) => (
                              <div key={i} className={`h-4 w-4 lg:h-8 lg:w-8 flex items-center justify-center text-[8px] lg:text-[10px] font-bold rounded-xl transition-all ${i === 12 ? 'bg-[#6D69AC] text-white shadow-lg shadow-indigo-200' : 'text-slate-300 hover:bg-slate-50'}`}>
                                 {i + 1}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Real Tasks Mini */}
                  <div className="hidden lg:block lg:col-span-5 space-y-4">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Today's Tasks</p>
                     {[
                       {n: "Study Math - Chp 5", c: true},
                       {n: "Review History", c: false},
                       {n: "Biology Revision", c: false}
                     ].map((t, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                           <div className="flex items-center gap-3 min-w-0">
                              {t.c ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-slate-100" />}
                              <span className={`text-[10px] font-bold truncate ${t.c ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{t.n}</span>
                           </div>
                           {!t.c && <div className="px-2 py-1 bg-slate-50 text-[8px] font-bold rounded-lg text-slate-400">Skip</div>}
                        </div>
                     ))}
                     
                     {/* Upcoming Exam */}
                     <div className="mt-6 bg-[#6D69AC]/5 p-4 rounded-2xl border border-[#6D69AC]/10">
                        <span className="text-[9px] font-black text-[#6D69AC] uppercase tracking-widest">Upcoming Exam</span>
                        <div className="flex justify-between items-center mt-2">
                           <span className="text-[10px] font-bold text-slate-700">Physics Final</span>
                           <Search size={14} className="text-[#6D69AC] opacity-50"/>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- MOBILE REPLICATOR */}
      <style>{`
        @media (max-width: 1024px) {
          main { flex-direction: column !important; }
          .perspective-1000 { order: 2; margin-top: 40px; justify-content: center !important; }
          .lg\\:rotate-y-\\[-15deg\\] { transform: rotate(0deg) !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;