import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Book, Mail, Lock, User } from 'lucide-react';

const LoginPage = () => {
    // Toggle between Login and Sign Up
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate Auth
        const userData = {
        email,
        name: isSignUp ? name: email.split('@')[0],
        };

        const token = "secure-user-token-abc";

        // Call Zustand store login
        login(userData, token);

        // Redirect after login
         navigate('/dashboard');
    };

    return (
    <div className="min-h-screen bg-[#cbd5e1] flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl space-y-8">
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#5e5ce6] rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg">
            <Book size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 font-medium text-sm px-4">
            {isSignUp ? 'Join Smart Planner to ace your exams' : 'Log in to your Smart Planner'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#5e5ce6] text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-[#4d4bc4] transition-all active:scale-95"
          >
            {isSignUp ? 'Join Now' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm font-medium">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#5e5ce6] cursor-pointer font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;