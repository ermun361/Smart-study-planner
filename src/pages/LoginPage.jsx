import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    

    // pull login action from store
    const login = useAuthStore((state) => state.login);

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple fake login logic
        const userData = {
        email,
        name: email.split('@')[0],
        };

        const token = "secure-user-token-abc";

        // Call Zustand store login
        login(userData, token);

        // Redirect after login
         navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#cbd5e1] flex items-center justify-center">
            <form
             onSubmit={handleLogin}
             className="bg-white p-8 rounded-2xl shadow-lg space-y-6 w-80"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white p-3 rounded-lg font-bold hover:bg-indigo-600 transition"
                >
                  Login  
                </button>
                
            </form>
        </div>
    )
}
export default LoginPage;