import React from 'react';
import { Book } from 'lucide-react';


const LandingPage = () => {
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
            <main className="max-w-7xl mx-auto px-8 pt-20">
                <p>Content goes here...</p>
            </main>
            
        </div>
    );
};

export default LandingPage;