import React, { useState } from 'react';
import { useAuthStore } from '../store/useSupabaseAuthStore'; 
import { User, Mail, Save, CheckCircle, AlertCircle, Loader2, Camera, Moon, Sun } from 'lucide-react';

const SettingsPage = () => {
  const { user, updateProfile, uploadAvatar, error, toggleTheme, isLoading, } = useAuthStore();

  // Local state for the form input
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const result = await updateProfile({ fullName });

    if (result.success) {
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const result = await uploadAvatar(file);
      if (result.success) {
        setSuccessMessage("Avatar updated successfully!");
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  return (
  <div className="flex flex-col h-full max-w-4xl mx-auto px-4 pb-10">
    {/* --- HEADER --- */}
    <div className="flex items-center gap-3 mb-8 bg-gray-100/50 p-4 rounded-2xl">
      <div className="p-2 bg-indigo-100 rounded-lg text-brandPurple">
        <User size={24} />
      </div>
      <h1 className="text-xl font-bold text-gray-800 tracking-tight dark:text-white">Account Settings</h1>
    </div>

    {/* --- CONTENT CARD --- */}
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-[2rem] shadow-sm border border-gray-100 p-8 transition-colors duration-300">
      
      {/* --- 1. PROFILE PICTURE SECTION --- */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full bg-indigo-50 dark:bg-gray-700 flex items-center justify-center text-brandPurple dark:text-indigo-400 text-4xl font-black border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              user?.user_metadata?.full_name?.charAt(0).toUpperCase() || "U"
            )}
          </div>
          <label className="absolute bottom-1 right-1 p-2 bg-brandPurple text-white rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 transition-all border-2 border-white dark:border-gray-800 active:scale-90">
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
          </label>
        </div>
        <p className="text-[10px] text-gray-400 mt-3 uppercase font-black tracking-[0.2em]">
          {isLoading ? "Uploading..." : "Click icon to change photo"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* FULL NAME */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 dark:text-gray-400 px-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandPurple/20 transition-all text-gray-700 dark:text-gray-200 font-medium"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 dark:text-gray-400 px-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600" size={18} />
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl text-gray-400 dark:text-gray-600 cursor-not-allowed font-medium"
            />
          </div>
        </div>
        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
          <label className="text-sm font-bold text-gray-600 dark:text-gray-400 px-1 mb-4 block">Appearance</label>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${user?.user_metadata?.dark_mode ? 'bg-indigo-900 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>
                {user?.user_metadata?.dark_mode ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Dark Mode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Easier on the eyes at night</p>
              </div>
            </div>

            {/* Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                user?.user_metadata?.dark_mode ? 'bg-brandPurple' : 'bg-gray-300'
              }`}
            >
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                user?.user_metadata?.dark_mode ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="min-h-[20px]">
          {successMessage && (
            <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl text-sm font-bold animate-in fade-in zoom-in">
              <CheckCircle size={18} /> {successMessage}
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brandPurple hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isLoading ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </form>
    </div>
    
    {/* Footer Info */}
    <div className="mt-8 p-6 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-[2rem] border border-indigo-100/50 dark:border-indigo-900/20">
        <h4 className="text-indigo-900 dark:text-indigo-300 font-bold mb-1 text-sm">Personalization</h4>
        <p className="text-indigo-600/70 dark:text-indigo-400/70 text-xs leading-relaxed">
            Your appearance preferences are saved to your account and sync across devices.
        </p>
    </div>
  </div>
);
};

export default SettingsPage;