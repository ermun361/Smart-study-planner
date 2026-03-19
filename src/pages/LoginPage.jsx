import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Point this to your NEW Supabase store file
import { useAuthStore } from '../store/useSupabaseAuthStore'
import { Book, Mail, Lock, User } from 'lucide-react';

const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    // 2. Add state for the password
    const [password, setPassword] = useState('');
    // Optional: Add a loading state to show the user something is happening
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // 3. Get both login and signUp from the store
    const login = useAuthStore((state) => state.login);
    const signUp = useAuthStore((state) => state.signUp);
    const navigate = useNavigate();

    // 4. Make this function 'async' because database calls take time
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email.trim() || !password.trim()) {
          setErrorMessage('Please enter both email and password.');
          return;
        }

        if (isSignUp && !name.trim()) {
          setErrorMessage('Please enter your full name to create an account.');
          return;
        }

        setLoading(true);

        try {
            if (isSignUp) {
                // REAL SIGN UP
                await signUp(email, password, name);
                setErrorMessage('');
                alert("Account created! Check your email for verification (if enabled) or try logging in.");
                setIsSignUp(false); // Switch back to login view
                setPassword('');
            } else {
                // REAL LOGIN
                await login(email, password);
                navigate('/dashboard');
            }
        } catch (error) {
            // This will catch things like "Invalid password" or "User already exists"
            setErrorMessage(error?.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleModeToggle = () => {
      setIsSignUp(!isSignUp);
      setErrorMessage('');
      setPassword('');
    };

   return (
  <div className="min-h-screen bg-[#cbd5e1] dark:bg-slate-950 flex items-center justify-center px-6 transition-colors duration-500">
    <div className="bg-white dark:bg-gray-900 w-full max-w-md p-10 rounded-[3rem] shadow-2xl space-y-8 border dark:border-gray-800">
      
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-brandPurple rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg">
          <Book size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm px-4">
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
              value={name}
              className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-brandPurple/20 transition-all"
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
            value={email}
            autoComplete="email"
            className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-brandPurple/20 transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="password" 
            placeholder="Password" 
            required
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-brandPurple/20 transition-all"
          />
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-brandPurple text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Processing...' : (isSignUp ? 'Join Now' : 'Sign In')}
        </button>
      </form>

      <p className="text-center text-slate-400 dark:text-slate-500 text-sm font-medium">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span 
          onClick={handleModeToggle}
          className="text-brandPurple dark:text-indigo-400 cursor-pointer font-bold hover:underline"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </span>
      </p>
    </div>
  </div>
);
};

export default LoginPage;




































// import React, { useState } from 'react';
// import {useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/useAuthStore';
// import { Book, Mail, Lock, User } from 'lucide-react';

// const LoginPage = () => {
//     // Toggle between Login and Sign Up
//     const [isSignUp, setIsSignUp] = useState(false);
//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');

//     const login = useAuthStore((state) => state.login);
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Simulate Auth
//         const userData = {
//         email,
//         name: isSignUp ? name: email.split('@')[0],
//         };

//         const token = "secure-user-token-abc";

//         // Call Zustand store login
//         login(userData, token);

//         // Redirect after login
//          navigate('/dashboard');
//     };

//     return (
//     <div className="min-h-screen bg-[#cbd5e1] flex items-center justify-center px-6">
//       <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl space-y-8">
        
//         <div className="text-center space-y-2">
//           <div className="w-16 h-16 bg-[#5e5ce6] rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg">
//             <Book size={32} />
//           </div>
//           <h2 className="text-3xl font-bold text-slate-900">
//             {isSignUp ? 'Create Account' : 'Welcome Back'}
//           </h2>
//           <p className="text-slate-500 font-medium text-sm px-4">
//             {isSignUp ? 'Join Smart Planner to ace your exams' : 'Log in to your Smart Planner'}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {isSignUp && (
//             <div className="relative">
//               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//               <input 
//                 type="text" 
//                 placeholder="Full Name" 
//                 required
//                 className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none"
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//           )}

//           <div className="relative">
//             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//             <input 
//               type="email" 
//               placeholder="Email Address" 
//               required
//               className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="relative">
//             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//             <input 
//               type="password" 
//               placeholder="Password" 
//               required
//               className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none"
//             />
//           </div>

//           <button 
//             type="submit"
//             className="w-full bg-[#5e5ce6] text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-[#4d4bc4] transition-all active:scale-95"
//           >
//             {isSignUp ? 'Join Now' : 'Sign In'}
//           </button>
//         </form>

//         <p className="text-center text-slate-400 text-sm font-medium">
//           {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//           <span 
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="text-[#5e5ce6] cursor-pointer font-bold hover:underline"
//           >
//             {isSignUp ? 'Sign In' : 'Sign Up'}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };
// export default LoginPage;