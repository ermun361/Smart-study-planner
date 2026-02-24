import React from 'react';
import { Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MiniCalendar from '../components/MiniCalendar';




const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#cbd5e1] text-slate-900">
            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#5e5ce6] rounded-xl flex items-center justify-center text-white">
                        <Book size={22}/>
                    </div>
                    <span className="font-bold text-xl">Smart Planner</span>
                </div>
                <button className="bg-slate-400/40 px-8 py-2 rounded-xl font-bold">Login</button>
            </nav>
            <main className="max-w-7xl mx-auto px-8 pt-12 grid lg:grid-cols-2 items-center">
                <div className="space-y-8">
                    <h1 className="text-6xl md:text-8xl font-bold text-slate-950 leading-[0.9] tracking-tighter">
                        Smart Study <br /> Planner
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-700 font-medium">
                        Plan your studies intelligently and stay on track.
                    </p>
                    <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-[#5e5ce6] text-white text-2xl font-bold px-12 py-5 rounded-3xl shadow-2xl">
                        Get Started
                    </button>
                </div>

                <MiniCalendar />
            </main>
            
        </div>
    );
};

export default LandingPage;