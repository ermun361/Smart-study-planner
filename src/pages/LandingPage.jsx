import React from 'react';
import { Book } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();

     const handleStartClick = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };
    return (
        <div className="min-h-screen bg-[#cbd5e1] text-slate-900">
            {/*1. Navbar */}
            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#5e5ce6] rounded-xl flex items-center justify-center text-white">
                        <Book size={22}/>
                    </div>
                    <span className="font-bold text-xl">Smart Planner</span>
                </div>

                {/* Navbar Auth Toggle */}
                <button 
                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                    className="bg-slate-400/30 px-8 py-2 rounded-xl font-bold">
                    {isAuthenticated ? 'Dashboard' : 'Login'}
                </button>
            </nav>


            {/*2. Main Content */}
            <main className="max-w-7xl mx-auto px-8 pt-12 grid lg:grid-cols-2 items-center">
                <div className="space-y-8 text-left">
                    <h1 className="text-6xl md:text-8xl font-bold text-slate-950 leading-[0.9] tracking-tighter">
                        Smart Study <br /> Planner
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-700 font-medium">
                        Plan your studies intelligently and stay on track.
                    </p>
                    <button 
                    onClick={handleStartClick}
                        className="bg-[#5e5ce6] hover:bg-[#4d4bc4] text-white text-2xl font-bold px-12 py-5 rounded-3xl shadow-2xl transition-all active:scale-95 w-full md:w-auto">
                        {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                    </button>
                </div>

                <div className="scale-90 lg:scale-100 lg:-rotate-6 bg-white p-3 rounded-[3rem] shadow-2xl border-2 border-white/50 transition-all duration-700 hover:rotate-0">
                    <img 
                    src="src\assets\Images\Screenshot 2026-02-24 122705.png"
                     alt="dashboard mock up"
                     className="rounded-[2rem] w-full h-auto object-cover"
                    />
                </div> 
            </main>
            
        </div>
    );
};

export default LandingPage;